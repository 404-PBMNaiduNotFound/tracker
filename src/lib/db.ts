import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db as firestore, auth } from "@/integrations/firebase/client";
import type { Day } from "./types";
import { SCHEMA_VERSION } from "./types";
import { seedDays, START_DATE } from "./plan";
import { getTufLink, getTufLinkOrNull } from "./tuf-links";

// ---- Firestore layout (mirrors the old Postgres tables) ----
// users/{uid}                          <- profile doc (was `profiles`)
// users/{uid}/days/{dayNumber}         <- one doc per day (was `days`)
// users/{uid}/meta/plan                <- single doc  (was `plan_meta`)
// users/{uid}/revisionEvents/{eventId} <- (was `revision_events`)
// users/{uid}/settings/prefs           <- single doc  (was `user_settings`)
// users/{uid}/achievements/{code}      <- (was `achievements`; not written by the client today)
// users/{uid}/pushSubscriptions/{id}   <- (was `push_subscriptions`)

const userDoc = (uid: string) => doc(firestore, "users", uid);
const daysCol = (uid: string) => collection(firestore, "users", uid, "days");
const dayDoc = (uid: string, dayNumber: number) => doc(daysCol(uid), String(dayNumber));
const planMetaDoc = (uid: string) => doc(firestore, "users", uid, "meta", "plan");
const revisionEventsCol = (uid: string) => collection(firestore, "users", uid, "revisionEvents");

/** Cap on stored chat history per day — Firestore documents have a 1MB limit. */

/** Firestore batched writes cap at 500 mutations; stay well under it. */
const BATCH_SIZE = 400;

const dayToFields = (d: Day) => ({
  id: d.id,
  dayNumber: d.dayNumber,
  date: d.date,
  section: d.section,
  topic: d.topic,
  subtopics: d.subtopics,
  problems: d.problems,
  checklist: d.checklist,
  status: d.status,
  notes: d.notes,
  revisionNotes: d.revisionNotes,
  skipped: d.skipped,
  ...(d.mergeSnapshot !== undefined && { mergeSnapshot: d.mergeSnapshot }),
  updatedAt: serverTimestamp(),
});

const fieldsToDay = (data: Record<string, unknown>): Day => ({
  id: (data.id as string) ?? "",
  dayNumber: data.dayNumber as number,
  date: data.date as string,
  section: (data.section as string) ?? "",
  topic: (data.topic as string) ?? "",
  subtopics: (data.subtopics as string[]) ?? [],
  // Always re-derive takeUForwardLink from the current tuf-links map so that
  // any fixes to tuf-links.ts are reflected immediately without a full reset.
  problems: ((data.problems as Day["problems"]) ?? []).map((p) => ({
    ...p,
    takeUForwardLink: getTufLinkOrNull(p.name),
  })),
  checklist: (data.checklist as Day["checklist"]) ?? [],
  status: data.status as Day["status"],
  notes: (data.notes as string) ?? "",
  revisionNotes: (data.revisionNotes as string) ?? "",
  skipped: Boolean(data.skipped),
  mergeSnapshot: (data.mergeSnapshot as Day["mergeSnapshot"]) ?? undefined,
});

export interface PlanMeta {
  startDate: string;
  lastActiveDate: string;
  lastSyncedAt: string;
}

async function deleteAllDays(uid: string) {
  const snap = await getDocs(daysCol(uid));
  const refs = snap.docs.map((d) => d.ref);
  for (let i = 0; i < refs.length; i += BATCH_SIZE) {
    const batch = writeBatch(firestore);
    refs.slice(i, i + BATCH_SIZE).forEach((ref) => batch.delete(ref));
    await batch.commit();
  }
}

async function writeAllDays(uid: string, days: Day[]) {
  for (let i = 0; i < days.length; i += BATCH_SIZE) {
    const batch = writeBatch(firestore);
    days.slice(i, i + BATCH_SIZE).forEach((d) => batch.set(dayDoc(uid, d.dayNumber), dayToFields(d)));
    await batch.commit();
  }
}

/** Idempotent — equivalent of the old `handle_new_user` Postgres trigger. */
async function ensureProfile(uid: string) {
  const snap = await getDoc(userDoc(uid));
  if (snap.exists()) return;
  const user = auth.currentUser;
  await setDoc(
    userDoc(uid),
    {
      email: user?.email ?? "",
      displayName: user?.displayName ?? user?.email?.split("@")[0] ?? "",
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}

/**
 * Persists profile fields (display name, etc.) to the Firestore user doc.
 * `updateProfile` from firebase/auth only updates the Auth record — without
 * this, the name never actually lands in the database.
 */
export async function updateUserProfile(uid: string, patch: { displayName?: string }) {
  await setDoc(
    userDoc(uid),
    { ...patch, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export async function loadPlan(userId: string): Promise<{ days: Day[]; meta: PlanMeta }> {
  await ensureProfile(userId);

  const metaSnap = await getDoc(planMetaDoc(userId));
  if (!metaSnap.exists()) return seedPlan(userId);

  const daysSnap = await getDocs(query(daysCol(userId), orderBy("dayNumber", "asc")));
  if (daysSnap.empty) return seedPlan(userId);

  const metaData = metaSnap.data();
  return {
    days: daysSnap.docs.map((d) => fieldsToDay(d.data())),
    meta: {
      startDate: metaData.startDate as string,
      lastActiveDate: metaData.lastActiveDate as string,
      lastSyncedAt: (metaData.lastSyncedAt as string) ?? new Date().toISOString(),
    },
  };
}

export async function seedPlan(userId: string, startDate = START_DATE): Promise<{ days: Day[]; meta: PlanMeta }> {
  await ensureProfile(userId);
  const days = seedDays(startDate);
  await deleteAllDays(userId);
  await writeAllDays(userId, days);

  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  await setDoc(planMetaDoc(userId), {
    schemaVersion: SCHEMA_VERSION,
    startDate,
    lastActiveDate: today,
    lastSyncedAt: now.toISOString(),
  });

  return {
    days,
    meta: { startDate, lastActiveDate: today, lastSyncedAt: now.toISOString() },
  };
}

/** Returns true if this user has never had a plan seeded (first login). */
export async function hasExistingPlan(userId: string): Promise<boolean> {
  const metaSnap = await getDoc(planMetaDoc(userId));
  return metaSnap.exists();
}

/** Changes the start date of an existing plan — reseeds all days from scratch. */
export async function changeStartDate(userId: string, newStartDate: string): Promise<{ days: Day[]; meta: PlanMeta }> {
  return seedPlan(userId, newStartDate);
}

export async function saveDay(userId: string, day: Day) {
  await setDoc(dayDoc(userId, day.dayNumber), dayToFields(day));
  await touchSync(userId);
}

/** Rewrites the entire ordered sequence (used by postpone / merge / delete / revision insert). */
export async function saveSequence(userId: string, days: Day[]) {
  await deleteAllDays(userId);
  await writeAllDays(userId, days);
  await touchSync(userId);
}

export async function touchSync(userId: string) {
  const now = new Date();
  await setDoc(
    planMetaDoc(userId),
    { lastSyncedAt: now.toISOString(), lastActiveDate: now.toISOString().slice(0, 10) },
    { merge: true },
  );
}

export async function logEvent(userId: string, kind: string, detail: string) {
  const ref = doc(revisionEventsCol(userId));
  await setDoc(ref, { kind, detail, createdAt: serverTimestamp() });
}

export async function listEvents(userId: string) {
  const snap = await getDocs(query(revisionEventsCol(userId), orderBy("createdAt", "desc")));
  return snap.docs.slice(0, 25).map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Client-side best-effort cleanup while the user is still authenticated
 * (Security Rules only allow a user to delete their own documents). The
 * `deleteUserData` Cloud Function does the authoritative cascade delete of
 * every subcollection right before the Auth user itself is removed — see
 * functions/src/index.ts and MIGRATION_NOTES.md.
 */
export async function deleteAccountData(userId: string) {
  await deleteAllDays(userId);

  const eventsSnap = await getDocs(revisionEventsCol(userId));
  for (let i = 0; i < eventsSnap.docs.length; i += BATCH_SIZE) {
    const b = writeBatch(firestore);
    eventsSnap.docs.slice(i, i + BATCH_SIZE).forEach((d) => b.delete(d.ref));
    await b.commit();
  }

  const batch = writeBatch(firestore);
  batch.delete(planMetaDoc(userId));
  batch.delete(userDoc(userId));
  await batch.commit();
}

// Re-exported so other modules (settings.ts, push.ts) build Firestore paths
// consistently without duplicating the collection layout above.
export { userDoc, daysCol, dayDoc, planMetaDoc, revisionEventsCol };
export const settingsDoc = (uid: string) => doc(firestore, "users", uid, "settings", "prefs");
export const pushSubscriptionsCol = (uid: string) =>
  collection(firestore, "users", uid, "pushSubscriptions");

// ── Problem-tab completions ──────────────────────────────────────────────────
// users/{uid}/settings/problemCompletions  →  { completed: string[] }

const problemCompletionsDoc = (uid: string) =>
  doc(firestore, "users", uid, "settings", "problemCompletions");

export async function loadProblemCompletions(uid: string): Promise<Set<string>> {
  const snap = await getDoc(problemCompletionsDoc(uid));
  if (!snap.exists()) return new Set();
  return new Set<string>((snap.data().completed as string[]) ?? []);
}

export async function saveProblemCompletions(uid: string, completed: Set<string>): Promise<void> {
  await setDoc(problemCompletionsDoc(uid), { completed: [...completed] });
}
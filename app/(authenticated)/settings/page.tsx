"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  deleteUser,
  GoogleAuthProvider,
  linkWithPopup,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/integrations/firebase/client";
import { usePlan } from "@/hooks/usePlan";
import { useSettings } from "@/hooks/useSettings";
import { changeStartDate, deleteAccountData, updateUserProfile } from "@/lib/db";
import { addDays, daysNeeded, diffDays, formatDate, todayIso } from "@/lib/plan";
import { pushState, requestPushPermission, subscribeDevice } from "@/lib/push";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "@/components/PasswordInput";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Bell, CalendarDays, PauseCircle, PlayCircle, Sliders, UserCog } from "lucide-react";


function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof Bell;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card-hover mb-6 rounded-xl border border-border bg-card p-5 animate-fade-in-up">
      <div className="mb-4 flex items-start gap-3">
        <Icon className="mt-0.5 size-5 text-primary" aria-hidden="true" />
        <div>
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { settings, loading, update, userId } = useSettings();
  const { days, loading: planLoading, rebalance, shiftSchedule, startDate, reload } = usePlan();
  const qc = useQueryClient();

  const [name, setName] = useState(() => auth.currentUser?.displayName ?? "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [counts, setCounts] = useState(settings.counts);
  const [countsDirty, setCountsDirty] = useState(false);
  const [planStartDate, setPlanStartDate] = useState(() => startDate);
  const [startDirty, setStartDirty] = useState(false);
  const [startBusy, setStartBusy] = useState(false);

  // Live preview of what the new pace does to the finish date.
  const preview = useMemo(() => {
    const remaining = days.flatMap((d) => d.problems.filter((p) => !p.done));
    const need = daysNeeded(remaining, counts);
    const doneDays = days.filter((d) => d.problems.length > 0 && d.problems.every((p) => p.done))
      .length;
    return { remaining: remaining.length, need, finish: addDays(todayIso(), need), doneDays };
  }, [days, counts]);

  async function saveAccount() {
    setBusy(true);
    try {
      if (password || confirm) {
        if (password.length < 8) throw new Error("Password must be at least 8 characters.");
        if (password !== confirm) throw new Error("The two passwords do not match.");
      }
      const user = auth.currentUser;
      if (!user) throw new Error("Not signed in.");
      if (!name.trim() && !password) throw new Error("Nothing to update.");
      if (name.trim()) {
        await updateProfile(user, { displayName: name.trim() });
        await updateUserProfile(userId, { displayName: name.trim() });
      }
      if (password) await updatePassword(user, password);
      setPassword("");
      setConfirm("");
      toast.success("Account updated");
    } catch (e) {
      const needsReauth = e instanceof FirebaseError && e.code === "auth/requires-recent-login";
      toast.error("Could not update your account", {
        description: needsReauth
          ? "For security, please sign out and sign back in before changing your password."
          : e instanceof Error
            ? e.message
            : "Please try again.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function linkGoogle() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not signed in.");
      await linkWithPopup(user, new GoogleAuthProvider());
      toast.success("Google account connected");
    } catch (e) {
      const already = e instanceof FirebaseError && e.code === "auth/credential-already-in-use";
      toast.error(already ? "That Google account is already linked elsewhere" : "Google sign-in failed", {
        description: e instanceof Error ? e.message : String(e),
      });
    }
  }

  async function applyStartDate() {
    if (!startDirty || !planStartDate) return;
    setStartBusy(true);
    try {
      await changeStartDate(userId, planStartDate);
      reload();
      setStartDirty(false);
      toast.success("Plan start date updated", {
        description: `Your 120-day plan now starts on ${formatDate(planStartDate)}. All days have been reset.`,
      });
    } catch (e) {
      toast.error("Could not update start date. Please try again.");
    } finally {
      setStartBusy(false);
    }
  }

  async function applyCounts() {
    setBusy(true);
    try {
      await update({ counts });
      const res = await rebalance(counts);
      setCountsDirty(false);
      toast.success("Daily pace updated", {
        description: `Remaining problems redistributed — plan is now ${res.after} days (was ${res.before}), finishing ${formatDate(res.finish)}.`,
      });
    } finally {
      setBusy(false);
    }
  }

  async function togglePush(on: boolean) {
    if (!on) {
      await update({ pushEnabled: false });
      return;
    }
    const state = await requestPushPermission();
    if (state !== "granted") {
      toast.error(
        state === "unsupported"
          ? "This browser does not support notifications"
          : "Notification permission was blocked",
        { description: "Check your browser notification settings and try again." },
      );
      return;
    }
    const ok = await subscribeDevice(userId);
    if (!ok) {
      toast.error("Could not register this device for push", {
        description:
          "Make sure VITE_FIREBASE_VAPID_KEY is set in your .env and the firebase-messaging-sw.js service worker is deployed. Check the browser console for details.",
      });
      return;
    }
    await update({ pushEnabled: true });
    toast.success("Browser reminders on");
  }

  async function pause() {
    const from = todayIso();
    await update({ paused: true, pausedFrom: from, pausedDays: 0 });
    toast.info("Preparation paused", {
      description: "Your schedule stops sliding when you resume. Missed-week checks are off.",
    });
  }

  async function resume() {
    const from = settings.pausedFrom ?? todayIso();
    const gap = Math.max(0, diffDays(from, todayIso()));
    const finish = gap > 0 ? await shiftSchedule(from, gap) : days[days.length - 1]?.date;
    await update({
      paused: false,
      pausedFrom: null,
      pausedDays: settings.pausedDays + gap,
      resumeDate: todayIso(),
    });
    toast.success("Welcome back", {
      description:
        gap > 0
          ? `Everything shifted forward by ${gap} day(s). New finish date ${formatDate(finish ?? "")}.`
          : "Nothing to shift — you resumed the same day.",
    });
  }

  async function deleteAccount() {
    try {
      // Best-effort client-side cleanup while still authenticated. The
      // deleteUserData Cloud Function (functions/src/index.ts) is the
      // authoritative cascade delete and also runs server-side right before
      // the Auth user record itself is removed, so nothing is left behind
      // even if a step here fails partway.
      await deleteAccountData(userId);
      const user = auth.currentUser;
      if (user) await deleteUser(user);
      await qc.cancelQueries();
      qc.clear();
      toast.success("Your data has been deleted.");
      router.push("/auth?next=/today");
    } catch (e) {
      const needsReauth = e instanceof FirebaseError && e.code === "auth/requires-recent-login";
      toast.error("Could not delete your account", {
        description: needsReauth
          ? "For security, please sign out and sign back in, then try deleting your account again."
          : e instanceof Error
            ? e.message
            : "Please try again.",
      });
    }
  }

  if (loading || planLoading) return <Skeleton className="h-96 w-full" />;

  const pushPerm = pushState();

  return (
    <>
      <h1 className="mb-1 text-2xl font-bold tracking-tight">Settings</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Account, pace, reminders and pause controls.
      </p>

      <Section
        icon={CalendarDays}
        title="Plan start date"
        description="The date your 120-day DSA plan begins. Changing this reseeds all days from scratch — your progress marks will be lost."
      >
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="plan-start-date">Start date</Label>
            <input
              id="plan-start-date"
              type="date"
              value={planStartDate}
              onChange={(e) => {
                setPlanStartDate(e.target.value);
                setStartDirty(true);
              }}
              className="mt-1.5 flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <ConfirmDialog
            trigger={
              <Button disabled={!startDirty || startBusy}>
                Apply new start date
              </Button>
            }
            title="Reset plan to new start date?"
            description="This reseeds all 120 days from the new date. Your existing progress (done problems, notes) will be lost. This cannot be undone."
            confirmLabel="Yes, reset plan"
            destructive
            onConfirm={applyStartDate}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Current start date: <strong>{formatDate(startDate)}</strong>
        </p>
      </Section>

      <Section
        icon={Sliders}
        title="Daily problem pace"
        description="How many problems of each difficulty you want per day. Changing this redistributes only the problems you have not finished yet."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {(["easy", "medium", "hard"] as const).map((k) => (
            <div key={k}>
              <Label htmlFor={`count-${k}`} className="capitalize">
                {k} per day
              </Label>
              <Input
                id={`count-${k}`}
                type="number"
                min={1}
                max={20}
                value={counts[k]}
                onChange={(e) => {
                  const v = Math.max(1, Math.min(20, Number(e.target.value) || 1));
                  setCounts((c) => ({ ...c, [k]: v }));
                  setCountsDirty(true);
                }}
                className="mt-1.5"
              />
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {preview.remaining} problems left → about <strong>{preview.need}</strong> more days.
          Completed days are never touched.
        </p>
        <Button className="mt-4" disabled={!countsDirty || busy} onClick={() => void applyCounts()}>
          Apply &amp; redistribute
        </Button>
      </Section>

      <Section
        icon={settings.paused ? PlayCircle : PauseCircle}
        title="Pause preparation"
        description="Taking exams or a holiday? Pausing freezes your schedule — when you resume, every upcoming day slides forward by the time you were away, and missed-week detection stays off in the meantime."
      >
        {settings.paused ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm">
              Paused since <strong>{formatDate(settings.pausedFrom ?? "")}</strong> —{" "}
              {Math.max(0, diffDays(settings.pausedFrom ?? todayIso(), todayIso()))} day(s) so far.
            </p>
            <Button onClick={() => void resume()} className="ml-auto">
              Resume preparation
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => void pause()}>
            Pause my preparation
          </Button>
        )}
        {settings.pausedDays > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            Total time paused so far: {settings.pausedDays} day(s).
          </p>
        )}
      </Section>

      <Section
        icon={Bell}
        title="Reminders"
        description="A nudge when you still have problems left for the day."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="push">Browser notifications</Label>
              <p className="text-xs text-muted-foreground">
                {pushPerm === "unsupported"
                  ? "Not supported in this browser."
                  : pushPerm === "denied"
                    ? "Blocked — enable notifications for this site in your browser settings."
                    : "Shown on this device at your reminder time."}
              </p>
            </div>
            <Switch
              id="push"
              checked={settings.pushEnabled}
              disabled={pushPerm === "unsupported" || pushPerm === "denied"}
              onCheckedChange={(v) => void togglePush(v)}
            />
          </div>

          <div>
            <Label htmlFor="time">Reminder time</Label>
            <Input
              id="time"
              type="time"
              value={settings.reminderTime}
              onChange={(e) => void update({ reminderTime: e.target.value })}
              className="mt-1.5 w-40"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Timezone: {settings.timezone}
            </p>
          </div>
        </div>
      </Section>

      <Section
        icon={UserCog}
        title="Account"
        description="Change your display name or password, connect Google, or delete everything."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="name">Display name</Label>
            <Input
              id="name"
              value={name}
              placeholder="Your name"
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="pw">New password</Label>
            <PasswordInput
              id="pw"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="pw2">Confirm new password</Label>
            <PasswordInput
              id="pw2"
              value={confirm}
              autoComplete="new-password"
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button disabled={busy} onClick={() => void saveAccount()}>
            Save changes
          </Button>
          <Button variant="outline" onClick={() => void linkGoogle()}>
            Continue with Google
          </Button>
        </div>

        <Separator className="my-5" />

        <ConfirmDialog
          title="Delete your account data?"
          description="This permanently removes your entire plan, notes, AI caches, achievements and chat history. This cannot be undone."
          confirmWord="DELETE"
          confirmLabel="Delete everything"
          onConfirm={deleteAccount}
          trigger={
            <Button variant="outline" className="text-destructive">
              Delete my account &amp; data
            </Button>
          }
        />
      </Section>
    </>
  );
}

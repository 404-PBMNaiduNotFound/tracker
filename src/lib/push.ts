/**
 * Upgrade 3: browser reminder plumbing, now backed by Firebase Cloud
 * Messaging instead of raw web-push/VAPID.
 *
 * Push is strictly best-effort: unsupported browsers, denied permission and
 * missing service-worker support all degrade to "disabled with an explanation"
 * instead of breaking the page.
 */
import { doc, setDoc } from "firebase/firestore";
import { getMessagingIfSupported } from "@/integrations/firebase/client";
import { pushSubscriptionsCol } from "@/lib/db";

export const pushSupported = () =>
  typeof window !== "undefined" &&
  "Notification" in window &&
  "serviceWorker" in navigator;

export type PushState = "unsupported" | "default" | "granted" | "denied";

export function pushState(): PushState {
  if (!pushSupported()) return "unsupported";
  return Notification.permission as PushState;
}

export async function registerReminderWorker() {
  if (!pushSupported()) return null;
  try {
    return await navigator.serviceWorker.register("/firebase-messaging-sw.js");
  } catch {
    return null;
  }
}

export async function requestPushPermission(): Promise<PushState> {
  if (!pushSupported()) return "unsupported";
  const result = await Notification.requestPermission();
  if (result === "granted") await registerReminderWorker();
  return result as PushState;
}

/** Store the device's FCM token so the scheduled Cloud Function can reach it later. */
export async function saveSubscription(userId: string, token: string) {
  await setDoc(doc(pushSubscriptionsCol(userId), token), {
    token,
    createdAt: new Date().toISOString(),
  });
}

export async function subscribeDevice(userId: string) {
  const reg = await registerReminderWorker();
  if (!reg) return false;
  try {
    const messaging = await getMessagingIfSupported();
    if (!messaging) return false;
    const { getToken } = await import("firebase/messaging");
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY as string | undefined;
    if (!vapidKey) {
      console.error(
        "[push] Missing VITE_FIREBASE_VAPID_KEY — generate a Web Push certificate in the Firebase console (Project settings > Cloud Messaging) and set it in .env.",
      );
      return false;
    }
    const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: reg });
    if (!token) return false;
    await saveSubscription(userId, token);
    return true;
  } catch {
    return false;
  }
}

export async function showLocalReminder(title: string, body: string) {
  if (!pushSupported() || Notification.permission !== "granted") return;
  const reg = await navigator.serviceWorker.getRegistration();
  if (reg) await reg.showNotification(title, { body, icon: "/favicon.ico", tag: "dsa-reminder" });
  else new Notification(title, { body, icon: "/favicon.ico" });
}

/** "19:00" -> minutes since midnight */
export const timeToMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

"use client";

/**
 * Upgrade 3: fires a local in-tab reminder when the user's chosen time
 * passes while the app is open (instant, no network round-trip). The
 * real background delivery for closed tabs — actual email (Resend) and
 * push (FCM) — is handled by the `sendReminders` Firebase Cloud Function,
 * scheduled every 15 minutes via Cloud Scheduler (see
 * functions/src/index.ts). This component is just the fast local nudge
 * on top of that.
 */
import { useEffect, useRef } from "react";
import { usePlan } from "@/hooks/usePlan";
import { useSettings } from "@/hooks/useSettings";
import { dayProgress, todayIso } from "@/lib/plan";
import { showLocalReminder, timeToMinutes } from "@/lib/push";

const STORAGE_KEY = "dsa:last-local-reminder";

export function ReminderRunner() {
  const { settings } = useSettings();
  const { days } = usePlan();
  const daysRef = useRef(days);
  daysRef.current = days;

  useEffect(() => {
    if (!settings.pushEnabled || settings.paused) return;
    if (typeof window === "undefined") return;

    const tick = () => {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      if (nowMinutes < timeToMinutes(settings.reminderTime)) return;

      const today = todayIso();
      if (window.localStorage.getItem(STORAGE_KEY) === today) return;

      const day = daysRef.current.find((d) => d.date === today);
      if (!day || day.skipped) return;
      const { done, total } = dayProgress(day);
      if (total === 0 || done >= total) return;

      window.localStorage.setItem(STORAGE_KEY, today);
      void showLocalReminder(
        "Today's DSA plan is waiting",
        `${total - done} of ${total} problems left — ${day.topic}`,
      );
    };

    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [settings.pushEnabled, settings.paused, settings.reminderTime]);

  return null;
}

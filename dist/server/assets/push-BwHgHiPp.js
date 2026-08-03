import { r as getMessagingIfSupported } from "./client-CNOuFmVY.js";
import { d as settingsDoc, o as pushSubscriptionsCol, p as DEFAULT_DAILY_COUNTS } from "./db-D4MFlxy2.js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";
import { toast } from "sonner";
import { doc, getDoc, setDoc } from "firebase/firestore";
//#region src/lib/settings.ts
/** Upgrade 2/3/5: per-user settings persisted in Firestore. */
var DEFAULT_SETTINGS = {
	theme: "dark",
	counts: DEFAULT_DAILY_COUNTS,
	pushEnabled: false,
	emailEnabled: false,
	reminderTime: "19:00",
	timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
	paused: false,
	pausedFrom: null,
	pausedDays: 0,
	resumeDate: null
};
var fieldsToSettings = (f) => ({
	theme: f.theme ?? "dark",
	counts: {
		easy: f.easyPerDay ?? DEFAULT_DAILY_COUNTS.easy,
		medium: f.mediumPerDay ?? DEFAULT_DAILY_COUNTS.medium,
		hard: f.hardPerDay ?? DEFAULT_DAILY_COUNTS.hard
	},
	pushEnabled: Boolean(f.pushEnabled),
	emailEnabled: Boolean(f.emailEnabled),
	reminderTime: (f.reminderTime ?? "19:00").slice(0, 5),
	timezone: f.timezone || DEFAULT_SETTINGS.timezone,
	paused: Boolean(f.paused),
	pausedFrom: f.pausedFrom ?? null,
	pausedDays: f.pausedDays ?? 0,
	resumeDate: f.resumeDate ?? null
});
var settingsToFields = (s) => {
	const fields = {};
	if (s.theme !== void 0) fields.theme = s.theme;
	if (s.counts !== void 0) {
		fields.easyPerDay = s.counts.easy;
		fields.mediumPerDay = s.counts.medium;
		fields.hardPerDay = s.counts.hard;
	}
	if (s.pushEnabled !== void 0) fields.pushEnabled = s.pushEnabled;
	if (s.emailEnabled !== void 0) fields.emailEnabled = s.emailEnabled;
	if (s.reminderTime !== void 0) fields.reminderTime = s.reminderTime;
	if (s.timezone !== void 0) fields.timezone = s.timezone;
	if (s.paused !== void 0) fields.paused = s.paused;
	if (s.pausedFrom !== void 0) fields.pausedFrom = s.pausedFrom;
	if (s.pausedDays !== void 0) fields.pausedDays = s.pausedDays;
	if (s.resumeDate !== void 0) fields.resumeDate = s.resumeDate;
	return fields;
};
async function loadSettings(userId) {
	const ref = settingsDoc(userId);
	const snap = await getDoc(ref);
	if (!snap.exists()) {
		const seeded = { ...DEFAULT_SETTINGS };
		await setDoc(ref, {
			...settingsToFields(seeded),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		return seeded;
	}
	return fieldsToSettings(snap.data());
}
async function saveSettings(userId, patch) {
	const ref = settingsDoc(userId);
	await setDoc(ref, {
		...settingsToFields(patch),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	}, { merge: true });
}
//#endregion
//#region src/hooks/useSettings.tsx
/** NEW FILE — Upgrade 2/5: settings context (theme, pace, reminders, pause). */
var Ctx = createContext(null);
function SettingsProvider({ userId, children }) {
	const [settings, setSettings] = useState(DEFAULT_SETTINGS);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let alive = true;
		loadSettings(userId).then((s) => {
			if (alive) setSettings(s);
		}).catch(() => {}).finally(() => {
			if (alive) setLoading(false);
		});
		return () => {
			alive = false;
		};
	}, [userId]);
	const update = useCallback(async (patch) => {
		setSettings((prev) => ({
			...prev,
			...patch
		}));
		try {
			await saveSettings(userId, patch);
		} catch (e) {
			toast.error("Could not save your settings", { description: e instanceof Error ? e.message : "Please try again." });
		}
	}, [userId]);
	useEffect(() => {
		if (typeof document === "undefined") return;
		const root = document.documentElement;
		const prefersLight = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
		const light = settings.theme === "light" || settings.theme === "system" && prefersLight;
		root.classList.toggle("light", light);
		root.classList.toggle("dark", !light);
		root.style.colorScheme = light ? "light" : "dark";
	}, [settings.theme]);
	const value = useMemo(() => ({
		settings,
		loading,
		update,
		userId
	}), [
		settings,
		loading,
		update,
		userId
	]);
	return /* @__PURE__ */ jsx(Ctx.Provider, {
		value,
		children
	});
}
var useSettings = () => {
	const ctx = useContext(Ctx);
	if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
	return ctx;
};
//#endregion
//#region src/lib/push.ts
/**
* Upgrade 3: browser reminder plumbing, now backed by Firebase Cloud
* Messaging instead of raw web-push/VAPID.
*
* Push is strictly best-effort: unsupported browsers, denied permission and
* missing service-worker support all degrade to "disabled with an explanation"
* instead of breaking the page.
*/
var pushSupported = () => typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator;
function pushState() {
	if (!pushSupported()) return "unsupported";
	return Notification.permission;
}
async function registerReminderWorker() {
	if (!pushSupported()) return null;
	try {
		return await navigator.serviceWorker.register("/firebase-messaging-sw.js");
	} catch {
		return null;
	}
}
async function requestPushPermission() {
	if (!pushSupported()) return "unsupported";
	const result = await Notification.requestPermission();
	if (result === "granted") await registerReminderWorker();
	return result;
}
/** Store the device's FCM token so the scheduled Cloud Function can reach it later. */
async function saveSubscription(userId, token) {
	await setDoc(doc(pushSubscriptionsCol(userId), token), {
		token,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
}
async function subscribeDevice(userId) {
	const reg = await registerReminderWorker();
	if (!reg) return false;
	try {
		const messaging = await getMessagingIfSupported();
		if (!messaging) return false;
		const { getToken } = await import("firebase/messaging");
		const token = await getToken(messaging, {
			vapidKey: "BIxEPnj4Xp1MGYuevYtL8uO8Atl2JeeShYDHU5cXnVBa12C_RCnX-wGSAAn_4i6PadpSdk9ddLMVaLhi3TvDgzI",
			serviceWorkerRegistration: reg
		});
		if (!token) return false;
		await saveSubscription(userId, token);
		return true;
	} catch {
		return false;
	}
}
async function showLocalReminder(title, body) {
	if (!pushSupported() || Notification.permission !== "granted") return;
	const reg = await navigator.serviceWorker.getRegistration();
	if (reg) await reg.showNotification(title, {
		body,
		icon: "/favicon.ico",
		tag: "dsa-reminder"
	});
	else new Notification(title, {
		body,
		icon: "/favicon.ico"
	});
}
/** "19:00" -> minutes since midnight */
var timeToMinutes = (hhmm) => {
	const [h, m] = hhmm.split(":").map(Number);
	return (h || 0) * 60 + (m || 0);
};
//#endregion
export { timeToMinutes as a, subscribeDevice as i, requestPushPermission as n, SettingsProvider as o, showLocalReminder as r, useSettings as s, pushState as t };

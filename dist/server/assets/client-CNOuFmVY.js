import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isSupported } from "firebase/messaging";
//#region src/integrations/firebase/client.ts
function readFirebaseConfig() {
	const cfg = {
		apiKey: "AIzaSyA5IQxOyoqWUTHWF0UCZPHyYJ9Giv1_-8Q",
		authDomain: "tracker-3751e.firebaseapp.com",
		projectId: "tracker-3751e",
		storageBucket: "tracker-3751e.firebasestorage.app",
		messagingSenderId: "662558145403",
		appId: "1:662558145403:web:b624b59a5a0997560d1bde"
	};
	if (!cfg.apiKey || !cfg.projectId || !cfg.appId) {
		const message = `Missing Firebase environment variable(s): ${Object.entries(cfg).filter(([k, v]) => !v && k !== "storageBucket").map(([k]) => k).join(", ")}. Set VITE_FIREBASE_* in .env — see MIGRATION_NOTES.md.`;
		console.error(`[Firebase] ${message}`);
		throw new Error(message);
	}
	return cfg;
}
function ensureApp() {
	return getApps()[0] ?? initializeApp(readFirebaseConfig());
}
var app = ensureApp();
var auth = getAuth(app);
var db = getFirestore(app);
/**
* Resolves once with the current user after Firebase Auth's initial state
* check (reading the persisted session) completes.
*/
function waitForAuthUser() {
	return new Promise((resolve) => {
		const unsub = auth.onAuthStateChanged((user) => {
			unsub();
			resolve(user);
		});
	});
}
/** Firebase Messaging only works in the browser and only where the API is supported. */
async function getMessagingIfSupported() {
	if (typeof window === "undefined") return null;
	try {
		if (!await isSupported()) return null;
		const { getMessaging } = await import("firebase/messaging");
		return getMessaging(app);
	} catch {
		return null;
	}
}
//#endregion
export { waitForAuthUser as i, db as n, getMessagingIfSupported as r, auth as t };

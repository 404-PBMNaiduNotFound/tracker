import { t as auth } from "./client-CNOuFmVY.js";
import { c as saveProblemCompletions, i as loadProblemCompletions } from "./db-D4MFlxy2.js";
import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
//#region src/hooks/useAuth.tsx
function useAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (u) => {
			setUser(u);
			setLoading(false);
		});
		return () => unsub();
	}, []);
	return {
		user,
		loading
	};
}
//#endregion
//#region src/hooks/useProblemCompletions.tsx
/**
* Manages which problems in the Problems tab the user has marked complete.
* Completions are stored in Firestore at users/{uid}/settings/problemCompletions
* so they persist across sessions and devices.
*/
function useProblemCompletions() {
	const { user } = useAuth();
	const uid = user?.uid ?? null;
	const [completed, setCompleted] = useState(/* @__PURE__ */ new Set());
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!uid) {
			setCompleted(/* @__PURE__ */ new Set());
			setLoading(false);
			return;
		}
		setLoading(true);
		loadProblemCompletions(uid).then((set) => setCompleted(set)).finally(() => setLoading(false));
	}, [uid]);
	return {
		completed,
		loading,
		toggle: useCallback(async (name) => {
			if (!uid) return;
			setCompleted((prev) => {
				const next = new Set(prev);
				if (next.has(name)) next.delete(name);
				else next.add(name);
				saveProblemCompletions(uid, next);
				return next;
			});
		}, [uid])
	};
}
//#endregion
export { useProblemCompletions as t };

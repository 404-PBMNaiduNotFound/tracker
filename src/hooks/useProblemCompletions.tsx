import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import {
  loadProblemCompletions,
  loadCodeSubmissions,
  saveCodeSubmission,
  removeCodeSubmission,
  type CodeSubmission,
} from "@/lib/db";

const LOCAL_SUBMISSIONS_KEY = "dsa_local_code_submissions";
const LOCAL_COMPLETIONS_KEY = "dsa_local_completed_problems";

function getLocalSubmissions(): Record<string, CodeSubmission> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LOCAL_SUBMISSIONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getLocalCompletions(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(LOCAL_COMPLETIONS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function useProblemCompletions() {
  const { user } = useAuth();
  const uid = user?.uid ?? "local-user";

  const [completed, setCompleted] = useState<Set<string>>(() => getLocalCompletions());
  const [submissions, setSubmissions] = useState<Record<string, CodeSubmission>>(() => getLocalSubmissions());
  const [loading, setLoading] = useState(true);

  // Load on mount / user change
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const localSubs = getLocalSubmissions();
    const localComp = getLocalCompletions();

    if (!user) {
      setSubmissions(localSubs);
      setCompleted(localComp);
      setLoading(false);
      return;
    }

    Promise.all([loadProblemCompletions(user.uid), loadCodeSubmissions(user.uid)])
      .then(([set, subMap]) => {
        if (!isMounted) return;
        const mergedSubs = { ...localSubs, ...subMap };
        const mergedComp = new Set([...Array.from(localComp), ...Array.from(set)]);
        setCompleted(mergedComp);
        setSubmissions(mergedSubs);
      })
      .catch((e) => {
        console.warn("Failed to load problem completions from Firestore:", e);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  /** Submit code for a problem, marking it completed and persisting locally and in DB. */
  const submitCode = useCallback(
    async (name: string, code: string, link: string = "") => {
      const sub: CodeSubmission = {
        code,
        link,
        submittedAt: new Date().toISOString(),
      };

      setSubmissions((prev) => {
        const next = { ...prev, [name]: sub };
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_SUBMISSIONS_KEY, JSON.stringify(next));
        }
        return next;
      });

      setCompleted((prev) => {
        const next = new Set(prev);
        next.add(name);
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_COMPLETIONS_KEY, JSON.stringify(Array.from(next)));
        }
        return next;
      });

      if (user) {
        await saveCodeSubmission(user.uid, name, sub, completed).catch(() => {});
      }
    },
    [user, completed],
  );

  /** Remove code submission for a problem, unmarking it as completed. */
  const removeCode = useCallback(
    async (name: string) => {
      setSubmissions((prev) => {
        const next = { ...prev };
        delete next[name];
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_SUBMISSIONS_KEY, JSON.stringify(next));
        }
        return next;
      });

      setCompleted((prev) => {
        const next = new Set(prev);
        next.delete(name);
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_COMPLETIONS_KEY, JSON.stringify(Array.from(next)));
        }
        return next;
      });

      if (user) {
        await removeCodeSubmission(user.uid, name, completed).catch(() => {});
      }
    },
    [user, completed],
  );

  return { completed, submissions, loading, submitCode, removeCode };
}

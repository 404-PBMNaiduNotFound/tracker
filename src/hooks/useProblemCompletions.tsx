"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { loadProblemCompletions, saveProblemCompletions } from "@/lib/db";

/**
 * Manages which problems in the Problems tab the user has marked complete.
 * Completions are stored in Firestore at users/{uid}/settings/problemCompletions
 * so they persist across sessions and devices.
 */
export function useProblemCompletions() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Load on mount / user change
  useEffect(() => {
    if (!uid) {
      setCompleted(new Set());
      setLoading(false);
      return;
    }
    setLoading(true);
    loadProblemCompletions(uid)
      .then((set) => setCompleted(set))
      .finally(() => setLoading(false));
  }, [uid]);

  /** Toggle a single problem by name and persist immediately. */
  const toggle = useCallback(
    async (name: string) => {
      if (!uid) return;
      setCompleted((prev) => {
        const next = new Set(prev);
        if (next.has(name)) next.delete(name);
        else next.add(name);
        // Fire-and-forget save
        void saveProblemCompletions(uid, next);
        return next;
      });
    },
    [uid],
  );

  return { completed, loading, toggle };
}

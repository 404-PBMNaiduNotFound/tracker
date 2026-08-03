import { A as todayIso, C as newChecklist, D as setSkipped, E as renumber, O as setSkippedById, S as isDayComplete, T as rebalanceRemaining, a as logEvent, b as diffDays, g as addDays, k as shiftFrom, l as saveSequence, r as loadPlan, s as saveDay, u as seedPlan, w as planOffset, y as deriveStatus } from "./db-D4MFlxy2.js";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
import { toast } from "sonner";
//#region src/hooks/usePlan.tsx
var Ctx = createContext(null);
function PlanProvider({ userId, paused = false, children }) {
	const [days, setDays] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [lastSynced, setLastSynced] = useState(null);
	const [startDate, setStartDate] = useState("2026-08-01");
	const checkedGap = useRef(false);
	const load = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const { days: d, meta } = await loadPlan(userId);
			setDays(d);
			setStartDate(meta.startDate);
			setLastSynced(meta.lastSyncedAt);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not load your progress.");
		} finally {
			setLoading(false);
		}
	}, [userId]);
	useEffect(() => {
		load();
	}, [load]);
	const markSynced = () => setLastSynced((/* @__PURE__ */ new Date()).toISOString());
	const fail = (e) => {
		const msg = e instanceof Error ? e.message : "Sync failed";
		toast.error("Could not sync to the cloud", {
			description: msg,
			action: {
				label: "Retry",
				onClick: () => void load()
			}
		});
	};
	/** Optimistic single-day update, confirmed to the cloud in the background. */
	const updateDay = useCallback(async (dayNumber, patch) => {
		let next;
		setDays((prev) => prev.map((d) => {
			if (d.dayNumber !== dayNumber) return d;
			next = patch(d);
			return next;
		}));
		if (!next) return;
		try {
			await saveDay(userId, next);
			markSynced();
		} catch (e) {
			fail(e);
		}
	}, [userId, load]);
	const commitSequence = useCallback(async (next, eventKind, detail) => {
		const sequenced = renumber(next, startDate, planOffset(days, startDate));
		setDays(sequenced);
		try {
			await saveSequence(userId, sequenced);
			if (eventKind) await logEvent(userId, eventKind, detail ?? "");
			markSynced();
		} catch (e) {
			fail(e);
		}
	}, [
		userId,
		startDate,
		days,
		load
	]);
	const postpone = useCallback(async (dayNumber, newDate) => {
		const day = days.find((d) => d.dayNumber === dayNumber);
		if (!day) return;
		const gap = Math.max(1, diffDays(day.date, newDate));
		const shifted = days.map((d) => d.dayNumber === dayNumber ? {
			...d,
			status: "postponed"
		} : d).map((d) => d.dayNumber >= dayNumber ? {
			...d,
			date: addDays(d.date, gap)
		} : d);
		setDays(shifted);
		try {
			await saveSequence(userId, shifted);
			await logEvent(userId, "postpone", `Day ${dayNumber} postponed by ${gap} day(s) — plan now ends ${shifted[shifted.length - 1].date}`);
			markSynced();
		} catch (e) {
			fail(e);
		}
	}, [
		days,
		userId,
		load
	]);
	const mergeTomorrow = useCallback(async (dayNumber) => {
		const idx = days.findIndex((d) => d.dayNumber === dayNumber);
		if (idx === -1 || idx + 1 >= days.length) return;
		const today = days[idx];
		const tomorrow = days[idx + 1];
		const merged = {
			...today,
			topic: `${today.topic} + ${tomorrow.topic}`,
			section: today.section,
			subtopics: [...today.subtopics, ...tomorrow.subtopics],
			problems: [...today.problems, ...tomorrow.problems],
			checklist: today.checklist,
			status: "merged",
			notes: [today.notes, tomorrow.notes].filter(Boolean).join("\n"),
			mergeSnapshot: {
				originalProblemCount: today.problems.length,
				absorbedTopic: tomorrow.topic,
				absorbedSection: tomorrow.section,
				absorbedSubtopics: tomorrow.subtopics,
				baseTopic: today.topic
			}
		};
		const next = [
			...days.slice(0, idx),
			merged,
			...days.slice(idx + 2)
		];
		await commitSequence(next, "merge", `Merged "${tomorrow.topic}" into day ${dayNumber}; plan shortened by 1 day`);
	}, [days, commitSequence]);
	const unmerge = useCallback(async (dayNumber) => {
		const idx = days.findIndex((d) => d.dayNumber === dayNumber);
		if (idx === -1) return;
		const day = days[idx];
		if (day.status !== "merged" || !day.mergeSnapshot) return;
		const { originalProblemCount, absorbedTopic, absorbedSection, absorbedSubtopics, baseTopic } = day.mergeSnapshot;
		const baseProblems = day.problems.slice(0, originalProblemCount);
		const absorbedProblems = day.problems.slice(originalProblemCount);
		const restoredBase = {
			...day,
			topic: baseTopic,
			subtopics: day.subtopics.slice(0, day.subtopics.length - absorbedSubtopics.length),
			problems: baseProblems,
			status: "pending",
			mergeSnapshot: void 0
		};
		const restoredAbsorbed = {
			id: `${day.id}-unmerge-${Date.now()}`,
			dayNumber: day.dayNumber + 1,
			date: addDays(day.date, 1),
			section: absorbedSection,
			topic: absorbedTopic,
			subtopics: absorbedSubtopics,
			problems: absorbedProblems,
			checklist: newChecklist(),
			status: "pending",
			notes: "",
			revisionNotes: "",
			skipped: false
		};
		const next = [
			...days.slice(0, idx),
			restoredBase,
			restoredAbsorbed,
			...days.slice(idx + 1)
		];
		await commitSequence(next, "unmerge", `Unmerged day ${dayNumber} — "${absorbedTopic}" restored as a separate day; plan extended by 1 day`);
	}, [days, commitSequence]);
	const toggleReview = useCallback(async (dayNumber, problemName, flag) => {
		await updateDay(dayNumber, (d) => ({
			...d,
			problems: d.problems.map((p) => p.name === problemName ? {
				...p,
				forReview: flag
			} : p)
		}));
	}, [updateDay]);
	const deleteProblem = useCallback(async (dayNumber, problemName) => {
		const idx = days.findIndex((d) => d.dayNumber === dayNumber);
		if (idx === -1) return;
		const day = days[idx];
		const problem = day.problems.find((p) => p.name === problemName);
		if (!problem) return;
		const carried = {
			...problem,
			done: false
		};
		const trimmedDay = {
			...day,
			problems: day.problems.filter((p) => p.name !== problemName)
		};
		const nextIdx = days.findIndex((d, i) => i > idx && !d.skipped);
		let next;
		let targetDayNumber;
		if (nextIdx !== -1) {
			const tomorrow = days[nextIdx];
			targetDayNumber = tomorrow.dayNumber;
			const updatedTomorrow = {
				...tomorrow,
				problems: [carried, ...tomorrow.problems]
			};
			next = days.map((d, i) => {
				if (i === idx) return trimmedDay;
				if (i === nextIdx) return updatedTomorrow;
				return d;
			});
		} else {
			targetDayNumber = dayNumber + 1;
			const newDay = {
				id: `${day.id}-carry-${Date.now()}`,
				dayNumber: targetDayNumber,
				date: addDays(day.date, 1),
				section: day.section,
				topic: day.topic,
				subtopics: day.subtopics,
				problems: [carried],
				checklist: newChecklist(),
				status: "pending",
				notes: "",
				revisionNotes: "",
				skipped: false
			};
			next = [
				...days.slice(0, idx),
				trimmedDay,
				...days.slice(idx + 1),
				newDay
			];
		}
		await commitSequence(next, "delete_problem", `Moved '${problemName}' from Day ${dayNumber} to Day ${targetDayNumber}`);
	}, [days, commitSequence]);
	const deleteDay = useCallback(async (dayNumber) => {
		if (days.findIndex((d) => d.dayNumber === dayNumber) === -1) return;
		await commitSequence(days.filter((d) => d.dayNumber !== dayNumber), "delete_day", `Deleted day ${dayNumber} and shifted the schedule forward`);
	}, [days, commitSequence]);
	const skipTopic = useCallback(async (dayNumber, skip) => {
		const day = days.find((d) => d.dayNumber === dayNumber);
		if (!day) return;
		const next = setSkippedById(days, day.id, skip, startDate);
		await commitSequence(next, skip ? "skip_topic" : "unskip_topic", skip ? `Skipped topic '${day.topic}'` : `Un-skipped topic '${day.topic}'`);
		toast.info(skip ? "Topic skipped" : "Topic un-skipped", { description: skip ? "Hidden from your plan — every later day shifted forward to fill the gap." : "It's back, with every problem restored exactly as it was." });
	}, [
		days,
		startDate,
		commitSequence
	]);
	const skipDay = useCallback(async (dayNumber) => {
		const day = days.find((d) => d.dayNumber === dayNumber);
		if (!day) return;
		const next = setSkipped(days, dayNumber, true, startDate);
		await commitSequence(next, "skip_day", `Day ${dayNumber} ("${day.topic}") skipped`);
		toast.info(`Day ${dayNumber} skipped`, { description: "Every later day shifted forward to fill the gap. Find it under Topics → Skipped to bring it back." });
	}, [
		days,
		startDate,
		commitSequence
	]);
	const skipSection = useCallback(async (section, skip) => {
		const sectionDayNumbers = days.filter((d) => d.section === section && (skip ? !d.skipped && deriveStatus(d) !== "completed" : d.skipped)).map((d) => d.dayNumber);
		if (sectionDayNumbers.length === 0) {
			toast.error(skip ? "No pending days in this section to skip." : "No skipped days in this section to restore.");
			return;
		}
		const next = setSkipped(days, sectionDayNumbers, skip, startDate);
		await commitSequence(next, skip ? "skip_section" : "unskip_section", skip ? `Section "${section}" skipped` : `Section "${section}" un-skipped`);
		toast.info(skip ? "Section skipped" : "Section un-skipped", { description: skip ? `"${section}" is hidden and every later day shifted forward to fill the gap.` : `"${section}" is back, with every problem restored exactly as it was.` });
	}, [
		days,
		startDate,
		commitSequence
	]);
	const resetAll = useCallback(async () => {
		setLoading(true);
		try {
			const { days: d, meta } = await seedPlan(userId);
			setDays(d);
			setStartDate(meta.startDate);
			markSynced();
			await logEvent(userId, "reset", "All progress reset");
		} catch (e) {
			fail(e);
		} finally {
			setLoading(false);
		}
	}, [userId]);
	const insertRevisionDay = useCallback(async (afterDayNumber) => {
		const idx = days.findIndex((d) => d.dayNumber === afterDayNumber);
		if (idx === -1) return;
		const completedSections = Array.from(new Set(days.slice(0, idx + 1).filter((d) => d.problems.some((p) => p.done)).map((d) => d.section)));
		const pool = days.slice(0, idx + 1);
		const picks = completedSections.flatMap((section) => {
			return pool.filter((d) => d.section === section).flatMap((d) => d.problems).sort((a, b) => Number(b.isHard) - Number(a.isHard)).slice(0, 2).map((p) => ({
				...p,
				done: false
			}));
		});
		const revision = {
			id: `revision-${Date.now()}`,
			dayNumber: afterDayNumber + 1,
			date: addDays(days[idx].date, 1),
			section: "Revision",
			topic: "Revision Day — recap of completed sections",
			subtopics: completedSections.length ? completedSections : ["Nothing completed yet"],
			problems: picks.slice(0, 6),
			checklist: newChecklist(),
			status: "revision",
			notes: "",
			revisionNotes: "",
			skipped: false
		};
		const next = [
			...days.slice(0, idx + 1),
			revision,
			...days.slice(idx + 1)
		];
		const sequenced = renumber(next, startDate);
		await commitSequence(next, "revision_day", `Revision Day inserted on ${sequenced[idx + 1].date}; remaining days pushed forward by 1. New finish date: ${sequenced[sequenced.length - 1].date}`);
		toast.info("Revision Day added", { description: `Inserted on ${sequenced[idx + 1].date}. Remaining days pushed forward by 1 — new finish date ${sequenced[sequenced.length - 1].date}.` });
	}, [
		days,
		commitSequence,
		startDate
	]);
	useEffect(() => {
		if (loading || paused || checkedGap.current || days.length === 0) return;
		checkedGap.current = true;
		const today = todayIso();
		const past = days.filter((d) => d.date < today);
		const pending = past.filter((d) => !isDayComplete(d) && d.status !== "revision" && !d.skipped);
		let streak = 0;
		for (let i = past.length - 1; i >= 0; i--) if (!isDayComplete(past[i]) && past[i].status !== "revision" && !past[i].skipped) streak += 1;
		else if (past[i].skipped) continue;
		else break;
		const alreadyHasRecent = days[past.length]?.status === "revision" || past[past.length - 1]?.status === "revision";
		if ((streak >= 7 || pending.length >= 7) && past.length > 0 && !alreadyHasRecent) insertRevisionDay(past[past.length - 1].dayNumber);
	}, [
		loading,
		paused,
		days,
		insertRevisionDay
	]);
	/**
	* Upgrade 5: the user changed how many problems they want per day.
	* Completed days are untouched; every remaining problem is re-packed into
	* newly sized days and the calendar is re-derived from the sequence.
	*/
	const rebalance = useCallback(async (counts) => {
		const before = days.length;
		const next = rebalanceRemaining(days, counts, startDate, planOffset(days, startDate));
		setDays(next);
		const finish = next[next.length - 1]?.date ?? startDate;
		try {
			await saveSequence(userId, next);
			await logEvent(userId, "rebalance", `Daily pace set to ${counts.easy} easy / ${counts.medium} medium / ${counts.hard} hard — plan is now ${next.length} days (was ${before}), finishing ${finish}`);
			markSynced();
		} catch (e) {
			fail(e);
		}
		return {
			before,
			after: next.length,
			finish
		};
	}, [
		days,
		startDate,
		userId
	]);
	/** Upgrade 5c: pause / resume simply slides the calendar, never the sequence. */
	const shiftSchedule = useCallback(async (fromDate, byDays) => {
		const first = days.find((d) => d.date >= fromDate);
		if (!first || byDays === 0) return days[days.length - 1]?.date ?? fromDate;
		const next = shiftFrom(days, first.dayNumber, byDays);
		setDays(next);
		const finish = next[next.length - 1].date;
		try {
			await saveSequence(userId, next);
			await logEvent(userId, byDays > 0 ? "pause" : "resume", `Schedule shifted by ${byDays} day(s) from ${fromDate} — new finish date ${finish}`);
			markSynced();
		} catch (e) {
			fail(e);
		}
		return finish;
	}, [days, userId]);
	const borrowFromNext = useCallback(async (dayNumber) => {
		const idx = days.findIndex((d) => d.dayNumber === dayNumber);
		if (idx === -1) return;
		const nextIdx = days.findIndex((d, i) => i > idx && !d.skipped);
		if (nextIdx === -1) return;
		const nextDay = days[nextIdx];
		const borrowedIdx = nextDay.problems.findIndex((p) => !p.done);
		if (borrowedIdx === -1) return;
		const borrowed = nextDay.problems[borrowedIdx];
		const updatedToday = {
			...days[idx],
			problems: [...days[idx].problems, { ...borrowed }]
		};
		const updatedNext = {
			...nextDay,
			problems: nextDay.problems.filter((_, i) => i !== borrowedIdx)
		};
		const next = days.map((d, i) => {
			if (i === idx) return updatedToday;
			if (i === nextIdx) return updatedNext;
			return d;
		});
		await commitSequence(next, "borrow_problem", `Borrowed '${borrowed.name}' from Day ${nextDay.dayNumber} into Day ${dayNumber}`);
	}, [days, commitSequence]);
	const value = useMemo(() => ({
		days,
		loading,
		error,
		lastSynced,
		startDate,
		reload: () => void load(),
		updateDay,
		postpone,
		mergeTomorrow,
		unmerge,
		deleteProblem,
		deleteDay,
		toggleReview,
		skipTopic,
		skipDay,
		skipSection,
		resetAll,
		insertRevisionDay,
		rebalance,
		shiftSchedule,
		borrowFromNext,
		userId
	}), [
		days,
		loading,
		error,
		lastSynced,
		startDate,
		load,
		updateDay,
		postpone,
		mergeTomorrow,
		unmerge,
		deleteProblem,
		deleteDay,
		toggleReview,
		skipTopic,
		skipDay,
		skipSection,
		resetAll,
		insertRevisionDay,
		rebalance,
		shiftSchedule,
		borrowFromNext,
		userId
	]);
	return /* @__PURE__ */ jsx(Ctx.Provider, {
		value,
		children
	});
}
var usePlan = () => {
	const ctx = useContext(Ctx);
	if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
	return ctx;
};
//#endregion
export { usePlan as n, PlanProvider as t };

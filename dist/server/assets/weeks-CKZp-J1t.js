import { A as todayIso, _ as dayProgress, j as weekNumber, y as deriveStatus } from "./db-D4MFlxy2.js";
import { n as usePlan } from "./usePlan-B2otzvj4.js";
import { t as Progress } from "./progress-DOIEKRJF.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as ConfirmDialog } from "./ConfirmDialog-DGz2w5aA.js";
import { t as DayCard } from "./DayCard-Cn5PzzZN.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { useMemo } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Ban } from "lucide-react";
//#region src/routes/_authenticated/weeks.tsx?tsr-split=component
function WeeksPage() {
	const { days, loading, skipDay } = usePlan();
	const todayDate = todayIso();
	const weeks = useMemo(() => {
		const active = days.filter((d) => !d.skipped);
		const map = /* @__PURE__ */ new Map();
		active.forEach((d) => {
			const w = weekNumber(d.dayNumber);
			map.set(w, [...map.get(w) ?? [], d]);
		});
		return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([week, list]) => {
			const done = list.reduce((a, d) => a + dayProgress(d).done, 0);
			const total = list.reduce((a, d) => a + dayProgress(d).total, 0);
			return {
				week,
				list,
				done,
				total,
				pct: total ? Math.round(done / total * 100) : 0
			};
		}).filter((w) => w.list.length > 0);
	}, [days]);
	if (loading) return /* @__PURE__ */ jsx(Skeleton, { className: "h-96 w-full" });
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("h1", {
		className: "mb-4 text-2xl font-bold tracking-tight",
		children: "Week View"
	}), /* @__PURE__ */ jsx("div", {
		className: "space-y-6",
		children: weeks.map((w) => /* @__PURE__ */ jsxs("section", { children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-2 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("h2", {
					className: "font-display text-lg font-semibold",
					children: ["Week ", w.week]
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-xs tabular-nums text-muted-foreground",
					children: [
						w.done,
						"/",
						w.total,
						" problems"
					]
				})]
			}),
			/* @__PURE__ */ jsx(Progress, {
				value: w.pct,
				className: "mb-3 h-1.5"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: w.list.map((d) => {
					const canSkip = deriveStatus(d) !== "completed" && d.date > todayDate;
					return /* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ jsx(DayCard, { day: d }), canSkip && /* @__PURE__ */ jsx(ConfirmDialog, {
							trigger: /* @__PURE__ */ jsxs(Button, {
								size: "sm",
								variant: "outline",
								className: "h-7 w-full px-2 text-xs text-muted-foreground hover:text-destructive",
								children: [/* @__PURE__ */ jsx(Ban, {
									className: "mr-1 size-3",
									"aria-hidden": "true"
								}), " Skip Day"]
							}),
							title: `Skip Day ${d.dayNumber}?`,
							description: "This day's problems will cascade forward into upcoming days, and the plan will grow by one day.",
							confirmLabel: "Skip Day",
							destructive: true,
							onConfirm: () => skipDay(d.dayNumber)
						})]
					}, d.dayNumber);
				})
			})
		] }, w.week))
	})] });
}
//#endregion
export { WeeksPage as component };

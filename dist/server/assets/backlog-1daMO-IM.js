import { A as todayIso, S as isDayComplete } from "./db-D4MFlxy2.js";
import { n as usePlan } from "./usePlan-B2otzvj4.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as DayCard } from "./DayCard-Cn5PzzZN.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { useMemo } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/_authenticated/backlog.tsx?tsr-split=component
function BacklogPage() {
	const { days, loading, insertRevisionDay } = usePlan();
	const iso = todayIso();
	const pending = useMemo(() => days.filter((d) => d.date < iso && !isDayComplete(d) && d.status !== "revision" && !d.skipped), [days, iso]);
	if (loading) return /* @__PURE__ */ jsx(Skeleton, { className: "h-64 w-full" });
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		className: "mb-4 flex flex-wrap items-center justify-between gap-3",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "text-2xl font-bold tracking-tight",
			children: "Backlog"
		}), pending.length > 0 && /* @__PURE__ */ jsx(Button, {
			variant: "outline",
			onClick: () => void insertRevisionDay(pending[pending.length - 1].dayNumber),
			children: "Insert a Revision Day"
		})]
	}), pending.length === 0 ? /* @__PURE__ */ jsx("p", {
		className: "rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground",
		children: "Nothing pending — you are fully caught up. 🎉"
	}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("p", {
		className: "mb-3 text-sm text-muted-foreground",
		children: [
			pending.length,
			" day",
			pending.length > 1 ? "s" : "",
			" still open from before today."
		]
	}), /* @__PURE__ */ jsx("div", {
		className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
		children: pending.map((d) => /* @__PURE__ */ jsx(DayCard, { day: d }, d.dayNumber))
	})] })] });
}
//#endregion
export { BacklogPage as component };

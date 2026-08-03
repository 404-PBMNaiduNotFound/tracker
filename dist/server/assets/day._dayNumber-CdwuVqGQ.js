import { t as Route } from "./day._dayNumber-CYTeC9ZQ.js";
import { A as todayIso } from "./db-D4MFlxy2.js";
import { n as usePlan } from "./usePlan-B2otzvj4.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as DayDetail } from "./DayDetail-Bsv9JWsQ.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/_authenticated/day.$dayNumber.tsx?tsr-split=component
function DayPage() {
	const { dayNumber } = Route.useParams();
	const { days, loading } = usePlan();
	const day = days.find((d) => d.dayNumber === Number(dayNumber));
	if (loading) return /* @__PURE__ */ jsx(Skeleton, { className: "h-64 w-full" });
	if (!day) return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground",
			children: "That day is not part of your plan."
		}), /* @__PURE__ */ jsx(Link, {
			to: "/today",
			className: "text-sm font-medium text-primary underline",
			children: "Back to Today"
		})]
	});
	const isToday = day.date === todayIso();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("h1", {
			className: "mb-4 text-2xl font-bold tracking-tight",
			children: ["Day ", day.dayNumber]
		}),
		!isToday && /* @__PURE__ */ jsxs("p", {
			className: "mb-4 rounded-lg border border-dashed border-border bg-secondary/40 px-3 py-2 text-sm text-muted-foreground",
			children: [
				"View only — only today's problems can be checked off or rescheduled. Head to the",
				" ",
				/* @__PURE__ */ jsx(Link, {
					to: "/today",
					className: "font-medium text-primary underline",
					children: "Today"
				}),
				" ",
				"tab to make changes."
			]
		}),
		/* @__PURE__ */ jsx(DayDetail, {
			day,
			readOnly: !isToday
		})
	] });
}
//#endregion
export { DayPage as component };

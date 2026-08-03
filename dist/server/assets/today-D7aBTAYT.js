import { A as todayIso } from "./db-D4MFlxy2.js";
import { n as usePlan } from "./usePlan-B2otzvj4.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { n as TodayContestsSection } from "./ContestsSection-D2FoOQNM.js";
import { t as DayDetail } from "./DayDetail-Bsv9JWsQ.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/_authenticated/today.tsx?tsr-split=component
function TodayPage() {
	const { days, loading } = usePlan();
	const iso = todayIso();
	const day = days.find((d) => d.date === iso && !d.skipped) ?? days.find((d) => d.date >= iso && !d.skipped) ?? days.find((d) => !d.skipped) ?? days[0];
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("h1", {
			className: "mb-4 text-2xl font-bold tracking-tight",
			children: "Today"
		}),
		loading && /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-32 w-full" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-24 w-full" })]
		}),
		!loading && !day && /* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground",
			children: "No plan yet — it is being generated."
		}),
		!loading && day && /* @__PURE__ */ jsx(DayDetail, { day }),
		!loading && /* @__PURE__ */ jsx(TodayContestsSection, {})
	] });
}
//#endregion
export { TodayPage as component };

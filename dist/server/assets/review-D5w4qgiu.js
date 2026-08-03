import { A as todayIso, x as formatDate } from "./db-D4MFlxy2.js";
import { n as usePlan } from "./usePlan-B2otzvj4.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as ProblemRow } from "./ProblemRow-C0KYl99j.js";
import { useMemo } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { BookmarkCheck } from "lucide-react";
//#region src/routes/_authenticated/review.tsx?tsr-split=component
function ReviewPage() {
	const { days, loading, updateDay, toggleReview } = usePlan();
	const flagged = useMemo(() => days.flatMap((d) => d.problems.filter((p) => p.forReview).map((p) => ({
		day: d,
		problem: p
	}))).sort((a, b) => a.day.dayNumber - b.day.dayNumber), [days]);
	if (loading) return /* @__PURE__ */ jsx(Skeleton, { className: "h-64 w-full" });
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("h1", {
			className: "mb-1 text-2xl font-bold tracking-tight",
			children: "Review"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-6 text-sm text-muted-foreground",
			children: "Problems you flagged for another look, gathered here from every day. Tap the bookmark on a problem in Today to add or remove it."
		}),
		flagged.length === 0 ? /* @__PURE__ */ jsxs("p", {
			className: "flex items-center gap-2 rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ jsx(BookmarkCheck, {
				className: "size-4 shrink-0",
				"aria-hidden": "true"
			}), "Nothing flagged yet — use the bookmark button on any problem in Today to send it here."]
		}) : /* @__PURE__ */ jsx("ul", {
			className: "space-y-3",
			children: flagged.map(({ day, problem }) => {
				const isToday = day.date === todayIso();
				return /* @__PURE__ */ jsxs("li", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-xs uppercase tracking-wide text-muted-foreground",
						children: [
							"Day ",
							day.dayNumber,
							" · ",
							formatDate(day.date),
							" · ",
							day.topic,
							!isToday && " · view only"
						]
					}), /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx(ProblemRow, {
						problem,
						readOnly: !isToday,
						onToggle: isToday ? (v) => void updateDay(day.dayNumber, (d) => ({
							...d,
							problems: d.problems.map((x) => x.name === problem.name ? {
								...x,
								done: v
							} : x)
						})) : void 0,
						onReview: () => void toggleReview(day.dayNumber, problem.name, !problem.forReview)
					}) })]
				}, `${day.dayNumber}-${problem.name}`);
			})
		})
	] });
}
//#endregion
export { ReviewPage as component };

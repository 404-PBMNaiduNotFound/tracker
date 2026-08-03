import { _ as dayProgress, m as STATUS_META, x as formatDate, y as deriveStatus } from "./db-D4MFlxy2.js";
import { n as usePlan } from "./usePlan-B2otzvj4.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Progress } from "./progress-DOIEKRJF.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as ConfirmDialog } from "./ConfirmDialog-DGz2w5aA.js";
import { t as HoverHint } from "./HoverHint-BmTDH9bp.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Ban, Undo2 } from "lucide-react";
//#region src/components/DayCard.tsx
function DayCard({ day, showSkipAction }) {
	const { skipTopic } = usePlan();
	const { done, total, pct } = dayProgress(day);
	const status = deriveStatus(day);
	const meta = STATUS_META[status];
	return /* @__PURE__ */ jsxs("div", {
		className: cn("relative rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50", day.skipped && "opacity-60"),
		children: [/* @__PURE__ */ jsxs(Link, {
			to: "/day/$dayNumber",
			params: { dayNumber: String(day.dayNumber) },
			className: "block",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "text-xs uppercase tracking-wide text-muted-foreground",
						children: [
							"Day ",
							day.dayNumber,
							" · ",
							formatDate(day.date)
						]
					}), /* @__PURE__ */ jsxs("span", {
						className: `text-xs font-medium ${meta.className}`,
						children: [
							meta.icon,
							" ",
							meta.label
						]
					})]
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "mt-1 font-display text-base font-semibold",
					children: day.topic
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-0.5 line-clamp-1 text-xs text-muted-foreground",
					children: day.subtopics.join(" · ") || "No subtopics"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 flex items-center gap-3",
					children: [/* @__PURE__ */ jsx(Progress, {
						value: pct,
						className: "h-1.5"
					}), /* @__PURE__ */ jsxs("span", {
						className: "shrink-0 text-xs tabular-nums text-muted-foreground",
						children: [
							done,
							"/",
							total
						]
					})]
				})
			]
		}), showSkipAction && /* @__PURE__ */ jsx("div", {
			className: "mt-3 border-t border-border pt-2",
			children: day.skipped ? /* @__PURE__ */ jsx(HoverHint, {
				hint: "Restores this topic and its problems back into your plan",
				children: /* @__PURE__ */ jsxs(Button, {
					size: "sm",
					variant: "ghost",
					className: "h-7 px-2 text-xs",
					onClick: (e) => {
						e.preventDefault();
						skipTopic(day.dayNumber, false);
					},
					children: [/* @__PURE__ */ jsx(Undo2, {
						className: "mr-1 size-3",
						"aria-hidden": "true"
					}), " Un-skip"]
				})
			}) : /* @__PURE__ */ jsx(HoverHint, {
				hint: "Permanently excludes this topic's problems from your plan",
				children: /* @__PURE__ */ jsx(ConfirmDialog, {
					trigger: /* @__PURE__ */ jsxs(Button, {
						size: "sm",
						variant: "ghost",
						className: "h-7 px-2 text-xs text-muted-foreground hover:text-destructive",
						children: [/* @__PURE__ */ jsx(Ban, {
							className: "mr-1 size-3",
							"aria-hidden": "true"
						}), " Skip"]
					}),
					title: "Skip this topic?",
					description: "This topic's problems will be permanently excluded from your preparation and won't count toward your remaining totals. You can only do this because you're confident you don't need it.",
					confirmLabel: "Skip topic",
					destructive: true,
					onConfirm: () => skipTopic(day.dayNumber, true)
				})
			})
		})]
	});
}
//#endregion
export { DayCard as t };

import { _ as dayProgress } from "./db-D4MFlxy2.js";
import { n as usePlan } from "./usePlan-B2otzvj4.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Progress } from "./progress-DOIEKRJF.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as DayCard } from "./DayCard-Cn5PzzZN.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import * as React from "react";
import { useMemo } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Ban, ChevronDown, Undo2 } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
//#region src/components/ui/accordion.tsx
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, {
	className: "flex",
	children: /* @__PURE__ */ jsxs(AccordionPrimitive.Trigger, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Content, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ jsx("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
//#endregion
//#region src/routes/_authenticated/topics.tsx?tsr-split=component
function TopicsPage() {
	const { days, loading, skipSection, skipTopic } = usePlan();
	const sections = useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		days.forEach((d) => map.set(d.section, [...map.get(d.section) ?? [], d]));
		return [...map.entries()].map(([section, allDays]) => {
			const active = allDays.filter((d) => !d.skipped);
			const done = active.reduce((a, d) => a + dayProgress(d).done, 0);
			const total = active.reduce((a, d) => a + dayProgress(d).total, 0);
			const allSkipped = allDays.every((d) => d.skipped);
			return {
				section,
				list: active,
				done,
				total,
				pct: total ? Math.round(done / total * 100) : 0,
				allSkipped
			};
		});
	}, [days]);
	const skippedDays = useMemo(() => days.filter((d) => d.skipped).sort((a, b) => a.dayNumber - b.dayNumber), [days]);
	if (loading) return /* @__PURE__ */ jsx(Skeleton, { className: "h-96 w-full" });
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("h1", {
		className: "mb-4 text-2xl font-bold tracking-tight",
		children: "Topic View"
	}), /* @__PURE__ */ jsxs(Accordion, {
		type: "multiple",
		className: "space-y-2",
		children: [sections.map((s) => /* @__PURE__ */ jsxs(AccordionItem, {
			value: s.section,
			className: "rounded-xl border border-border bg-card px-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex w-full items-center gap-2 pt-1",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "min-w-0 flex-1",
							children: /* @__PURE__ */ jsx(AccordionTrigger, {
								className: "hover:no-underline",
								children: /* @__PURE__ */ jsx("span", {
									className: "truncate font-display font-semibold",
									children: s.section
								})
							})
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "shrink-0 text-xs tabular-nums text-muted-foreground",
							children: [
								s.done,
								"/",
								s.total,
								" · ",
								s.list.length,
								" day",
								s.list.length === 1 ? "" : "s"
							]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "flex shrink-0 items-center gap-1 rounded border border-border px-2 py-0.5 text-xs text-muted-foreground hover:text-destructive",
							onClick: (e) => {
								e.stopPropagation();
								skipSection(s.section, !s.allSkipped);
							},
							children: s.allSkipped ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Undo2, {
								className: "size-3",
								"aria-hidden": "true"
							}), " Un-skip"] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Ban, {
								className: "size-3",
								"aria-hidden": "true"
							}), " Skip Section"] })
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "pb-3 pt-2",
					children: /* @__PURE__ */ jsx(Progress, {
						value: s.pct,
						className: "h-1.5"
					})
				}),
				/* @__PURE__ */ jsx(AccordionContent, { children: s.list.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "pb-4 text-sm text-muted-foreground",
					children: "Every day in this section is skipped — see the Skipped section below."
				}) : /* @__PURE__ */ jsx("div", {
					className: "grid gap-3 pb-2 sm:grid-cols-2",
					children: s.list.map((d) => /* @__PURE__ */ jsx(DayCard, {
						day: d,
						showSkipAction: true
					}, d.dayNumber))
				}) })
			]
		}, s.section)), skippedDays.length > 0 && /* @__PURE__ */ jsxs(AccordionItem, {
			value: "__skipped__",
			className: "rounded-xl border border-dashed border-border bg-card/60 px-4",
			children: [/* @__PURE__ */ jsx(AccordionTrigger, {
				className: "hover:no-underline",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex w-full items-baseline justify-between gap-3 text-left",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-display font-semibold text-muted-foreground",
						children: "Skipped"
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-xs tabular-nums text-muted-foreground",
						children: [
							skippedDays.length,
							" day",
							skippedDays.length === 1 ? "" : "s"
						]
					})]
				})
			}), /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx("div", {
				className: "grid gap-3 pb-2 sm:grid-cols-2",
				children: skippedDays.map((d) => {
					const { done, total } = dayProgress(d);
					return /* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border border-dashed border-border bg-secondary/40 p-3",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-xs uppercase tracking-wide text-muted-foreground",
										children: d.section
									}), /* @__PURE__ */ jsx("h4", {
										className: "mt-0.5 truncate text-sm font-semibold",
										children: d.topic
									})]
								}), total > 0 && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0 text-xs tabular-nums text-muted-foreground",
									children: [
										done,
										"/",
										total
									]
								})]
							}),
							d.subtopics.length > 0 && /* @__PURE__ */ jsx("p", {
								className: "mt-1 line-clamp-1 text-xs text-muted-foreground",
								children: d.subtopics.join(" · ")
							}),
							/* @__PURE__ */ jsxs(Button, {
								size: "sm",
								variant: "ghost",
								className: "mt-2 h-7 px-2 text-xs",
								onClick: () => void skipTopic(d.dayNumber, false),
								children: [/* @__PURE__ */ jsx(Undo2, {
									className: "mr-1 size-3",
									"aria-hidden": "true"
								}), " Un-skip"]
							})
						]
					}, d.id);
				})
			}) })]
		})]
	})] });
}
//#endregion
export { TopicsPage as component };

import { A as todayIso, _ as dayProgress, g as addDays, j as weekNumber, m as STATUS_META, x as formatDate, y as deriveStatus } from "./db-D4MFlxy2.js";
import { n as usePlan } from "./usePlan-B2otzvj4.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Progress } from "./progress-DOIEKRJF.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as ConfirmDialog } from "./ConfirmDialog-DGz2w5aA.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as HoverHint } from "./HoverHint-BmTDH9bp.js";
import { t as Checkbox } from "./checkbox-kt6FvQcE.js";
import { t as ProblemRow } from "./ProblemRow-C0KYl99j.js";
import * as React from "react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Sparkles } from "lucide-react";
//#region src/components/ui/textarea.tsx
var Textarea = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/components/DayDetail.tsx
/** Builds a single prompt covering today's topic and every problem on it, for a one-click ChatGPT explanation. */
function buildChatGptPrompt(day) {
	const problemLines = day.problems.map((p, i) => `${i + 1}. ${p.name} — ${p.difficulty} (${p.platform})`);
	const prompt = [
		`I'm working through "${day.topic}" (${day.section}) in a DSA prep plan.`,
		day.subtopics.length ? `Subtopics: ${day.subtopics.join(", ")}.` : null,
		problemLines.length ? "Here are today's problems:" : null,
		...problemLines,
		"",
		"For each problem, explain the core idea and method, the intuition behind that approach, and a step-by-step walkthrough of an optimal solution with its time and space complexity. Keep it clear and easy to follow."
	].filter(Boolean).join("\n");
	if (prompt.length <= 1800 || problemLines.length === 0) return prompt;
	const keep = Math.max(0, problemLines.length - 1);
	return buildChatGptPrompt({
		...day,
		problems: day.problems.slice(0, keep)
	});
}
function chatGptExplainUrl(day) {
	return `https://chatgpt.com/?q=${encodeURIComponent(buildChatGptPrompt(day))}`;
}
function DayDetail({ day, readOnly }) {
	const { days, updateDay, postpone, mergeTomorrow, unmerge, deleteProblem, deleteDay, toggleReview, borrowFromNext } = usePlan();
	const { done, total, pct } = dayProgress(day);
	const status = deriveStatus(day);
	const [newDate, setNewDate] = useState(addDays(day.date, 1));
	const activeDays = days.filter((d) => !d.skipped);
	const tomorrow = activeDays.find((d) => d.dayNumber === day.dayNumber + 1);
	const remaining = activeDays.length - day.dayNumber;
	const lastActiveDay = activeDays[activeDays.length - 1];
	const gap = Math.max(1, Math.round(((/* @__PURE__ */ new Date(`${newDate}T00:00:00Z`)).getTime() - (/* @__PURE__ */ new Date(`${day.date}T00:00:00Z`)).getTime()) / 864e5));
	const future = day.date > todayIso();
	const locked = readOnly ?? false;
	const anyDone = day.problems.some((p) => p.done);
	return /* @__PURE__ */ jsxs("article", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "rounded-xl border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs uppercase tracking-wide text-muted-foreground",
								children: [
									"Day ",
									day.dayNumber,
									" · Week ",
									weekNumber(day.dayNumber),
									" · ",
									formatDate(day.date),
									future && " · upcoming"
								]
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mt-1 text-xl font-semibold",
								children: day.topic
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: day.section
							})
						] }), /* @__PURE__ */ jsxs("span", {
							className: `text-sm font-semibold ${STATUS_META[status].className}`,
							children: [
								STATUS_META[status].icon,
								" ",
								STATUS_META[status].label
							]
						})]
					}),
					day.subtopics.length > 0 && /* @__PURE__ */ jsx("ul", {
						className: "mt-3 flex flex-wrap gap-2",
						children: day.subtopics.map((s) => /* @__PURE__ */ jsx("li", {
							className: "rounded-full bg-secondary px-3 py-1 text-xs",
							children: s
						}, s))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4 space-y-1.5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: "Problems"
							}), /* @__PURE__ */ jsxs("span", {
								className: "font-semibold",
								children: [
									done,
									"/",
									total,
									" done · ",
									pct,
									"%"
								]
							})]
						}), /* @__PURE__ */ jsx(Progress, {
							value: pct,
							"aria-label": `${pct}% of today's problems complete`
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				"aria-label": "Problems",
				className: "space-y-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-sm font-semibold",
						children: "Problems"
					}), total > 0 && /* @__PURE__ */ jsx(HoverHint, {
						hint: "Opens ChatGPT with a ready-made prompt covering today's topic and problems",
						children: /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							className: "h-7 gap-1.5 px-2 text-xs",
							children: /* @__PURE__ */ jsxs("a", {
								href: chatGptExplainUrl(day),
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ jsx(Sparkles, {
									className: "size-3.5",
									"aria-hidden": "true"
								}), "Explain on ChatGPT"]
							})
						})
					})]
				}), total === 0 ? /* @__PURE__ */ jsx("p", {
					className: "rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground",
					children: "No problems on this day — it is a buffer date."
				}) : /* @__PURE__ */ jsx("ul", {
					className: "space-y-2",
					children: day.problems.map((p) => /* @__PURE__ */ jsx(ProblemRow, {
						problem: p,
						readOnly: locked,
						onToggle: (v) => void updateDay(day.dayNumber, (d) => ({
							...d,
							problems: d.problems.map((x) => x.name === p.name ? {
								...x,
								done: v
							} : x)
						})),
						onDelete: locked ? void 0 : () => void deleteProblem(day.dayNumber, p.name),
						onReview: locked ? void 0 : () => void toggleReview(day.dayNumber, p.name, !p.forReview)
					}, p.name))
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				"aria-label": "Daily checklist",
				className: "rounded-xl border border-border bg-card p-4",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "mb-3 text-sm font-semibold",
					children: "Completion checklist"
				}), /* @__PURE__ */ jsx("ul", {
					className: "grid gap-2 sm:grid-cols-2",
					children: day.checklist.map((c, i) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Checkbox, {
							id: `c-${day.dayNumber}-${i}`,
							checked: c.done,
							disabled: locked,
							className: "size-5",
							onCheckedChange: (v) => void updateDay(day.dayNumber, (d) => ({
								...d,
								checklist: d.checklist.map((x, xi) => xi === i ? {
									...x,
									done: Boolean(v)
								} : x)
							}))
						}), /* @__PURE__ */ jsx(Label, {
							htmlFor: `c-${day.dayNumber}-${i}`,
							className: "cursor-pointer text-sm font-normal",
							children: c.label
						})]
					}, c.label))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: `notes-${day.dayNumber}`,
						children: "Notes"
					}), /* @__PURE__ */ jsx(Textarea, {
						id: `notes-${day.dayNumber}`,
						rows: 4,
						defaultValue: day.notes,
						disabled: locked,
						onBlur: (e) => void updateDay(day.dayNumber, (d) => ({
							...d,
							notes: e.target.value
						}))
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: `rev-${day.dayNumber}`,
						children: "Revision reminders"
					}), /* @__PURE__ */ jsx(Textarea, {
						id: `rev-${day.dayNumber}`,
						rows: 4,
						defaultValue: day.revisionNotes,
						disabled: locked,
						onBlur: (e) => void updateDay(day.dayNumber, (d) => ({
							...d,
							revisionNotes: e.target.value
						}))
					})]
				})]
			}),
			!locked && /* @__PURE__ */ jsxs("section", {
				"aria-label": "Schedule actions",
				className: "flex flex-wrap gap-2",
				children: [
					anyDone ? /* @__PURE__ */ jsx(HoverHint, {
						hint: "Postpone is locked because at least one problem today is already marked done",
						children: /* @__PURE__ */ jsx(Button, {
							variant: "secondary",
							disabled: true,
							children: "Postpone this day"
						})
					}) : /* @__PURE__ */ jsx(HoverHint, {
						hint: "Push this day's date forward — the topic order stays the same",
						children: /* @__PURE__ */ jsx(ConfirmDialog, {
							trigger: /* @__PURE__ */ jsx(Button, {
								variant: "secondary",
								children: "Postpone this day"
							}),
							title: "Postpone this day",
							description: "The topic order stays intact — only the calendar moves.",
							confirmLabel: "Postpone",
							preview: /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "new-date",
										children: "New date"
									}), /* @__PURE__ */ jsx(Input, {
										id: "new-date",
										type: "date",
										value: newDate,
										min: addDays(day.date, 1),
										onChange: (e) => setNewDate(e.target.value)
									})]
								}), /* @__PURE__ */ jsxs("p", { children: [
									"This pushes ",
									remaining,
									" remaining day",
									remaining === 1 ? "" : "s",
									" forward by",
									" ",
									gap,
									" day",
									gap === 1 ? "" : "s",
									". New end date:",
									" ",
									/* @__PURE__ */ jsx("strong", { children: lastActiveDay ? formatDate(addDays(lastActiveDay.date, gap)) : "—" }),
									"."
								] })]
							}),
							onConfirm: () => postpone(day.dayNumber, newDate)
						})
					}),
					tomorrow && /* @__PURE__ */ jsx(HoverHint, {
						hint: "Pulls tomorrow's topic and problems into today, then shortens the plan by one day",
						children: /* @__PURE__ */ jsx(ConfirmDialog, {
							trigger: /* @__PURE__ */ jsx(Button, {
								variant: "secondary",
								children: "Merge tomorrow into today"
							}),
							title: "Pull tomorrow's topic into today",
							confirmLabel: "Merge",
							preview: /* @__PURE__ */ jsxs("p", { children: [
								"\"",
								tomorrow.topic,
								"\" (",
								tomorrow.problems.length,
								" problems) is merged into day",
								" ",
								day.dayNumber,
								". Every later day collapses forward by one — the plan shortens to",
								" ",
								/* @__PURE__ */ jsxs("strong", { children: [activeDays.length - 1, " days"] }),
								", new end date",
								" ",
								/* @__PURE__ */ jsx("strong", { children: formatDate(activeDays[activeDays.length - 2]?.date ?? day.date) }),
								"."
							] }),
							onConfirm: () => mergeTomorrow(day.dayNumber)
						})
					}),
					day.status === "merged" && day.mergeSnapshot && /* @__PURE__ */ jsx(HoverHint, {
						hint: `Split this day back into "${day.mergeSnapshot.baseTopic}" and "${day.mergeSnapshot.absorbedTopic}" — plan extends by 1 day`,
						children: /* @__PURE__ */ jsx(ConfirmDialog, {
							trigger: /* @__PURE__ */ jsx(Button, {
								variant: "secondary",
								children: "Unmerge"
							}),
							title: "Unmerge this day",
							confirmLabel: "Unmerge",
							preview: /* @__PURE__ */ jsxs("p", { children: [
								"Splits today back into two separate days: ",
								/* @__PURE__ */ jsxs("strong", { children: [
									"\"",
									day.mergeSnapshot.baseTopic,
									"\""
								] }),
								" stays on ",
								formatDate(day.date),
								", and ",
								/* @__PURE__ */ jsxs("strong", { children: [
									"\"",
									day.mergeSnapshot.absorbedTopic,
									"\""
								] }),
								" is restored as the next day. Every later day shifts forward by 1 — plan extends by 1 day."
							] }),
							onConfirm: () => unmerge(day.dayNumber)
						})
					}),
					(() => {
						const nextActive = activeDays.find((d) => d.dayNumber === day.dayNumber + 1);
						const nextHasUndone = nextActive?.problems.some((p) => !p.done) ?? false;
						if (!nextActive || !nextHasUndone) return null;
						const borrowedProblem = nextActive.problems.find((p) => !p.done);
						return /* @__PURE__ */ jsx(HoverHint, {
							hint: `Pull "${borrowedProblem?.name}" from Day ${nextActive.dayNumber} into today — next day keeps its remaining problems`,
							children: /* @__PURE__ */ jsx(ConfirmDialog, {
								trigger: /* @__PURE__ */ jsx(Button, {
									variant: "secondary",
									children: "Borrow a problem"
								}),
								title: "Borrow a problem from tomorrow",
								confirmLabel: "Borrow",
								preview: /* @__PURE__ */ jsxs("p", { children: [
									"Moves ",
									/* @__PURE__ */ jsxs("strong", { children: [
										"\"",
										borrowedProblem?.name,
										"\""
									] }),
									" from Day ",
									nextActive.dayNumber,
									" into today. Day ",
									nextActive.dayNumber,
									" will have ",
									nextActive.problems.filter((p) => !p.done).length - 1,
									" undone problem",
									nextActive.problems.filter((p) => !p.done).length - 1 === 1 ? "" : "s",
									" remaining — no dates shift."
								] }),
								onConfirm: () => borrowFromNext(day.dayNumber)
							})
						});
					})(),
					anyDone ? /* @__PURE__ */ jsx(HoverHint, {
						hint: "Delete is locked because at least one problem today is already marked done",
						children: /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							className: "text-destructive",
							disabled: true,
							children: "Delete this day"
						})
					}) : /* @__PURE__ */ jsx(HoverHint, {
						hint: "Removes this day and its problems entirely, then shifts every later day back by one",
						children: /* @__PURE__ */ jsx(ConfirmDialog, {
							trigger: /* @__PURE__ */ jsx(Button, {
								variant: "ghost",
								className: "text-destructive",
								children: "Delete this day"
							}),
							title: "Delete this day",
							confirmLabel: "Shrink schedule by 1 day",
							destructive: true,
							preview: /* @__PURE__ */ jsxs("p", { children: [
								"Removes day ",
								day.dayNumber,
								" and its ",
								day.problems.length,
								" problems, then shifts every later day forward by one date."
							] }),
							onConfirm: () => deleteDay(day.dayNumber, "shrink")
						})
					})
				]
			})
		]
	});
}
//#endregion
export { DayDetail as t };

import { t as ALL_PROBLEMS } from "./problems-B_djWpsm.js";
import { A as todayIso, S as isDayComplete, _ as dayProgress, n as listEvents, x as formatDate } from "./db-D4MFlxy2.js";
import { n as usePlan } from "./usePlan-B2otzvj4.js";
import { t as Progress } from "./progress-DOIEKRJF.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as ConfirmDialog } from "./ConfirmDialog-DGz2w5aA.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as useProblemCompletions } from "./useProblemCompletions-DE_Q1IWd.js";
import { a as solvedTrend, i as longestStreak, n as currentStreak, o as weeklyStats, r as difficultySplit, t as computeBadges } from "./gamification-BAEQMkA3.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region src/routes/_authenticated/progress.tsx?tsr-split=component
function Stat({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 font-display text-2xl font-semibold tabular-nums",
			children: value
		})]
	});
}
function ProgressPage() {
	const { days, loading, userId, resetAll } = usePlan();
	const { completed: pbCompleted } = useProblemCompletions();
	const [events, setEvents] = useState([]);
	useEffect(() => {
		if (!userId) return;
		listEvents(userId).then((rows) => setEvents(rows));
	}, [userId, days]);
	const stats = useMemo(() => {
		const counted = days.filter((d) => !d.skipped);
		const total = counted.reduce((a, d) => a + dayProgress(d).total, 0);
		const done = counted.reduce((a, d) => a + dayProgress(d).done, 0);
		const completedDays = counted.filter(isDayComplete).length;
		const iso = todayIso();
		let streak = 0;
		for (const d of [...counted].filter((d) => d.date <= iso).reverse()) if (isDayComplete(d)) streak += 1;
		else break;
		const finish = days.length ? days[days.length - 1].date : "";
		const pbDone = pbCompleted.size;
		const pbTotal = ALL_PROBLEMS.length;
		const combinedDone = done + pbDone;
		const combinedTotal = total + pbTotal;
		return {
			total,
			done,
			pct: total ? Math.round(done / total * 100) : 0,
			completedDays,
			countedDays: counted.length,
			streak,
			finish,
			pbDone,
			pbTotal,
			combinedDone,
			combinedTotal,
			combinedPct: combinedTotal ? Math.round(combinedDone / combinedTotal * 100) : 0
		};
	}, [days, pbCompleted]);
	const sections = useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		days.filter((d) => !d.skipped).forEach((d) => {
			const cur = map.get(d.section) ?? {
				done: 0,
				total: 0
			};
			const p = dayProgress(d);
			map.set(d.section, {
				done: cur.done + p.done,
				total: cur.total + p.total
			});
		});
		return [...map.entries()];
	}, [days]);
	const streaks = useMemo(() => ({
		current: currentStreak(days),
		longest: longestStreak(days)
	}), [days]);
	const week = useMemo(() => weeklyStats(days), [days]);
	const trend = useMemo(() => {
		const pbDoneTotal = pbCompleted.size;
		const pbTotalCount = ALL_PROBLEMS.length;
		return solvedTrend(days).map((row) => ({
			...row,
			pbCompleted: pbDoneTotal,
			pbTotal: pbTotalCount
		}));
	}, [days, pbCompleted]);
	const split = useMemo(() => {
		const base = difficultySplit(days);
		const pbByDiff = {};
		ALL_PROBLEMS.forEach((p) => {
			if (!pbByDiff[p.difficulty]) pbByDiff[p.difficulty] = {
				done: 0,
				remaining: 0
			};
			if (pbCompleted.has(p.name)) pbByDiff[p.difficulty].done += 1;
			else pbByDiff[p.difficulty].remaining += 1;
		});
		return base.map((row) => ({
			difficulty: row.difficulty,
			done: row.done + (pbByDiff[row.difficulty]?.done ?? 0),
			remaining: row.remaining + (pbByDiff[row.difficulty]?.remaining ?? 0)
		}));
	}, [days, pbCompleted]);
	const badges = useMemo(() => computeBadges(days), [days]);
	const earned = badges.filter((b) => b.earned);
	if (loading) return /* @__PURE__ */ jsx(Skeleton, { className: "h-96 w-full" });
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("h1", {
			className: "mb-4 text-2xl font-bold tracking-tight",
			children: "Progress"
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mb-6 rounded-xl border border-border bg-card p-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-2 flex items-baseline justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-display font-semibold",
					children: "Overall (Plan + Problems tab)"
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-sm tabular-nums text-muted-foreground",
					children: [
						stats.combinedDone,
						"/",
						stats.combinedTotal,
						" problems · ",
						stats.combinedPct,
						"%"
					]
				})]
			}), /* @__PURE__ */ jsx(Progress, {
				value: stats.combinedPct,
				className: "h-2"
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ jsx(Stat, {
					label: "Days completed",
					value: `${stats.completedDays}/${stats.countedDays}`
				}),
				/* @__PURE__ */ jsx(Stat, {
					label: "Current streak",
					value: `${streaks.current} day${streaks.current === 1 ? "" : "s"}`
				}),
				/* @__PURE__ */ jsx(Stat, {
					label: "Problems left",
					value: String(stats.combinedTotal - stats.combinedDone)
				}),
				/* @__PURE__ */ jsx(Stat, {
					label: "Problems tab done",
					value: `${stats.pbDone}/${stats.pbTotal}`
				}),
				/* @__PURE__ */ jsx(Stat, {
					label: "Finish date",
					value: stats.finish ? formatDate(stats.finish) : "—"
				})
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ jsx(Stat, {
					label: "This week solved",
					value: String(week.problemsSolved + stats.pbDone)
				}),
				/* @__PURE__ */ jsx(Stat, {
					label: "Time invested (7d)",
					value: `${Math.round(week.minutesSpent / 60)}h`
				}),
				/* @__PURE__ */ jsx(Stat, {
					label: "Active days (7d)",
					value: `${week.daysActive}/7`
				}),
				/* @__PURE__ */ jsx(Stat, {
					label: "Longest streak",
					value: `${streaks.longest} days`
				})
			]
		}),
		/* @__PURE__ */ jsx("h2", {
			className: "mb-3 font-display text-lg font-semibold",
			children: "Solving trend"
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mb-8 h-64 rounded-xl border border-border bg-card p-4",
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ jsxs(AreaChart, {
					data: trend,
					margin: {
						left: -20,
						right: 8,
						top: 8
					},
					children: [
						/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsxs("linearGradient", {
							id: "solvedFill",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ jsx("stop", {
								offset: "0%",
								stopColor: "var(--color-primary)",
								stopOpacity: .6
							}), /* @__PURE__ */ jsx("stop", {
								offset: "100%",
								stopColor: "var(--color-primary)",
								stopOpacity: .05
							})]
						}), /* @__PURE__ */ jsxs("linearGradient", {
							id: "pbFill",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ jsx("stop", {
								offset: "0%",
								stopColor: "#22c55e",
								stopOpacity: .5
							}), /* @__PURE__ */ jsx("stop", {
								offset: "100%",
								stopColor: "#22c55e",
								stopOpacity: .05
							})]
						})] }),
						/* @__PURE__ */ jsx(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--color-border)"
						}),
						/* @__PURE__ */ jsx(XAxis, {
							dataKey: "day",
							tick: { fontSize: 11 },
							stroke: "var(--color-muted-foreground)"
						}),
						/* @__PURE__ */ jsx(YAxis, {
							allowDecimals: false,
							tick: { fontSize: 11 },
							stroke: "var(--color-muted-foreground)"
						}),
						/* @__PURE__ */ jsx(Tooltip, {
							contentStyle: {
								background: "var(--color-popover)",
								border: "1px solid var(--color-border)",
								borderRadius: 8,
								color: "var(--color-popover-foreground)",
								fontSize: 12
							},
							formatter: (value, name) => {
								if (name === "Plan solved") return [`${value} problems`, "Plan (day)"];
								if (name === "Problems tab") return [`${value} / ${trend[0]?.pbTotal ?? 0} total`, "Problems tab (all-time)"];
								return [value, name];
							}
						}),
						/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
						/* @__PURE__ */ jsx(Area, {
							type: "monotone",
							dataKey: "solved",
							name: "Plan solved",
							stroke: "var(--color-primary)",
							fill: "url(#solvedFill)",
							strokeWidth: 2
						}),
						/* @__PURE__ */ jsx(Area, {
							type: "monotone",
							dataKey: "pbCompleted",
							name: "Problems tab",
							stroke: "#22c55e",
							fill: "url(#pbFill)",
							strokeWidth: 2,
							strokeDasharray: "5 3"
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx("h2", {
			className: "mb-3 font-display text-lg font-semibold",
			children: "Difficulty split"
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mb-8 h-64 rounded-xl border border-border bg-card p-4",
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ jsxs(BarChart, {
					data: split,
					margin: {
						left: -20,
						right: 8,
						top: 8
					},
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--color-border)"
						}),
						/* @__PURE__ */ jsx(XAxis, {
							dataKey: "difficulty",
							tick: { fontSize: 11 },
							stroke: "var(--color-muted-foreground)"
						}),
						/* @__PURE__ */ jsx(YAxis, {
							allowDecimals: false,
							tick: { fontSize: 11 },
							stroke: "var(--color-muted-foreground)"
						}),
						/* @__PURE__ */ jsx(Tooltip, { contentStyle: {
							background: "var(--color-popover)",
							border: "1px solid var(--color-border)",
							borderRadius: 8,
							color: "var(--color-popover-foreground)"
						} }),
						/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "done",
							name: "Done",
							stackId: "a",
							fill: "var(--color-success)",
							radius: [
								0,
								0,
								4,
								4
							]
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "remaining",
							name: "Remaining",
							stackId: "a",
							fill: "var(--color-muted)",
							radius: [
								4,
								4,
								0,
								0
							]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsxs("h2", {
			className: "mb-3 font-display text-lg font-semibold",
			children: ["Badges ", /* @__PURE__ */ jsxs("span", {
				className: "text-sm font-normal text-muted-foreground",
				children: [
					"(",
					earned.length,
					"/",
					badges.length,
					")"
				]
			})]
		}),
		/* @__PURE__ */ jsx("ul", {
			className: "mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3",
			children: badges.map((b, i) => /* @__PURE__ */ jsxs("li", {
				style: { "--i": i },
				className: b.earned ? "stagger-item rounded-lg border border-primary/40 bg-primary/10 p-3" : "stagger-item rounded-lg border border-border bg-card p-3 opacity-60",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-semibold",
					children: b.label
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: b.description
				})]
			}, b.code))
		}),
		/* @__PURE__ */ jsx("h2", {
			className: "mb-3 font-display text-lg font-semibold",
			children: "By section"
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mb-8 space-y-3",
			children: sections.map(([section, s]) => /* @__PURE__ */ jsxs("div", {
				className: "rounded-lg border border-border bg-card p-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-1.5 flex items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-sm font-medium",
						children: section
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-xs tabular-nums text-muted-foreground",
						children: [
							s.done,
							"/",
							s.total
						]
					})]
				}), /* @__PURE__ */ jsx(Progress, {
					value: s.total ? Math.round(s.done / s.total * 100) : 0,
					className: "h-1.5"
				})]
			}, section))
		}),
		/* @__PURE__ */ jsx("h2", {
			className: "mb-3 font-display text-lg font-semibold",
			children: "Schedule history"
		}),
		events.length === 0 ? /* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground",
			children: "No schedule changes yet."
		}) : /* @__PURE__ */ jsx("ul", {
			className: "mb-8 space-y-2",
			children: events.map((e) => /* @__PURE__ */ jsxs("li", {
				className: "rounded-lg border border-border bg-card p-3 text-sm",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "mr-2 rounded bg-secondary px-1.5 py-0.5 text-xs uppercase tracking-wide text-muted-foreground",
						children: e.kind
					}),
					e.detail,
					/* @__PURE__ */ jsx("span", {
						className: "ml-2 text-xs text-muted-foreground",
						children: new Date(e.created_at).toLocaleString()
					})
				]
			}, e.id))
		}),
		/* @__PURE__ */ jsx(ConfirmDialog, {
			title: "Reset all progress?",
			description: "This regenerates the full 120-day plan from scratch. Every tick, note, AI explainer and chat message is deleted.",
			confirmWord: "RESET",
			confirmLabel: "Reset everything",
			onConfirm: resetAll,
			trigger: /* @__PURE__ */ jsx(Button, {
				variant: "outline",
				className: "text-destructive",
				children: "Reset all progress"
			})
		})
	] });
}
//#endregion
export { ProgressPage as component };

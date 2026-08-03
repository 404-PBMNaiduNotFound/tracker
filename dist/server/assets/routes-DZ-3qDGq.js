import { t as Progress } from "./progress-DOIEKRJF.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { BarChart3, BookmarkCheck, CalendarDays, CalendarRange, Cloud, Code2, LayoutGrid, ListTodo, RefreshCw, Settings, Sparkles, Trophy } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
function useReveal() {
	const ref = useRef(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				el.setAttribute("data-visible", "true");
				obs.disconnect();
			}
		}, { threshold: .12 });
		obs.observe(el);
		return () => obs.disconnect();
	}, []);
	return ref;
}
function useCountUp(target, duration = 1200) {
	const ref = useRef(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			obs.disconnect();
			const start = performance.now();
			function tick(now) {
				const progress = Math.min((now - start) / duration, 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				el.textContent = Math.round(eased * target).toString();
				if (progress < 1) requestAnimationFrame(tick);
			}
			requestAnimationFrame(tick);
		}, { threshold: .5 });
		obs.observe(el);
		return () => obs.disconnect();
	}, [target, duration]);
	return ref;
}
function HeroSection() {
	return /* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden py-20 sm:py-28",
		children: [/* @__PURE__ */ jsx("div", {
			className: "pointer-events-none absolute inset-0 opacity-[0.04]",
			style: {
				backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
				backgroundSize: "32px 32px"
			}
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative mx-auto max-w-5xl px-4",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "mb-4 font-mono text-xs tracking-[0.2em] text-primary uppercase",
					children: "Striver A2Z · 474 problems · 18 sections · 120 days"
				}),
				/* @__PURE__ */ jsxs("h1", {
					className: "hero-headline font-display text-4xl font-bold tracking-tight sm:text-6xl leading-tight max-w-3xl",
					children: [
						"Finish DSA in 120\xA0days.",
						/* @__PURE__ */ jsx("br", {}),
						/* @__PURE__ */ jsx("span", {
							className: "text-primary",
							children: "One honest day at a time."
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "hero-sub mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed",
					children: "A daily problem checklist built from Striver's A2Z DSA sheet. Every day has a topic, problems with difficulty tags, a 12-step study checklist, an AI mentor, and a doubt chat. Life happens — postpone, skip, or insert revision days and the entire 120-day schedule reshapes itself automatically."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "hero-cta mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ jsx(Button, {
						asChild: true,
						size: "lg",
						className: "font-mono",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/auth",
							search: { next: "/today" },
							children: "Start the plan"
						})
					}), /* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						size: "lg",
						className: "font-mono",
						children: /* @__PURE__ */ jsx("a", {
							href: "#how-it-works",
							children: "See how it works"
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "hero-terminal mt-14 max-w-lg rounded-xl border border-border bg-card shadow-lg overflow-hidden",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-2.5",
						children: [
							/* @__PURE__ */ jsx("span", { className: "size-3 rounded-full bg-red-500/70" }),
							/* @__PURE__ */ jsx("span", { className: "size-3 rounded-full bg-yellow-500/70" }),
							/* @__PURE__ */ jsx("span", { className: "size-3 rounded-full bg-green-500/70" }),
							/* @__PURE__ */ jsx("span", {
								className: "ml-2 font-mono text-xs text-muted-foreground",
								children: "dsa-tracker — zsh"
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-5 font-mono text-sm leading-7",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-primary",
								children: "> Loading plan..."
							}),
							/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: "  Day     "
							}), /* @__PURE__ */ jsx("span", {
								className: "text-foreground font-semibold",
								children: "1 / 120"
							})] }),
							/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: "  Section "
							}), /* @__PURE__ */ jsx("span", {
								className: "text-foreground",
								children: "Basics"
							})] }),
							/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: "  Topic   "
							}), /* @__PURE__ */ jsx("span", {
								className: "text-foreground",
								children: "Recursion"
							})] }),
							/* @__PURE__ */ jsxs("p", { children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "  Problems"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-foreground",
									children: " 8 "
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-green-500 text-xs",
									children: "(Easy ×6, Medium ×2)"
								})
							] }),
							/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: "  Est time"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-foreground",
								children: " 3 h 30 m"
							})] }),
							/* @__PURE__ */ jsxs("p", { children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "  Status  "
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-yellow-400",
									children: "⬜ pending"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "terminal-cursor text-primary font-bold",
									children: " _"
								})
							] })
						]
					})]
				})
			]
		})]
	});
}
function StatsBar() {
	const c474 = useCountUp(474);
	const c18 = useCountUp(18);
	const c120 = useCountUp(120);
	const c4 = useCountUp(4);
	return /* @__PURE__ */ jsx("div", {
		className: "border-y border-border bg-muted/30",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-5xl px-4 py-8",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-6",
				children: [
					{
						ref: c474,
						value: 474,
						label: "Problems"
					},
					{
						ref: c18,
						value: 18,
						label: "Sections"
					},
					{
						ref: c120,
						value: 120,
						label: "Days"
					},
					{
						ref: c4,
						value: 4,
						label: "Avg / day",
						prefix: "~"
					}
				].map((s, i) => /* @__PURE__ */ jsxs("div", {
					className: `text-center ${i < 3 ? "sm:border-r border-border" : ""}`,
					children: [/* @__PURE__ */ jsxs("p", {
						className: "font-mono text-4xl font-bold text-foreground tabular-nums",
						children: [s.prefix ?? "", /* @__PURE__ */ jsx("span", {
							ref: s.ref,
							children: "0"
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: s.label
					})]
				}, s.label))
			})
		})
	});
}
function HowItWorks() {
	const ref = useReveal();
	return /* @__PURE__ */ jsx("section", {
		id: "how-it-works",
		className: "py-20 sm:py-24",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl px-4",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "font-display text-3xl font-bold tracking-tight",
				children: "How the 120-day plan works"
			}), /* @__PURE__ */ jsx("div", {
				ref,
				className: "mt-12 grid gap-6 sm:grid-cols-3 how-steps",
				children: [
					{
						icon: CalendarDays,
						title: "Sign up & get your plan",
						body: "The moment you sign up, your personal 120-day schedule is generated from Striver's A2Z sheet. All 474 problems are distributed across 18 sections in study order, starting from the day you join.",
						step: "01"
					},
					{
						icon: ListTodo,
						title: "Work day by day",
						body: "Every day shows you: the topic, all problems with difficulty tags, a 12-step study checklist (Watch video → Submit → Push to GitHub), your personal notes, and an AI explainer for that day's patterns.",
						step: "02"
					},
					{
						icon: BarChart3,
						title: "Track, adapt, finish",
						body: "Mark problems done. If life gets in the way, postpone a day or insert a revision day — the schedule auto-rebalances. Streaks, badges and charts keep you honest across all 120 days.",
						step: "03"
					}
				].map((s, i) => {
					const Icon = s.icon;
					return /* @__PURE__ */ jsxs("div", {
						className: "step-card relative rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
						style: { animationDelay: `${i * 150}ms` },
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-mono text-5xl font-bold text-primary/10 absolute top-4 right-4 leading-none select-none",
								children: s.step
							}),
							/* @__PURE__ */ jsx("div", {
								className: "size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4",
								children: /* @__PURE__ */ jsx(Icon, { className: "size-5 text-primary" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "font-display text-base font-semibold mb-2",
								children: s.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground leading-relaxed",
								children: s.body
							})
						]
					}, s.step);
				})
			})]
		})
	});
}
function WeekMock() {
	return /* @__PURE__ */ jsx("div", {
		className: "mt-4 space-y-3 font-mono text-xs",
		children: [{
			week: "Week 2",
			done: 18,
			total: 28,
			days: [
				"Mon ✓",
				"Tue ✓",
				"Wed →"
			]
		}, {
			week: "Week 3",
			done: 4,
			total: 30,
			days: [
				"Mon ✓",
				"Tue ⬜",
				"Wed ⬜"
			]
		}].map((w) => /* @__PURE__ */ jsxs("div", {
			className: "rounded-lg border border-border bg-muted p-3",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between mb-1",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-semibold text-foreground",
						children: w.week
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-muted-foreground",
						children: [
							w.done,
							"/",
							w.total,
							" problems"
						]
					})]
				}),
				/* @__PURE__ */ jsx(Progress, {
					value: w.done / w.total * 100,
					className: "h-1.5 mb-2"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex gap-2",
					children: w.days.map((d) => /* @__PURE__ */ jsx("span", {
						className: "rounded px-2 py-0.5 bg-card border border-border text-muted-foreground text-[10px]",
						children: d
					}, d))
				})
			]
		}, w.week))
	});
}
function ProgressMock() {
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-4 font-mono text-xs",
		children: [/* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-2 mb-3",
			children: [
				{
					v: "42",
					l: "problems done",
					c: "text-primary"
				},
				{
					v: "8🔥",
					l: "day streak",
					c: "text-orange-500"
				},
				{
					v: "67%",
					l: "Easy",
					c: "text-green-500"
				},
				{
					v: "4 Nov",
					l: "projected finish",
					c: "text-muted-foreground"
				}
			].map((s) => /* @__PURE__ */ jsxs("div", {
				className: "rounded-lg border border-border bg-muted p-2.5 text-center",
				children: [/* @__PURE__ */ jsx("p", {
					className: `font-bold text-lg ${s.c}`,
					children: s.v
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground text-[10px]",
					children: s.l
				})]
			}, s.l))
		}), /* @__PURE__ */ jsxs("div", {
			className: "rounded-lg border border-border bg-muted p-3",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mb-2",
				children: "Problems / week"
			}), /* @__PURE__ */ jsx("div", {
				className: "flex items-end gap-1.5 h-12",
				children: [
					30,
					55,
					40,
					70,
					60,
					80,
					65
				].map((h, i) => /* @__PURE__ */ jsx("div", {
					className: "flex-1 rounded-t bg-primary/40",
					style: { height: `${h}%` }
				}, i))
			})]
		})]
	});
}
function BacklogMock() {
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-4 font-mono text-xs space-y-2",
		children: [["Day 9 · Sorting", "Day 11 · Arrays"].map((d) => /* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 p-2.5",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-foreground",
				children: d
			}), /* @__PURE__ */ jsx("span", {
				className: "rounded px-1.5 py-0.5 bg-red-500/15 text-red-500 text-[10px]",
				children: "Past due"
			})]
		}, d)), /* @__PURE__ */ jsx("button", {
			className: "w-full rounded-lg border border-primary/30 bg-primary/5 text-primary py-2 text-[10px] mt-1",
			children: "+ Insert a Revision Day"
		})]
	});
}
function TopicMock() {
	return /* @__PURE__ */ jsx("div", {
		className: "mt-4 font-mono text-xs space-y-2",
		children: [
			{
				name: "Arrays",
				done: 23,
				total: 40
			},
			{
				name: "Binary Search",
				done: 12,
				total: 28
			},
			{
				name: "Linked Lists",
				done: 0,
				total: 31
			}
		].map((s) => /* @__PURE__ */ jsxs("div", {
			className: "rounded-lg border border-border bg-muted p-2.5",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between mb-1",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-semibold text-foreground",
					children: s.name
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-muted-foreground",
					children: [
						s.done,
						"/",
						s.total
					]
				})]
			}), /* @__PURE__ */ jsx(Progress, {
				value: s.done / s.total * 100,
				className: "h-1"
			})]
		}, s.name))
	});
}
function ReviewMock() {
	return /* @__PURE__ */ jsx("div", {
		className: "mt-4 font-mono text-xs space-y-2",
		children: [{
			day: "Day 7 · Recursion",
			prob: "Subsets with Duplicates"
		}, {
			day: "Day 12 · Arrays",
			prob: "Trapping Rain Water"
		}].map((r) => /* @__PURE__ */ jsxs("div", {
			className: "rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-2.5",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-yellow-500/80 text-[10px] mb-0.5",
				children: r.day
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-yellow-400",
					children: "🔖"
				}), /* @__PURE__ */ jsx("span", {
					className: "text-foreground",
					children: r.prob
				})]
			})]
		}, r.prob))
	});
}
function ContestMock() {
	return /* @__PURE__ */ jsx("div", {
		className: "mt-4 font-mono text-xs space-y-2",
		children: [
			{
				platform: "LeetCode",
				title: "Weekly Contest 513",
				time: "Today · 08:00 IST",
				dur: "90 min",
				live: true
			},
			{
				platform: "Codeforces",
				title: "CF Round 1113 (Div. 2)",
				time: "Today · 20:05 IST",
				dur: "150 min",
				live: false
			},
			{
				platform: "CodeChef",
				title: "Starters 250",
				time: "Aug 5 · 20:00 IST",
				dur: "120 min",
				live: false
			}
		].map((c) => /* @__PURE__ */ jsxs("div", {
			className: "rounded-lg border border-border bg-muted p-2.5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between mb-0.5",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-[10px] text-muted-foreground",
						children: c.platform
					}), c.live && /* @__PURE__ */ jsx("span", {
						className: "text-[9px] rounded-full bg-green-500/15 text-green-500 px-1.5 py-0.5 font-semibold",
						children: "● LIVE"
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-foreground font-semibold truncate",
					children: c.title
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-3 mt-1 text-muted-foreground text-[10px]",
					children: [/* @__PURE__ */ jsxs("span", { children: ["🕐 ", c.time] }), /* @__PURE__ */ jsxs("span", { children: ["⏱ ", c.dur] })]
				})
			]
		}, c.title))
	});
}
function ProblemsMock() {
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-4 font-mono text-xs space-y-2",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-2 mb-1",
				children: [{
					label: "Total",
					val: "775",
					color: "text-primary"
				}, {
					label: "Verified links",
					val: "474+",
					color: "text-green-500"
				}].map((s) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-border bg-muted p-2.5 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: `font-bold text-base ${s.color}`,
						children: s.val
					}), /* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground text-[10px]",
						children: s.label
					})]
				}, s.label))
			}),
			[{
				name: "LeetCode",
				a2z: 456,
				extra: 175,
				color: "bg-[#FFA116]"
			}, {
				name: "GeeksforGeeks",
				a2z: 18,
				extra: 126,
				color: "bg-[#2F8D46]"
			}].map((p) => /* @__PURE__ */ jsxs("div", {
				className: "rounded-lg border border-border bg-muted p-2.5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1.5 mb-1",
					children: [/* @__PURE__ */ jsx("span", { className: `size-2 rounded-full ${p.color}` }), /* @__PURE__ */ jsx("span", {
						className: "text-foreground font-semibold",
						children: p.name
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-3 text-[10px] text-muted-foreground",
					children: [/* @__PURE__ */ jsxs("span", { children: ["A2Z: ", /* @__PURE__ */ jsx("span", {
						className: "text-foreground",
						children: p.a2z
					})] }), /* @__PURE__ */ jsxs("span", { children: ["Extra sheets: ", /* @__PURE__ */ jsx("span", {
						className: "text-foreground",
						children: p.extra
					})] })]
				})]
			}, p.name)),
			/* @__PURE__ */ jsx("div", {
				className: "rounded-lg border border-border bg-muted p-2 text-[10px] text-muted-foreground",
				children: "Sheets: Striver A2Z · NeetCode 150 · Blind 75 · Babbar 450 · Top Interview 150 · GFG Must-Do"
			})
		]
	});
}
function SettingsMock() {
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-4 font-mono text-xs space-y-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "rounded-lg border border-border bg-muted p-2.5",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mb-2",
				children: "Daily pace"
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex-1 h-1.5 rounded-full bg-border overflow-hidden",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-full bg-primary rounded-full",
						style: { width: "55%" }
					})
				}), /* @__PURE__ */ jsx("span", {
					className: "text-foreground",
					children: "~4 problems"
				})]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "rounded-lg border border-border bg-muted p-2.5 flex items-center justify-between",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-foreground",
				children: "Enable reminders"
			}), /* @__PURE__ */ jsx("div", {
				className: "w-8 h-4 rounded-full bg-primary relative",
				children: /* @__PURE__ */ jsx("div", { className: "absolute right-0.5 top-0.5 size-3 rounded-full bg-white" })
			})]
		})]
	});
}
function FeatureCard({ icon: Icon, color, title, bullets, mock, delay = 0 }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "feature-card rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
		style: { animationDelay: `${delay}ms` },
		children: [
			/* @__PURE__ */ jsx("div", {
				className: `inline-flex size-9 items-center justify-center rounded-lg ${color} mb-4`,
				children: /* @__PURE__ */ jsx(Icon, { className: "size-4" })
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "font-display text-base font-semibold mb-3",
				children: title
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "space-y-1.5 mb-1",
				children: bullets.map((b) => /* @__PURE__ */ jsxs("li", {
					className: "flex gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-primary mt-0.5 shrink-0",
						children: "›"
					}), /* @__PURE__ */ jsx("span", { children: b })]
				}, b))
			}),
			mock
		]
	});
}
function FeatureWalkthrough() {
	const ref = useReveal();
	return /* @__PURE__ */ jsx("section", {
		className: "py-20 sm:py-24 border-t border-border",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl px-4",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "font-display text-3xl font-bold tracking-tight",
					children: "Every page, explained"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-muted-foreground",
					children: "Everything you need — nothing you don't. Here's what's waiting inside."
				}),
				/* @__PURE__ */ jsx("div", {
					ref,
					className: "mt-10 grid gap-6 sm:grid-cols-2 feature-grid",
					children: [
						{
							icon: ListTodo,
							color: "bg-green-500/10 text-green-600 dark:text-green-400",
							title: "Today — Your daily command centre",
							bullets: [
								"See today's topic and section (e.g. \"Binary Search › BS on 1D Arrays\")",
								"Check off each problem — Easy (15 min), Medium (30 min), Hard (45 min) estimates shown",
								"12-step checklist: Watch video → Brute force → Optimise → Code → Submit → Push to GitHub",
								"Write personal notes that sync to the cloud",
								"Today's tab also shows today's live & upcoming contests — no tab switching needed",
								"One-click ChatGPT explain button pre-fills the prompt for the day's topic"
							],
							mock: null
						},
						{
							icon: CalendarRange,
							color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
							title: "Week View — Your 17-week roadmap at a glance",
							bullets: [
								"See all 120 days grouped into 17 weeks",
								"Each week shows a progress bar: X / Y problems done",
								"Jump directly into any day by clicking its card",
								"Skip future days you know you'll miss — schedule adjusts cleanly",
								"Colour-coded statuses: pending / completed / postponed / revision / skipped"
							],
							mock: /* @__PURE__ */ jsx(WeekMock, {})
						},
						{
							icon: BarChart3,
							color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
							title: "Progress — Stats that tell the truth",
							bullets: [
								"Overall completion: X / 474 problems done",
								"Current streak and longest streak",
								"Difficulty split: Easy / Medium / Hard breakdown",
								"Weekly solved-problems trend (bar chart)",
								"Badges earned and a full event log with timestamps"
							],
							mock: /* @__PURE__ */ jsx(ProgressMock, {})
						},
						{
							icon: CalendarDays,
							color: "bg-red-500/10 text-red-600 dark:text-red-400",
							title: "Backlog — Nothing falls through the cracks",
							bullets: [
								"Shows every past day you haven't fully completed",
								"One-click \"Insert a Revision Day\" schedules extra catch-up time",
								"Schedule ripples forward automatically — no days are lost",
								"Backlog clears itself as you catch up"
							],
							mock: /* @__PURE__ */ jsx(BacklogMock, {})
						},
						{
							icon: LayoutGrid,
							color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
							title: "Topic View — All 18 sections at once",
							bullets: [
								"Accordion of all 18 Striver A2Z sections in study order",
								"Each section shows X / Y problems done with a mini progress bar",
								"Expand any section to see all its study days and jump in",
								"Skip a whole section or a single topic — schedule adjusts",
								"Restore skipped sections any time"
							],
							mock: /* @__PURE__ */ jsx(TopicMock, {})
						},
						{
							icon: BookmarkCheck,
							color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
							title: "Review — Your personal \"revisit later\" list",
							bullets: [
								"Bookmark any problem in Today with one tap",
								"All bookmarks from all 120 days appear here, sorted by day",
								"Shows which day and topic each problem belongs to",
								"Clear the bookmark once you've mastered it"
							],
							mock: /* @__PURE__ */ jsx(ReviewMock, {})
						},
						{
							icon: Trophy,
							color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
							title: "Contests — Never miss a CP round",
							bullets: [
								"Live, upcoming, and missed contests from LeetCode, Codeforces, CodeChef, AtCoder & HackerRank",
								"Contests sorted by start time — live contests float to the top with a green indicator",
								"Duration shown for every contest so you can plan around it",
								"One-click link opens the contest page directly on the platform",
								"Today's tab also shows a mini contest strip — today's live & upcoming rounds at a glance"
							],
							mock: /* @__PURE__ */ jsx(ContestMock, {})
						},
						{
							icon: Code2,
							color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
							title: "Problems — 775+ problems, 6 curated sheets",
							bullets: [
								"474 Striver A2Z problems + 301 extra problems from 5 popular sheets in one searchable table",
								"LeetCode: 456 (A2Z) + 175 extra · GeeksforGeeks: 18 (A2Z) + 126 extra",
								"Filter by platform (LeetCode, GFG, HackerRank, CodeStudio), difficulty, or sheet",
								"Sheets: NeetCode 150 · Blind 75 · Love Babbar 450 · Top Interview 150 · GFG Must-Do",
								"Verified direct links — no search-fallback guessing; problems with unconfirmed links are flagged",
								"Mark problems done and track completions across all sheets independently"
							],
							mock: /* @__PURE__ */ jsx(ProblemsMock, {})
						},
						{
							icon: Settings,
							color: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
							title: "Settings — Your plan, your pace",
							bullets: [
								"Account: update name, change password, link Google account",
								"Daily pace: adjust problems/day — end date auto-updates",
								"Schedule shift: move all remaining days forward by N days",
								"Pause plan and resume later — no days lost",
								"Theme: Dark / Light / System toggle"
							],
							mock: /* @__PURE__ */ jsx(SettingsMock, {})
						}
					].map((c, i) => /* @__PURE__ */ jsx(FeatureCard, {
						...c,
						delay: i * 80
					}, c.title))
				})
			]
		})
	});
}
function AISection() {
	const ref = useReveal();
	return /* @__PURE__ */ jsxs("section", {
		className: "py-20 sm:py-24 relative overflow-hidden border-t border-border",
		children: [/* @__PURE__ */ jsx("div", {
			className: "pointer-events-none absolute inset-0 opacity-[0.05]",
			style: {
				backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
				backgroundSize: "24px 24px"
			}
		}), /* @__PURE__ */ jsx("div", {
			className: "relative mx-auto max-w-5xl px-4",
			children: /* @__PURE__ */ jsxs("div", {
				ref,
				className: "ai-col flex flex-col sm:flex-row items-start gap-10 rounded-2xl border border-border bg-card/80 backdrop-blur p-8 sm:p-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex-1 min-w-0",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/8 px-3 py-1 text-xs text-green-600 dark:text-green-400 font-mono mb-5",
							children: [/* @__PURE__ */ jsx(Sparkles, { className: "size-3" }), "ChatGPT integration"]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "font-display text-2xl sm:text-3xl font-bold tracking-tight mb-3",
							children: "Understand any topic instantly with ChatGPT"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-muted-foreground leading-relaxed mb-4",
							children: [
								"On each day's page, hit ",
								/* @__PURE__ */ jsx("span", {
									className: "font-mono text-sm bg-muted border border-border rounded px-1.5 py-0.5 text-foreground",
									children: "Explain with ChatGPT"
								}),
								" and you're taken straight to ChatGPT with the prompt already filled in — the day's topic, section, and a request for intuition, patterns, and complexity. Just press Enter."
							]
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "space-y-2",
							children: [
								"No copy-pasting — the prompt is built from today's topic automatically",
								"Opens ChatGPT in a new tab with the message pre-loaded",
								"Works for every one of the 120 days and all 18 sections",
								"Use your own ChatGPT account — free or Plus, your choice"
							].map((b) => /* @__PURE__ */ jsxs("li", {
								className: "flex gap-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-primary mt-0.5 shrink-0",
									children: "›"
								}), /* @__PURE__ */ jsx("span", { children: b })]
							}, b))
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "w-full sm:w-72 shrink-0",
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-xl border border-border bg-muted p-4 font-mono text-xs",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground mb-1",
								children: "Day 14 · Binary Search"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-foreground mb-3",
								children: "BS on 1D Arrays"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 rounded-lg border border-green-500/40 bg-green-500/8 px-3 py-2.5 cursor-pointer hover:bg-green-500/15 transition-colors",
								children: [/* @__PURE__ */ jsxs("svg", {
									className: "size-4 shrink-0",
									viewBox: "0 0 24 24",
									fill: "none",
									children: [/* @__PURE__ */ jsx("path", {
										d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z",
										stroke: "currentColor",
										strokeWidth: "1.5",
										className: "text-green-500"
									}), /* @__PURE__ */ jsx("path", {
										d: "M8 12h8M14 9l3 3-3 3",
										stroke: "currentColor",
										strokeWidth: "1.5",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										className: "text-green-500"
									})]
								}), /* @__PURE__ */ jsx("span", {
									className: "text-green-600 dark:text-green-400 font-semibold",
									children: "Explain with ChatGPT"
								})]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-muted-foreground mt-3 text-[10px] leading-4",
								children: [
									"↳ Opens ChatGPT with prompt pre-filled:",
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("span", {
										className: "text-foreground/70",
										children: "\"Explain Binary Search on 1D Arrays — intuition, patterns, time & space complexity, common pitfalls...\""
									})
								]
							})
						]
					})
				})]
			})
		})]
	});
}
function CloudAndSchedule() {
	const ref = useReveal();
	return /* @__PURE__ */ jsx("section", {
		className: "py-20 sm:py-24 border-t border-border",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-5xl px-4",
			children: /* @__PURE__ */ jsx("div", {
				ref,
				className: "grid gap-8 sm:grid-cols-2 cloud-cols",
				children: [{
					icon: Cloud,
					heading: "Progress follows you everywhere",
					body: "Sign in with email or Google. Every tick, note, and schedule change is written to Firestore in real time. Open the app on your phone during a commute and pick up exactly where your laptop left off."
				}, {
					icon: RefreshCw,
					heading: "Life happens. The plan adapts.",
					body: "Postpone a day → it moves to tomorrow. Skip a day → it's removed cleanly. Insert a revision day → everything shifts right. The 120-day structure always stays intact — you just keep moving forward."
				}].map((c, i) => {
					const Icon = c.icon;
					return /* @__PURE__ */ jsxs("div", {
						className: "cloud-col rounded-xl border border-border bg-card p-7 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
						style: { animationDelay: `${i * 150}ms` },
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5",
								children: /* @__PURE__ */ jsx(Icon, { className: "size-5 text-primary" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "font-display text-lg font-semibold mb-2",
								children: c.heading
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground leading-relaxed",
								children: c.body
							})
						]
					}, c.heading);
				})
			})
		})
	});
}
function BadgesSection() {
	const ref = useReveal();
	return /* @__PURE__ */ jsx("section", {
		className: "py-20 sm:py-24 border-t border-border",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl px-4",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "font-display text-3xl font-bold tracking-tight",
					children: "Earn badges as you go"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Small wins add up across 120 days."
				}),
				/* @__PURE__ */ jsx("div", {
					ref,
					className: "mt-8 flex flex-wrap gap-3 badges-row",
					children: [
						{
							label: "🔥 3-Day Streak",
							earned: true
						},
						{
							label: "🔥 7-Day Streak",
							earned: true
						},
						{
							label: "🔥 30-Day Streak",
							earned: false
						},
						{
							label: "✅ First 10",
							earned: true
						},
						{
							label: "✅ First 50",
							earned: false
						},
						{
							label: "💯 100 Problems",
							earned: false
						},
						{
							label: "🏁 Halfway There",
							earned: false
						},
						{
							label: "🏆 Sheet Complete",
							earned: false
						}
					].map((b, i) => /* @__PURE__ */ jsx("div", {
						className: `badge-chip rounded-full border px-4 py-2 text-sm font-mono transition-all
                ${b.earned ? "bg-primary/10 border-primary/30 text-foreground" : "opacity-40 grayscale bg-muted border-border text-muted-foreground"}`,
						style: { animationDelay: `${i * 60}ms` },
						children: b.label
					}, b.label))
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 text-xs text-muted-foreground font-mono",
					children: "Showing example progress — earned badges glow, unearned ones fade until you hit the milestone."
				})
			]
		})
	});
}
function FinalCTA() {
	const ref = useReveal();
	return /* @__PURE__ */ jsx("section", {
		className: "py-24 border-t border-border",
		children: /* @__PURE__ */ jsxs("div", {
			ref,
			className: "mx-auto max-w-5xl px-4 text-center cta-inner",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "font-display text-4xl sm:text-5xl font-bold tracking-tight",
					children: "Ready to commit to 120\xA0days?"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 text-muted-foreground max-w-lg mx-auto",
					children: "Create a free account, get your plan instantly, and start today. No credit card needed."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ jsx(Button, {
						asChild: true,
						size: "lg",
						className: "font-mono text-base px-6",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/auth",
							search: { next: "/today" },
							children: "Start the plan — it's free"
						})
					}), /* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						size: "lg",
						className: "font-mono",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/today",
							children: "Open my tracker"
						})
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-6 text-xs text-muted-foreground font-mono",
					children: "✓ Free forever\xA0 · \xA0✓ No ads\xA0 · \xA0✓ Syncs across devices\xA0 · \xA0✓ Built on Striver's A2Z sheet"
				})
			]
		})
	});
}
function Index() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("style", { children: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroText {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .terminal-cursor {
          animation: blink 1s step-end infinite;
        }

        /* hero animations */
        .hero-headline {
          animation: heroText 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-sub {
          animation: heroText 0.6s 0.25s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-cta {
          animation: heroText 0.6s 0.45s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-terminal {
          animation: heroText 0.7s 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* scroll-reveal: children animate when parent gets data-visible */
        [data-visible="true"] .step-card {
          animation: slideInLeft 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        [data-visible="true"] .feature-card {
          animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        [data-visible="true"] .ai-col {
          animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        [data-visible="true"] .cloud-col {
          animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        [data-visible="true"] .badge-chip {
          animation: slideInRight 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        [data-visible="true"] .cta-inner {
          animation: fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      ` }), /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ jsx(HeroSection, {}),
			/* @__PURE__ */ jsx(StatsBar, {}),
			/* @__PURE__ */ jsx(HowItWorks, {}),
			/* @__PURE__ */ jsx(FeatureWalkthrough, {}),
			/* @__PURE__ */ jsx(AISection, {}),
			/* @__PURE__ */ jsx(CloudAndSchedule, {}),
			/* @__PURE__ */ jsx(BadgesSection, {}),
			/* @__PURE__ */ jsx(FinalCTA, {})
		]
	})] });
}
//#endregion
export { Index as component };

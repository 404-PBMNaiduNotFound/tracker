import { t as ALL_PROBLEMS } from "./problems-B_djWpsm.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Checkbox } from "./checkbox-kt6FvQcE.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.js";
import { t as useProblemCompletions } from "./useProblemCompletions-DE_Q1IWd.js";
import { useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ExternalLink, Search, X } from "lucide-react";
//#region src/routes/_authenticated/problems.tsx?tsr-split=component
var PLATFORMS = [
	"All",
	"LeetCode",
	"GFG",
	"HackerRank",
	"CodeStudio"
];
var SHEET_FILTERS = [
	"All",
	"Striver A2Z",
	"NeetCode 150",
	"Blind 75",
	"Love Babbar 450",
	"Top Interview 150",
	"GFG Must-Do"
];
function platformSearchLink(name, platform) {
	const q = encodeURIComponent(name);
	switch (platform) {
		case "LeetCode": return `https://leetcode.com/problemset/?search=${q}`;
		case "GFG": return `https://www.geeksforgeeks.org/explore?search=${q}`;
		case "HackerRank": return `https://www.hackerrank.com/domains/data-structures`;
		case "CodeStudio": return `https://www.naukri.com/code360/search?q=${q}`;
		default: return `https://leetcode.com/problemset/?search=${q}`;
	}
}
var PLATFORM_META = {
	All: {
		label: "All",
		color: "text-foreground",
		bg: "bg-secondary",
		dot: "bg-muted-foreground"
	},
	LeetCode: {
		label: "LeetCode",
		color: "text-[#FFA116]",
		bg: "bg-[#FFA116]/10",
		dot: "bg-[#FFA116]"
	},
	GFG: {
		label: "GeeksforGeeks",
		color: "text-[#2F8D46]",
		bg: "bg-[#2F8D46]/10",
		dot: "bg-[#2F8D46]"
	},
	HackerRank: {
		label: "HackerRank",
		color: "text-[#2EC866]",
		bg: "bg-[#2EC866]/10",
		dot: "bg-[#2EC866]"
	},
	CodeStudio: {
		label: "CodeStudio",
		color: "text-[#F97316]",
		bg: "bg-[#F97316]/10",
		dot: "bg-[#F97316]"
	}
};
var DIFF_META = {
	Easy: {
		label: "Easy",
		color: "text-easy",
		bg: "bg-easy/10"
	},
	Medium: {
		label: "Medium",
		color: "text-medium",
		bg: "bg-medium/10"
	},
	Hard: {
		label: "Hard",
		color: "text-hard",
		bg: "bg-hard/10"
	}
};
var SHEET_META = {
	"All": {
		color: "text-foreground",
		bg: "bg-secondary"
	},
	"Striver A2Z": {
		color: "text-primary",
		bg: "bg-primary/10"
	},
	"NeetCode 150": {
		color: "text-[#00B8A3]",
		bg: "bg-[#00B8A3]/10"
	},
	"Blind 75": {
		color: "text-[#4F86F7]",
		bg: "bg-[#4F86F7]/10"
	},
	"Love Babbar 450": {
		color: "text-[#E05C5C]",
		bg: "bg-[#E05C5C]/10"
	},
	"Top Interview 150": {
		color: "text-[#FFA116]",
		bg: "bg-[#FFA116]/10"
	},
	"GFG Must-Do": {
		color: "text-[#2F8D46]",
		bg: "bg-[#2F8D46]/10"
	}
};
function countBy(arr, key) {
	return arr.reduce((acc, x) => {
		const k = key(x);
		acc[k] = (acc[k] ?? 0) + 1;
		return acc;
	}, {});
}
function ProblemItem({ problem, done, onToggle }) {
	const diff = DIFF_META[problem.difficulty];
	const pm = PLATFORM_META[problem.platform];
	const sm = SHEET_META[problem.sheet];
	const checkId = `pb-${problem.name.replace(/\W+/g, "-")}`;
	return /* @__PURE__ */ jsxs("li", {
		className: cn("flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 transition-colors hover:bg-secondary/40", done && "border-green-500/30 bg-green-500/5"),
		children: [
			/* @__PURE__ */ jsx(Checkbox, {
				id: checkId,
				checked: done,
				onCheckedChange: onToggle,
				"aria-label": `Mark ${problem.name} as ${done ? "incomplete" : "complete"}`,
				className: "size-4 shrink-0"
			}),
			/* @__PURE__ */ jsx("label", {
				htmlFor: checkId,
				className: cn("min-w-0 flex-1 cursor-pointer text-sm font-medium", done && "text-muted-foreground line-through"),
				children: problem.name
			}),
			/* @__PURE__ */ jsx("span", {
				className: cn("hidden rounded-full border border-border px-2 py-0.5 text-[10px] font-medium sm:inline", sm.bg, sm.color),
				children: problem.sheet
			}),
			/* @__PURE__ */ jsx("span", {
				className: "hidden rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground lg:inline",
				children: problem.topic
			}),
			/* @__PURE__ */ jsx("span", {
				className: cn("rounded-full px-2 py-0.5 text-xs font-semibold", diff.bg, diff.color),
				children: problem.difficulty
			}),
			/* @__PURE__ */ jsxs("span", {
				className: cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", pm.bg, pm.color),
				children: [/* @__PURE__ */ jsx("span", { className: cn("size-1.5 rounded-full", pm.dot) }), pm.label]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1",
				children: [[
					"LeetCode",
					"GFG",
					"HackerRank"
				].map((pl) => {
					if (problem.platform !== pl) return null;
					const m = PLATFORM_META[pl];
					const short = pl === "LeetCode" ? "LC" : pl === "GFG" ? "GFG" : "HR";
					return /* @__PURE__ */ jsx("a", {
						href: platformSearchLink(problem.name, pl),
						target: "_blank",
						rel: "noreferrer",
						title: `Open "${problem.name}" on ${m.label}`,
						className: cn("rounded px-1.5 py-0.5 text-[10px] font-semibold transition-opacity hover:opacity-80", m.bg, m.color),
						children: short
					}, pl);
				}), /* @__PURE__ */ jsxs("a", {
					href: problem.link,
					target: "_blank",
					rel: "noreferrer",
					className: "ml-1 flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary",
					children: [/* @__PURE__ */ jsx(ExternalLink, { className: "size-3" }), "Solve"]
				})]
			})
		]
	});
}
function ProblemsPage() {
	const [diffTab, setDiffTab] = useState("All");
	const [platFilter, setPlatFilter] = useState("All");
	const [sheetFilter, setSheetFilter] = useState("All");
	const [query, setQuery] = useState("");
	const { completed, toggle } = useProblemCompletions();
	const filtered = useMemo(() => {
		return ALL_PROBLEMS.filter((p) => {
			if (diffTab !== "All" && p.difficulty !== diffTab) return false;
			if (platFilter !== "All" && p.platform !== platFilter) return false;
			if (sheetFilter !== "All" && p.sheet !== sheetFilter) return false;
			if (query.trim()) {
				const q = query.toLowerCase();
				return p.name.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q) || p.sheet.toLowerCase().includes(q);
			}
			return true;
		});
	}, [
		diffTab,
		platFilter,
		sheetFilter,
		query
	]);
	const diffCounts = useMemo(() => countBy(ALL_PROBLEMS, (p) => p.difficulty), []);
	const totalDone = completed.size;
	const filteredDone = useMemo(() => filtered.filter((p) => completed.has(p.name)).length, [filtered, completed]);
	const hasActiveFilter = diffTab !== "All" || platFilter !== "All" || sheetFilter !== "All" || query.trim() !== "";
	function clearFilters() {
		setDiffTab("All");
		setPlatFilter("All");
		setSheetFilter("All");
		setQuery("");
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "mb-5 flex flex-wrap items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Problems"
			}), /* @__PURE__ */ jsxs("p", {
				className: "mt-0.5 text-sm text-muted-foreground",
				children: [
					ALL_PROBLEMS.length,
					" verified problems from 6 sheets —",
					" ",
					/* @__PURE__ */ jsxs("span", {
						className: "font-medium text-green-600 dark:text-green-400",
						children: [totalDone, " completed"]
					})
				]
			})] }), /* @__PURE__ */ jsx("div", {
				className: "flex items-center gap-2",
				children: [
					"Easy",
					"Medium",
					"Hard"
				].map((d) => {
					const m = DIFF_META[d];
					return /* @__PURE__ */ jsxs("span", {
						className: cn("rounded-full px-2.5 py-1 text-xs font-semibold", m.bg, m.color),
						children: [
							diffCounts[d] ?? 0,
							" ",
							d
						]
					}, d);
				})
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "relative mb-4",
			children: [
				/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
				/* @__PURE__ */ jsx(Input, {
					placeholder: "Search by problem name, topic, or sheet…",
					value: query,
					onChange: (e) => setQuery(e.target.value),
					className: "pl-9 pr-9"
				}),
				query && /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setQuery(""),
					className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
					"aria-label": "Clear search",
					children: /* @__PURE__ */ jsx(X, { className: "size-4" })
				})
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Sheet"
			}), /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-2",
				children: SHEET_FILTERS.map((sf) => {
					const active = sheetFilter === sf;
					const m = SHEET_META[sf];
					const count = sf === "All" ? ALL_PROBLEMS.length : ALL_PROBLEMS.filter((p) => p.sheet === sf).length;
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setSheetFilter(sf),
						className: cn("flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all", active ? cn(m.bg, m.color, "border-transparent ring-1 ring-current") : "border-border bg-card text-muted-foreground hover:bg-secondary"),
						children: [sf, /* @__PURE__ */ jsx("span", {
							className: "opacity-60",
							children: count
						})]
					}, sf);
				})
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Platform"
			}), /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-2",
				children: PLATFORMS.map((pl) => {
					const active = platFilter === pl;
					const m = PLATFORM_META[pl];
					const count = pl === "All" ? ALL_PROBLEMS.length : ALL_PROBLEMS.filter((p) => p.platform === pl).length;
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setPlatFilter(pl),
						className: cn("flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all", active ? cn(m.bg, m.color, "border-transparent ring-1 ring-current") : "border-border bg-card text-muted-foreground hover:bg-secondary"),
						children: [
							pl !== "All" && /* @__PURE__ */ jsx("span", { className: cn("size-1.5 rounded-full", m.dot) }),
							pl === "All" ? "All Platforms" : m.label,
							/* @__PURE__ */ jsx("span", {
								className: "opacity-60",
								children: count
							})
						]
					}, pl);
				})
			})]
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			value: diffTab,
			onValueChange: (v) => setDiffTab(v),
			className: "mb-2",
			children: [/* @__PURE__ */ jsx(TabsList, {
				className: "mb-4 flex w-full flex-wrap gap-1 bg-transparent p-0",
				children: [
					"All",
					"Easy",
					"Medium",
					"Hard"
				].map((d) => {
					const count = d === "All" ? ALL_PROBLEMS.length : diffCounts[d] ?? 0;
					const active = diffTab === d;
					const m = d !== "All" ? DIFF_META[d] : null;
					return /* @__PURE__ */ jsxs(TabsTrigger, {
						value: d,
						className: cn("rounded-full border border-border px-3 py-1 text-sm font-medium transition-all data-[state=active]:shadow-none", active && m ? cn(m.bg, m.color, "border-transparent") : active ? "bg-primary text-primary-foreground border-transparent" : "bg-card hover:bg-secondary"),
						children: [d, /* @__PURE__ */ jsx("span", {
							className: "ml-1.5 tabular-nums text-xs opacity-70",
							children: count
						})]
					}, d);
				})
			}), [
				"All",
				"Easy",
				"Medium",
				"Hard"
			].map((d) => /* @__PURE__ */ jsx(TabsContent, {
				value: d,
				className: "mt-0",
				children: filtered.length === 0 ? /* @__PURE__ */ jsxs("p", {
					className: "rounded-xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground",
					children: [
						"No problems match your filters.",
						" ",
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "underline underline-offset-2",
							onClick: clearFilters,
							children: "Clear all filters"
						})
					]
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Showing ",
							filtered.length,
							" problem",
							filtered.length !== 1 ? "s" : "",
							query ? ` for "${query}"` : "",
							" —",
							" ",
							/* @__PURE__ */ jsxs("span", {
								className: "font-medium text-green-600 dark:text-green-400",
								children: [filteredDone, " completed"]
							})
						]
					}), hasActiveFilter && /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: clearFilters,
						className: "flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground",
						children: [/* @__PURE__ */ jsx(X, { className: "size-3" }), " Clear filters"]
					})]
				}), /* @__PURE__ */ jsx("ul", {
					className: "space-y-1.5",
					children: filtered.map((p) => /* @__PURE__ */ jsx(ProblemItem, {
						problem: p,
						done: completed.has(p.name),
						onToggle: () => void toggle(p.name)
					}, `${p.sheet}|${p.name}|${p.link}`))
				})] })
			}, d))]
		})
	] });
}
//#endregion
export { ProblemsPage as component };

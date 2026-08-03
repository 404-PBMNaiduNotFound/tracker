import { t as cn } from "./utils-C_uf36nf.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Clock, ExternalLink, Trophy } from "lucide-react";
//#region src/components/ContestsSection.tsx
var ALL_CONTESTS = [
	{
		platform: "AtCoder",
		title: "CodeQUEEN 2026 — Final",
		startIST: "Aug 1, 2026 09:30",
		durationMin: 120,
		url: "https://atcoder.jp/contests/codequeen2026-final-Public"
	},
	{
		platform: "HackerRank",
		title: "HackerRank Orchestrate August '26",
		startIST: "Aug 1, 2026 18:00",
		durationMin: 1440,
		url: "https://hackerrank.com/contests/hackerrank-orchestrate-august26"
	},
	{
		platform: "LeetCode",
		title: "Biweekly Contest 188",
		startIST: "Aug 1, 2026 20:00",
		durationMin: 90,
		url: "https://leetcode.com/contest/biweekly-contest-188"
	},
	{
		platform: "Codeforces",
		title: "Codeforces Round 1113 (Div. 2)",
		startIST: "Aug 1, 2026 20:05",
		durationMin: 150,
		url: "https://codeforces.com/contests/2248"
	},
	{
		platform: "CodeChef",
		title: "Placement Prep Weekends — 01",
		startIST: "Aug 2, 2026 00:00",
		durationMin: 3e3,
		url: "https://www.codechef.com/PLACEPREP01"
	},
	{
		platform: "LeetCode",
		title: "Weekly Contest 513",
		startIST: "Aug 2, 2026 08:00",
		durationMin: 90,
		url: "https://leetcode.com/contest/weekly-contest-513"
	},
	{
		platform: "CodeChef",
		title: "Starters 250",
		startIST: "Aug 5, 2026 20:00",
		durationMin: 120,
		url: "https://www.codechef.com/START250"
	},
	{
		platform: "Codeforces",
		title: "Codeforces Round (Div. 2)",
		startIST: "Aug 6, 2026 20:05",
		durationMin: 120,
		url: "https://codeforces.com/contests/2252"
	},
	{
		platform: "Codeforces",
		title: "Educational CF Round 193 (Div. 2)",
		startIST: "Aug 7, 2026 20:05",
		durationMin: 120,
		url: "https://codeforces.com/contests/2253"
	},
	{
		platform: "AtCoder",
		title: "AtCoder Beginner Contest 470",
		startIST: "Aug 8, 2026 17:30",
		durationMin: 100,
		url: "https://atcoder.jp/contests/abc470"
	},
	{
		platform: "LeetCode",
		title: "Weekly Contest 514",
		startIST: "Aug 9, 2026 08:00",
		durationMin: 90,
		url: "https://leetcode.com/contest/weekly-contest-514"
	},
	{
		platform: "CodeChef",
		title: "Starters 251",
		startIST: "Aug 12, 2026 20:00",
		durationMin: 120,
		url: "https://www.codechef.com/START251"
	}
];
function parseIST(s) {
	return /* @__PURE__ */ new Date(s + " GMT+0530");
}
function classifyContest(c, now) {
	const start = parseIST(c.startIST);
	const end = new Date(start.getTime() + c.durationMin * 60 * 1e3);
	if (now >= start && now < end) return "live";
	if (now < start) return "upcoming";
	return "missed";
}
function isTodayIST(c, now) {
	const start = parseIST(c.startIST);
	const istOffset = 198e5;
	const todayIST = new Date(now.getTime() + istOffset);
	const startIST = new Date(start.getTime() + istOffset);
	return startIST.getUTCFullYear() === todayIST.getUTCFullYear() && startIST.getUTCMonth() === todayIST.getUTCMonth() && startIST.getUTCDate() === todayIST.getUTCDate();
}
function fmtDuration(min) {
	if (min < 60) return `${min}m`;
	const h = Math.floor(min / 60);
	const m = min % 60;
	return m ? `${h}h ${m}m` : `${h}h`;
}
var PLATFORM_STYLES = {
	LeetCode: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
	Codeforces: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
	CodeChef: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
	HackerRank: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
	AtCoder: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300"
};
var STATUS_STYLES = {
	live: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
	upcoming: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
	missed: "bg-gray-100 text-gray-500 dark:bg-gray-800/60 dark:text-gray-400"
};
var STATUS_LABEL = {
	live: "Live",
	upcoming: "Upcoming",
	missed: "Missed"
};
function ContestCard({ c, status }) {
	return /* @__PURE__ */ jsxs("a", {
		href: c.url,
		target: "_blank",
		rel: "noopener noreferrer",
		className: cn("group flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-colors", status === "missed" ? "opacity-60 hover:opacity-80" : "hover:border-primary/40 hover:bg-accent/30"),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium", PLATFORM_STYLES[c.platform] ?? "bg-muted text-muted-foreground"),
					children: c.platform
				}), /* @__PURE__ */ jsx("span", {
					className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold", STATUS_STYLES[status]),
					children: STATUS_LABEL[status]
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm font-medium leading-snug text-foreground group-hover:text-primary",
				children: c.title
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ jsx(Clock, {
							className: "size-3",
							"aria-hidden": "true"
						}),
						c.startIST,
						" IST"
					]
				}), /* @__PURE__ */ jsxs("span", { children: ["· ", fmtDuration(c.durationMin)] })]
			}),
			status !== "missed" && /* @__PURE__ */ jsxs("span", {
				className: "mt-auto flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100",
				children: ["Open contest ", /* @__PURE__ */ jsx(ExternalLink, {
					className: "size-3",
					"aria-hidden": "true"
				})]
			})
		]
	});
}
function SectionHeader({ title, count }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-3 flex items-center gap-2",
		children: [
			/* @__PURE__ */ jsx(Trophy, {
				className: "size-4 text-primary",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "text-base font-semibold",
				children: title
			}),
			/* @__PURE__ */ jsx("span", {
				className: "ml-1 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground",
				children: count
			})
		]
	});
}
function TodayContestsSection() {
	const now = /* @__PURE__ */ new Date();
	const visible = ALL_CONTESTS.filter((c) => {
		const status = classifyContest(c, now);
		if (status === "missed") return false;
		if (status === "live") return true;
		return isTodayIST(c, now);
	});
	if (visible.length === 0) return null;
	return /* @__PURE__ */ jsxs("section", {
		className: "mt-6",
		children: [
			/* @__PURE__ */ jsx(SectionHeader, {
				title: "Today's Contests",
				count: visible.length
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: visible.map((c) => /* @__PURE__ */ jsx(ContestCard, {
					c,
					status: classifyContest(c, now)
				}, c.url))
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-2 text-right text-[11px] text-muted-foreground",
				children: [
					"Source:",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: "https://clist.by",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "underline underline-offset-2 hover:text-foreground",
						children: "clist.by"
					}),
					" ",
					"· All times in IST (UTC +5:30)"
				]
			})
		]
	});
}
function ContestsPageSection() {
	const now = /* @__PURE__ */ new Date();
	const live = ALL_CONTESTS.filter((c) => classifyContest(c, now) === "live");
	const upcoming = ALL_CONTESTS.filter((c) => classifyContest(c, now) === "upcoming");
	const missed = ALL_CONTESTS.filter((c) => classifyContest(c, now) === "missed");
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-10",
		children: [
			live.length > 0 && /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx(SectionHeader, {
				title: "Live Now",
				count: live.length
			}), /* @__PURE__ */ jsx("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: live.map((c) => /* @__PURE__ */ jsx(ContestCard, {
					c,
					status: "live"
				}, c.url))
			})] }),
			upcoming.length > 0 && /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx(SectionHeader, {
				title: "Upcoming Contests",
				count: upcoming.length
			}), /* @__PURE__ */ jsx("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: upcoming.map((c) => /* @__PURE__ */ jsx(ContestCard, {
					c,
					status: "upcoming"
				}, c.url))
			})] }),
			missed.length > 0 && /* @__PURE__ */ jsxs("section", { children: [
				/* @__PURE__ */ jsx(SectionHeader, {
					title: "Missed Contests",
					count: missed.length
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "These contests have ended. You can still practice using their problems on the platform."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: missed.map((c) => /* @__PURE__ */ jsx(ContestCard, {
						c,
						status: "missed"
					}, c.url))
				})
			] }),
			live.length === 0 && upcoming.length === 0 && missed.length === 0 && /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: "No contests found."
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-right text-[11px] text-muted-foreground",
				children: [
					"Source:",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: "https://clist.by",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "underline underline-offset-2 hover:text-foreground",
						children: "clist.by"
					}),
					" ",
					"· All times in IST (UTC +5:30)"
				]
			})
		]
	});
}
//#endregion
export { TodayContestsSection as n, ContestsPageSection as t };

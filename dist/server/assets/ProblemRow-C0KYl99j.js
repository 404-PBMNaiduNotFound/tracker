import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { i as TooltipTrigger, n as TooltipContent, t as Tooltip } from "./tooltip-0uxD0LRD.js";
import { t as HoverHint } from "./HoverHint-BmTDH9bp.js";
import { t as Checkbox } from "./checkbox-kt6FvQcE.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { BadgeCheck, BookOpen, BookmarkCheck, BookmarkPlus, ExternalLink, Search, Trash2 } from "lucide-react";
//#region src/components/ProblemRow.tsx
var diffClass = {
	Easy: "text-easy",
	Medium: "text-medium",
	Hard: "text-hard"
};
function ProblemRow({ problem, onToggle, onDelete, onReview, readOnly, index = 0 }) {
	const id = `p-${problem.name.replace(/\W+/g, "-")}`;
	const [justDone, setJustDone] = useState(false);
	const toggle = (done) => {
		if (done) {
			setJustDone(true);
			window.setTimeout(() => setJustDone(false), 400);
		}
		onToggle?.(done);
	};
	return /* @__PURE__ */ jsxs("li", {
		style: { "--i": index },
		className: cn("stagger-item flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface/60 px-3 py-2.5 transition-colors duration-200", problem.done && "border-success/30 bg-success/5"),
		children: [
			/* @__PURE__ */ jsx(HoverHint, {
				hint: readOnly ? "View only — only today's problems can be marked done" : "Mark this problem done or not done",
				children: /* @__PURE__ */ jsx(Checkbox, {
					id,
					checked: problem.done,
					disabled: readOnly,
					onCheckedChange: (v) => toggle(Boolean(v)),
					"aria-label": `Mark ${problem.name} as done`,
					className: cn("size-5 transition-transform", justDone && "animate-pop-check")
				})
			}),
			/* @__PURE__ */ jsx("label", {
				htmlFor: id,
				className: cn("min-w-40 flex-1 cursor-pointer text-sm", problem.done && "text-muted-foreground line-through"),
				children: problem.name
			}),
			/* @__PURE__ */ jsx("span", {
				className: cn("text-xs font-semibold", diffClass[problem.difficulty]),
				children: problem.difficulty
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "flex items-center gap-1 text-xs text-muted-foreground",
				children: [problem.platform, /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx("span", {
						"aria-label": problem.linkVerified ? "Verified direct link to the problem" : "No verified link — opens a site search instead",
						children: problem.linkVerified ? /* @__PURE__ */ jsx(BadgeCheck, {
							className: "size-3.5 text-success",
							"aria-hidden": "true"
						}) : /* @__PURE__ */ jsx(Search, {
							className: "size-3.5 text-warning",
							"aria-hidden": "true"
						})
					})
				}), /* @__PURE__ */ jsx(TooltipContent, { children: problem.linkVerified ? "Verified direct problem link" : "Unverified — opens a search on the platform" })] })]
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "text-xs text-muted-foreground",
				children: [
					"~",
					problem.estTime,
					"m"
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1",
				children: [
					problem.platform === "LeetCode" && !problem.linkVerified ? null : (() => {
						const url = problem.link;
						const linkPlatform = url.includes("geeksforgeeks.org") ? "GFG" : url.includes("hackerrank.com") ? "HackerRank" : url.includes("w3schools.com") ? "W3Schools" : url.includes("leetcode.com") ? "LeetCode" : problem.platform;
						const hint = linkPlatform === "LeetCode" ? "Opens this problem directly on LeetCode" : `Opens this problem on ${linkPlatform}`;
						return /* @__PURE__ */ jsx(HoverHint, {
							hint,
							children: /* @__PURE__ */ jsx(Button, {
								asChild: true,
								variant: "ghost",
								size: "sm",
								className: "h-8 px-2",
								children: /* @__PURE__ */ jsxs("a", {
									href: url,
									target: "_blank",
									rel: "noreferrer",
									"aria-label": `Solve ${problem.name} on ${linkPlatform}`,
									children: [/* @__PURE__ */ jsx(ExternalLink, {
										className: "size-3.5",
										"aria-hidden": "true"
									}), /* @__PURE__ */ jsx("span", {
										className: "ml-1 text-xs",
										children: linkPlatform
									})]
								})
							})
						});
					})(),
					/* @__PURE__ */ jsx(HoverHint, {
						hint: "Opens the takeUforward article explaining this problem",
						children: /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "h-8 px-2",
							children: /* @__PURE__ */ jsxs("a", {
								href: problem.takeUForwardLink,
								target: "_blank",
								rel: "noreferrer",
								"aria-label": `Read the takeUforward article for ${problem.name}`,
								children: [/* @__PURE__ */ jsx(BookOpen, {
									className: "size-3.5",
									"aria-hidden": "true"
								}), /* @__PURE__ */ jsx("span", {
									className: "ml-1 text-xs",
									children: "TUF"
								})]
							})
						})
					}),
					onReview && /* @__PURE__ */ jsx(HoverHint, {
						hint: problem.forReview ? "Remove this problem from your Review tab" : "Flag this problem to revisit later in the Review tab",
						children: /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "icon",
							className: cn("size-8", problem.forReview ? "text-primary hover:text-primary" : "text-muted-foreground hover:text-primary"),
							"aria-label": problem.forReview ? `Remove ${problem.name} from review` : `Add ${problem.name} to review`,
							onClick: onReview,
							children: problem.forReview ? /* @__PURE__ */ jsx(BookmarkCheck, { className: "size-4" }) : /* @__PURE__ */ jsx(BookmarkPlus, { className: "size-4" })
						})
					}),
					onDelete && !problem.done && /* @__PURE__ */ jsx(HoverHint, {
						hint: "Moves this problem to tomorrow's plan instead of today",
						children: /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "icon",
							className: "size-8 text-muted-foreground hover:text-destructive",
							"aria-label": `Move ${problem.name} to tomorrow`,
							onClick: onDelete,
							children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
						})
					})
				]
			})
		]
	});
}
//#endregion
export { ProblemRow as t };

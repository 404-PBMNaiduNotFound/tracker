import { t as auth } from "./client-CNOuFmVY.js";
import { t as Route } from "./route-LRvn6O_I.js";
import { A as todayIso, _ as dayProgress, x as formatDate } from "./db-D4MFlxy2.js";
import { n as usePlan, t as PlanProvider } from "./usePlan-B2otzvj4.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { r as TooltipProvider } from "./tooltip-0uxD0LRD.js";
import { n as currentStreak } from "./gamification-BAEQMkA3.js";
import { a as timeToMinutes, o as SettingsProvider, r as showLocalReminder, s as useSettings } from "./push-BwHgHiPp.js";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { BarChart3, BookmarkCheck, CalendarDays, CalendarRange, Check, ChevronRight, Circle, CircleUser, Cloud, Code2, Flame, LayoutGrid, ListTodo, MonitorSmartphone, Moon, PauseCircle, Settings, Sun, Trophy } from "lucide-react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
//#region src/components/ReminderRunner.tsx
/**
* Upgrade 3: fires a local in-tab reminder when the user's chosen time
* passes while the app is open (instant, no network round-trip). The
* real background delivery for closed tabs — actual email (Resend) and
* push (FCM) — is handled by the `sendReminders` Firebase Cloud Function,
* scheduled every 15 minutes via Cloud Scheduler (see
* functions/src/index.ts). This component is just the fast local nudge
* on top of that.
*/
var STORAGE_KEY = "dsa:last-local-reminder";
function ReminderRunner() {
	const { settings } = useSettings();
	const { days } = usePlan();
	const daysRef = useRef(days);
	daysRef.current = days;
	useEffect(() => {
		if (!settings.pushEnabled || settings.paused) return;
		if (typeof window === "undefined") return;
		const tick = () => {
			const now = /* @__PURE__ */ new Date();
			if (now.getHours() * 60 + now.getMinutes() < timeToMinutes(settings.reminderTime)) return;
			const today = todayIso();
			if (window.localStorage.getItem(STORAGE_KEY) === today) return;
			const day = daysRef.current.find((d) => d.date === today);
			if (!day || day.skipped) return;
			const { done, total } = dayProgress(day);
			if (total === 0 || done >= total) return;
			window.localStorage.setItem(STORAGE_KEY, today);
			showLocalReminder("Today's DSA plan is waiting", `${total - done} of ${total} problems left — ${day.topic}`);
		};
		tick();
		const id = window.setInterval(tick, 6e4);
		return () => window.clearInterval(id);
	}, [
		settings.pushEnabled,
		settings.paused,
		settings.reminderTime
	]);
	return null;
}
//#endregion
//#region src/components/ui/dropdown-menu.tsx
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.SubTrigger, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.SubContent, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.CheckboxItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.RadioItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ jsx("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
//#endregion
//#region src/components/ThemeToggle.tsx
/** NEW FILE — Upgrade 2: dark/light toggle backed by the per-user settings row. */
var OPTIONS = [
	{
		value: "light",
		label: "Light",
		icon: Sun
	},
	{
		value: "dark",
		label: "Dark",
		icon: Moon
	},
	{
		value: "system",
		label: "System",
		icon: MonitorSmartphone
	}
];
function ThemeToggle() {
	const { settings, update } = useSettings();
	const active = OPTIONS.find((o) => o.value === settings.theme) ?? OPTIONS[1];
	const Icon = active.icon;
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx(Button, {
			variant: "ghost",
			size: "icon",
			"aria-label": `Theme: ${active.label}`,
			children: /* @__PURE__ */ jsx(Icon, { className: "size-5 transition-transform duration-300 ease-out" })
		})
	}), /* @__PURE__ */ jsx(DropdownMenuContent, {
		align: "end",
		children: OPTIONS.map((o) => /* @__PURE__ */ jsxs(DropdownMenuItem, {
			onSelect: () => void update({ theme: o.value }),
			className: o.value === settings.theme ? "font-semibold" : void 0,
			children: [
				/* @__PURE__ */ jsx(o.icon, { className: "mr-2 size-4" }),
				" ",
				o.label
			]
		}, o.value))
	})] });
}
//#endregion
//#region src/components/AppShell.tsx
var NAV = [
	{
		to: "/today",
		label: "Today",
		icon: ListTodo,
		hint: "Your daily checklist — topic, problems, notes, and today's contests at a glance."
	},
	{
		to: "/review",
		label: "Review",
		icon: BookmarkCheck,
		hint: "Problems you bookmarked for a second look — sorted by day and section."
	},
	{
		to: "/backlog",
		label: "Backlog",
		icon: CalendarDays,
		hint: "Past days you haven't fully completed. Insert a revision day to catch up."
	},
	{
		to: "/problems",
		label: "Problems",
		icon: Code2,
		hint: "775+ problems from 6 curated sheets — filter by platform, difficulty, or sheet."
	},
	{
		to: "/topics",
		label: "Topic View",
		icon: LayoutGrid,
		hint: "All 18 Striver A2Z sections. Expand any section, skip topics, track section progress."
	},
	{
		to: "/weeks",
		label: "Week View",
		icon: CalendarRange,
		hint: "Your 17-week roadmap. See every day's status and jump to any day directly."
	},
	{
		to: "/contests",
		label: "Contests",
		icon: Trophy,
		hint: "Live, upcoming & missed CP contests from LeetCode, Codeforces, CodeChef, AtCoder, HackerRank."
	},
	{
		to: "/progress",
		label: "Progress",
		icon: BarChart3,
		hint: "Streaks, badges, difficulty breakdown, weekly chart, and full event log."
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings,
		hint: "Adjust daily pace, shift schedule, pause plan, change password or theme."
	}
];
/** Bottom bar on phones keeps the four most-used destinations one tap away. */
var MOBILE_BAR = NAV.filter((n) => [
	"/today",
	"/backlog",
	"/progress",
	"/settings"
].includes(n.to));
/** Pill-shaped tab ribbon shown under the header — highlights active tab with its description. */
function TabRibbon({ activeHint }) {
	return /* @__PURE__ */ jsx("div", {
		className: "hidden md:block border-b border-border bg-muted/40",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-6xl px-4 py-2 flex items-center gap-2 min-h-[36px]",
			children: /* @__PURE__ */ jsx("span", {
				className: "text-xs text-muted-foreground leading-snug",
				children: activeHint
			})
		})
	});
}
/** Desktop-only floating pill nav — unique segmented control aesthetic */
function DesktopNav({ pathname }) {
	return /* @__PURE__ */ jsx("nav", {
		"aria-label": "Main",
		className: "hidden md:flex items-center ml-4",
		children: /* @__PURE__ */ jsx("div", {
			className: "flex items-center gap-0.5 rounded-xl border border-border bg-muted/60 p-1 backdrop-blur",
			children: NAV.map((n) => {
				const isActive = pathname.startsWith(n.to);
				const Icon = n.icon;
				return /* @__PURE__ */ jsxs(Link, {
					to: n.to,
					"aria-current": isActive ? "page" : void 0,
					className: cn("relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200 select-none whitespace-nowrap", isActive ? "bg-background text-foreground shadow-sm border border-border/60" : "text-muted-foreground hover:text-foreground hover:bg-background/50"),
					children: [
						/* @__PURE__ */ jsx(Icon, {
							className: cn("size-3.5 shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"),
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ jsx("span", { children: n.label }),
						isActive && /* @__PURE__ */ jsx("span", { className: "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-primary" })
					]
				}, n.to);
			})
		})
	});
}
function AppShell({ email, children }) {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { lastSynced, days } = usePlan();
	const { settings } = useSettings();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const streak = currentStreak(days);
	const pathname = useRouterState().location.pathname;
	useEffect(() => {
		setDrawerOpen(false);
	}, [pathname]);
	const activeNav = NAV.find((n) => pathname.startsWith(n.to)) ?? NAV[0];
	async function signOut$1() {
		await qc.cancelQueries();
		qc.clear();
		await signOut(auth);
		navigate({
			to: "/auth",
			search: { next: "/today" },
			replace: true
		});
	}
	return /* @__PURE__ */ jsxs(TooltipProvider, {
		delayDuration: 200,
		children: [
			drawerOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-40 bg-background/60 backdrop-blur-sm",
				"aria-hidden": "true",
				onClick: () => setDrawerOpen(false)
			}),
			/* @__PURE__ */ jsxs("aside", {
				"aria-label": "Navigation drawer",
				className: cn("fixed top-0 left-0 z-50 h-full w-72 bg-card border-r border-border shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]", drawerOpen ? "translate-x-0" : "-translate-x-full"),
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between border-b border-border px-5 py-4",
						children: [/* @__PURE__ */ jsxs(Link, {
							to: "/today",
							className: "flex items-center gap-2 font-display text-base font-semibold",
							onClick: () => setDrawerOpen(false),
							children: [/* @__PURE__ */ jsx(CalendarDays, {
								className: "size-5 text-primary",
								"aria-hidden": "true"
							}), "DSA Tracker"]
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setDrawerOpen(false),
							"aria-label": "Close navigation",
							className: "rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors",
							children: /* @__PURE__ */ jsxs("span", {
								className: "relative block size-4",
								children: [/* @__PURE__ */ jsx("span", {
									className: "absolute inset-0 flex items-center justify-center",
									children: /* @__PURE__ */ jsx("span", { className: "block h-px w-4 bg-current rotate-45" })
								}), /* @__PURE__ */ jsx("span", {
									className: "absolute inset-0 flex items-center justify-center",
									children: /* @__PURE__ */ jsx("span", { className: "block h-px w-4 bg-current -rotate-45" })
								})]
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 border-b border-border px-5 py-2.5 text-xs text-muted-foreground",
						children: [streak > 0 && /* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1 text-primary font-semibold",
							children: [
								/* @__PURE__ */ jsx(Flame, {
									className: "size-3.5 animate-streak",
									"aria-hidden": "true"
								}),
								streak,
								" day streak"
							]
						}), /* @__PURE__ */ jsxs("span", {
							className: "ml-auto flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(Cloud, { className: "size-3" }), lastSynced ? new Date(lastSynced).toLocaleTimeString() : "Not synced"]
						})]
					}),
					/* @__PURE__ */ jsx("nav", {
						"aria-label": "Drawer navigation",
						className: "flex-1 overflow-y-auto py-3 px-2",
						children: /* @__PURE__ */ jsx("ul", {
							className: "space-y-0.5",
							children: NAV.map((n) => {
								const isActive = pathname.startsWith(n.to);
								return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
									to: n.to,
									onClick: () => setDrawerOpen(false),
									className: cn("group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors", isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"),
									children: [
										/* @__PURE__ */ jsx(n.icon, {
											className: "size-4 mt-0.5 shrink-0",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ jsx("p", {
												className: cn("text-sm font-medium leading-tight", isActive && "font-semibold"),
												children: n.label
											}), /* @__PURE__ */ jsx("p", {
												className: "text-[11px] leading-snug mt-0.5 opacity-70 line-clamp-2",
												children: n.hint
											})]
										}),
										isActive && /* @__PURE__ */ jsx(ChevronRight, {
											className: "size-3.5 ml-auto mt-0.5 shrink-0 text-primary",
											"aria-hidden": "true"
										})
									]
								}) }, n.to);
							})
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "border-t border-border px-4 py-3 space-y-1",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "truncate text-[11px] text-muted-foreground px-1 mb-2",
								children: email
							}),
							/* @__PURE__ */ jsxs(Link, {
								to: "/settings",
								onClick: () => setDrawerOpen(false),
								className: "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors",
								children: [/* @__PURE__ */ jsx(Settings, { className: "size-4" }), " Settings"]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: () => void signOut$1(),
								className: "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors",
								children: [/* @__PURE__ */ jsx(CircleUser, { className: "size-4" }), " Log out"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-h-screen bg-background",
				children: [
					/* @__PURE__ */ jsx("header", {
						className: "sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur",
						children: /* @__PURE__ */ jsxs("div", {
							className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3",
							children: [
								/* @__PURE__ */ jsxs("button", {
									onClick: () => setDrawerOpen((v) => !v),
									"aria-label": "Open navigation",
									"aria-expanded": drawerOpen,
									className: "md:hidden flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
									children: [
										/* @__PURE__ */ jsx(activeNav.icon, {
											className: "size-4 text-primary shrink-0",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "hidden xs:inline",
											children: activeNav.label
										}),
										/* @__PURE__ */ jsx(ChevronRight, {
											className: cn("size-3.5 text-muted-foreground transition-transform duration-200", drawerOpen && "rotate-90"),
											"aria-hidden": "true"
										})
									]
								}),
								/* @__PURE__ */ jsxs(Link, {
									to: "/today",
									className: "flex items-center gap-2 font-display text-base font-semibold",
									children: [/* @__PURE__ */ jsx(CalendarDays, {
										className: "size-5 text-primary",
										"aria-hidden": "true"
									}), "DSA Tracker"]
								}),
								/* @__PURE__ */ jsx(DesktopNav, { pathname }),
								/* @__PURE__ */ jsxs("div", {
									className: "ml-auto flex items-center gap-1.5",
									children: [
										streak > 0 && /* @__PURE__ */ jsxs("span", {
											className: "hidden items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary sm:flex",
											"aria-label": `Current streak: ${streak} days`,
											children: [/* @__PURE__ */ jsx(Flame, {
												className: "size-3.5 animate-streak",
												"aria-hidden": "true"
											}), streak]
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "hidden items-center gap-1.5 text-xs text-muted-foreground lg:flex",
											children: [/* @__PURE__ */ jsx(Cloud, {
												className: "size-3.5",
												"aria-hidden": "true"
											}), lastSynced ? `Synced ${new Date(lastSynced).toLocaleTimeString()}` : "Not synced yet"]
										}),
										/* @__PURE__ */ jsx(ThemeToggle, {}),
										/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
											asChild: true,
											children: /* @__PURE__ */ jsx(Button, {
												variant: "ghost",
												size: "icon",
												"aria-label": "Account menu",
												children: /* @__PURE__ */ jsx(CircleUser, { className: "size-5" })
											})
										}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
											align: "end",
											className: "w-64",
											children: [
												/* @__PURE__ */ jsx(DropdownMenuLabel, {
													className: "truncate text-xs font-normal text-muted-foreground",
													children: email
												}),
												/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
												/* @__PURE__ */ jsx(DropdownMenuItem, {
													asChild: true,
													children: /* @__PURE__ */ jsxs(Link, {
														to: "/settings",
														children: [/* @__PURE__ */ jsx(Settings, { className: "mr-2 size-4" }), " Settings"]
													})
												}),
												/* @__PURE__ */ jsx(DropdownMenuItem, {
													onSelect: () => void signOut$1(),
													children: "Log out"
												})
											]
										})] })
									]
								})
							]
						})
					}),
					/* @__PURE__ */ jsx(TabRibbon, { activeHint: activeNav.hint }),
					settings.paused && /* @__PURE__ */ jsx("div", {
						role: "status",
						className: "animate-fade-in-up border-b border-warning/40 bg-warning/10",
						children: /* @__PURE__ */ jsxs("div", {
							className: "mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2 text-sm text-warning",
							children: [
								/* @__PURE__ */ jsx(PauseCircle, {
									className: "size-4",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ jsxs("span", { children: [
									"Preparation paused since ",
									formatDate(settings.pausedFrom ?? ""),
									". Your schedule keeps sliding forward and missed-week checks are off."
								] }),
								/* @__PURE__ */ jsx(Link, {
									to: "/settings",
									className: "ml-auto font-semibold underline underline-offset-4",
									children: "Resume"
								})
							]
						})
					}),
					/* @__PURE__ */ jsx("main", {
						className: "mx-auto max-w-6xl px-4 pb-28 pt-6 md:pb-24",
						children
					}),
					/* @__PURE__ */ jsx("nav", {
						"aria-label": "Quick navigation",
						className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden",
						children: /* @__PURE__ */ jsx("ul", {
							className: "grid grid-cols-4",
							children: MOBILE_BAR.map((n) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
								to: n.to,
								className: cn("flex flex-col items-center gap-0.5 px-2 py-2.5 text-[11px] text-muted-foreground transition-colors"),
								activeProps: { className: "text-primary font-semibold" },
								children: [/* @__PURE__ */ jsx(n.icon, {
									className: "size-5",
									"aria-hidden": "true"
								}), n.label]
							}) }, n.to))
						})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/route.tsx?tsr-split=component
function Layout() {
	const { user } = Route.useRouteContext();
	return /* @__PURE__ */ jsx(SettingsProvider, {
		userId: user.uid,
		children: /* @__PURE__ */ jsx(PlanBoundary, { email: user.email ?? "" })
	});
}
/** Settings must be loaded first: the pause flag suspends missed-week detection. */
function PlanBoundary({ email }) {
	const { settings, userId } = useSettings();
	return /* @__PURE__ */ jsx(PlanProvider, {
		userId,
		paused: settings.paused,
		children: /* @__PURE__ */ jsxs(AppShell, {
			email,
			children: [/* @__PURE__ */ jsx(ReminderRunner, {}), /* @__PURE__ */ jsx(Outlet, {})]
		})
	});
}
//#endregion
export { Layout as component };

import { t as Route$11 } from "./route-LRvn6O_I.js";
import { t as Route$12 } from "./reset-password-CkI3oxwu.js";
import { n as Route$13 } from "./problems-B_djWpsm.js";
import { t as Route$14 } from "./day._dayNumber-CYTeC9ZQ.js";
import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
//#region src/styles.css?url
var styles_default = "/dsatracker/assets/styles-D1nwrxyf.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "120-Day Striver A2Z DSA Tracker" },
			{
				name: "description",
				content: "A guided 120-day plan through Striver's A2Z DSA sheet: daily problems, checklists, AI explanations and cloud-synced progress."
			},
			{
				property: "og:title",
				content: "120-Day Striver A2Z DSA Tracker"
			},
			{
				property: "og:description",
				content: "A guided 120-day plan through Striver's A2Z DSA sheet: daily problems, checklists, AI explanations and cloud-synced progress."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			},
			{
				name: "twitter:title",
				content: "120-Day Striver A2Z DSA Tracker"
			},
			{
				name: "twitter:description",
				content: "A guided 120-day plan through Striver's A2Z DSA sheet: daily problems, checklists, AI explanations and cloud-synced progress."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e2af0211-1ad0-47f6-8451-28534595a2fb/id-preview-cfa8bcbc--e0a6fd21-88bc-4a9f-aeef-188c749dc792.lovable.app-1785469698989.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e2af0211-1ad0-47f6-8451-28534595a2fb/id-preview-cfa8bcbc--e0a6fd21-88bc-4a9f-aeef-188c749dc792.lovable.app-1785469698989.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		],
		scripts: []
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ jsxs(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster$1, { position: "top-center" })]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$9 = () => import("./routes-DZ-3qDGq.js");
var Route$9 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "120-Day Striver A2Z DSA Tracker" },
		{
			name: "description",
			content: "Finish Striver's A2Z DSA sheet in 120 days. Daily problem checklists, AI mentor, cloud-synced progress, and a schedule that reshapes itself when life happens."
		},
		{
			property: "og:title",
			content: "120-Day Striver A2Z DSA Tracker"
		},
		{
			property: "og:description",
			content: "Finish Striver's A2Z DSA sheet in 120 days. Daily problem checklists, AI mentor, cloud-synced progress, and a schedule that reshapes itself when life happens."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
//#endregion
//#region src/routes/auth.tsx
var $$splitComponentImporter$8 = () => import("./auth-ehDFD80O.js");
var Route$8 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign in — A2Z DSA Tracker" },
		{
			name: "description",
			content: "Sign in to sync your Striver A2Z DSA progress across every device."
		},
		{
			property: "og:title",
			content: "Sign in — A2Z DSA Tracker"
		},
		{
			property: "og:description",
			content: "Sign in to sync your Striver A2Z DSA progress across every device."
		}
	] }),
	validateSearch: (s) => ({ next: s.next || "/today" }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
/** Firebase's auth/* error codes -> the same friendly copy Supabase's messages used to give. */
//#endregion
//#region src/routes/_authenticated/backlog.tsx
var $$splitComponentImporter$7 = () => import("./backlog-1daMO-IM.js");
var Route$7 = createFileRoute("/_authenticated/backlog")({
	head: () => ({ meta: [
		{ title: "Backlog — 120-Day Striver A2Z DSA Tracker" },
		{
			name: "description",
			content: "Every past day you have not finished yet, so nothing from the A2Z sheet slips."
		},
		{
			property: "og:title",
			content: "Backlog — A2Z DSA Tracker"
		},
		{
			property: "og:description",
			content: "Catch up on unfinished DSA study days."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
//#endregion
//#region src/routes/_authenticated/contests.tsx
var $$splitComponentImporter$6 = () => import("./contests-DNsUqnCp.js");
var Route$6 = createFileRoute("/_authenticated/contests")({
	head: () => ({ meta: [{ title: "Contests — 120-Day Striver A2Z DSA Tracker" }, {
		name: "description",
		content: "Live, upcoming, and missed CP contests from LeetCode, Codeforces, CodeChef, HackerRank, and AtCoder."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/routes/_authenticated/progress.tsx
var $$splitComponentImporter$5 = () => import("./progress-Cqm4szix.js");
var Route$5 = createFileRoute("/_authenticated/progress")({
	head: () => ({ meta: [
		{ title: "Progress — 120-Day Striver A2Z DSA Tracker" },
		{
			name: "description",
			content: "Overall completion, streaks, per-section stats and the log of every schedule change."
		},
		{
			property: "og:title",
			content: "Progress — A2Z DSA Tracker"
		},
		{
			property: "og:description",
			content: "Stats and history for your 120-day DSA plan."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/_authenticated/review.tsx
var $$splitComponentImporter$4 = () => import("./review-D5w4qgiu.js");
var Route$4 = createFileRoute("/_authenticated/review")({
	head: () => ({ meta: [
		{ title: "Review — 120-Day Striver A2Z DSA Tracker" },
		{
			name: "description",
			content: "Every problem you flagged for review from Today, in one place from any day."
		},
		{
			property: "og:title",
			content: "Review — A2Z DSA Tracker"
		},
		{
			property: "og:description",
			content: "Your flagged-for-review problems, all in one place."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/_authenticated/settings.tsx
var $$splitComponentImporter$3 = () => import("./settings-a7WjqDTS.js");
var Route$3 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [
		{ title: "Settings — 120-Day Striver A2Z DSA Tracker" },
		{
			name: "description",
			content: "Manage your account, daily problem pace, reminders, theme and pause your preparation."
		},
		{
			property: "og:title",
			content: "Settings — A2Z DSA Tracker"
		},
		{
			property: "og:description",
			content: "Account, daily pace, reminders and pause controls for your DSA plan."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/_authenticated/today.tsx
var $$splitComponentImporter$2 = () => import("./today-D7aBTAYT.js");
var Route$2 = createFileRoute("/_authenticated/today")({
	head: () => ({ meta: [
		{ title: "Today — 120-Day Striver A2Z DSA Tracker" },
		{
			name: "description",
			content: "Your daily DSA checklist: today's topic, problems, notes and AI explanations from Striver's A2Z sheet."
		},
		{
			property: "og:title",
			content: "Today — 120-Day Striver A2Z DSA Tracker"
		},
		{
			property: "og:description",
			content: "Track today's Striver A2Z problems, checklist and AI notes."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/_authenticated/topics.tsx
var $$splitComponentImporter$1 = () => import("./topics-CdUlEzUZ.js");
var Route$1 = createFileRoute("/_authenticated/topics")({
	head: () => ({ meta: [
		{ title: "Topic View — 120-Day Striver A2Z DSA Tracker" },
		{
			name: "description",
			content: "Browse all 18 Striver A2Z sections, see per-section progress and jump into any study day."
		},
		{
			property: "og:title",
			content: "Topic View — A2Z DSA Tracker"
		},
		{
			property: "og:description",
			content: "All 18 A2Z sections with progress at a glance."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/_authenticated/weeks.tsx
var $$splitComponentImporter = () => import("./weeks-CKZp-J1t.js");
var Route = createFileRoute("/_authenticated/weeks")({
	head: () => ({ meta: [
		{ title: "Week View — 120-Day Striver A2Z DSA Tracker" },
		{
			name: "description",
			content: "See your 120-day DSA plan grouped week by week with progress for each week."
		},
		{
			property: "og:title",
			content: "Week View — A2Z DSA Tracker"
		},
		{
			property: "og:description",
			content: "Your DSA plan, week by week."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var AuthenticatedRouteRoute = Route$11.update({
	id: "/_authenticated",
	getParentRoute: () => Route$10
});
var AuthRoute = Route$8.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$10
});
var ResetPasswordRoute = Route$12.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$10
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedBacklogRoute: Route$7.update({
		id: "/backlog",
		path: "/backlog",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedContestsRoute: Route$6.update({
		id: "/contests",
		path: "/contests",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedProblemsRoute: Route$13.update({
		id: "/problems",
		path: "/problems",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedProgressRoute: Route$5.update({
		id: "/progress",
		path: "/progress",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedReviewRoute: Route$4.update({
		id: "/review",
		path: "/review",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedSettingsRoute: Route$3.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedTodayRoute: Route$2.update({
		id: "/today",
		path: "/today",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedTopicsRoute: Route$1.update({
		id: "/topics",
		path: "/topics",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedWeeksRoute: Route.update({
		id: "/weeks",
		path: "/weeks",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedDayDayNumberRoute: Route$14.update({
		id: "/day/$dayNumber",
		path: "/day/$dayNumber",
		getParentRoute: () => AuthenticatedRouteRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ResetPasswordRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

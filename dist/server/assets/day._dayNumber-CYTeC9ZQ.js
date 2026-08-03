import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/_authenticated/day.$dayNumber.tsx
var $$splitComponentImporter = () => import("./day._dayNumber-CdwuVqGQ.js");
var Route = createFileRoute("/_authenticated/day/$dayNumber")({
	head: () => ({ meta: [
		{ title: "Day detail — 120-Day Striver A2Z DSA Tracker" },
		{
			name: "description",
			content: "Problems, checklist, notes, AI explainer and doubt chat for a single study day."
		},
		{
			property: "og:title",
			content: "Day detail — A2Z DSA Tracker"
		},
		{
			property: "og:description",
			content: "Open one day of your 120-day DSA plan."
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
export { Route as t };

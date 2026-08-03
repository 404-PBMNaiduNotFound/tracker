import { i as waitForAuthUser } from "./client-CNOuFmVY.js";
import { createFileRoute, lazyRouteComponent, redirect } from "@tanstack/react-router";
//#region src/routes/_authenticated/route.tsx
var $$splitComponentImporter = () => import("./route-DrY7d42m.js");
var Route = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const user = await waitForAuthUser();
		if (!user) throw redirect({
			to: "/auth",
			search: { next: "/today" }
		});
		return { user };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Settings must be loaded first: the pause flag suspends missed-week detection. */
//#endregion
export { Route as t };

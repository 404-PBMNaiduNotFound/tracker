import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/reset-password.tsx
var $$splitComponentImporter = () => import("./reset-password-utnUelzE.js");
var Route = createFileRoute("/reset-password")({
	head: () => ({ meta: [
		{ title: "Reset password — A2Z DSA Tracker" },
		{
			name: "description",
			content: "Choose a new password for your A2Z DSA Tracker account."
		},
		{
			property: "og:title",
			content: "Reset password — A2Z DSA Tracker"
		},
		{
			property: "og:description",
			content: "Choose a new password for your tracker account."
		}
	] }),
	validateSearch: (s) => ({ oobCode: s.oobCode || "" }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

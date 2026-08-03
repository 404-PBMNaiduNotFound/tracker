import { i as TooltipTrigger, n as TooltipContent, t as Tooltip } from "./tooltip-0uxD0LRD.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/HoverHint.tsx
/**
* Wraps any element (button, link, ConfirmDialog trigger, …) with a small
* hover tooltip explaining what it does. Works even when the wrapped
* control is `disabled`, since the tooltip listens on the surrounding span
* rather than the (pointer-events: none) control itself.
*/
function HoverHint({ hint, children }) {
	return /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx("span", {
			className: "inline-flex",
			children
		})
	}), /* @__PURE__ */ jsx(TooltipContent, {
		className: "max-w-56 text-center",
		children: hint
	})] });
}
//#endregion
export { HoverHint as t };

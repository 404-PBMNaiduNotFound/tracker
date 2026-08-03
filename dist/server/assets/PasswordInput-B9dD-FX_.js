import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { forwardRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Eye, EyeOff } from "lucide-react";
//#region src/components/PasswordInput.tsx
/** NEW FILE — Upgrade 5a: password field with a show/hide (eye) toggle. */
var PasswordInput = forwardRef(function PasswordInput({ className, ...props }, ref) {
	const [show, setShow] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [/* @__PURE__ */ jsx(Input, {
			ref,
			...props,
			type: show ? "text" : "password",
			className: cn("pr-10", className)
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "ghost",
			size: "icon",
			tabIndex: -1,
			"aria-label": show ? "Hide password" : "Show password",
			"aria-pressed": show,
			onClick: () => setShow((v) => !v),
			className: "absolute right-0 top-0 size-9 text-muted-foreground transition-colors hover:text-foreground",
			children: show ? /* @__PURE__ */ jsx(EyeOff, { className: "size-4" }) : /* @__PURE__ */ jsx(Eye, { className: "size-4" })
		})]
	});
});
//#endregion
export { PasswordInput as t };

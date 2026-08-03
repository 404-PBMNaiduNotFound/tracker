import { t as auth } from "./client-CNOuFmVY.js";
import { t as Route } from "./reset-password-CkI3oxwu.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as PasswordInput } from "./PasswordInput-B9dD-FX_.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CtX3ithx.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
//#region src/routes/reset-password.tsx?tsr-split=component
function ResetPassword() {
	const { oobCode } = Route.useSearch();
	const [password, setPassword] = useState("");
	const [busy, setBusy] = useState(false);
	const [checking, setChecking] = useState(true);
	const [validCode, setValidCode] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (!oobCode) {
			setChecking(false);
			return;
		}
		verifyPasswordResetCode(auth, oobCode).then(() => setValidCode(true)).catch(() => setValidCode(false)).finally(() => setChecking(false));
	}, [oobCode]);
	async function submit() {
		if (password.length < 8) return toast.error("Password must be at least 8 characters");
		setBusy(true);
		try {
			await confirmPasswordReset(auth, oobCode, password);
			toast.success("Password updated");
			navigate({
				to: "/auth",
				search: { next: "/today" }
			});
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Could not reset your password.");
		} finally {
			setBusy(false);
		}
	}
	if (checking) return /* @__PURE__ */ jsx("main", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ jsx(Skeleton, { className: "h-64 w-full max-w-md" })
	});
	if (!oobCode || !validCode) return /* @__PURE__ */ jsx("main", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ jsx(Card, {
			className: "w-full max-w-md",
			children: /* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "This reset link is invalid or expired" }), /* @__PURE__ */ jsx(CardDescription, { children: "Request a new reset link from the sign-in page and try again." })] })
		})
	});
	return /* @__PURE__ */ jsx("main", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ jsxs(Card, {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Set a new password" }), /* @__PURE__ */ jsx(CardDescription, { children: "Open this page from the reset link in your email." })] }), /* @__PURE__ */ jsxs(CardContent, {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "np",
						children: "New password"
					}), /* @__PURE__ */ jsx(PasswordInput, {
						id: "np",
						autoComplete: "new-password",
						value: password,
						onChange: (e) => setPassword(e.target.value)
					})]
				}), /* @__PURE__ */ jsx(Button, {
					className: "w-full",
					disabled: busy,
					onClick: () => void submit(),
					children: "Update password"
				})]
			})]
		})
	});
}
//#endregion
export { ResetPassword as component };

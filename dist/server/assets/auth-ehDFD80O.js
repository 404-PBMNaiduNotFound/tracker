import { t as auth } from "./client-CNOuFmVY.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.js";
import { t as PasswordInput } from "./PasswordInput-B9dD-FX_.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CtX3ithx.js";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { Loader2 } from "lucide-react";
import { z } from "zod";
//#region src/routes/auth.tsx?tsr-split=component
var emailSchema = z.string().trim().email("Enter a valid email address").max(255);
var passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(72);
/** Firebase's auth/* error codes -> the same friendly copy Supabase's messages used to give. */
function authErrorMessage(e) {
	if (e instanceof FirebaseError) switch (e.code) {
		case "auth/invalid-credential":
		case "auth/wrong-password":
		case "auth/user-not-found": return "Invalid email or password.";
		case "auth/email-already-in-use": return "An account with this email already exists.";
		case "auth/weak-password": return "Password must be at least 8 characters.";
		case "auth/popup-closed-by-user": return "Google sign-in was cancelled.";
		case "auth/too-many-requests": return "Too many attempts — please wait a moment and try again.";
		default: return e.message;
	}
	return e instanceof Error ? e.message : "Something went wrong.";
}
function AuthPage() {
	const navigate = useNavigate();
	const { next } = useSearch({ from: "/auth" });
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [busy, setBusy] = useState(false);
	const [sentReset, setSentReset] = useState(false);
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) navigate({
				to: next,
				replace: true
			});
		});
		return () => unsub();
	}, [navigate, next]);
	const validate = () => {
		const e = emailSchema.safeParse(email);
		if (!e.success) {
			toast.error(e.error.issues[0].message);
			return null;
		}
		const p = passwordSchema.safeParse(password);
		if (!p.success) {
			toast.error(p.error.issues[0].message);
			return null;
		}
		return {
			email: e.data,
			password: p.data
		};
	};
	async function signIn() {
		const v = validate();
		if (!v) return;
		setBusy(true);
		try {
			await signInWithEmailAndPassword(auth, v.email, v.password);
			navigate({
				to: next,
				replace: true
			});
		} catch (e) {
			toast.error(authErrorMessage(e));
		} finally {
			setBusy(false);
		}
	}
	async function signUp() {
		const v = validate();
		if (!v) return;
		setBusy(true);
		try {
			await createUserWithEmailAndPassword(auth, v.email, v.password);
			navigate({
				to: next,
				replace: true
			});
		} catch (e) {
			toast.error(authErrorMessage(e));
		} finally {
			setBusy(false);
		}
	}
	async function google() {
		try {
			const provider = new GoogleAuthProvider();
			try {
				await signInWithPopup(auth, provider);
				navigate({
					to: next,
					replace: true
				});
			} catch (e) {
				if (e instanceof FirebaseError && e.code === "auth/popup-blocked") {
					await signInWithRedirect(auth, provider);
					return;
				}
				throw e;
			}
		} catch (e) {
			toast.error("Google sign-in failed", { description: authErrorMessage(e) });
		}
	}
	async function forgot() {
		const e = emailSchema.safeParse(email);
		if (!e.success) return toast.error("Enter your email first");
		try {
			await sendPasswordResetEmail(auth, e.data, {
				url: `${window.location.origin}/reset-password`,
				handleCodeInApp: true
			});
			setSentReset(true);
			toast.success("Reset link sent — check your inbox.");
		} catch (err) {
			toast.error(authErrorMessage(err));
		}
	}
	return /* @__PURE__ */ jsx("main", {
		className: "flex min-h-screen items-center justify-center px-4 py-10",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ jsxs(Link, {
				to: "/",
				className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
				children: [/* @__PURE__ */ jsx("svg", {
					width: "16",
					height: "16",
					viewBox: "0 0 16 16",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("path", {
						d: "M10 12L6 8l4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}), "Back to home"]
			}), /* @__PURE__ */ jsxs(Card, {
				className: "w-full border-border bg-card",
				children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, {
					className: "text-2xl",
					children: "A2Z DSA Tracker"
				}), /* @__PURE__ */ jsx(CardDescription, { children: "474 problems · 18 sections · 120 days. Sign in to sync progress across devices." })] }), /* @__PURE__ */ jsxs(CardContent, {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ jsx(Button, {
							variant: "secondary",
							className: "w-full",
							onClick: () => void google(),
							children: "Continue with Google"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-border" }),
								" or use email",
								" ",
								/* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-border" })
							]
						}),
						/* @__PURE__ */ jsxs(Tabs, {
							defaultValue: "signin",
							children: [
								/* @__PURE__ */ jsxs(TabsList, {
									className: "grid w-full grid-cols-2",
									children: [/* @__PURE__ */ jsx(TabsTrigger, {
										value: "signin",
										children: "Log in"
									}), /* @__PURE__ */ jsx(TabsTrigger, {
										value: "signup",
										children: "Sign up"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4 space-y-3",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ jsx(Label, {
											htmlFor: "email",
											children: "Email"
										}), /* @__PURE__ */ jsx(Input, {
											id: "email",
											type: "email",
											autoComplete: "email",
											value: email,
											onChange: (e) => setEmail(e.target.value)
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ jsx(Label, {
											htmlFor: "password",
											children: "Password"
										}), /* @__PURE__ */ jsx(PasswordInput, {
											id: "password",
											autoComplete: "current-password",
											value: password,
											onChange: (e) => setPassword(e.target.value)
										})]
									})]
								}),
								/* @__PURE__ */ jsxs(TabsContent, {
									value: "signin",
									className: "mt-4 space-y-3",
									children: [/* @__PURE__ */ jsxs(Button, {
										className: "w-full",
										disabled: busy,
										onClick: () => void signIn(),
										children: [busy && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 size-4 animate-spin" }), " Log in"]
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => void forgot(),
										className: "w-full text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground",
										children: sentReset ? "Reset link sent" : "Forgot password?"
									})]
								}),
								/* @__PURE__ */ jsx(TabsContent, {
									value: "signup",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(Button, {
										className: "w-full",
										disabled: busy,
										onClick: () => void signUp(),
										children: [busy && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 size-4 animate-spin" }), " Create account"]
									})
								})
							]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { AuthPage as component };

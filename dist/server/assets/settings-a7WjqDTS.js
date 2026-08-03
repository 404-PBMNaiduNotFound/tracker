import { t as auth } from "./client-CNOuFmVY.js";
import { A as todayIso, b as diffDays, f as updateUserProfile, g as addDays, t as deleteAccountData, v as daysNeeded, x as formatDate } from "./db-D4MFlxy2.js";
import { n as usePlan } from "./usePlan-B2otzvj4.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as ConfirmDialog } from "./ConfirmDialog-DGz2w5aA.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { i as subscribeDevice, n as requestPushPermission, s as useSettings, t as pushState } from "./push-BwHgHiPp.js";
import { t as PasswordInput } from "./PasswordInput-B9dD-FX_.js";
import * as React from "react";
import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, deleteUser, linkWithPopup, updatePassword, updateProfile } from "firebase/auth";
import { Bell, PauseCircle, PlayCircle, Sliders, UserCog } from "lucide-react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
//#region src/components/ui/switch.tsx
var Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SwitchPrimitives.Root, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ jsx(SwitchPrimitives.Thumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = SwitchPrimitives.Root.displayName;
//#endregion
//#region src/components/ui/separator.tsx
var Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(SeparatorPrimitive.Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = SeparatorPrimitive.Root.displayName;
//#endregion
//#region src/routes/_authenticated/settings.tsx?tsr-split=component
function Section({ icon: Icon, title, description, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "card-hover mb-6 rounded-xl border border-border bg-card p-5 animate-fade-in-up",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex items-start gap-3",
			children: [/* @__PURE__ */ jsx(Icon, {
				className: "mt-0.5 size-5 text-primary",
				"aria-hidden": "true"
			}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
				className: "font-display text-lg font-semibold",
				children: title
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: description
			})] })]
		}), children]
	});
}
function SettingsPage() {
	const { settings, loading, update, userId } = useSettings();
	const { days, loading: planLoading, rebalance, shiftSchedule } = usePlan();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [name, setName] = useState(() => auth.currentUser?.displayName ?? "");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [busy, setBusy] = useState(false);
	const [counts, setCounts] = useState(settings.counts);
	const [countsDirty, setCountsDirty] = useState(false);
	const preview = useMemo(() => {
		const remaining = days.flatMap((d) => d.problems.filter((p) => !p.done));
		const need = daysNeeded(remaining, counts);
		const doneDays = days.filter((d) => d.problems.length > 0 && d.problems.every((p) => p.done)).length;
		return {
			remaining: remaining.length,
			need,
			finish: addDays(todayIso(), need),
			doneDays
		};
	}, [days, counts]);
	async function saveAccount() {
		setBusy(true);
		try {
			if (password || confirm) {
				if (password.length < 8) throw new Error("Password must be at least 8 characters.");
				if (password !== confirm) throw new Error("The two passwords do not match.");
			}
			const user = auth.currentUser;
			if (!user) throw new Error("Not signed in.");
			if (!name.trim() && !password) throw new Error("Nothing to update.");
			if (name.trim()) {
				await updateProfile(user, { displayName: name.trim() });
				await updateUserProfile(userId, { displayName: name.trim() });
			}
			if (password) await updatePassword(user, password);
			setPassword("");
			setConfirm("");
			toast.success("Account updated");
		} catch (e) {
			const needsReauth = e instanceof FirebaseError && e.code === "auth/requires-recent-login";
			toast.error("Could not update your account", { description: needsReauth ? "For security, please sign out and sign back in before changing your password." : e instanceof Error ? e.message : "Please try again." });
		} finally {
			setBusy(false);
		}
	}
	async function linkGoogle() {
		try {
			const user = auth.currentUser;
			if (!user) throw new Error("Not signed in.");
			await linkWithPopup(user, new GoogleAuthProvider());
			toast.success("Google account connected");
		} catch (e) {
			const already = e instanceof FirebaseError && e.code === "auth/credential-already-in-use";
			toast.error(already ? "That Google account is already linked elsewhere" : "Google sign-in failed", { description: e instanceof Error ? e.message : String(e) });
		}
	}
	async function applyCounts() {
		setBusy(true);
		try {
			await update({ counts });
			const res = await rebalance(counts);
			setCountsDirty(false);
			toast.success("Daily pace updated", { description: `Remaining problems redistributed — plan is now ${res.after} days (was ${res.before}), finishing ${formatDate(res.finish)}.` });
		} finally {
			setBusy(false);
		}
	}
	async function togglePush(on) {
		if (!on) {
			await update({ pushEnabled: false });
			return;
		}
		const state = await requestPushPermission();
		if (state !== "granted") {
			toast.error(state === "unsupported" ? "This browser does not support notifications" : "Notification permission was blocked", { description: "Check your browser notification settings and try again." });
			return;
		}
		if (!await subscribeDevice(userId)) {
			toast.error("Could not register this device for push", { description: "Make sure VITE_FIREBASE_VAPID_KEY is set in your .env and the firebase-messaging-sw.js service worker is deployed. Check the browser console for details." });
			return;
		}
		await update({ pushEnabled: true });
		toast.success("Browser reminders on");
	}
	async function pause() {
		const from = todayIso();
		await update({
			paused: true,
			pausedFrom: from,
			pausedDays: 0
		});
		toast.info("Preparation paused", { description: "Your schedule stops sliding when you resume. Missed-week checks are off." });
	}
	async function resume() {
		const from = settings.pausedFrom ?? todayIso();
		const gap = Math.max(0, diffDays(from, todayIso()));
		const finish = gap > 0 ? await shiftSchedule(from, gap) : days[days.length - 1]?.date;
		await update({
			paused: false,
			pausedFrom: null,
			pausedDays: settings.pausedDays + gap,
			resumeDate: todayIso()
		});
		toast.success("Welcome back", { description: gap > 0 ? `Everything shifted forward by ${gap} day(s). New finish date ${formatDate(finish ?? "")}.` : "Nothing to shift — you resumed the same day." });
	}
	async function deleteAccount() {
		try {
			await deleteAccountData(userId);
			const user = auth.currentUser;
			if (user) await deleteUser(user);
			await qc.cancelQueries();
			qc.clear();
			toast.success("Your data has been deleted.");
			navigate({
				to: "/auth",
				search: { next: "/today" },
				replace: true
			});
		} catch (e) {
			const needsReauth = e instanceof FirebaseError && e.code === "auth/requires-recent-login";
			toast.error("Could not delete your account", { description: needsReauth ? "For security, please sign out and sign back in, then try deleting your account again." : e instanceof Error ? e.message : "Please try again." });
		}
	}
	if (loading || planLoading) return /* @__PURE__ */ jsx(Skeleton, { className: "h-96 w-full" });
	const pushPerm = pushState();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("h1", {
			className: "mb-1 text-2xl font-bold tracking-tight",
			children: "Settings"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-6 text-sm text-muted-foreground",
			children: "Account, pace, reminders and pause controls."
		}),
		/* @__PURE__ */ jsxs(Section, {
			icon: Sliders,
			title: "Daily problem pace",
			description: "How many problems of each difficulty you want per day. Changing this redistributes only the problems you have not finished yet.",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						"easy",
						"medium",
						"hard"
					].map((k) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs(Label, {
						htmlFor: `count-${k}`,
						className: "capitalize",
						children: [k, " per day"]
					}), /* @__PURE__ */ jsx(Input, {
						id: `count-${k}`,
						type: "number",
						min: 1,
						max: 20,
						value: counts[k],
						onChange: (e) => {
							const v = Math.max(1, Math.min(20, Number(e.target.value) || 1));
							setCounts((c) => ({
								...c,
								[k]: v
							}));
							setCountsDirty(true);
						},
						className: "mt-1.5"
					})] }, k))
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: [
						preview.remaining,
						" problems left → about ",
						/* @__PURE__ */ jsx("strong", { children: preview.need }),
						" more days. Completed days are never touched."
					]
				}),
				/* @__PURE__ */ jsx(Button, {
					className: "mt-4",
					disabled: !countsDirty || busy,
					onClick: () => void applyCounts(),
					children: "Apply & redistribute"
				})
			]
		}),
		/* @__PURE__ */ jsxs(Section, {
			icon: settings.paused ? PlayCircle : PauseCircle,
			title: "Pause preparation",
			description: "Taking exams or a holiday? Pausing freezes your schedule — when you resume, every upcoming day slides forward by the time you were away, and missed-week detection stays off in the meantime.",
			children: [settings.paused ? /* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-sm",
					children: [
						"Paused since ",
						/* @__PURE__ */ jsx("strong", { children: formatDate(settings.pausedFrom ?? "") }),
						" —",
						" ",
						Math.max(0, diffDays(settings.pausedFrom ?? todayIso(), todayIso())),
						" day(s) so far."
					]
				}), /* @__PURE__ */ jsx(Button, {
					onClick: () => void resume(),
					className: "ml-auto",
					children: "Resume preparation"
				})]
			}) : /* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: () => void pause(),
				children: "Pause my preparation"
			}), settings.pausedDays > 0 && /* @__PURE__ */ jsxs("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: [
					"Total time paused so far: ",
					settings.pausedDays,
					" day(s)."
				]
			})]
		}),
		/* @__PURE__ */ jsx(Section, {
			icon: Bell,
			title: "Reminders",
			description: "A nudge when you still have problems left for the day.",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "push",
						children: "Browser notifications"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: pushPerm === "unsupported" ? "Not supported in this browser." : pushPerm === "denied" ? "Blocked — enable notifications for this site in your browser settings." : "Shown on this device at your reminder time."
					})] }), /* @__PURE__ */ jsx(Switch, {
						id: "push",
						checked: settings.pushEnabled,
						disabled: pushPerm === "unsupported" || pushPerm === "denied",
						onCheckedChange: (v) => void togglePush(v)
					})]
				}), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Label, {
						htmlFor: "time",
						children: "Reminder time"
					}),
					/* @__PURE__ */ jsx(Input, {
						id: "time",
						type: "time",
						value: settings.reminderTime,
						onChange: (e) => void update({ reminderTime: e.target.value }),
						className: "mt-1.5 w-40"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-1.5 text-xs text-muted-foreground",
						children: ["Timezone: ", settings.timezone]
					})
				] })]
			})
		}),
		/* @__PURE__ */ jsxs(Section, {
			icon: UserCog,
			title: "Account",
			description: "Change your display name or password, connect Google, or delete everything.",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "name",
								children: "Display name"
							}), /* @__PURE__ */ jsx(Input, {
								id: "name",
								value: name,
								placeholder: "Your name",
								autoComplete: "name",
								onChange: (e) => setName(e.target.value),
								className: "mt-1.5"
							})]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "pw",
							children: "New password"
						}), /* @__PURE__ */ jsx(PasswordInput, {
							id: "pw",
							value: password,
							autoComplete: "new-password",
							onChange: (e) => setPassword(e.target.value),
							className: "mt-1.5"
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "pw2",
							children: "Confirm new password"
						}), /* @__PURE__ */ jsx(PasswordInput, {
							id: "pw2",
							value: confirm,
							autoComplete: "new-password",
							onChange: (e) => setConfirm(e.target.value),
							className: "mt-1.5"
						})] })
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ jsx(Button, {
						disabled: busy,
						onClick: () => void saveAccount(),
						children: "Save changes"
					}), /* @__PURE__ */ jsx(Button, {
						variant: "outline",
						onClick: () => void linkGoogle(),
						children: "Continue with Google"
					})]
				}),
				/* @__PURE__ */ jsx(Separator, { className: "my-5" }),
				/* @__PURE__ */ jsx(ConfirmDialog, {
					title: "Delete your account data?",
					description: "This permanently removes your entire plan, notes, AI caches, achievements and chat history. This cannot be undone.",
					confirmWord: "DELETE",
					confirmLabel: "Delete everything",
					onConfirm: deleteAccount,
					trigger: /* @__PURE__ */ jsx(Button, {
						variant: "outline",
						className: "text-destructive",
						children: "Delete my account & data"
					})
				})
			]
		})
	] });
}
//#endregion
export { SettingsPage as component };

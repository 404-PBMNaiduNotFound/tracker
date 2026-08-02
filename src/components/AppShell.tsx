"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/integrations/firebase/client";
import { usePlan } from "@/hooks/usePlan";
import { useSettings } from "@/hooks/useSettings";
import { currentStreak } from "@/lib/gamification";
import { formatDate } from "@/lib/plan";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  CalendarDays,
  CircleUser,
  Cloud,
  Flame,
  ListTodo,
  PauseCircle,
  Settings,
  LayoutGrid,
  CalendarRange,
  BarChart3,
  BookmarkCheck,
  Code2,
  Trophy,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  {
    to: "/today",
    label: "Today",
    icon: ListTodo,
    hint: "Your daily checklist — topic, problems, notes, and today's contests at a glance.",
  },
  {
    to: "/review",
    label: "Review",
    icon: BookmarkCheck,
    hint: "Problems you bookmarked for a second look — sorted by day and section.",
  },
  {
    to: "/backlog",
    label: "Backlog",
    icon: CalendarDays,
    hint: "Past days you haven't fully completed. Insert a revision day to catch up.",
  },
  {
    to: "/problems",
    label: "Problems",
    icon: Code2,
    hint: "775+ problems from 6 curated sheets — filter by platform, difficulty, or sheet.",
  },
  {
    to: "/topics",
    label: "Topic View",
    icon: LayoutGrid,
    hint: "All 18 Striver A2Z sections. Expand any section, skip topics, track section progress.",
  },
  {
    to: "/weeks",
    label: "Week View",
    icon: CalendarRange,
    hint: "Your 17-week roadmap. See every day's status and jump to any day directly.",
  },
  {
    to: "/contests",
    label: "Contests",
    icon: Trophy,
    hint: "Live, upcoming & missed CP contests from LeetCode, Codeforces, CodeChef, AtCoder, HackerRank.",
  },
  {
    to: "/progress",
    label: "Progress",
    icon: BarChart3,
    hint: "Streaks, badges, difficulty breakdown, weekly chart, and full event log.",
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
    hint: "Adjust daily pace, shift schedule, pause plan, change password or theme.",
  },
] as const;

/** Bottom bar on phones keeps the four most-used destinations one tap away. */
const MOBILE_BAR = NAV.filter((n) =>
  ["/today", "/backlog", "/progress", "/settings"].includes(n.to),
);

/** Pill-shaped tab ribbon shown under the header — highlights active tab with its description. */
function TabRibbon({ activeHint }: { activeHint: string }) {
  return (
    <div className="hidden md:block border-b border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-2 min-h-[36px]">
        <span className="text-xs text-muted-foreground leading-snug">{activeHint}</span>
      </div>
    </div>
  );
}

/** Desktop-only floating pill nav — unique segmented control aesthetic */
function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Main" className="hidden md:flex items-center ml-4">
      {/* Outer pill container */}
      <div className="flex items-center gap-0.5 rounded-xl border border-border bg-muted/60 p-1 backdrop-blur">
        {NAV.map((n) => {
          const isActive = pathname.startsWith(n.to);
          const Icon = n.icon;
          return (
            <Link
              key={n.to}
              href={n.to}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200 select-none whitespace-nowrap",
                isActive
                  ? "bg-background text-foreground shadow-sm border border-border/60"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50",
              )}
            >
              <Icon
                className={cn(
                  "size-3.5 shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                )}
                aria-hidden="true"
              />
              <span>{n.label}</span>
              {isActive && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AppShell({ email, children }: { email: string; children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { lastSynced, days } = usePlan();
  const { settings } = useSettings();
  const router = useRouter();
  const pathname = usePathname();
  const qc = useQueryClient();
  const streak = currentStreak(days);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  const activeNav = NAV.find((n) => pathname.startsWith(n.to)) ?? NAV[0];

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await firebaseSignOut(auth);
    router.push("/auth?next=/today");
  }

  return (
    <TooltipProvider delayDuration={200}>
      {/* ── Slide-over drawer backdrop ───────────────────────────────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Slide-over drawer panel ───────────────────────────────────── */}
      <aside
        aria-label="Navigation drawer"
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-card border-r border-border shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          drawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* drawer header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Link
            href="/today"
            className="flex items-center gap-2 font-display text-base font-semibold"
            onClick={() => setDrawerOpen(false)}
          >
            <CalendarDays className="size-5 text-primary" aria-hidden="true" />
            DSA Tracker
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            {/* X made from two rotated divs — no extra icon import */}
            <span className="relative block size-4">
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="block h-px w-4 bg-current rotate-45" />
              </span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="block h-px w-4 bg-current -rotate-45" />
              </span>
            </span>
          </button>
        </div>

        {/* streak + sync mini-bar */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-2.5 text-xs text-muted-foreground">
          {streak > 0 && (
            <span className="flex items-center gap-1 text-primary font-semibold">
              <Flame className="size-3.5 animate-streak" aria-hidden="true" />
              {streak} day streak
            </span>
          )}
          <span className="ml-auto flex items-center gap-1">
            <Cloud className="size-3" />
            {lastSynced ? new Date(lastSynced).toLocaleTimeString() : "Not synced"}
          </span>
        </div>

        {/* nav links */}
        <nav aria-label="Drawer navigation" className="flex-1 overflow-y-auto py-3 px-2">
          <ul className="space-y-0.5">
            {NAV.map((n) => {
              const isActive = pathname.startsWith(n.to);
              return (
                <li key={n.to}>
                  <Link
                    href={n.to}
                    onClick={() => setDrawerOpen(false)}
                    className={cn(
                      "group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    <n.icon className="size-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className={cn("text-sm font-medium leading-tight", isActive && "font-semibold")}>
                        {n.label}
                      </p>
                      <p className="text-[11px] leading-snug mt-0.5 opacity-70 line-clamp-2">
                        {n.hint}
                      </p>
                    </div>
                    {isActive && (
                      <ChevronRight className="size-3.5 ml-auto mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* drawer footer */}
        <div className="border-t border-border px-4 py-3 space-y-1">
          <div className="truncate text-[11px] text-muted-foreground px-1 mb-2">{email}</div>
          <Link
            href="/settings"
            onClick={() => setDrawerOpen(false)}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Settings className="size-4" /> Settings
          </Link>
          <button
            onClick={() => void signOut()}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <CircleUser className="size-4" /> Log out
          </button>
        </div>
      </aside>

      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">

            {/* Unique drawer trigger — pill with active page name + chevron — mobile/tablet only */}
            <button
              onClick={() => setDrawerOpen((v) => !v)}
              aria-label="Open navigation"
              aria-expanded={drawerOpen}
              className="md:hidden flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <activeNav.icon className="size-4 text-primary shrink-0" aria-hidden="true" />
              <span className="hidden xs:inline">{activeNav.label}</span>
              <ChevronRight
                className={cn(
                  "size-3.5 text-muted-foreground transition-transform duration-200",
                  drawerOpen && "rotate-90",
                )}
                aria-hidden="true"
              />
            </button>

            <Link
              href="/today"
              className="flex items-center gap-2 font-display text-base font-semibold"
            >
              <CalendarDays className="size-5 text-primary" aria-hidden="true" />
              DSA Tracker
            </Link>

            {/* Desktop segmented pill nav */}
            <DesktopNav pathname={pathname} />

            <div className="ml-auto flex items-center gap-1.5">
              {streak > 0 && (
                <span
                  className="hidden items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary sm:flex"
                  aria-label={`Current streak: ${streak} days`}
                >
                  <Flame className="size-3.5 animate-streak" aria-hidden="true" />
                  {streak}
                </span>
              )}
              <span className="hidden items-center gap-1.5 text-xs text-muted-foreground lg:flex">
                <Cloud className="size-3.5" aria-hidden="true" />
                {lastSynced
                  ? `Synced ${new Date(lastSynced).toLocaleTimeString()}`
                  : "Not synced yet"}
              </span>
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Account menu">
                    <CircleUser className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="truncate text-xs font-normal text-muted-foreground">
                    {email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 size-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => void signOut()}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Tab context ribbon — shows current page's hint */}
        <TabRibbon activeHint={activeNav.hint} />

        {settings.paused && (
          <div
            role="status"
            className="animate-fade-in-up border-b border-warning/40 bg-warning/10"
          >
            <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2 text-sm text-warning">
              <PauseCircle className="size-4" aria-hidden="true" />
              <span>
                Preparation paused since {formatDate(settings.pausedFrom ?? "")}. Your schedule keeps
                sliding forward and missed-week checks are off.
              </span>
              <Link
                href="/settings"
                className="ml-auto font-semibold underline underline-offset-4"
              >
                Resume
              </Link>
            </div>
          </div>
        )}

        <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 md:pb-24">{children}</main>

        {/* Mobile bottom bar — persistent, thumb-reachable navigation. */}
        <nav
          aria-label="Quick navigation"
          className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden"
        >
          <ul className="grid grid-cols-4">
            {MOBILE_BAR.map((n) => {
              const isActive = pathname.startsWith(n.to);
              return (
                <li key={n.to}>
                  <Link
                    href={n.to}
                    className={cn(
                      "flex flex-col items-center gap-0.5 px-2 py-2.5 text-[11px] transition-colors",
                      isActive ? "text-primary font-semibold" : "text-muted-foreground",
                    )}
                  >
                    <n.icon className="size-5" aria-hidden="true" />
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </TooltipProvider>
  );
}

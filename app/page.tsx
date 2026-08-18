"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, db } from "@/integrations/firebase/client";
import { getCountFromServer, collection } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { QuoteLoader } from "@/components/QuoteLoader";
import { DemoShell } from "@/components/demo/DemoShell";
import { CORE_SECTIONS } from "@/lib/master-problems";
import { ALL_PROBLEMS } from "@/lib/problems";
import { seedDays, TOTAL_PROBLEMS } from "@/lib/plan";
import {
  BarChart3,
  Code2,
  LayoutGrid,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

/* ─── real, derived homepage stats (single source of truth) ─── */
const REAL_SECTIONS_COUNT = CORE_SECTIONS.length; // 42
const REAL_TOTAL_PROBLEMS = TOTAL_PROBLEMS; // 338
const REAL_ALL_PROBLEMS_COUNT = ALL_PROBLEMS.length; // 904
const REAL_DAY_1 = seedDays()[0];
const REAL_DAY_1_DIFFICULTY_COUNTS = REAL_DAY_1.problems.reduce((acc, p) => {
  acc[p.difficulty] = (acc[p.difficulty] ?? 0) + 1;
  return acc;
}, {} as Record<string, number>);
const REAL_DAY_1_EST_MIN = REAL_DAY_1.problems.reduce((a, p) => a + p.estTime, 0);

/* ─── count-up hook ──────────────────────────────────────── */
function useCountUp(target: number, duration = 1200) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          if (el) el.textContent = Math.round(eased * target).toString();
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return ref;
}

/* ─── live user count, read from Firestore (users collection count) ─── */
function useLiveUserCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getCountFromServer(collection(db, "users"));
        if (!cancelled) setCount(snap.data().count);
      } catch {
        if (!cancelled) setCount(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return count;
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12">
      {/* subtle grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Branding, Motto, Headline, Copy, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-4 sm:gap-5 mb-4">
              <div className="size-14 sm:size-16 rounded-full overflow-hidden shadow-xl border-2 sm:border-4 border-background/50 ring-2 ring-primary/20 bg-background shrink-0">
                <img src="/logo.jpg" alt="DSA404 Logo" className="size-full object-cover" />
              </div>
              <div className="font-display font-black tracking-tighter text-[42px] sm:text-[56px] leading-none flex items-baseline select-none">
                <span className="bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent drop-shadow-md">DSA</span>
                <span className="bg-gradient-to-br from-primary to-orange-500 bg-clip-text text-transparent drop-shadow-md ml-[2px]">⁴⁰⁴</span>
              </div>
            </div>

            {/* DSA 404 Motto Badge */}
            <div className="mb-4 inline-flex flex-col rounded-2xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-left backdrop-blur-md shadow-sm">
              <span className="font-mono text-xs font-black tracking-wider text-primary uppercase">
                DSA 404
              </span>
              <div className="mt-1 font-mono text-xs font-semibold text-foreground/90 space-y-0.5">
                <p><span className="text-muted-foreground">Problem not found?</span> <span className="text-primary font-bold">Find it.</span></p>
                <p><span className="text-muted-foreground">Problem found?</span> <span className="text-amber-400 font-bold">Solve it.</span></p>
                <p><span className="text-muted-foreground">Problem solved?</span> <span className="text-emerald-400 font-bold">Master it.</span></p>
              </div>
            </div>

            <h1 className="hero-headline font-display text-3xl sm:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
              Track DSA your way.<br />
              <span className="text-primary">Set your pace, stay consistent.</span>
            </h1>

            <p className="hero-sub mt-4 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              A daily problem checklist built from the Core 404 DSA roadmap — tuned to fit <em>your</em> life.
              Pick how many Easy, Medium and Hard problems you want each day. The plan builds itself around that number,
              and you can raise or lower it any time from Settings — the remaining problems instantly redistribute.
              Every day features topic-focused problems, a 12-step checklist, and built-in ChatGPT integration that explains
              problem statements and provides step-by-step logic hints to guide you to the solution—without giving away the code.
              Life happens — postpone, skip, or insert revision days and the entire plan rebalances automatically.
            </p>

            <div className="hero-cta mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Button asChild size="lg" className="font-mono justify-center text-center">
                <Link href="/auth?next=/today">
                  Start your DSA plan
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-mono justify-center text-center">
                <a href="#explore">See how it works</a>
              </Button>
            </div>
          </div>

          {/* Right Column: Terminal window */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="hero-terminal w-full max-w-md rounded-xl border border-border bg-card shadow-xl overflow-hidden">
              <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-2.5">
                <span className="size-3 rounded-full bg-red-500/70" />
                <span className="size-3 rounded-full bg-yellow-500/70" />
                <span className="size-3 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">dsa-tracker — zsh</span>
              </div>
              <div className="p-5 font-mono text-sm leading-7">
                <p className="text-primary">&gt; Loading plan...</p>
                <p>
                  <span className="text-muted-foreground">  Day     </span>
                  <span className="text-foreground font-semibold">Day {REAL_DAY_1.dayNumber}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">  Section </span>
                  <span className="text-foreground">{REAL_DAY_1.section}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">  Topic   </span>
                  <span className="text-foreground">{REAL_DAY_1.topic}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">  Problems</span>
                  <span className="text-foreground"> {REAL_DAY_1.problems.length} </span>
                  <span className="text-green-500 text-xs">
                    ({Object.entries(REAL_DAY_1_DIFFICULTY_COUNTS).map(([d, n]) => `${d} ×${n}`).join(", ")})
                  </span>
                </p>
                <p>
                  <span className="text-muted-foreground">  Est time</span>
                  <span className="text-foreground"> {Math.floor(REAL_DAY_1_EST_MIN / 60)}h {REAL_DAY_1_EST_MIN % 60}m</span>
                </p>
                <p>
                  <span className="text-muted-foreground">  Status  </span>
                  <span className="text-yellow-400">⬜ pending</span>
                  <span className="terminal-cursor text-primary font-bold"> _</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   STATS BAR
═══════════════════════════════════════════════════════════ */
function StatsBar() {
  const liveUserCount = useLiveUserCount();
  const c474 = useCountUp(REAL_TOTAL_PROBLEMS);
  const c18 = useCountUp(REAL_SECTIONS_COUNT);
  const c775 = useCountUp(REAL_ALL_PROBLEMS_COUNT);
  const cUsers = useCountUp(liveUserCount ?? 0);
  const c5 = useCountUp(2);
  const c2 = useCountUp(2);

  const stats = [
    ...(liveUserCount !== null
      ? [
          {
            ref: cUsers,
            value: liveUserCount,
            label: "Learners tracking progress",
            sub: "Live count, synced from database",
            prefix: "",
            icon: Users,
            iconColor: "text-rose-600 dark:text-rose-400",
            iconBg: "bg-rose-500/10",
          },
        ]
      : []),
    {
      ref: c474,
      value: REAL_TOTAL_PROBLEMS,
      label: "Problems",
      sub: "From the Core 404 DSA roadmap",
      prefix: "",
      icon: Code2,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-500/10",
    },
    {
      ref: c18,
      value: REAL_SECTIONS_COUNT,
      label: "Sections",
      sub: "Arrays to graphs & DP",
      prefix: "",
      icon: LayoutGrid,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-500/10",
    },
    {
      ref: c775,
      value: REAL_ALL_PROBLEMS_COUNT,
      label: "Problems across platforms",
      sub: "LeetCode · GFG · HackerRank",
      prefix: "",
      icon: BarChart3,
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBg: "bg-cyan-500/10",
    },
    {
      ref: c5,
      value: 2,
      label: "Curated sheets + contests",
      sub: "Core 404 · DSA 500 Practice · CP rounds",
      prefix: "",
      icon: Trophy,
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-500/10",
    },
    {
      ref: c2,
      value: 2,
      label: "AI & search built in",
      sub: "ChatGPT explain · Google search",
      prefix: "",
      icon: Sparkles,
      iconColor: "text-green-600 dark:text-green-400",
      iconBg: "bg-green-500/10",
    },
  ];

  return (
    <div className="my-8 rounded-2xl border border-border bg-muted/30 p-4 sm:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl bg-card border border-border p-4 shadow-sm">
              <div className={`inline-flex size-8 items-center justify-center rounded-lg ${s.iconBg} mb-3`}>
                <Icon className={`size-4 ${s.iconColor}`} />
              </div>
              <p className="font-mono text-3xl font-bold text-foreground tabular-nums">
                {s.prefix}
                <span ref={s.ref}>0</span>
              </p>
              <p className="mt-0.5 text-sm font-medium text-foreground">{s.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Home ("/") — Logged-in users are bounced straight to /today.
 * Signed-out / new visitors see the hero section, motto badge, zsh terminal card,
 * dynamic stats cards, and an interactive demo shell.
 */
export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined); // undefined = checking

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        router.replace("/today");
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, [router]);

  // Still checking auth state, or a logged-in user is mid-redirect —
  // avoid flashing the UI in either case.
  if (user === undefined) {
    return <QuoteLoader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-full overflow-hidden border border-border/80 shadow-sm ring-1 ring-primary/20 bg-background shrink-0">
              <img src="/logo.jpg" alt="DSA404 Logo" className="size-full object-cover" />
            </div>
            <div className="font-display font-black tracking-tighter text-[22px] leading-none flex items-baseline select-none">
              <span className="bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">DSA</span>
              <span className="bg-gradient-to-br from-primary to-orange-500 bg-clip-text text-transparent ml-[1px]">⁴⁰⁴</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="font-mono text-xs hidden sm:inline-flex">
              <Link href="/auth">Login</Link>
            </Button>
            <Button asChild size="sm" className="font-mono text-xs">
              <Link href="/auth">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
        <HeroSection />
        <StatsBar />

        <div id="explore" className="mt-14 pt-8 border-t border-border/50">
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs text-primary font-mono mb-3">
              <Sparkles className="size-3" />
              Interactive Demo
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Explore the full workspace with live sample data
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Test drive all 904 problems, 17 weeks of roadmap, daily checklists, and progress tracking below.
            </p>
          </div>

          <DemoShell />
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm text-muted-foreground mb-3">Ready to track your own progress?</p>
          <div className="flex items-center justify-center gap-3">
            <Button asChild size="lg" className="font-mono">
              <Link href="/auth">Create free account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-mono">
              <Link href="/auth">I already have an account</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 py-6 mt-12">
        <p className="text-center text-xs text-muted-foreground font-mono">
          DSA⁴⁰⁴ · Built for structured, consistent DSA practice
        </p>
      </footer>
    </div>
  );
}


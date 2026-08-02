import { ExternalLink, Trophy, Clock, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Contest {
  platform: string;
  title: string;
  /** IST datetime string — "Aug 2, 2026 08:00" */
  startIST: string;
  /** duration in minutes */
  durationMin: number;
  url: string;
}

// ─── Master contest list (all in IST) ────────────────────────────────────────
export const ALL_CONTESTS: Contest[] = [
  // Today Aug 1
  {
    platform: "AtCoder",
    title: "CodeQUEEN 2026 — Final",
    startIST: "Aug 1, 2026 09:30",
    durationMin: 120,
    url: "https://atcoder.jp/contests/codequeen2026-final-Public",
  },
  {
    platform: "HackerRank",
    title: "HackerRank Orchestrate August '26",
    startIST: "Aug 1, 2026 18:00",
    durationMin: 1440,
    url: "https://hackerrank.com/contests/hackerrank-orchestrate-august26",
  },
  {
    platform: "LeetCode",
    title: "Biweekly Contest 188",
    startIST: "Aug 1, 2026 20:00",
    durationMin: 90,
    url: "https://leetcode.com/contest/biweekly-contest-188",
  },
  {
    platform: "Codeforces",
    title: "Codeforces Round 1113 (Div. 2)",
    startIST: "Aug 1, 2026 20:05",
    durationMin: 150,
    url: "https://codeforces.com/contests/2248",
  },
  {
    platform: "CodeChef",
    title: "Placement Prep Weekends — 01",
    startIST: "Aug 2, 2026 00:00",
    durationMin: 3000,
    url: "https://www.codechef.com/PLACEPREP01",
  },
  // Week Aug 2–12
  {
    platform: "LeetCode",
    title: "Weekly Contest 513",
    startIST: "Aug 2, 2026 08:00",
    durationMin: 90,
    url: "https://leetcode.com/contest/weekly-contest-513",
  },
  {
    platform: "CodeChef",
    title: "Starters 250",
    startIST: "Aug 5, 2026 20:00",
    durationMin: 120,
    url: "https://www.codechef.com/START250",
  },
  {
    platform: "Codeforces",
    title: "Codeforces Round (Div. 2)",
    startIST: "Aug 6, 2026 20:05",
    durationMin: 120,
    url: "https://codeforces.com/contests/2252",
  },
  {
    platform: "Codeforces",
    title: "Educational CF Round 193 (Div. 2)",
    startIST: "Aug 7, 2026 20:05",
    durationMin: 120,
    url: "https://codeforces.com/contests/2253",
  },
  {
    platform: "AtCoder",
    title: "AtCoder Beginner Contest 470",
    startIST: "Aug 8, 2026 17:30",
    durationMin: 100,
    url: "https://atcoder.jp/contests/abc470",
  },
  {
    platform: "LeetCode",
    title: "Weekly Contest 514",
    startIST: "Aug 9, 2026 08:00",
    durationMin: 90,
    url: "https://leetcode.com/contest/weekly-contest-514",
  },
  {
    platform: "CodeChef",
    title: "Starters 251",
    startIST: "Aug 12, 2026 20:00",
    durationMin: 120,
    url: "https://www.codechef.com/START251",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function parseIST(s: string): Date {
  // "Aug 1, 2026 09:30" — treat as IST = UTC-330min offset
  const d = new Date(s + " GMT+0530");
  return d;
}

export function classifyContest(c: Contest, now: Date) {
  const start = parseIST(c.startIST);
  const end = new Date(start.getTime() + c.durationMin * 60 * 1000);
  if (now >= start && now < end) return "live" as const;
  if (now < start) return "upcoming" as const;
  return "missed" as const;
}

function isTodayIST(c: Contest, now: Date): boolean {
  const start = parseIST(c.startIST);
  const istOffset = 5.5 * 60 * 60 * 1000;
  const todayIST = new Date(now.getTime() + istOffset);
  const startIST = new Date(start.getTime() + istOffset); // already IST but Date obj is UTC-based
  return (
    startIST.getUTCFullYear() === todayIST.getUTCFullYear() &&
    startIST.getUTCMonth() === todayIST.getUTCMonth() &&
    startIST.getUTCDate() === todayIST.getUTCDate()
  );
}

function isThisWeek(c: Contest, now: Date): boolean {
  const start = parseIST(c.startIST);
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  return start > now && start <= new Date(now.getTime() + weekMs);
}

function fmtDuration(min: number): string {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

/** Format a Date object as "HH:MM IST" */
function fmtTimeIST(d: Date): string {
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }) + " IST";
}

/** Returns a human label for how far away `target` is from `now`. */
function fmtRelative(now: Date, target: Date): string {
  const diffMs = target.getTime() - now.getTime();
  const totalMin = Math.round(diffMs / 60000);
  if (totalMin <= 0) return "ending soon";
  if (totalMin < 60) return `${totalMin} min`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const PLATFORM_STYLES: Record<string, string> = {
  LeetCode: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  Codeforces: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  CodeChef: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  HackerRank: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  AtCoder: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
};

const STATUS_STYLES = {
  live: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  upcoming: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  missed: "bg-gray-100 text-gray-500 dark:bg-gray-800/60 dark:text-gray-400",
} as const;

const STATUS_LABEL = { live: "Live", upcoming: "Upcoming", missed: "Missed" } as const;

// ─── Card ─────────────────────────────────────────────────────────────────────
function ContestCard({
  c,
  status,
}: {
  c: Contest;
  status: "live" | "upcoming" | "missed";
}) {
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-colors",
        status === "missed"
          ? "opacity-60 hover:opacity-80"
          : "hover:border-primary/40 hover:bg-accent/30",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
            PLATFORM_STYLES[c.platform] ?? "bg-muted text-muted-foreground",
          )}
        >
          {c.platform}
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
            STATUS_STYLES[status],
          )}
        >
          {STATUS_LABEL[status]}
        </span>
      </div>

      <p className="text-sm font-medium leading-snug text-foreground group-hover:text-primary">
        {c.title}
      </p>

      {(() => {
        const now = new Date();
        const start = parseIST(c.startIST);
        const end = new Date(start.getTime() + c.durationMin * 60 * 1000);
        return (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3" aria-hidden="true" />
              {c.startIST} IST
            </span>
            <span className="flex items-center gap-1">
              <Timer className="size-3" aria-hidden="true" />
              {status === "live" ? (
                <span className="font-medium text-red-500 dark:text-red-400">
                  Ends in {fmtRelative(now, end)}
                </span>
              ) : status === "upcoming" ? (
                <span>Ends {fmtTimeIST(end)} · {fmtDuration(c.durationMin)}</span>
              ) : (
                <span>Ended {fmtTimeIST(end)}</span>
              )}
            </span>
          </div>
        );
      })()}

      {status !== "missed" && (
        <span className="mt-auto flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Open contest <ExternalLink className="size-3" aria-hidden="true" />
        </span>
      )}
    </a>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Trophy className="size-4 text-primary" aria-hidden="true" />
      <h2 className="text-base font-semibold">{title}</h2>
      <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
        {count}
      </span>
    </div>
  );
}

// ─── Today mode (shown in Today tab) ─────────────────────────────────────────
export function TodayContestsSection() {
  const now = new Date();

  // Show: contests LIVE right now (any day, still ongoing)
  //       OR contests that START today IST and are not yet missed
  const visible = ALL_CONTESTS.filter((c) => {
    const status = classifyContest(c, now);
    if (status === "missed") return false;
    if (status === "live") return true;
    return isTodayIST(c, now); // upcoming but starts today
  });

  if (visible.length === 0) return null;

  return (
    <section className="mt-6">
      <SectionHeader title="Today's Contests" count={visible.length} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <ContestCard key={c.url} c={c} status={classifyContest(c, now)} />
        ))}
      </div>
      <p className="mt-2 text-right text-[11px] text-muted-foreground">
        Source:{" "}
        <a
          href="https://clist.by"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          clist.by
        </a>{" "}
        · All times in IST (UTC +5:30)
      </p>
    </section>
  );
}

// ─── Full contests page (shown in Contests tab) ───────────────────────────────
export function ContestsPageSection() {
  const now = new Date();

  const live = ALL_CONTESTS.filter((c) => classifyContest(c, now) === "live");
  const upcoming = ALL_CONTESTS.filter((c) => classifyContest(c, now) === "upcoming");
  const missed = ALL_CONTESTS.filter((c) => classifyContest(c, now) === "missed");

  return (
    <div className="space-y-10">
      {/* Live */}
      {live.length > 0 && (
        <section>
          <SectionHeader title="Live Now" count={live.length} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((c) => (
              <ContestCard key={c.url} c={c} status="live" />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section>
          <SectionHeader title="Upcoming Contests" count={upcoming.length} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((c) => (
              <ContestCard key={c.url} c={c} status="upcoming" />
            ))}
          </div>
        </section>
      )}

      {/* Missed */}
      {missed.length > 0 && (
        <section>
          <SectionHeader title="Missed Contests" count={missed.length} />
          <p className="mb-3 text-xs text-muted-foreground">
            These contests have ended. You can still practice using their problems on the platform.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {missed.map((c) => (
              <ContestCard key={c.url} c={c} status="missed" />
            ))}
          </div>
        </section>
      )}

      {live.length === 0 && upcoming.length === 0 && missed.length === 0 && (
        <p className="text-sm text-muted-foreground">No contests found.</p>
      )}

      <p className="text-right text-[11px] text-muted-foreground">
        Source:{" "}
        <a
          href="https://clist.by"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          clist.by
        </a>{" "}
        · All times in IST (UTC +5:30)
      </p>
    </div>
  );
}

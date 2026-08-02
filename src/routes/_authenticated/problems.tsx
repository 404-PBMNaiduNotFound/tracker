import { createFileRoute } from '@tanstack/react-router'

import { useMemo, useState } from "react";
import { SECTIONS } from "@/lib/a2z-data";
import { VERIFIED_LINKS } from "@/lib/verified-links";
import { EXTRA_PROBLEMS, type Sheet } from "@/lib/extra-problems-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/lib/types";
import { useProblemCompletions } from "@/hooks/useProblemCompletions";

export const Route = createFileRoute("/_authenticated/problems")({
  head: () => ({
    meta: [
      { title: "Problems — DSA Tracker" },
      {
        name: "description",
        content:
          "Browse problems from Striver A2Z, NeetCode 150, Blind 75, Love Babbar 450, Top Interview 150 and GFG Must-Do.",
      },
      { property: "og:title", content: "Problems — DSA Tracker" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProblemsPage,
});

// ─── Types ───────────────────────────────────────────────────────────────────

type Platform = "All" | "LeetCode" | "GFG" | "HackerRank" | "CodeStudio";
type SheetFilter = "All" | "Striver A2Z" | Sheet;

const PLATFORMS: Platform[] = ["All", "LeetCode", "GFG", "HackerRank", "CodeStudio"];

const SHEET_FILTERS: SheetFilter[] = [
  "All",
  "Striver A2Z",
  "NeetCode 150",
  "Blind 75",
  "Love Babbar 450",
  "Top Interview 150",
  "GFG Must-Do",
];

// ─── Platform helpers ────────────────────────────────────────────────────────

function canonicalPlatform(raw: string): Platform {
  const r = raw.toLowerCase();
  if (r.includes("leetcode")) return "LeetCode";
  if (r.includes("gfg") || r.includes("geeks")) return "GFG";
  if (r.includes("hacker")) return "HackerRank";
  if (r.includes("code") && r.includes("studio")) return "CodeStudio";
  return "LeetCode";
}

function platformSearchLink(name: string, platform: Platform): string {
  const q = encodeURIComponent(name);
  switch (platform) {
    case "LeetCode":   return `https://leetcode.com/problemset/?search=${q}`;
    case "GFG":        return `https://www.geeksforgeeks.org/explore?search=${q}`;
    case "HackerRank": return `https://www.hackerrank.com/domains/data-structures`;
    case "CodeStudio": return `https://www.naukri.com/code360/search?q=${q}`;
    default:           return `https://leetcode.com/problemset/?search=${q}`;
  }
}

const PLATFORM_META: Record<Platform, { label: string; color: string; bg: string; dot: string }> = {
  All:        { label: "All",           color: "text-foreground",    bg: "bg-secondary",      dot: "bg-muted-foreground" },
  LeetCode:   { label: "LeetCode",      color: "text-[#FFA116]",     bg: "bg-[#FFA116]/10",   dot: "bg-[#FFA116]" },
  GFG:        { label: "GeeksforGeeks", color: "text-[#2F8D46]",     bg: "bg-[#2F8D46]/10",   dot: "bg-[#2F8D46]" },
  HackerRank: { label: "HackerRank",    color: "text-[#2EC866]",     bg: "bg-[#2EC866]/10",   dot: "bg-[#2EC866]" },
  CodeStudio: { label: "CodeStudio",    color: "text-[#F97316]",     bg: "bg-[#F97316]/10",   dot: "bg-[#F97316]" },
};

const DIFF_META: Record<Difficulty, { label: string; color: string; bg: string }> = {
  Easy:   { label: "Easy",   color: "text-easy",   bg: "bg-easy/10" },
  Medium: { label: "Medium", color: "text-medium",  bg: "bg-medium/10" },
  Hard:   { label: "Hard",   color: "text-hard",    bg: "bg-hard/10" },
};

const SHEET_META: Record<SheetFilter, { color: string; bg: string }> = {
  "All":               { color: "text-foreground",  bg: "bg-secondary" },
  "Striver A2Z":       { color: "text-primary",     bg: "bg-primary/10" },
  "NeetCode 150":      { color: "text-[#00B8A3]",   bg: "bg-[#00B8A3]/10" },
  "Blind 75":          { color: "text-[#4F86F7]",   bg: "bg-[#4F86F7]/10" },
  "Love Babbar 450":   { color: "text-[#E05C5C]",   bg: "bg-[#E05C5C]/10" },
  "Top Interview 150": { color: "text-[#FFA116]",   bg: "bg-[#FFA116]/10" },
  "GFG Must-Do":       { color: "text-[#2F8D46]",   bg: "bg-[#2F8D46]/10" },
};

// ─── Unified flat problem type ───────────────────────────────────────────────

interface FlatProblem {
  name: string;
  difficulty: Difficulty;
  platform: Platform;
  topic: string;
  sheet: SheetFilter;
  link: string;
}

function buildAllProblems(): FlatProblem[] {
  const a2z: FlatProblem[] = SECTIONS.flatMap((sec) =>
    sec.problems
      .filter((p) => VERIFIED_LINKS[p.n] !== undefined || p.l !== undefined)
      .map((p) => {
        const plat = canonicalPlatform(p.p);
        const link = p.l ?? VERIFIED_LINKS[p.n]!;
        return {
          name: p.n,
          difficulty: p.d,
          platform: plat,
          topic: sec.section,
          sheet: "Striver A2Z" as SheetFilter,
          link,
        };
      }),
  );

  const extra: FlatProblem[] = EXTRA_PROBLEMS.map((p) => ({
    name: p.name,
    difficulty: p.difficulty,
    platform: p.platform as Platform,
    topic: p.topic,
    sheet: p.sheet as SheetFilter,
    link: p.link,
  }));

  const seen = new Set<string>();
  return [...a2z, ...extra].filter((p) => {
    const key = `${p.name.toLowerCase()}|${p.link}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const ALL_PROBLEMS = buildAllProblems();

function countBy<T>(arr: T[], key: (x: T) => string): Record<string, number> {
  return arr.reduce<Record<string, number>>((acc, x) => {
    const k = key(x);
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
}

// ─── Problem row ─────────────────────────────────────────────────────────────

function ProblemItem({
  problem,
  done,
  onToggle,
  readOnly = false,
}: {
  problem: FlatProblem;
  done: boolean;
  onToggle: () => void;
  readOnly?: boolean;
}) {
  const diff = DIFF_META[problem.difficulty];
  const pm = PLATFORM_META[problem.platform];
  const sm = SHEET_META[problem.sheet];
  const checkId = `pb-${problem.name.replace(/\W+/g, "-")}`;

  return (
    <li
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 transition-colors hover:bg-secondary/40",
        done && "border-green-500/30 bg-green-500/5",
      )}
    >
      {/* completion checkbox — only interactive from Today / Backlog tabs */}
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Checkbox
              id={checkId}
              checked={done}
              disabled={readOnly}
              onCheckedChange={readOnly ? undefined : onToggle}
              aria-label={readOnly ? `${problem.name} — mark complete from Today or Backlog tab` : `Mark ${problem.name} as ${done ? "incomplete" : "complete"}`}
              className="size-4 shrink-0"
            />
          </span>
        </TooltipTrigger>
        {readOnly && (
          <TooltipContent side="right">
            Mark complete from the Today or Backlog tab
          </TooltipContent>
        )}
      </Tooltip>

      {/* name */}
      <label
        htmlFor={checkId}
        className={cn(
          "min-w-0 flex-1 cursor-pointer text-sm font-medium",
          done && "text-muted-foreground line-through",
        )}
      >
        {problem.name}
      </label>

      {/* sheet badge */}
      <span
        className={cn(
          "hidden rounded-full border border-border px-2 py-0.5 text-[10px] font-medium sm:inline",
          sm.bg,
          sm.color,
        )}
      >
        {problem.sheet}
      </span>

      {/* topic */}
      <span className="hidden rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground lg:inline">
        {problem.topic}
      </span>

      {/* difficulty */}
      <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", diff.bg, diff.color)}>
        {problem.difficulty}
      </span>

      {/* platform badge */}
      <span className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", pm.bg, pm.color)}>
        <span className={cn("size-1.5 rounded-full", pm.dot)} />
        {pm.label}
      </span>

      {/* platform link — only shown for the problem's actual platform */}
      <div className="flex items-center gap-1">
        {(["LeetCode", "GFG", "HackerRank"] as Platform[]).map((pl) => {
          if (problem.platform !== pl) return null;
          const m = PLATFORM_META[pl];
          const short = pl === "LeetCode" ? "LC" : pl === "GFG" ? "GFG" : "HR";
          return (
            <a
              key={pl}
              href={platformSearchLink(problem.name, pl)}
              target="_blank"
              rel="noreferrer"
              title={`Open "${problem.name}" on ${m.label}`}
              className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold transition-opacity hover:opacity-80", m.bg, m.color)}
            >
              {short}
            </a>
          );
        })}

        <a
          href={problem.link}
          target="_blank"
          rel="noreferrer"
          className="ml-1 flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ExternalLink className="size-3" />
          Solve
        </a>
      </div>
    </li>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

function ProblemsPage() {
  const [diffTab, setDiffTab] = useState<"All" | Difficulty>("All");
  const [platFilter, setPlatFilter] = useState<Platform>("All");
  const [sheetFilter, setSheetFilter] = useState<SheetFilter>("All");
  const [query, setQuery] = useState("");
  const { completed, toggle } = useProblemCompletions();

  const filtered = useMemo(() => {
    return ALL_PROBLEMS.filter((p) => {
      if (diffTab !== "All" && p.difficulty !== diffTab) return false;
      if (platFilter !== "All" && p.platform !== platFilter) return false;
      if (sheetFilter !== "All" && p.sheet !== sheetFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.topic.toLowerCase().includes(q) ||
          p.sheet.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [diffTab, platFilter, sheetFilter, query]);

  const diffCounts = useMemo(() => countBy(ALL_PROBLEMS, (p) => p.difficulty), []);

  const totalDone = completed.size;
  const filteredDone = useMemo(
    () => filtered.filter((p) => completed.has(p.name)).length,
    [filtered, completed],
  );

  const hasActiveFilter =
    diffTab !== "All" || platFilter !== "All" || sheetFilter !== "All" || query.trim() !== "";

  function clearFilters() {
    setDiffTab("All");
    setPlatFilter("All");
    setSheetFilter("All");
    setQuery("");
  }

  return (
    <>
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Problems</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {ALL_PROBLEMS.length} verified problems from 6 sheets —{" "}
            <span className="font-medium text-green-600 dark:text-green-400">
              {totalDone} completed
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(["Easy", "Medium", "Hard"] as Difficulty[]).map((d) => {
            const m = DIFF_META[d];
            return (
              <span key={d} className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", m.bg, m.color)}>
                {diffCounts[d] ?? 0} {d}
              </span>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by problem name, topic, or sheet…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Sheet filter */}
      <div className="mb-3">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Sheet</p>
        <div className="flex flex-wrap gap-2">
          {SHEET_FILTERS.map((sf) => {
            const active = sheetFilter === sf;
            const m = SHEET_META[sf];
            const count = sf === "All" ? ALL_PROBLEMS.length : ALL_PROBLEMS.filter((p) => p.sheet === sf).length;
            return (
              <button
                key={sf}
                type="button"
                onClick={() => setSheetFilter(sf)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  active
                    ? cn(m.bg, m.color, "border-transparent ring-1 ring-current")
                    : "border-border bg-card text-muted-foreground hover:bg-secondary",
                )}
              >
                {sf}
                <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Platform filter */}
      <div className="mb-4">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Platform</p>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((pl) => {
            const active = platFilter === pl;
            const m = PLATFORM_META[pl];
            const count = pl === "All" ? ALL_PROBLEMS.length : ALL_PROBLEMS.filter((p) => p.platform === pl).length;
            return (
              <button
                key={pl}
                type="button"
                onClick={() => setPlatFilter(pl)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  active
                    ? cn(m.bg, m.color, "border-transparent ring-1 ring-current")
                    : "border-border bg-card text-muted-foreground hover:bg-secondary",
                )}
              >
                {pl !== "All" && <span className={cn("size-1.5 rounded-full", m.dot)} />}
                {pl === "All" ? "All Platforms" : m.label}
                <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty tabs */}
      <Tabs value={diffTab} onValueChange={(v) => setDiffTab(v as typeof diffTab)} className="mb-2">
        <TabsList className="mb-4 flex w-full flex-wrap gap-1 bg-transparent p-0">
          {(["All", "Easy", "Medium", "Hard"] as const).map((d) => {
            const count = d === "All" ? ALL_PROBLEMS.length : (diffCounts[d] ?? 0);
            const active = diffTab === d;
            const m = d !== "All" ? DIFF_META[d] : null;
            return (
              <TabsTrigger
                key={d}
                value={d}
                className={cn(
                  "rounded-full border border-border px-3 py-1 text-sm font-medium transition-all data-[state=active]:shadow-none",
                  active && m
                    ? cn(m.bg, m.color, "border-transparent")
                    : active
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "bg-card hover:bg-secondary",
                )}
              >
                {d}
                <span className="ml-1.5 tabular-nums text-xs opacity-70">{count}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
          <TabsContent key={d} value={d} className="mt-0">
            {filtered.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
                No problems match your filters.{" "}
                <button type="button" className="underline underline-offset-2" onClick={clearFilters}>
                  Clear all filters
                </button>
              </p>
            ) : (
              <>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Showing {filtered.length} problem{filtered.length !== 1 ? "s" : ""}
                    {query ? ` for "${query}"` : ""} —{" "}
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {filteredDone} completed
                    </span>
                  </p>
                  {hasActiveFilter && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                    >
                      <X className="size-3" /> Clear filters
                    </button>
                  )}
                </div>
                <ul className="space-y-1.5">
                  {filtered.map((p) => (
                    <ProblemItem
                      key={`${p.sheet}|${p.name}|${p.link}`}
                      problem={p}
                      done={completed.has(p.name)}
                      onToggle={() => void toggle(p.name)}
                      readOnly
                    />
                  ))}
                </ul>
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

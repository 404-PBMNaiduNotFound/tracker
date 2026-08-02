import { SECTIONS } from "@/lib/a2z-data";
import { VERIFIED_LINKS } from "@/lib/verified-links";
import { EXTRA_PROBLEMS, type Sheet } from "@/lib/extra-problems-data";
import type { Difficulty } from "@/lib/types";

export type Platform = "All" | "LeetCode" | "GFG" | "HackerRank" | "CodeStudio";
export type SheetFilter = "All" | "Striver A2Z" | Sheet;

export interface FlatProblem {
  name: string;
  difficulty: Difficulty;
  platform: Platform;
  topic: string;
  sheet: SheetFilter;
  link: string;
}

function canonicalPlatform(p: string): Platform {
  if (p === "LC") return "LeetCode";
  if (p === "GFG") return "GFG";
  if (p === "HR") return "HackerRank";
  if (p === "CS") return "CodeStudio";
  return "LeetCode";
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

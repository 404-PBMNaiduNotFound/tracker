"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  BookOpen,
  Trash2,
  BadgeCheck,
  Search,
  BookmarkPlus,
  BookmarkCheck,
} from "lucide-react";

function googleSearchUrl(problemName: string, topic?: string) {
  const query = `${topic ? topic + " " : ""}${problemName} DSA LeetCode GeeksforGeeks Take U Forward Code360 YouTube tutorial problems`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HoverHint } from "@/components/HoverHint";
import { Badge } from "@/components/ui/badge";
import type { Problem } from "@/lib/types";
import { cn } from "@/lib/utils";

const diffClass: Record<Problem["difficulty"], string> = {
  Easy: "text-easy",
  Medium: "text-medium",
  Hard: "text-hard",
};

export function ProblemRow({
  problem,
  onToggle,
  onDelete,
  onReview,
  readOnly,
  lateMode,
  index = 0,
}: {
  problem: Problem;
  onToggle?: (done: boolean) => void;
  onDelete?: () => void;
  /** Shown only when provided (Today tab + Review tab) — flags/unflags this problem for review. */
  onReview?: () => void;
  readOnly?: boolean;
  /** When true, problem was missed — show "completed late" badge on done items */
  lateMode?: boolean;
  /** used only to stagger the entrance animation */
  index?: number;
}) {
  const id = `p-${problem.name.replace(/\W+/g, "-")}`;
  const [justDone, setJustDone] = useState(false);

  const toggle = (done: boolean) => {
    if (done) {
      setJustDone(true);
      window.setTimeout(() => setJustDone(false), 400);
    }
    onToggle?.(done);
  };

  return (
    <li
      style={{ "--i": index } as React.CSSProperties}
      className={cn(
        "stagger-item flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface/60 px-3 py-2.5 transition-colors duration-200",
        problem.done && "border-success/30 bg-success/5",
      )}
    >
      <HoverHint hint={readOnly ? "View only — only today's problems can be marked done" : "Mark this problem done or not done"}>
        <Checkbox
          id={id}
          checked={problem.done}
          disabled={readOnly}
          onCheckedChange={(v) => toggle(Boolean(v))}
          aria-label={`Mark ${problem.name} as done`}
          className={cn("size-5 transition-transform", justDone && "animate-pop-check")}
        />
      </HoverHint>
      <label
        htmlFor={id}
        className={cn(
          "min-w-40 flex-1 cursor-pointer text-sm",
          problem.done && "text-muted-foreground line-through",
        )}
      >
        {problem.name}
      </label>
      <span className={cn("text-xs font-semibold", diffClass[problem.difficulty])}>
        {problem.difficulty}
      </span>
      {lateMode && problem.done && (
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0 bg-success/15 text-success border-success/20">
          completed late
        </Badge>
      )}
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        {problem.platform}
        {problem.linkVerified && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span aria-label="Verified direct link to the problem">
                <BadgeCheck className="size-3.5 text-success" aria-hidden="true" />
              </span>
            </TooltipTrigger>
            <TooltipContent>Verified direct problem link</TooltipContent>
          </Tooltip>
        )}
      </span>
      <span className="text-xs text-muted-foreground">~{problem.estTime}m</span>
      <div className="flex items-center gap-1">
        {problem.platform === "LeetCode" && !problem.linkVerified ? null : (() => {
          // Derive the actual platform label from the verified link URL
          const url = problem.link;
          const linkPlatform =
            url.includes("geeksforgeeks.org") ? "GFG" :
            url.includes("hackerrank.com") ? "HackerRank" :
            url.includes("w3schools.com") ? "W3Schools" :
            url.includes("leetcode.com") ? "LeetCode" :
            problem.platform;
          const hint =
            linkPlatform === "LeetCode"
              ? "Opens this problem directly on LeetCode"
              : `Opens this problem on ${linkPlatform}`;
          return (
            <HoverHint hint={hint}>
              <Button asChild variant="ghost" size="sm" className="h-8 px-2">
                <a href={url} target="_blank" rel="noreferrer" aria-label={`Solve ${problem.name} on ${linkPlatform}`}>
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  <span className="ml-1 text-xs">{linkPlatform}</span>
                </a>
              </Button>
            </HoverHint>
          );
        })()}
        {problem.takeUForwardLink && (
          <HoverHint hint="Opens the takeUforward article explaining this problem">
            <Button asChild variant="ghost" size="sm" className="h-8 px-2">
              <a
                href={problem.takeUForwardLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Read the takeUforward article for ${problem.name}`}
              >
                <BookOpen className="size-3.5" aria-hidden="true" />
                <span className="ml-1 text-xs">TUF</span>
              </a>
            </Button>
          </HoverHint>
        )}
        <HoverHint hint="Search Google: problem name + DSA LeetCode GeeksforGeeks TUF YouTube tutorials">
          <Button asChild variant="ghost" size="sm" className="h-8 px-2">
            <a
              href={googleSearchUrl(problem.name)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Search Google for ${problem.name} DSA tutorials`}
            >
              <Search className="size-3.5" aria-hidden="true" />
              <span className="ml-1 text-xs">Google</span>
            </a>
          </Button>
        </HoverHint>
        {onReview && (
          <HoverHint
            hint={
              problem.forReview
                ? "Remove this problem from your Review tab"
                : "Flag this problem to revisit later in the Review tab"
            }
          >
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "size-8",
                problem.forReview
                  ? "text-primary hover:text-primary"
                  : "text-muted-foreground hover:text-primary",
              )}
              aria-label={
                problem.forReview
                  ? `Remove ${problem.name} from review`
                  : `Add ${problem.name} to review`
              }
              onClick={onReview}
            >
              {problem.forReview ? (
                <BookmarkCheck className="size-4" />
              ) : (
                <BookmarkPlus className="size-4" />
              )}
            </Button>
          </HoverHint>
        )}
        {onDelete && !problem.done && (
          <HoverHint hint="Moves this problem to tomorrow's plan instead of today">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-destructive"
              aria-label={`Move ${problem.name} to tomorrow`}
              onClick={onDelete}
            >
              <Trash2 className="size-4" />
            </Button>
          </HoverHint>
        )}
      </div>
    </li>
  );
}
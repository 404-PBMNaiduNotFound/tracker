import { createFileRoute } from '@tanstack/react-router'

import { useMemo } from "react";
import { usePlan } from "@/hooks/usePlan";
import { dayProgress, deriveStatus, todayIso } from "@/lib/plan";
import { DayCard } from "@/components/DayCard";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { weekNumber, type Day } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/weeks")({
  head: () => ({
    meta: [
      { title: "Week View — 120-Day Striver A2Z DSA Tracker" },
      {
        name: "description",
        content: "See your 120-day DSA plan grouped week by week with progress for each week.",
      },
      { property: "og:title", content: "Week View — A2Z DSA Tracker" },
      { property: "og:description", content: "Your DSA plan, week by week." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WeeksPage,
});

function WeeksPage() {
  const { days, loading, skipDay } = usePlan();
  const todayDate = todayIso();

  const weeks = useMemo(() => {
    const active = days.filter((d) => !d.skipped);
    const map = new Map<number, Day[]>();
    active.forEach((d) => {
      const w = weekNumber(d.dayNumber);
      map.set(w, [...(map.get(w) ?? []), d]);
    });
    return [...map.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([week, list]) => {
        const done = list.reduce((a, d) => a + dayProgress(d).done, 0);
        const total = list.reduce((a, d) => a + dayProgress(d).total, 0);
        return { week, list, done, total, pct: total ? Math.round((done / total) * 100) : 0 };
      })
      .filter((w) => w.list.length > 0);
  }, [days]);

  if (loading) return <Skeleton className="h-96 w-full" />;

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold tracking-tight">Week View</h1>
      <div className="space-y-6">
        {weeks.map((w) => (
          <section key={w.week}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <h2 className="font-display text-lg font-semibold">Week {w.week}</h2>
              <span className="text-xs tabular-nums text-muted-foreground">
                {w.done}/{w.total} problems
              </span>
            </div>
            <Progress value={w.pct} className="mb-3 h-1.5" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {w.list.map((d) => {
                const canSkip = deriveStatus(d) !== "completed" && d.date > todayDate;
                return (
                  <div key={d.dayNumber} className="space-y-1.5">
                    <DayCard day={d} />
                    {canSkip && (
                      <ConfirmDialog
                        trigger={
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-full px-2 text-xs text-muted-foreground hover:text-destructive"
                          >
                            <Ban className="mr-1 size-3" aria-hidden="true" /> Skip Day
                          </Button>
                        }
                        title={`Skip Day ${d.dayNumber}?`}
                        description="This day's problems will cascade forward into upcoming days, and the plan will grow by one day."
                        confirmLabel="Skip Day"
                        destructive
                        onConfirm={() => skipDay(d.dayNumber)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
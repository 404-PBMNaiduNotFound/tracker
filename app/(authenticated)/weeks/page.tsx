"use client";

import { useMemo } from "react";
import { usePlan } from "@/hooks/usePlan";
import { formatDate } from "@/lib/plan";
import type { Day } from "@/lib/types";
import { DayCard } from "@/components/DayCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function WeeksPage() {
  const { days, loading } = usePlan();

  const weeks = useMemo(() => {
    const result: Day[][] = [];
    let currentWeek: Day[] = [];
    let currentWeekStart: string | null = null;

    for (const day of days) {
      if (!currentWeekStart) {
        currentWeekStart = day.date;
      }

      const weekIndex = Math.floor(
        (new Date(day.date).getTime() - new Date(currentWeekStart).getTime()) /
          (7 * 24 * 60 * 60 * 1000),
      );

      if (weekIndex > 0 && currentWeek.length > 0) {
        result.push(currentWeek);
        currentWeek = [];
        currentWeekStart = day.date;
      }
      currentWeek.push(day);
    }

    if (currentWeek.length > 0) {
      result.push(currentWeek);
    }

    return result;
  }, [days]);

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-8">
      {weeks.map((week, weekIdx) => (
        <div key={weekIdx} className="space-y-2">
          <h3 className="font-semibold text-sm">
            Week {weekIdx + 1} ({formatDate(week[0].date)} –{" "}
            {formatDate(week[week.length - 1].date)})
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {week.map((d) => (
              <DayCard key={d.date} day={d} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

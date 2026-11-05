import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { DayCell } from "./DayCell";
import { CalendarLegend } from "./CalendarLegend";
import { getCalendarGrid, getNowInIST } from "../../lib/dates";
import { Visit } from "../../types";
import { Button } from "../ui/Button";

interface MonthCalendarProps {
  visits: Visit[];
  isAdmin?: boolean;
  trainerName?: string;
  onSelectDate: (dateStr: string) => void;
}

export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  visits,
  isAdmin = false,
  trainerName,
  onSelectDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => getNowInIST());

  const days = getCalendarGrid(currentMonth);

  // Index visits by date string
  const visitsByDate: Record<string, Visit> = {};
  visits.forEach((v) => {
    visitsByDate[v.date] = v;
  });

  // Calculate current month statistics
  const currentMonthVisits = visits.filter((v) => {
    const [y, m] = v.date.split("-").map(Number);
    return y === currentMonth.getFullYear() && m === currentMonth.getMonth() + 1;
  });

  const submittedCount = currentMonthVisits.filter((v) => v.status === "SUBMITTED").length;
  const plannedCount = currentMonthVisits.filter((v) => v.status === "PLANNED").length;
  const missedCount = currentMonthVisits.filter((v) => v.status === "MISSED").length;

  const totalStudents = currentMonthVisits.reduce((acc, v) => {
    return acc + (v.schools?.reduce((sAcc, s) => sAcc + (s.trainedStudents || 0), 0) || 0);
  }, 0);

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="flex flex-col gap-6">
      {/* Month Header and Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            {trainerName && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                {trainerName}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tap on any date to plan school visits or upload daily work.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(getNowInIST())}
            icon={<CalendarIcon className="w-3.5 h-3.5" />}
          >
            Today
          </Button>
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1">
            <button
              onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Month Summary KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-3.5 shadow-sm">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Submitted Visits</p>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{submittedCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-3.5 shadow-sm">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Planned (Pending)</p>
          <p className="text-xl font-bold text-violet-600 dark:text-violet-400 mt-0.5">{plannedCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-3.5 shadow-sm">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Missed Visits</p>
          <p className="text-xl font-bold text-rose-600 dark:text-rose-400 mt-0.5">{missedCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-3.5 shadow-sm">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Students Trained</p>
          <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 flex items-center gap-1">
            {totalStudents}
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-3 sm:p-5 shadow-sm overflow-hidden">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center mb-2">
          {weekdays.map((w) => (
            <div key={w} className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider py-1">
              {w}
            </div>
          ))}
        </div>

        {/* Days cells */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {days.map((day) => (
            <DayCell
              key={day.dateStr}
              dayNumber={day.dayNumber}
              dateStr={day.dateStr}
              isToday={day.isToday}
              isPast={day.isPast}
              isCurrentMonth={day.isCurrentMonth}
              visit={visitsByDate[day.dateStr]}
              isAdmin={isAdmin}
              onClick={() => onSelectDate(day.dateStr)}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <CalendarLegend />
    </div>
  );
};

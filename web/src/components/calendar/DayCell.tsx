import React from "react";
import { Plus, AlertTriangle, CheckCircle2, Clock, XCircle, Lock } from "lucide-react";
import { Visit } from "../../types";

interface DayCellProps {
  dayNumber: string;
  dateStr: string;
  isToday: boolean;
  isPast: boolean;
  isCurrentMonth: boolean;
  visit?: Visit;
  isAdmin: boolean;
  onClick: () => void;
}

export const DayCell: React.FC<DayCellProps> = ({
  dayNumber,
  isToday,
  isPast,
  isCurrentMonth,
  visit,
  isAdmin,
  onClick,
}) => {
  // Determine status color and icon
  let cellBg = "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80";
  let statusBadge: React.ReactNode = null;
  let statusLabel = "";

  if (visit) {
    if (visit.status === "SUBMITTED") {
      cellBg = "bg-emerald-100/90 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100";
      statusBadge = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      statusLabel = "Submitted";
    } else if (visit.status === "MISSED") {
      cellBg = "bg-rose-100/90 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100";
      statusBadge = <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />;
      statusLabel = "Missed";
    } else if (visit.status === "PLANNED") {
      // Check if it's past reminder time today -> show warning triangle
      const hasReminder = Boolean(visit.reminder1SentAt);
      if (hasReminder) {
        // Light purple + yellow warning triangle icon
        cellBg = "bg-violet-100/90 dark:bg-violet-950/60 border-amber-300 dark:border-amber-700 text-violet-950 dark:text-violet-100 ring-1 ring-amber-400/50";
        statusBadge = (
          <span title="Submission reminder sent!">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
          </span>
        );
        statusLabel = "Pending Submit";
      } else {
        // Normal planned: light purple
        cellBg = "bg-violet-100/90 dark:bg-violet-950/60 border-violet-300 dark:border-violet-800 text-violet-950 dark:text-violet-100";
        statusBadge = <Clock className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />;
        statusLabel = "Planned";
      }
    }
  }

  // Trainers cannot create visits for past empty dates
  const isPastEmpty = isPast && !visit && !isAdmin;

  return (
    <div
      onClick={!isPastEmpty ? onClick : undefined}
      className={`group relative min-h-[92px] sm:min-h-[110px] p-2 rounded-2xl border transition-all duration-150 flex flex-col justify-between ${cellBg} ${
        !isCurrentMonth ? "opacity-35" : ""
      } ${
        isToday ? "ring-2 ring-violet-600 shadow-md shadow-violet-500/20" : ""
      } ${
        isPastEmpty
          ? "cursor-not-allowed bg-slate-50/50 dark:bg-slate-950/30 text-slate-400"
          : "cursor-pointer hover:shadow-md hover:scale-[1.01]"
      }`}
    >
      {/* Top Header: Day Number + Status Icon */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center justify-center w-7 h-7 text-xs font-bold rounded-lg ${
            isToday
              ? "bg-violet-600 text-white shadow-sm"
              : "text-slate-800 dark:text-slate-200 group-hover:bg-slate-100 dark:group-hover:bg-slate-800"
          }`}
        >
          {dayNumber}
        </span>
        <div className="flex items-center gap-1">{statusBadge}</div>
      </div>

      {/* Middle: Visit Info Snippet */}
      <div className="my-1 min-w-0">
        {visit && (
          <div className="text-[11px] font-semibold truncate leading-tight">
            <span>
              {visit.schools?.length || 0} school{visit.schools?.length !== 1 ? "s" : ""}
            </span>
            <div className="text-[10px] opacity-80 truncate">
              {visit.schools?.[0]?.name || statusLabel}
            </div>
          </div>
        )}
      </div>

      {/* Bottom: Action Trigger (+) or Lock indicator */}
      <div className="flex items-center justify-end">
        {isPastEmpty ? (
          <Lock className="w-3 h-3 text-slate-300 dark:text-slate-600" />
        ) : (
          <button
            type="button"
            className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/10 opacity-70 group-hover:opacity-100 group-hover:bg-violet-600 group-hover:text-white flex items-center justify-center transition-all"
            title={visit ? "Open visit details" : "Add school visit"}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

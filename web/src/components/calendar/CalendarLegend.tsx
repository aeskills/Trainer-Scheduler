import React from "react";
import { AlertTriangle, CheckCircle2, Clock, XCircle } from "lucide-react";

export const CalendarLegend: React.FC = () => {
  const items = [
    {
      label: "Planned",
      desc: "Morning plan saved, not yet submitted",
      color: "bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/70 dark:text-violet-300 dark:border-violet-800",
      icon: <Clock className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />,
    },
    {
      label: "Submitted",
      desc: "Day's work & photos submitted",
      color: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      label: "Pending Submit",
      desc: "Reminder sent, submit before 11:59 PM",
      color: "bg-violet-100 text-amber-800 border-amber-300 dark:bg-violet-950/70 dark:text-amber-300 dark:border-amber-700",
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />,
    },
    {
      label: "Missed",
      desc: "Not submitted by midnight",
      color: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800",
      icon: <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-4 shadow-sm">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
        Status Legend
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-2.5">
            <span className={`inline-flex items-center justify-center p-1.5 rounded-lg border shrink-0 ${item.color}`}>
              {item.icon}
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{item.label}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

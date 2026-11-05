import React from "react";
import { AlertTriangle, CheckCircle2, Clock, XCircle } from "lucide-react";

interface BadgeProps {
  status: "PLANNED" | "SUBMITTED" | "REMINDER" | "MISSED" | "Approved" | "Pending" | "Rejected" | "Deactivated" | string;
  showIcon?: boolean;
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({ status, showIcon = true, size = "md" }) => {
  let bg = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
  let icon: React.ReactNode = null;
  let text = status;

  switch (status) {
    case "PLANNED":
      bg = "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800";
      icon = <Clock className="w-3.5 h-3.5" />;
      text = "Planned";
      break;
    case "SUBMITTED":
      bg = "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
      icon = <CheckCircle2 className="w-3.5 h-3.5" />;
      text = "Submitted";
      break;
    case "REMINDER":
      bg = "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
      icon = <AlertTriangle className="w-3.5 h-3.5" />;
      text = "Pending Submit";
      break;
    case "MISSED":
      bg = "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
      icon = <XCircle className="w-3.5 h-3.5" />;
      text = "Missed";
      break;
    case "Approved":
      bg = "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
      icon = <CheckCircle2 className="w-3.5 h-3.5" />;
      text = "Approved";
      break;
    case "Pending":
      bg = "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
      icon = <Clock className="w-3.5 h-3.5" />;
      text = "Pending Approval";
      break;
    case "Rejected":
    case "Deactivated":
      bg = "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
      icon = <XCircle className="w-3.5 h-3.5" />;
      break;
  }

  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${bg} ${sizeClasses}`}
    >
      {showIcon && icon}
      {text}
    </span>
  );
};

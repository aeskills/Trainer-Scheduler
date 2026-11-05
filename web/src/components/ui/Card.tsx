import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, glass, className = "", ...props }) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 dark:border-slate-800/80 ${
        glass ? "glass" : "bg-white dark:bg-slate-900"
      } shadow-sm shadow-slate-200/50 dark:shadow-none p-4 sm:p-6 transition-all ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

interface SuccessCelebrationProps {
  dateDisplay: string;
  onClose: () => void;
}

export const SuccessCelebration: React.FC<SuccessCelebrationProps> = ({
  dateDisplay,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 text-center shadow-2xl flex flex-col items-center gap-4">
        {/* Animated Success Badge */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xl shadow-emerald-500/20 scale-100 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Submission Successful</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Day Locked & Saved!
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            Your school training work and Google Drive photos for <strong>{dateDisplay}</strong> have been safely recorded.
          </p>
        </div>

        <div className="w-full pt-4">
          <Button size="lg" className="w-full" onClick={onClose}>
            Back to Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

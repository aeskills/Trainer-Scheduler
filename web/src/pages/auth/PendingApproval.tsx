import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";

export const PendingApproval: React.FC = () => {
  const location = useLocation();
  const { logout, isApproved } = useAuth();
  const name = (location.state as any)?.name || "Trainer";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-slate-50/70 dark:bg-[#090714]">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-8 text-center shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Clock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Registration Under Review
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Hello <strong>{name}</strong>! Your registration is currently awaiting administrator approval.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-left w-full text-xs text-slate-600 dark:text-slate-400 flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Email verified successfully</span>
            </div>
            <p className="text-[11px] text-slate-500 pl-6">
              You will receive a confirmation email once your account is activated. Then you can sign in directly.
            </p>
          </div>

          <div className="w-full pt-3 flex flex-col gap-2">
            {isApproved ? (
              <Link to="/">
                <Button size="lg" className="w-full">
                  Go to Calendar
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={() => window.location.reload()}
              >
                Check Approval Status
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

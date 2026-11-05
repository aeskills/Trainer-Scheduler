import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, KeyRound, Lock, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { loginAdmin } from "../../services/authApi";
import { useAuth } from "../../hooks/useAuth";

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { firebaseUser, role } = useAuth();

  const [adminId, setAdminId] = useState<string>("");
  const [adminPass, setAdminPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated as admin, go to /admin dashboard
  useEffect(() => {
    if (firebaseUser && role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [firebaseUser, role, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginAdmin(adminId, adminPass);
      navigate("/admin", { replace: true });
    } catch (err: any) {
      setError("Invalid administrative credentials. Please verify your Admin ID and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-slate-950 text-slate-100">
      <div className="w-full max-w-md">
        {/* Security Shield Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-700 flex items-center justify-center text-white shadow-xl shadow-violet-900/40 mb-3 border border-violet-500/30">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-800/80 text-[11px] font-semibold text-violet-300 mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Restricted Access · Authorized Personnel Only</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Admin Console Access
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Enter administrative credentials to access the system supervision environment.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/50 border border-rose-800 text-xs text-rose-300 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Admin ID"
              type="text"
              required
              autoFocus
              placeholder="Enter Admin ID"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              icon={<KeyRound className="w-4 h-4 text-violet-400" />}
            />

            <Input
              label="Admin Password"
              type="password"
              required
              placeholder="Enter password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              icon={<Lock className="w-4 h-4 text-violet-400" />}
            />

            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="mt-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-lg shadow-violet-600/30"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Admin Console
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
            <span>Unauthorized access attempts are monitored and logged.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

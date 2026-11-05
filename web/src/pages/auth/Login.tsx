import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff, KeyRound, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { loginTrainerWithPassword, requestOtp, verifyOtp } from "../../services/authApi";
import { useAuth } from "../../hooks/useAuth";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { firebaseUser, role, isApproved } = useAuth();

  const [authMode, setAuthMode] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otpStep, setOtpStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState<string>("");
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [otpInfo, setOtpInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // If already signed in, redirect
  useEffect(() => {
    if (firebaseUser) {
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (isApproved) {
        navigate("/", { replace: true });
      } else {
        navigate("/pending", { replace: true });
      }
    }
  }, [firebaseUser, role, isApproved, navigate]);

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle password login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPass = password.trim();
    if (!cleanEmail || !cleanPass) return;

    setError(null);
    setLoading(true);

    try {
      const res = await loginTrainerWithPassword(cleanEmail, cleanPass);
      if (res.status === "ok") {
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please verify your Email and Password.");
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Send OTP code
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    setError(null);
    setOtpInfo(null);
    setLoading(true);

    try {
      const res = await requestOtp(cleanEmail, "login");
      setOtpStep(2);
      setResendTimer(res.resendAfter || 30);
      setOtpInfo(res.message || `OTP sent to ${cleanEmail}`);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();
    if (!cleanEmail || cleanOtp.length < 6) return;

    setError(null);
    setLoading(true);

    try {
      const res = await verifyOtp(cleanEmail, cleanOtp);
      if (res.status === "ok") {
        navigate("/", { replace: true });
      } else {
        navigate("/pending", { replace: true });
      }
    } catch (err: any) {
      setError(err.message || "Invalid or expired OTP code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setError(null);
    setLoading(true);
    try {
      const res = await requestOtp(email.trim().toLowerCase(), "login");
      setResendTimer(res.resendAfter || 30);
      setOtpInfo(res.message || "New OTP has been sent!");
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-slate-50/70 dark:bg-[#090714]">
      <div className="w-full max-w-md">
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-violet-500/30 mb-3">
            T
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            TrainerPlan
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Field Trainer Scheduler & School Visit Tracker
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {authMode === "password" ? "Trainer Sign In" : "Sign In with OTP"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {authMode === "password"
                ? "Enter your assigned Email / ID and Password to sign in."
                : otpStep === 1
                ? "Enter your registered Gmail address to receive an OTP code."
                : `Enter the 6-digit OTP code sent to ${email}`}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 font-medium animate-fadeIn">
              {error}
            </div>
          )}

          {otpInfo && authMode === "otp" && (
            <div className="mb-5 p-3.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-xs text-violet-700 dark:text-violet-300 font-medium animate-fadeIn">
              {otpInfo}
            </div>
          )}

          {/* MODE 1: Password Login Form */}
          {authMode === "password" ? (
            <form onSubmit={handlePasswordLogin} className="flex flex-col gap-4">
              <Input
                label="Trainer Email or ID"
                type="text"
                required
                autoFocus
                placeholder="e.g. name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4 text-slate-400" />}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="w-4 h-4 text-slate-400" />}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="mt-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-md shadow-violet-600/30"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In
              </Button>
            </form>
          ) : (
            /* MODE 2: OTP Login Form */
            otpStep === 1 ? (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                <Input
                  label="Registered Gmail Address"
                  type="email"
                  required
                  autoFocus
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4 text-slate-400" />}
                />

                <Button
                  type="submit"
                  size="lg"
                  loading={loading}
                  className="mt-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-md shadow-violet-600/30"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Send Verification Code (OTP)
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>Code sent to: <strong className="text-slate-700 dark:text-slate-200">{email}</strong></span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpStep(1);
                      setOtp("");
                    }}
                    className="text-violet-600 hover:underline font-medium"
                  >
                    Change
                  </button>
                </div>

                <Input
                  label="6-Digit Verification Code"
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  icon={<ShieldCheck className="w-4 h-4 text-slate-400" />}
                  className="tracking-widest text-center text-lg font-mono font-bold"
                />

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Didn't receive code?</span>
                  {resendTimer > 0 ? (
                    <span className="text-slate-400 font-mono">Resend in {resendTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleResendOtp}
                      className="text-violet-600 hover:underline font-semibold flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Resend OTP</span>
                    </button>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={otp.length < 6 || loading}
                  loading={loading}
                  className="mt-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-md shadow-violet-600/30"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Verify & Sign In
                </Button>
              </form>
            )
          )}

          {/* OR Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
            <span className="px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              OR
            </span>
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
          </div>

          {/* Toggle between Password and OTP */}
          {authMode === "password" ? (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => {
                setError(null);
                setOtpInfo(null);
                setAuthMode("otp");
                setOtpStep(1);
              }}
              icon={<KeyRound className="w-4 h-4 text-violet-600" />}
              className="w-full text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Sign in with OTP
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => {
                setError(null);
                setOtpInfo(null);
                setAuthMode("password");
              }}
              icon={<Lock className="w-4 h-4 text-violet-600" />}
              className="w-full text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Sign in with Password
            </Button>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500">
            <span>Credentials are issued and managed by your system administrator.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

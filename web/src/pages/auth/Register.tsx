import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { OtpInput } from "../../components/ui/OtpInput";
import { requestOtp, registerTrainer } from "../../services/authApi";

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [state, setState] = useState<string>("UP");
  const [code, setCode] = useState<string>("");

  const [step, setStep] = useState<"details" | "otp">("details");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState<number>(0);

  const handleSendRegistrationOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !state) return;

    setError(null);
    setLoading(true);

    try {
      const res = await requestOtp(email.trim().toLowerCase(), "register");
      setStep("otp");
      setResendTimer(res.resendAfter || 30);
    } catch (err: any) {
      setError(err.message || "Failed to send verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (code.length !== 6) return;

    setError(null);
    setLoading(true);

    try {
      const res = await registerTrainer({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        state,
        code,
      });

      if (res.status === "ok") {
        navigate("/", { replace: true });
      } else {
        navigate("/pending", { replace: true, state: { name } });
      }
    } catch (err: any) {
      const msg = err?.message === "internal"
        ? "Network error connecting to registration server. Please try again."
        : (err?.message || "Registration failed. Check code and details.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-slate-50/70 dark:bg-[#090714]">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-violet-500/30 mb-3">
            T
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Trainer Registration
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Join TrainerPlan to plan and track your school visits
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 font-medium">
              {error}
            </div>
          )}

          {step === "details" ? (
            <form onSubmit={handleSendRegistrationOtp} className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile Details</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Your email will be verified with a one-time OTP.
                </p>
              </div>

              <Input
                label="Full Name"
                required
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User className="w-4 h-4" />}
              />

              <Input
                label="Gmail Address"
                type="email"
                required
                placeholder="trainer@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
              />

              <Input
                label="Mobile Number (Contact only)"
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={<Phone className="w-4 h-4" />}
                helperText="10-digit mobile number for coordinator contact"
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Assigned State
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3 text-slate-400 pointer-events-none">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  >
                    <option value="UP">Uttar Pradesh (UP)</option>
                    <option value="UK">Uttarakhand (UK)</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="mt-2 w-full"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Verify Email & Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleCompleteRegistration} className="flex flex-col gap-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-[11px] font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify Email Address</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Enter 6-Digit Code
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  We've sent a 6-digit code to <strong>{email}</strong> to verify this account.
                </p>
              </div>

              <div className="py-2">
                <OtpInput value={code} onChange={setCode} disabled={loading} />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={code.length !== 6 || loading}
                loading={loading}
                className="w-full"
              >
                Complete Registration
              </Button>

              <div className="flex items-center justify-between pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Edit profile details
                </button>

                {resendTimer > 0 ? (
                  <span className="text-slate-400 font-medium">Resend in {resendTimer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendRegistrationOtp}
                    disabled={loading}
                    className="text-violet-600 dark:text-violet-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Resend Code
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-violet-600 dark:text-violet-400 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

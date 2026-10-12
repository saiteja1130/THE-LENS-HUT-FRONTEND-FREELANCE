import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowRight, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const VerifyEmail = () => {
  const { verifyEmail, resendVerificationOTP } = useAuth();
  const { toast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const queryEmail = new URLSearchParams(location.search).get('email') || '';
  const stateEmail = location.state?.email || '';
  const initialEmail = stateEmail || queryEmail || '';

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Countdown timer for resending OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!email.trim()) {
      setFieldErrors({ email: 'Email address is required' });
      return;
    }

    if (!otp.trim()) {
      setFieldErrors({ otp: 'Please enter the 6-digit verification code' });
      return;
    }

    if (otp.trim().length !== 6) {
      setFieldErrors({ otp: 'Code must be exactly 6 digits' });
      return;
    }

    setLoading(true);
    const res = await verifyEmail(email.trim(), otp.trim());
    setLoading(false);

    if (res.success) {
      toast.success('Email verified successfully! Welcome to The Lens Hut.');
      navigate('/account', { replace: true });
    } else {
      setError(res.error || 'Failed to verify email.');
      if (res.errors) {
        setFieldErrors(res.errors);
      }
      toast.error(res.error || 'Verification failed');
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resending) return;
    if (!email.trim()) {
      toast.error('Please provide an email address first.');
      return;
    }

    setError(null);
    setResending(true);
    const res = await resendVerificationOTP(email.trim());
    setResending(false);

    if (res.success) {
      toast.success('A fresh 6-digit code has been sent to your email.');
      setCountdown(60);
    } else {
      toast.error(res.message || 'Failed to resend verification code');
      if (res.errors) setFieldErrors(res.errors);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-8 sm:p-10 space-y-6">
        
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#E4232C]/10 border border-[#E4232C]/20 flex items-center justify-center text-[#E4232C]">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#14232E] tracking-tight">
              Verify Your Email
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs mx-auto">
              Mandatory verification required. Enter the 6-digit code sent to your inbox.
            </p>
          </div>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2.5">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-5">
          {/* Email Address Field */}
          <div>
            <label className="text-xs font-bold text-[#14232E] block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={`w-full pl-10 pr-4 py-3 bg-white border ${
                  fieldErrors.email ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-[#14232E]'
                } rounded-xl text-xs sm:text-sm text-[#14232E] placeholder:text-slate-400 focus:outline-none transition-colors`}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-rose-600 text-[11px] font-semibold mt-1">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* 6-Digit OTP Field */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-[#14232E]">
                6-Digit Verification Code *
              </label>
              <span className="text-[11px] text-slate-400">Valid for 10 mins</span>
            </div>
            <input
              type="text"
              maxLength={6}
              inputMode="numeric"
              autoFocus
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setOtp(val);
                if (fieldErrors.otp) {
                  setFieldErrors((prev) => ({ ...prev, otp: null }));
                }
              }}
              placeholder="••••••"
              className={`w-full py-3.5 px-4 text-center tracking-[0.4em] font-mono text-2xl font-bold bg-white border ${
                fieldErrors.otp ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-[#14232E]'
              } rounded-xl text-[#14232E] placeholder:text-slate-300 focus:outline-none transition-colors`}
            />
            {fieldErrors.otp && (
              <p className="text-rose-600 text-[11px] font-semibold mt-1 text-center">
                {fieldErrors.otp}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || otp.length < 6}
            className="w-full py-3.5 px-6 bg-[#14232E] hover:bg-[#1E3445] disabled:bg-slate-300 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Verify & Activate Account</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Resend OTP Section */}
        <div className="pt-2 border-t border-slate-100 flex flex-col items-center space-y-3">
          <p className="text-xs text-slate-500">
            Didn't receive the email code?
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || resending}
            className="text-xs font-bold text-[#E4232C] hover:text-[#C71B23] disabled:text-slate-400 flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <RefreshCw size={13} className={resending ? 'animate-spin' : ''} />
            <span>
              {resending
                ? 'Sending code...'
                : countdown > 0
                ? `Resend Code in ${countdown}s`
                : 'Resend Verification Code'}
            </span>
          </button>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-xs font-bold text-slate-500 hover:text-[#14232E] transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

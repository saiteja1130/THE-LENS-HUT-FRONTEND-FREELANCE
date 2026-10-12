import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const ResetPassword = () => {
  const {
    resetPassword
  } = useAuth();
  const { toast } = useNotification();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      const err = 'Password must be at least 6 characters long.';
      setError(err);
      toast.warning(err);
      return;
    }
    if (password !== confirmPassword) {
      const err = 'Passwords do not match.';
      setError(err);
      toast.warning(err);
      return;
    }
    setLoading(true);
    const res = await resetPassword(password);
    setLoading(false);
    setStatusMessage(res.message);
    toast.success('Your password has been updated!');
  };
  return <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-[#FFFFFF]">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-lg space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-[#14232E] tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Create a secure new password for your The Lens Hut account.
          </p>
        </div>

        {error && <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
            {error}
          </div>}

        {statusMessage ? <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 space-y-3">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 size={16} />
              <span>Password Changed!</span>
            </div>
            <p>{statusMessage}</p>
            <div className="pt-2">
              <Link to="/login" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E4232C] text-white text-xs font-bold rounded-md">
                <span>LOG IN NOW</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div> : <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#14232E] block mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                <input type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-md text-xs text-[#14232E] focus:outline-none focus:border-[#14232E]" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#14232E] block mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                <input type={showPassword ? 'text' : 'password'} required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat new password" className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-md text-xs text-[#14232E] focus:outline-none focus:border-[#14232E]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-md shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
              <span>{loading ? 'Updating password...' : 'RESET PASSWORD'}</span>
              <ArrowRight size={15} />
            </button>
          </form>}
      </div>
    </div>;
};
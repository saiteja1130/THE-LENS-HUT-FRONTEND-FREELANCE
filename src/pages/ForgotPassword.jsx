import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const ForgotPassword = () => {
  const {
    forgotPassword
  } = useAuth();
  const { toast } = useNotification();
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const res = await forgotPassword(email);
    setLoading(false);
    setStatusMessage(res.message);
    toast.success('Password recovery link dispatched');
  };
  return <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-[#FFFFFF]">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-lg space-y-6">
        <div className="space-y-1">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#14232E] mb-2 font-medium">
            <ArrowLeft size={13} />
            <span>Back to Login</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#14232E] tracking-tight">
            Forgot Password?
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Enter the email associated with your The Lens Hut account and we will send you secure password reset instructions.
          </p>
        </div>

        {statusMessage ? <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 space-y-3">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 size={16} />
              <span>Reset Link Sent</span>
            </div>
            <p>{statusMessage}</p>
            <div className="pt-2">
              <Link to="/reset-password" className="text-xs font-bold text-[#E4232C] hover:underline">
                Proceed to Reset Password Screen →
              </Link>
            </div>
          </div> : <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#14232E] block mb-1">
                Your Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-md text-xs text-[#14232E] focus:outline-none focus:border-[#14232E]" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-md shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
              <span>{loading ? 'Sending link...' : 'SEND RESET LINK'}</span>
              <ArrowRight size={15} />
            </button>
          </form>}
      </div>
    </div>;
};
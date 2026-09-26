import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from '../components/common/BrandLogo';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await login(email, password, rememberMe);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    const res = await login(`user.${provider.toLowerCase()}@thelenshut.com`, 'SocialPass123!', true);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] bg-white flex flex-col justify-between overflow-hidden">
      {/* Editorial Atmospheric Background Photo with Seamless Dissolve */}
      <div className="absolute top-0 left-0 right-0 h-[580px] sm:h-[640px] lg:h-[700px] pointer-events-none z-0 overflow-hidden">
        <img 
          src="/images/auth/login-hero.png" 
          alt="Stylish man wearing sunglasses" 
          className="w-full h-full object-cover object-[24%_top] sm:object-[28%_top] lg:object-[32%_top]"
          style={{
            maskImage: 'linear-gradient(to bottom, black 45%, rgba(0,0,0,0.6) 65%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 45%, rgba(0,0,0,0.6) 65%, transparent 100%)'
          }}
        />
        {/* Ambient bottom-fade gradient into pure white */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/70" />
      </div>

      {/* Main Split Authentication Section */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Brand Value Pillars placed right below the portrait fade */}
          <div className="lg:col-span-6 flex flex-col pt-[280px] sm:pt-[340px] lg:pt-[380px]">
            {/* Typography & Messaging */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E4232C] block">
                WELCOME BACK
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#14232E] tracking-tight leading-[1.15]">
                See Better
                <br />
                Live Brighter
              </h1>

              {/* Red Accent Bar */}
              <div className="w-10 h-1 bg-[#E4232C] rounded-full my-3" />

              <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed pt-1">
                Log in to your account and get access to exclusive offers, faster checkout and personalized recommendations.
              </p>

              {/* 3 Circular Feature Pillars */}
              <div className="grid grid-cols-3 max-w-sm pt-6 gap-4">
                {/* 1. Exclusive Offers */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white shadow-2xs border border-slate-200/90 flex items-center justify-center text-[#14232E] mb-2.5">
                    <Heart size={18} strokeWidth={1.8} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#14232E] leading-tight">
                    Exclusive<br />Offers
                  </span>
                </div>

                {/* 2. Faster Checkout */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white shadow-2xs border border-slate-200/90 flex items-center justify-center text-[#14232E] mb-2.5">
                    <svg className="w-5 h-5 text-[#14232E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="3" width="14" height="18" rx="2" />
                      <path d="M13 7l-3 5h4l-2 5" />
                    </svg>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#14232E] leading-tight">
                    Faster<br />Checkout
                  </span>
                </div>

                {/* 3. Personalized Experience */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white shadow-2xs border border-slate-200/90 flex items-center justify-center text-[#14232E] mb-2.5">
                    <svg className="w-5 h-5 text-[#14232E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="7.5" r="3.2" />
                      <circle cx="7.8" cy="15.5" r="3.2" />
                      <circle cx="16.2" cy="15.5" r="3.2" />
                    </svg>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#14232E] leading-tight">
                    Personalized<br />Experience
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Authentication Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[460px] bg-white rounded-3xl border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 sm:p-10 space-y-5">
              <div>
                <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#14232E] tracking-tight">
                  Login to Your Account
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Enter your details to access your account.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Address */}
                <div>
                  <label className="text-xs font-bold text-[#14232E] block mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] placeholder:text-slate-400 focus:outline-none focus:border-[#14232E] transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-bold text-[#14232E] block mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] placeholder:text-slate-400 focus:outline-none focus:border-[#14232E] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 accent-[#E4232C] cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>

                  <Link to="/forgot-password" className="font-bold text-[#E4232C] hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>{loading ? 'Logging in...' : 'Login'}</span>
                  <ArrowRight size={15} />
                </button>
              </form>

             

              {/* Bottom Switch to Register */}
              <div className="pt-2 text-center text-xs text-slate-600">
                Don't have an account?{' '}
                <Link to="/create-account" className="font-bold text-[#E4232C] hover:underline">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Footer Action Banner matching the approved screenshot */}
      <div className="relative z-10 bg-[#F0F5F9] border-t border-slate-200/80 py-7 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left">
            <div className="bg-white rounded-3xl sm:rounded-full px-6 py-3.5 shadow-xs border border-slate-200/70 flex items-center shrink-0">
              <BrandLogo size="md" showTagline={true} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#14232E]">
                New to The Lens Hut?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Create an account and start your journey to better vision.
              </p>
            </div>
          </div>

          <Link
            to="/create-account"
            className="px-6 py-2.5 bg-transparent hover:bg-white text-[#14232E] border border-slate-400 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs flex items-center gap-2 shrink-0"
          >
            <span>Create Account</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
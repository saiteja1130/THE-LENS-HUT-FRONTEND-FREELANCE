import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from '../components/common/BrandLogo';

export const SignUp = () => {
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!agreeTerms) {
      setError('Please accept the Terms & Conditions and Privacy Policy to continue.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const res = await signup({
      name,
      email,
      password,
      phone
    });
    setLoading(false);

    if (res.success) {
      navigate('/account');
    } else {
      setError(res.error || 'Failed to create account.');
    }
  };

  const handleSocialSignup = async (provider) => {
    setLoading(true);
    const res = await login(`user.${provider.toLowerCase()}@thelenshut.com`, 'SocialPass123!', true);
    setLoading(false);

    if (res.success) {
      navigate('/account');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] bg-white flex flex-col justify-between overflow-hidden">
      {/* Editorial Atmospheric Background Photo with Seamless Dissolve */}
      <div className="absolute top-0 left-0 right-0 h-[580px] sm:h-[640px] lg:h-[700px] pointer-events-none z-0 overflow-hidden">
        <img 
          src="/images/auth/signup-hero.png" 
          alt="Radiant woman wearing chic sunglasses" 
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

      {/* Main Split Registration Section */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Female Model with Sunglasses & Campaign Copy */}
          <div className="lg:col-span-6 flex flex-col pt-[280px] sm:pt-[340px] lg:pt-[380px]">
            {/* Typography & Messaging */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E4232C] block">
                JOIN THE LENS HUT
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#14232E] tracking-tight leading-[1.15]">
                Better Vision
                <br />
                Starts Here
              </h1>

              {/* Red Accent Line */}
              <div className="w-10 h-1 bg-[#E4232C] rounded-full my-3" />

              <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed pt-1">
                Create your account to enjoy exclusive offers, faster checkout and a personalized shopping experience.
              </p>
            </div>
          </div>

          {/* Right Column: Clean White Create Account Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[460px] bg-white rounded-3xl border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 sm:p-10 space-y-4">
              <div>
                <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#14232E] tracking-tight">
                  Create Your Account
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Join The Lens Hut and get access to exclusive benefits.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-[#14232E] block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] placeholder:text-slate-400 focus:outline-none focus:border-[#14232E] transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-xs font-bold text-[#14232E] block mb-1">
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
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] placeholder:text-slate-400 focus:outline-none focus:border-[#14232E] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-xs font-bold text-[#14232E] block mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] placeholder:text-slate-400 focus:outline-none focus:border-[#14232E] transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-bold text-[#14232E] block mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] placeholder:text-slate-400 focus:outline-none focus:border-[#14232E] transition-colors"
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

                {/* Terms Agreement Checkbox */}
                <div className="pt-1">
                  <label htmlFor="agreeTerms" className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 accent-[#E4232C] mt-0.5 cursor-pointer shrink-0"
                    />
                    <span>
                      I agree to the{' '}
                      <Link to="/terms" className="text-[#E4232C] font-semibold hover:underline">
                        Terms & Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy-policy" className="text-[#E4232C] font-semibold hover:underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                  <ArrowRight size={15} />
                </button>
              </form>


              {/* Bottom Switch to Login */}
              <div className="pt-2 text-center text-xs text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-[#E4232C] hover:underline">
                  Login
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
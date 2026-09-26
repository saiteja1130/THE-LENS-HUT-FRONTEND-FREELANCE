import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="w-full bg-[#F8F9FA] py-8 sm:py-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Mail Icon & Text */}
        <div className="flex items-center gap-4 text-left w-full md:w-auto">
          <div className="text-[#14232E] shrink-0">
            <Mail size={26} strokeWidth={1.7} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#111827]">
              Join Our Newsletter
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Get exclusive offers, new arrivals and eyewear tips.
            </p>
          </div>
        </div>

        {/* Right: Email Input & Subscribe Button */}
        <div className="w-full md:w-auto">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full sm:w-80 px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-[#111827] placeholder-slate-400 focus:outline-none focus:border-[#E4232C] shadow-2xs"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              Subscribe
            </button>
          </form>

          {submitted && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-2 font-medium">
              <CheckCircle2 size={13} />
              <span>Thank you for subscribing! Your 10% welcome coupon is on its way.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
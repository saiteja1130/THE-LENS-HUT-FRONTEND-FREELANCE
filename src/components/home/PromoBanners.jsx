import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const PromoBanners = () => {
  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Banner: Modern Styles for Modern You (Warm Cream / Full-bleed photo on right) */}
          <div className="lg:col-span-6 bg-[#F7EFEB] rounded-3xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 border border-[#f0ded6] min-h-[240px] sm:min-h-[360px]">
            {/* Background Eyewear Image full-bleed on right half */}
            <div className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 h-full overflow-hidden pointer-events-none">
              <img
                src="/images/home/promo-eyeglasses.png"
                alt="Modern black eyeglass frame"
                className="w-full h-full object-cover object-[35%_20%]"
              />
              {/* Soft gradient dissolve into the warm cream background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F7EFEB] via-[#F7EFEB]/50 to-transparent" />
            </div>

            {/* Circular Discount Badge at Top Right */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-[#E4232C] text-white flex flex-col items-center justify-center text-center shadow-lg z-20 select-none">
              <span className="text-[8px] sm:text-[9px] font-bold tracking-wider leading-none">UP TO</span>
              <span className="text-sm sm:text-lg font-black leading-none my-0.5">50%</span>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-wider leading-none">OFF</span>
            </div>

            {/* Content Column */}
            <div className="space-y-2.5 sm:space-y-3 z-10 max-w-[240px] sm:max-w-xs">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#E4232C] block">
                TRENDING FRAMES
              </span>

              <h2 className="text-xl sm:text-3xl font-extrabold text-[#111827] tracking-tight leading-tight">
                Modern Styles
                <br />
                for Modern You
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Discover the latest in eyewear fashion and find your perfect frame.
              </p>

              <div className="pt-2 sm:pt-3">
                <Link
                  to="/eyeglasses"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-bold rounded-full transition-all shadow-sm cursor-pointer group"
                >
                  <span>Shop Eyeglasses</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Banner: See the World in Style (Dark Navy / Full-bleed man on right) */}
          <div className="lg:col-span-6 bg-[#14202C] rounded-3xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 text-white border border-slate-800 min-h-[240px] sm:min-h-[360px]">
            {/* Background Model image full-bleed on right half */}
            <div className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 h-full overflow-hidden pointer-events-none">
              <img
                src="/images/home/promo-sunglasses-man.png"
                alt="Handsome man in sunglasses"
                className="w-full h-full object-cover object-[45%_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#14202C] via-[#14202C]/50 to-transparent" />
            </div>

            {/* Content Column */}
            <div className="space-y-3 z-10 max-w-[280px] sm:max-w-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                SUNGLASSES
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                See the World
                <br />
                in Style
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Premium sunglasses for every adventure.
              </p>

              <div className="pt-3">
                <Link
                  to="/sunglasses"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-slate-100 text-[#111827] text-xs font-bold rounded-full transition-all shadow-sm cursor-pointer group"
                >
                  <span>Shop Sunglasses</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform text-[#111827]" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
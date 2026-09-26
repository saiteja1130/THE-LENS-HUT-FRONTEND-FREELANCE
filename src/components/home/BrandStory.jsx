import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const BrandStory = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden py-8 sm:py-12 lg:py-16 border-y border-slate-100">
      {/* Desktop Background Image starting from left edge (hidden on mobile, visible lg:block) */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[46%] overflow-hidden pointer-events-none z-0">
        <img
          src="/images/home/brand-story-couple.png"
          alt="Happy couple smiling wearing sunglasses"
          className="w-full h-full object-cover object-[center_20%]"
        />
        {/* Seamless horizontal gradient dissolving into pure white */}
        <div className="absolute inset-y-0 right-0 w-36 bg-gradient-to-r from-transparent to-white" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Mobile/Tablet Image Card (visible on mobile, hidden on desktop) */}
        <div className="lg:hidden w-full h-56 sm:h-72 rounded-2xl overflow-hidden relative mb-6 shadow-2xs">
          <img
            src="/images/home/brand-story-couple.png"
            alt="Happy couple smiling wearing sunglasses"
            className="w-full h-full object-cover object-[center_20%]"
          />
        </div>

        <div className="lg:pl-[46%] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
          {/* Editorial Brand Copy & Button */}
          <div className="space-y-3 max-w-lg w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E4232C] block">
              THE LENS HUT
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111827] tracking-tight leading-tight">
              More Than Just Eyewear
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-0.5">
              At The Lens Hut, we believe in the power of clear vision and confident style. Our curated collection brings together quality, comfort and the latest trends — all in one place.
            </p>

            <div className="pt-2">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-sm cursor-pointer group"
              >
                <span>Learn More</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Script Slogan */}
          <div className="shrink-0 self-start sm:self-center pt-2 sm:pt-0">
            <div className="inline-block relative">
              <p className="font-serif italic text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-tight select-none">
                Better Vision,
                <br />
                Brighter Tomorrow.
              </p>
              {/* Red Curved Brush Stroke Swoosh */}
              <svg
                className="w-32 sm:w-36 h-3 text-[#E4232C] mt-1 ml-auto"
                viewBox="0 0 120 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M4 8 Q 60 1 116 8" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
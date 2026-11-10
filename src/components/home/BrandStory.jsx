import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const BrandStory = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#F8F9FA] border border-slate-200/90 rounded-3xl overflow-hidden shadow-xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left: Editorial Image Column */}
            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[500px] overflow-hidden group">
              <img
                src="/images/home/brand-story-couple.png"
                alt="Happy couple smiling wearing The Lens Hut eyewear"
                className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Subtle visual gradient blend on desktop right edge */}
              <div className="hidden lg:block absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent to-[#F8F9FA]" />
              
              {/* Subtle visual gradient blend on mobile bottom edge */}
              <div className="lg:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F8F9FA] to-transparent" />

              {/* Floating Lifestyle Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#14232E] text-xs font-bold shadow-sm border border-white/60">
                  <Sparkles size={12} className="text-[#E4232C]" />
                  <span>The Lens Hut Philosophy</span>
                </div>
              </div>
            </div>

            {/* Right: Brand Storytelling Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between space-y-6 sm:space-y-8">
              
              {/* Top Block: Eyebrow + Heading + Supporting Message */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E4232C]">
                  <span className="w-2 h-2 rounded-full bg-[#E4232C]" />
                  <span>Crafted with Purpose</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#14232E] tracking-tight leading-[1.18]">
                  More Than Just Eyewear
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
                  At The Lens Hut, we believe in the power of clear vision and confident style. Our curated collection brings together quality, comfort and the latest trends — all in one place.
                </p>

                {/* 3 Brand Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3 py-2 rounded-xl border border-slate-200/70 shadow-2xs">
                    <CheckCircle2 size={15} className="text-[#E4232C] shrink-0" />
                    <span>Featherlight Fit</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3 py-2 rounded-xl border border-slate-200/70 shadow-2xs">
                    <CheckCircle2 size={15} className="text-[#E4232C] shrink-0" />
                    <span>UV & Blue Cut</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3 py-2 rounded-xl border border-slate-200/70 shadow-2xs">
                    <CheckCircle2 size={15} className="text-[#E4232C] shrink-0" />
                    <span>Precision Optics</span>
                  </div>
                </div>
              </div>

              {/* Bottom Block: Slogan Callout + Learn More CTA */}
              <div className="pt-4 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                
                {/* Distinctive Brand Slogan */}
                <div className="relative">
                  <p className="font-serif italic text-2xl sm:text-[26px] font-bold text-[#14232E] tracking-tight leading-snug">
                    Better Vision,
                    <br />
                    Brighter Tomorrow.
                  </p>
                  {/* Red Curved Accent Brush Stroke */}
                  <svg
                    className="w-32 sm:w-36 h-3 text-[#E4232C] mt-1"
                    viewBox="0 0 120 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M4 8 Q 60 1 116 8" />
                  </svg>
                </div>

                {/* Clear Learn More CTA */}
                <div className="shrink-0">
                  <Link
                    to="/about-us"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:translate-x-0.5 cursor-pointer group"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;

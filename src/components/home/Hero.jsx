import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      kicker: 'STYLE MEETS VISION',
      titleLine1: 'Premium Eyewear',
      titleLine2: 'for Every You',
      subtitle: 'Trendy frames. Clear vision. A better tomorrow.',
      primaryBtnText: 'Shop Now',
      primaryBtnLink: '/shop',
      secondaryBtnText: 'Explore Collection',
      secondaryBtnLink: '/shop',
      image: '/images/home/hero-slide-1.png'
    },
    {
      kicker: 'POLARIZED SUN PROTECTION',
      titleLine1: 'Crafted for Sun,',
      titleLine2: 'Styled for Living',
      subtitle: 'High-contrast optical grade polarized sunglasses for road and water.',
      primaryBtnText: 'Shop Sunglasses',
      primaryBtnLink: '/sunglasses',
      secondaryBtnText: 'Explore Polarized',
      secondaryBtnLink: '/sunglasses',
      image: '/images/home/hero-slide-1.png'
    },
    {
      kicker: 'ALL-DAY HYDRATION',
      titleLine1: 'Breathable Comfort,',
      titleLine2: 'Crisp Focus',
      subtitle: 'HydraLock hydrogel contact lenses for extended screen time and sports.',
      primaryBtnText: 'Shop Contact Lenses',
      primaryBtnLink: '/contact-lenses',
      secondaryBtnText: 'Explore Modalities',
      secondaryBtnLink: '/contact-lenses',
      image: '/images/home/hero-slide-1.png'
    }
  ];

  const current = slides[activeSlide];

  return (
    <section className="relative w-full bg-[#FAF8F5] overflow-hidden min-h-[580px] sm:min-h-[520px]  flex items-end sm:items-center">
      {/* Full-Bleed Background Image with top-aligned positioning to ensure head and hair are never cropped */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <img
          src={current.image}
          alt="Woman wearing stylish black sunglasses"
          className="w-full h-full object-cover object-[82%_top] sm:object-[84%_top] lg:object-[86%_top] transition-all duration-700"
        />
        {/* Decreased subtle diagonal linear shade on mobile so model is crisp and clear without heavy white fog */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FAF8F5] from-10% via-[#FAF8F5]/50 via-35% to-transparent sm:bg-gradient-to-r sm:from-[#FAF8F5] sm:from-20% sm:via-[#FAF8F5]/80 sm:via-60% sm:to-transparent w-full md:w-[70%] lg:w-[62%]" />
      </div>

      {/* Foreground Content Container - positioned at bottom on mobile screen */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 pt-24 pb-16 sm:py-16 lg:py-24">
        <div className="max-w-xl space-y-3.5 sm:space-y-5">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#E4232C] block">
            {current.kicker}
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.1]">
            {current.titleLine1}
            <br />
            {current.titleLine2}
          </h1>

          <p className="text-xs sm:text-base text-slate-600 max-w-md leading-relaxed font-normal pt-0.5">
            {current.subtitle}
          </p>

          {/* Action Buttons matching the reference screenshot */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            <Link
              to={current.primaryBtnLink}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer group"
            >
              <span>{current.primaryBtnText}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to={current.secondaryBtnLink}
              className="text-xs sm:text-sm font-bold text-[#14232E] hover:text-[#E4232C] transition-colors underline underline-offset-4 decoration-slate-400 hover:decoration-[#E4232C]"
            >
              {current.secondaryBtnText}
            </Link>
          </div>
        </div>
      </div>

      {/* Pagination Controls in bottom-right corner matching Image 1 */}
      <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-12 z-20 flex items-center gap-4 sm:gap-6 select-none">
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
          {slides.map((_, idx) => (
            <React.Fragment key={idx}>
              {idx === 2 && <span className="text-slate-400 font-normal mx-0.5">/</span>}
              <button
                onClick={() => setActiveSlide(idx)}
                className={`cursor-pointer transition-all relative pb-1 ${activeSlide === idx
                    ? 'text-[#E4232C]'
                    : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                <span>0{idx + 1}</span>
                {activeSlide === idx && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E4232C] rounded-full" />
                )}
              </button>
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="p-1 hover:text-[#E4232C] transition-colors cursor-pointer text-slate-700"
          aria-label="Previous slide"
        >
          <ArrowLeft size={16} />
        </button>
      </div>
    </section>
  );
};
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
export const CategoryShowcase = () => {
  const categories = [{
    kicker: "WOMEN'S",
    title: "Eyewear",
    subtitle: "Sculpted cat-eyes, rose gold titanium & delicate wireframes",
    href: "/eyeglasses?gender=Women",
    bgImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-6"
  }, {
    kicker: "MEN'S",
    title: "Eyewear",
    subtitle: "Architectural browlines, aviators & bold acetate frames",
    href: "/eyeglasses?gender=Men",
    bgImage: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-6"
  }, {
    kicker: "POLARIZED",
    title: "Sunglasses",
    subtitle: "UV400 high-definition glare reduction for bright horizons",
    href: "/sunglasses",
    bgImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-6"
  }, {
    kicker: "DAILY & MONTHLY",
    title: "Contact Lenses",
    subtitle: "HydraLock breathable hydrogel for extended screen comfort",
    href: "/contact-lenses",
    bgImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-6"
  }];
  return <section className="py-16 sm:py-20 bg-[#F5F6F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E4232C] block mb-1">
            SHOP BY CATEGORY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight">
            Designed for Every Look & Prescription
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore handcrafted optical solutions engineered for lasting comfort and aesthetic presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {categories.map((cat, idx) => <Link key={idx} to={cat.href} className={`group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 min-h-[260px] sm:min-h-[300px] flex flex-col justify-end p-6 sm:p-8 ${cat.colSpan}`}>
              {/* Background Photography with Scrim */}
              <img src={cat.bgImage} alt={cat.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
              <div className="absolute inset-0 bg-linear-to-t from-[#14232E]/90 via-[#14232E]/50 to-transparent" />

              {/* Editorial Text Content */}
              <div className="relative z-10 space-y-1.5 text-white">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
                  {cat.kicker}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-300 max-w-md line-clamp-1">
                  {cat.subtitle}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#E4232C] transition-colors">
                  <span>Shop Now</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>)}
        </div>
      </div>
    </section>;
};
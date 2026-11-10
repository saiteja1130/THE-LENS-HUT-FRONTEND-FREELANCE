import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { categoryApi } from '../../services/categoryApi';

export const CategoryStrip = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const res = await categoryApi.getActiveCategories(true);
        if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((cat, idx) => ({
            id: cat.id || cat._id || `cat-${idx}`,
            title: cat.name,
            subtitle: cat.subtitle || '',
            description: cat.description || cat.subtitle || 'Discover premium optical craftsmanship and iconic design.',
            link: cat.link || `/${cat.slug}`,
            image: cat.imageUrl || `/images/home/cat-${cat.slug}.png`,
            itemCount: cat.itemCount || 0,
            badge: cat.isFeatured ? 'Curated' : null,
          }));
          setCategories(mapped);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isLoading && (!categories || categories.length === 0)) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4232C]/10 text-[#E4232C] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} className="text-[#E4232C]" />
              <span>Curated Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#14232E] tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Find the perfect frame tailored to your lifestyle, from prescription everyday classics to UV protection and daily contacts.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>Click any card to explore</span>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-[#F8F9FA] rounded-3xl p-6 border border-slate-200/60 animate-pulse flex flex-col justify-between min-h-[320px]"
              >
                <div className="flex justify-between items-center">
                  <div className="h-5 w-16 bg-slate-200 rounded-full" />
                  <div className="w-9 h-9 rounded-full bg-slate-200" />
                </div>
                <div className="w-full h-36 bg-slate-200/70 rounded-2xl my-4" />
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-slate-200 rounded" />
                  <div className="h-4 w-full bg-slate-200/60 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Category Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={cat.id || idx}
                to={cat.link}
                className="group relative flex flex-col justify-between bg-[#F8F9FA] hover:bg-[#F3F5F7] rounded-3xl p-6 border border-slate-200/80 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden"
              >
                {/* Subtle Gradient Hover Underlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-[#E4232C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Card Top Metadata & Navigation Indicator */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-slate-700 text-[11px] font-bold border border-slate-200/80 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E4232C]" />
                    <span>{cat.itemCount > 0 ? `${cat.itemCount}+ Styles` : `Collection 0${idx + 1}`}</span>
                  </div>

                  <div
                    aria-label={`Go to ${cat.title}`}
                    className="w-9 h-9 rounded-full bg-white text-slate-700 border border-slate-200/80 flex items-center justify-center shadow-2xs group-hover:bg-[#E4232C] group-hover:text-white group-hover:border-[#E4232C] group-hover:rotate-45 transition-all duration-300 shrink-0"
                  >
                    <ArrowUpRight size={17} strokeWidth={2.2} />
                  </div>
                </div>

                {/* Category Visual Centered */}
                <div className="relative z-10 w-full h-40 sm:h-44 flex items-center justify-center my-4 p-2">
                  <div className="absolute inset-0 bg-white/70 rounded-2xl group-hover:bg-white transition-colors duration-300 -z-10 shadow-2xs" />
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to local image if uploaded path fails
                        e.target.onerror = null;
                        e.target.src = `/images/home/cat-${cat.title.toLowerCase().replace(/\s+/g, '-')}.png`;
                      }}
                      className="max-h-full max-w-[210px] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-sm"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-slate-400 font-semibold">
                      {cat.title}
                    </div>
                  )}
                </div>

                {/* Card Footer: Category Name, Short Description & Link CTA */}
                <div className="relative z-10 pt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-[#14232E] text-lg sm:text-xl group-hover:text-[#E4232C] transition-colors duration-200 tracking-tight">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 font-medium line-clamp-1 leading-relaxed">
                    {cat.description || cat.subtitle}
                  </p>

                  <div className="pt-2 flex items-center gap-1 text-xs font-bold text-slate-700 group-hover:text-[#E4232C] transition-colors duration-200">
                    <span>Explore Now</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryStrip;

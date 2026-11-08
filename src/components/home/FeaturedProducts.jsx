import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { productApi } from '../../services/productApi';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchFeatured = async () => {
      try {
        const res = await productApi.getFeaturedProducts(5);
        if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            slug: p.slug,
            price: p.price,
            mrp: p.mrp,
            discountPercent: p.discountPercent,
            rating: p.rating || 0,
            image: p.images?.front || p.primaryImage || p.image || '',
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Handpicked favorites for your everyday style.
            </p>
          </div>

          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-[#14232E] hover:text-[#E4232C] transition-colors flex items-center gap-1.5 cursor-pointer group"
          >
            <span>View All</span>
            <ArrowRight size={14} className="text-[#E4232C] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5 Product Cards Grid matching the screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {products.map((item) => {
            return (
              <div
                key={item.id}
                className="group relative flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-300 hover:shadow-md"
              >
                {/* Top Image Box on #F8F9FA with Badges */}
                <div className="relative w-full aspect-4/3 bg-[#F8F9FA] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                  {/* Top-Left Status Badge */}
                  {item.discountPercent > 0 && (
                    <span className="absolute top-2.5 left-2.5 bg-[#E4232C] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider z-10 shadow-2xs">
                      {item.discountPercent}% OFF
                    </span>
                  )}

                  {/* Product Visual */}
                  <Link to={`/product/${item.slug}`} className="w-full h-full flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-xs"
                    />
                  </Link>
                </div>

                {/* Card Content */}
                <div className="p-2 sm:p-4 flex flex-col flex-1 justify-between space-y-2">
                  <div>
                    {/* Rating if present */}
                    {item.rating > 0 && (
                      <div className="flex items-center gap-0.5 text-amber-400 text-xs mb-1.5">
                        {[...Array(Math.round(item.rating))].map((_, i) => (
                          <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    )}

                    {/* Product Name */}
                    <Link to={`/product/${item.slug}`}>
                      <h3 className="text-sm font-bold text-[#14232E] group-hover:text-[#E4232C] transition-colors line-clamp-1 mb-0.5">
                        {item.name}
                      </h3>
                    </Link>

                    {/* Category */}
                    <span className="text-[11px] text-slate-400 font-medium capitalize block">
                      {item.category}
                    </span>
                  </div>

                  {/* Pricing Row */}
                  <div className="pt-2 border-t border-slate-100 flex items-baseline gap-2">
                    <span className="text-sm sm:text-base font-extrabold text-[#14232E] tabular-nums">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.mrp > item.price && (
                      <span className="text-xs text-slate-400 line-through tabular-nums">
                        ₹{item.mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award } from 'lucide-react';
import { brandApi } from '../../services/brandApi';

export const BrandShowcase = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    brandApi.getActiveBrands({ featured: 'true' }).then((res) => {
      if (isMounted) {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setBrands(res.data);
        }
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!loading && brands.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E4232C] block mb-1">
              Designer Houses
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight">
              Shop by Designer Brands
            </h2>
          </div>

          <Link
            to="/brands"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#E4232C] transition-colors flex items-center gap-1 group"
          >
            <span>View All Brands</span>
            <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Brands Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {brands.slice(0, 6).map((brand) => (
            <Link
              key={brand.id || brand._id || brand.slug}
              to={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="group bg-[#FAF9F6] border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white hover:border-[#E4232C]/40 hover:shadow-md transition-all duration-200"
            >
              <div className="h-16 w-full flex items-center justify-center p-2 mb-3">
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#E4232C] transition-colors line-clamp-1">
                {brand.name}
              </span>
              <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                {brand.itemCount || 0} {brand.itemCount === 1 ? 'frame' : 'frames'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;

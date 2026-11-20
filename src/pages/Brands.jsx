import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, Search, Sparkles, ShieldCheck } from 'lucide-react';
import { brandApi } from '../services/brandApi';

export const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;
    brandApi.getActiveBrands().then((res) => {
      if (isMounted) {
        if (res.success && Array.isArray(res.data)) {
          setBrands(res.data);
        }
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredBrands = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-[#14232E] text-white p-8 sm:p-12 shadow-md">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white/90 tracking-wide uppercase">
              <Sparkles size={12} className="text-[#E4232C]" />
              Official Designer Houses
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Curated Eyewear Brands
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Explore authentic optical frames and sunwear engineered by the world’s leading optical maisons and design houses. Every frame is backed by our full 1-year lab warranty.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12 pointer-events-none">
            <Award size={360} />
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              placeholder="Search designer brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#E4232C] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 self-end sm:self-center">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>100% Certified Authentic Eyewear</span>
          </div>
        </div>

        {/* Brands Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-100 rounded-2xl" />
            ))}
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
            <Award className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-3 text-base font-bold text-slate-800">No brands found</h3>
            <p className="mt-1 text-xs text-slate-500">Try changing your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id || brand._id || brand.slug}
                className="group relative bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-200"
              >
                <div>
                  {/* Brand Logo Container */}
                  <div className="h-28 rounded-xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-center overflow-hidden mb-5 group-hover:scale-102 transition-transform duration-200">
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="max-h-full max-w-full object-contain filter group-hover:brightness-95"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-[#14232E] group-hover:text-[#E4232C] transition-colors">
                    {brand.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {brand.description || 'Precision optical craftsmanship and iconic eyewear design.'}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {brand.itemCount || 0} {brand.itemCount === 1 ? 'Frame' : 'Frames'}
                  </span>

                  <Link
                    to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E4232C] hover:text-[#c91d25] transition-colors group-hover:translate-x-1"
                  >
                    <span>View Collection</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;

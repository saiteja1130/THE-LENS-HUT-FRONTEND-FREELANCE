import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Sparkles } from 'lucide-react';
import { productApi } from '../../services/productApi';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('thelenshut_wishlist_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let isMounted = true;
    const fetchFeatured = async () => {
      try {
        const res = await productApi.getFeaturedProducts(5);
        if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((p) => ({
            id: p.id,
            name: p.name,
            brand: p.brand || '',
            category: p.category || '',
            slug: p.slug,
            price: p.price,
            mrp: p.mrp,
            discountPercent: p.discountPercent,
            rating: p.rating || 0,
            reviewCount: p.reviewCount || 0,
            isBestSeller: Boolean(p.isBestSeller),
            isNew: Boolean(p.isNew),
            image: p.images?.front || p.primaryImage || p.image || '',
            secondaryImage: p.images?.side || p.secondaryImage || '',
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

  const toggleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem('thelenshut_wishlist_ids', JSON.stringify(next));
      } catch (err) {
        console.warn('Failed to update wishlist:', err);
      }
      return next;
    });
  };

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#14232E]/5 text-[#14232E] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles size={12} className="text-[#E4232C]" />
              <span>Handpicked Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Curated everyday eyewear favorites engineered with exceptional comfort and timeless style.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#14232E] hover:text-[#E4232C] transition-colors group self-start sm:self-auto cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight size={14} className="text-[#E4232C] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden p-3 space-y-3 animate-pulse"
              >
                <div className="w-full aspect-4/3 bg-slate-100 rounded-xl" />
                <div className="space-y-2 pt-1">
                  <div className="h-3 w-1/3 bg-slate-200 rounded" />
                  <div className="h-4 w-4/5 bg-slate-200 rounded" />
                  <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  <div className="h-5 w-2/5 bg-slate-200 rounded pt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Products Grid (5 desktop, 3 tablet, 2 mobile) */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {products.map((item) => {
              const isWishlisted = wishlist.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image Presentation Box */}
                  <div className="relative w-full aspect-4/3 bg-[#F8F9FA] flex items-center justify-center p-3 sm:p-4 overflow-hidden">
                    
                    {/* Top Left Badge: Discount > BestSeller > New */}
                    {item.discountPercent > 0 ? (
                      <span className="absolute top-2.5 left-2.5 bg-[#E4232C] text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider z-10 shadow-2xs">
                        {item.discountPercent}% OFF
                      </span>
                    ) : item.isBestSeller ? (
                      <span className="absolute top-2.5 left-2.5 bg-[#14232E] text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider z-10 shadow-2xs">
                        Bestseller
                      </span>
                    ) : item.isNew ? (
                      <span className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider z-10 shadow-2xs">
                        New
                      </span>
                    ) : null}

                    {/* Top Right Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleWishlist(e, item.id)}
                      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      className={`absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center z-10 transition-all duration-200 shadow-2xs cursor-pointer ${
                        isWishlisted
                          ? 'bg-[#E4232C] text-white'
                          : 'bg-white/90 hover:bg-white text-slate-500 hover:text-[#E4232C]'
                      }`}
                    >
                      <Heart
                        size={14}
                        className={isWishlisted ? 'fill-white stroke-white' : 'stroke-current'}
                      />
                    </button>

                    {/* Clickable Image with Smooth Zoom */}
                    <Link
                      to={`/product/${item.slug}`}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-xs"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-medium">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  </div>

                  {/* Card Info & Pricing */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between space-y-2">
                    <div className="space-y-1">
                      {/* Brand or Category */}
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block truncate">
                        {item.brand || item.category}
                      </span>

                      {/* Product Name */}
                      <Link to={`/product/${item.slug}`} className="block">
                        <h3 className="text-xs sm:text-sm font-bold text-[#14232E] group-hover:text-[#E4232C] transition-colors line-clamp-1 leading-snug">
                          {item.name}
                        </h3>
                      </Link>

                      {/* Rating & Review Count */}
                      {item.rating > 0 && (
                        <div className="flex items-center gap-1 pt-0.5">
                          <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" />
                          <span className="text-xs font-bold text-slate-700">
                            {item.rating.toFixed(1)}
                          </span>
                          {item.reviewCount > 0 && (
                            <span className="text-[11px] text-slate-400 font-normal">
                              ({item.reviewCount})
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Pricing Row */}
                    <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between gap-2">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;

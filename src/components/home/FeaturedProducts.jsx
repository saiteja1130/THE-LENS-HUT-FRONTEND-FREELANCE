import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export const FeaturedProducts = () => {
  const { isInWishlist, toggleWishlist } = useWishlist();

  const products = [
    {
      id: 'feat-01',
      name: 'Classic Clear Frame',
      category: 'Eyeglasses',
      slug: 'classic-clear-frame',
      price: 2999,
      mrp: 3749,
      discountPercent: 20,
      rating: 5,
      image: '/images/home/cat-eyeglasses.png'
    },
    {
      id: 'feat-02',
      name: 'Urban Classic Sunglasses',
      category: 'Sunglasses',
      slug: 'urban-classic-sunglasses',
      price: 3399,
      mrp: 3999,
      discountPercent: 15,
      rating: 5,
      image: '/images/home/cat-sunglasses.png'
    },
    {
      id: 'feat-03',
      name: 'Blue Light Blocking Frame',
      category: 'Eyeglasses',
      slug: 'blue-light-blocking-frame',
      price: 4499,
      mrp: 4999,
      discountPercent: 10,
      rating: 5,
      image: '/images/home/cat-sunglasses.png'
    },
    {
      id: 'feat-04',
      name: 'Daily Contact Lenses',
      category: 'Contact Lenses',
      slug: 'daily-contact-lenses',
      price: 1299,
      mrp: 1599,
      discountPercent: 0,
      rating: 5,
      image: '/images/home/cat-sunglasses.png'
    },
    {
      id: 'feat-05',
      name: 'Premium Cleaning Kit',
      category: 'Accessories',
      slug: 'premium-cleaning-kit',
      price: 799,
      mrp: 999,
      discountPercent: 0,
      rating: 5,
      image: '/images/home/cat-sunglasses.png'
    }
  ];

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
            const activeWishlist = isInWishlist(item.id);
            return (
              <div
                key={item.id}
                className="group relative flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-300 hover:shadow-md"
              >
                {/* Top Image Box on #F8F9FA with Badges & Wishlist */}
                <div className="relative w-full aspect-4/3 bg-[#F8F9FA] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                  {/* Top-Left Status Badge */}
                  {item.discountPercent > 0 && (
                    <span className="absolute top-2.5 left-2.5 bg-[#E4232C] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider z-10 shadow-2xs">
                      {item.discountPercent}% OFF
                    </span>
                  )}

                  {/* Top-Right Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(item);
                    }}
                    aria-label={activeWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full transition-all duration-200 cursor-pointer ${activeWishlist
                      ? 'bg-white text-[#E4232C] shadow-xs'
                      : 'bg-white/80 text-slate-400 hover:text-[#E4232C] hover:bg-white shadow-2xs'
                      }`}
                  >
                    <Heart
                      size={15}
                      className={activeWishlist ? 'fill-[#E4232C] text-[#E4232C]' : 'text-slate-500'}
                    />
                  </button>

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
                    {/* 5-Star Rating */}
                    <div className="flex items-center gap-0.5 text-amber-400 text-xs mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>

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
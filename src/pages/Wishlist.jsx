import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Star, Check, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const Wishlist = () => {
  const {
    wishlist,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist
  } = useWishlist();

  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (product) => {
    const firstColor = product.colors?.[0]?.name || '';
    const firstImage = product.colors?.[0]?.image || product.primaryImage || product.image || '';
    addToCart(product, {
      color: firstColor,
      variantId: product.colors?.[0]?.id || (firstColor ? `var-${firstColor.toLowerCase().replace(/\s+/g, '-')}` : 'default'),
      image: firstImage,
      size: product.size || 'Medium'
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* 1. Hero Banner matching exact screenshot */}
      <section className="relative w-full bg-[#FAF8F5] overflow-hidden min-h-[200px] sm:min-h-[340px] flex items-center">
        {/* Full-Bleed Background Image on Right with top alignment to prevent head/glasses cropping */}
       <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <img
            src="/images/checkout-hero.png"
            alt="Our collection banner"
            className="w-full h-full object-cover object-[82%_center] sm:object-[86%_center] lg:object-[88%_center] transition-all duration-500"
          />
          {/* Smooth gradient blend for crisp text readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 sm:via-[#FAF8F5]/75 to-transparent w-full md:w-[62%]" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 ">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2.5 font-medium">
            <Link to="/" className="hover:text-[#E4232C] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">›</span>
            <span className="text-slate-700 font-semibold">Wishlist</span>
          </nav>

          {/* Heading & Subtitle */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14232E] tracking-tight">
            My Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
            Your favorite eyewear, all in one place.
          </p>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {wishlist.length === 0 ? (
          /* Empty State */
          <div className="bg-[#FAF9F6] rounded-2xl border border-slate-200/80 p-12 sm:p-16 text-center max-w-lg mx-auto space-y-4 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-[#E4232C] mx-auto flex items-center justify-center">
              <Heart size={28} />
            </div>
            <h2 className="text-xl font-bold text-[#14232E]">
              Your wishlist is empty
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Explore our handcrafted eyeglasses and sunglasses collections to save your favorite frames here.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
              >
                <span>CONTINUE SHOPPING</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist Items Rows */
          <div className="space-y-4">
            {wishlist.map((product) => {
              const active = isInWishlist(product.id);
              const displayImage =
                product.colors?.[0]?.image ||
                product.primaryImage ||
                product.image ||
                '';
              const discountPercent =
                product.discountPercent ||
                (product.mrp && product.price
                  ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
                  : 0);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/85 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200"
                >
                  {/* Left Column: Heart Toggle + Eyewear Image + Product Info */}
                  <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0 w-full md:w-auto">
                    {/* Heart Favorite Toggle Button */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      className="p-1 rounded-full transition-transform hover:scale-115 cursor-pointer shrink-0"
                      title={active ? 'Remove from wishlist' : 'Save to wishlist'}
                      aria-label="Wishlist heart"
                    >
                      <Heart
                        size={20}
                        className={
                          active
                            ? 'fill-[#E4232C] text-[#E4232C]'
                            : 'text-slate-400 hover:text-[#E4232C]'
                        }
                      />
                    </button>

                    {/* Frame Preview Container */}
                    <div className="w-24 sm:w-28 h-20 bg-[#F5F6F7] rounded-xl p-2 flex items-center justify-center shrink-0">
                      <Link
                        to={`/product/${product.slug}`}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <img
                          src={displayImage}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-108"
                          loading="lazy"
                        />
                      </Link>
                    </div>

                    {/* Product Name, Category & Star Rating */}
                    <div className="min-w-0 flex-1">
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="text-sm sm:text-base font-bold text-[#14232E] hover:text-[#E4232C] transition-colors truncate">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="text-xs text-slate-400 capitalize mt-0.5 font-medium">
                        {product.category?.replace('-', ' ')}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <Star
                          size={13}
                          className="fill-amber-400 text-amber-400 shrink-0"
                        />
                        <span className="font-semibold text-slate-700">
                          {product.rating || 4.6}
                        </span>
                        <span className="text-slate-400">
                          ({product.reviewCount || 124} Reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pricing + Stock Indicator + Add to Cart CTA + Trash */}
                  <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-8 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                    {/* Pricing with Discount Percentage */}
                    <div className="text-left md:text-right min-w-[95px]">
                      <div className="flex items-baseline md:justify-end gap-2">
                        <span className="text-base sm:text-lg font-extrabold text-[#14232E] tabular-nums">
                          ₹{(product.price || 0).toLocaleString('en-IN')}
                        </span>
                        {product.mrp > product.price && (
                          <span className="text-xs text-slate-400 line-through tabular-nums">
                            ₹{(product.mrp || 0).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      {discountPercent > 0 && (
                        <span className="text-xs font-bold text-[#E4232C] block mt-0.5">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    {/* Stock Availability */}
                    <div className="min-w-[70px] text-left md:text-center">
                      <span className="text-xs sm:text-sm font-semibold text-emerald-600">
                        In Stock
                      </span>
                    </div>

                    {/* Add to Cart Red CTA Button */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="px-5 sm:px-6 py-2.5 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer shadow-xs hover:shadow flex items-center justify-center gap-1.5 shrink-0"
                    >
                      {addedId === product.id ? <Check size={16} /> : null}
                      <span>{addedId === product.id ? 'Added' : 'Add to Cart'}</span>
                    </button>

                    {/* Trash Delete Icon */}
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                      title="Remove from wishlist"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check, Star } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
export const ProductCard = ({
  product,
  onQuickView,
  layout = 'grid'
}) => {
  const {
    isInWishlist,
    toggleWishlist
  } = useWishlist();
  const {
    addToCart
  } = useCart();

  if (!product) return null;

  const colors = product.colors || [];
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || '');
  const [addedJustNow, setAddedJustNow] = useState(false);
  const currentColorObj = colors.find(c => c.name === selectedColor);
  const displayImage = currentColorObj?.image || product.primaryImage || product.image || '';
  const activeWishlist = product.id ? isInWishlist(product.id) : false;

  const handleAddToCart = e => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, {
      color: selectedColor,
      variantId: currentColorObj?.id || (selectedColor ? `var-${selectedColor.toLowerCase().replace(/\s+/g, '-')}` : 'default'),
      image: displayImage,
      size: product.size || 'Medium'
    });
    setAddedJustNow(true);
    setTimeout(() => setAddedJustNow(false), 1500);
  };

  const handleWishlist = e => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Badge text determination matching the screenshot
  const getBadge = () => {
    if (product.isBestSeller && product.discountPercent > 0) {
      return product.discountPercent >= 20 ? `${product.discountPercent}% OFF` : 'BEST SELLER';
    }
    if (product.isNew) return 'NEW';
    if (product.discountPercent > 0) return `${product.discountPercent}% OFF`;
    return null;
  };
  const badgeText = getBadge();

  if (layout === 'list') {
    return <div className="group relative flex flex-col sm:flex-row items-center gap-6 p-4 sm:p-5 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-200">
        {/* Left: Product Image */}
        <div className="relative w-full sm:w-56 h-48 bg-[#F5F6F7] rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-4">
          {badgeText && <span className="absolute top-2.5 left-2.5 bg-[#E4232C] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider z-10 shadow-2xs">
              {badgeText}
            </span>}
          <img src={displayImage} alt={product.name || 'Product'} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </div>

        {/* Center: Info */}
        <div className="flex-1 w-full space-y-1.5">
          <span className="text-[11px] text-slate-400 font-medium capitalize">
            {product.category ? product.category.replace('-', ' ') : ''}
          </span>
          <Link to={`/product/${product.slug || ''}`}>
            <h3 className="text-base font-bold text-[#14232E] hover:text-[#E4232C] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description || ''}
          </p>

          {/* Color swatches */}
          {colors.length > 0 && <div className="flex items-center gap-1.5 pt-1">
              {colors.map(col => <button key={col.name} onClick={() => setSelectedColor(col.name)} title={col.name} className={`w-3.5 h-3.5 rounded-full border transition-all ${selectedColor === col.name ? 'ring-2 ring-[#E4232C] ring-offset-1 border-transparent' : 'border-slate-300 hover:scale-110'}`} style={{
            backgroundColor: col.hex
          }} />)}
            </div>}
        </div>

        {/* Right: Pricing & CTAs */}
        <div className="w-full sm:w-44 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-left sm:text-right">
            <div className="flex items-baseline sm:justify-end gap-2">
              <span className="text-lg font-extrabold text-[#14232E] tabular-nums">
                ₹{(product.price || 0).toLocaleString('en-IN')}
              </span>
              {product.mrp > product.price && <span className="text-xs text-slate-400 line-through tabular-nums">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium">
              Free Express Delivery
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleWishlist} className={`p-2 rounded-lg border transition-colors cursor-pointer ${activeWishlist ? 'bg-rose-50 text-[#E4232C] border-[#E4232C]' : 'bg-white text-slate-400 border-slate-200 hover:text-[#E4232C]'}`} title="Add to wishlist">
              <Heart size={16} className={activeWishlist ? 'fill-[#E4232C]' : ''} />
            </button>
            <button onClick={handleAddToCart} className="flex items-center gap-1.5 px-4 py-2 bg-[#E4232C] text-white hover:bg-[#C81921] rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs">
              {addedJustNow ? <Check size={14} /> : <ShoppingBag size={14} />}
              <span>{addedJustNow ? 'Added' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>;
  }

  // Exact Grid Card Design matching screenshot
  return <div className="group relative flex flex-col bg-white border border-slate-200/80 rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-300 hover:shadow-md">
      {/* Top Image Box on #F5F6F7 with Badges & Wishlist */}
      <div className="relative w-full aspect-4/3 bg-[#F5F6F7] flex items-center justify-center p-2.5 sm:p-4 overflow-hidden">
        {/* Top-Left Status Badge */}
        {badgeText && <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-[#E4232C] text-white text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded uppercase tracking-wider z-10 shadow-2xs">
            {badgeText}
          </span>}

        {/* Top-Right Wishlist Button */}
        <button type="button" onClick={handleWishlist} aria-label={activeWishlist ? 'Remove from wishlist' : 'Add to wishlist'} className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 p-1 sm:p-1.5 rounded-full transition-all duration-200 cursor-pointer ${activeWishlist ? 'bg-white text-[#E4232C] shadow-xs' : 'bg-white/80 text-slate-400 hover:text-[#E4232C] hover:bg-white shadow-2xs'}`}>
          <Heart size={14} className={activeWishlist ? 'fill-[#E4232C] text-[#E4232C]' : 'text-slate-500'} />
        </button>

        {/* Product Visual */}
        <Link to={`/product/${product.slug || ''}`} className="w-full h-full flex items-center justify-center">
          <img src={displayImage} alt={product.name || 'Product'} loading="lazy" className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-xs" />
        </Link>
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between space-y-2">
        <div>
          {/* Circular Color Swatches */}
          {colors.length > 0 && <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
              {colors.slice(0, 4).map(col => <button key={col.name} onClick={() => setSelectedColor(col.name)} title={col.name} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border transition-all cursor-pointer ${selectedColor === col.name ? 'ring-2 ring-[#E4232C] ring-offset-1 border-transparent' : 'border-slate-300 hover:scale-115'}`} style={{
            backgroundColor: col.hex
          }} />)}
            </div>}
          <Link to={`/product/${product.slug || ''}`}>
            <h3 className="text-xs sm:text-sm font-bold text-[#14232E] group-hover:text-[#E4232C] transition-colors line-clamp-1 mb-0.5 sm:mb-1">
              {product.name}
            </h3>
          </Link>

          <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium capitalize block mb-0.5 sm:mb-1">
            {product.category ? product.category.replace('-', ' ') : ''}
          </span>
        </div>

        {/* Pricing Row with Circular Red Add to Cart Button on Right */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1 sm:gap-1.5">
            <span className="text-xs sm:text-base font-extrabold text-[#14232E] tabular-nums">
              ₹{(product.price || 0).toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && <span className="text-[10px] sm:text-xs text-slate-400 line-through tabular-nums">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>}
          </div>

          {/* Round Red Add to Cart Button */}
          <button type="button" onClick={handleAddToCart} title="Add to cart" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E4232C] hover:bg-[#C81921] text-white flex items-center justify-center transition-all duration-200 hover:scale-108 cursor-pointer shadow-xs shrink-0">
            {addedJustNow ? <Check size={13} /> : <ShoppingBag size={13} />}
          </button>
        </div>
      </div>
    </div>;
};
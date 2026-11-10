import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check, Star, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({
  product,
  onQuickView,
  layout = 'grid'
}) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const colors = product.colors || [];
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || '');
  const [addedJustNow, setAddedJustNow] = useState(false);

  const currentColorObj = colors.find((c) => c.name === selectedColor) || colors[0];
  const displayImage =
    currentColorObj?.images?.front ||
    (Array.isArray(currentColorObj?.images) ? currentColorObj?.images[0] : null) ||
    currentColorObj?.image ||
    product.images?.front ||
    product.primaryImage ||
    product.image ||
    '';

  const handleAddToCart = (e) => {
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

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  // Badge determination: prioritizes discount or best-seller/new
  const getBadge = () => {
    if (product.discountPercent > 0) return `${product.discountPercent}% OFF`;
    if (product.isBestSeller) return 'BEST SELLER';
    if (product.isNew) return 'NEW';
    return null;
  };

  const badgeText = getBadge();

  // LIST VIEW LAYOUT
  if (layout === 'list') {
    return (
      <div className="group relative flex flex-col sm:flex-row items-center gap-5 p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl hover:border-slate-300 hover:shadow-md transition-all duration-300">
        {/* Left: Product Image Stage */}
        <div className="relative w-full sm:w-56 h-48 bg-[#F8F9FA] rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-4">
          {badgeText && (
            <span className="absolute top-2.5 left-2.5 bg-[#E4232C] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider z-10 shadow-2xs">
              {badgeText}
            </span>
          )}

          <Link to={`/product/${product.slug || ''}`} className="w-full h-full flex items-center justify-center">
            <img
              src={displayImage}
              alt={product.name || 'Product'}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>

          {/* Quick View Button */}
          {onQuickView && (
            <button
              type="button"
              onClick={handleQuickViewClick}
              className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              title="Quick preview"
            >
              <Eye size={15} />
            </button>
          )}
        </div>

        {/* Center: Info */}
        <div className="flex-1 w-full space-y-1.5 min-w-0">
          {product.brand && (
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
              {product.brand}
            </span>
          )}

          <Link to={`/product/${product.slug || ''}`}>
            <h3 className="text-base font-extrabold text-[#14232E] hover:text-[#E4232C] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {product.rating > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-0.5">
              <div className="flex text-amber-400">
                <Star size={13} className="fill-amber-400" />
              </div>
              <span className="font-extrabold text-[#14232E]">{product.rating}</span>
              {product.reviewCount > 0 && (
                <span className="text-slate-400">({product.reviewCount})</span>
              )}
            </div>
          )}

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
            {product.description || ''}
          </p>

          {/* Color Swatches */}
          {colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-2">
              {colors.map((col) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col.name)}
                  title={col.name}
                  className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                    selectedColor === col.name
                      ? 'ring-2 ring-[#E4232C] ring-offset-1 border-transparent scale-110'
                      : 'border-slate-300 hover:scale-115'
                  }`}
                  style={{ backgroundColor: col.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Pricing & CTAs */}
        <div className="w-full sm:w-44 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-left sm:text-right">
            <div className="flex items-baseline sm:justify-end gap-2">
              <span className="text-xl font-black text-[#14232E] tabular-nums">
                ₹{(product.price || 0).toLocaleString('en-IN')}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold pt-0.5">
              Free Express Delivery
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-1.5 px-4 py-2 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                addedJustNow ? 'bg-emerald-600' : 'bg-[#E4232C] hover:bg-[#C81921]'
              }`}
            >
              {addedJustNow ? <Check size={14} strokeWidth={3} /> : <ShoppingBag size={14} />}
              <span>{addedJustNow ? 'Added' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // GRID VIEW LAYOUT (Matches Luxury Optical standard)
  return (
    <div className="group relative flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-300 hover:shadow-md">
      {/* Top Image Box on #F8F9FA */}
      <div className="relative w-full aspect-4/3 bg-[#F8F9FA] flex items-center justify-center p-3 sm:p-5 overflow-hidden">
        {/* Top-Left Status Badge */}
        {badgeText && (
          <span className="absolute top-2.5 left-2.5 bg-[#E4232C] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider z-10 shadow-2xs">
            {badgeText}
          </span>
        )}

        {/* Quick View Button on Image Hover */}
        {onQuickView && (
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
            title="Quick view"
          >
            <Eye size={15} />
          </button>
        )}

        {/* Product Visual */}
        <Link
          to={`/product/${product.slug || ''}`}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={displayImage}
            alt={product.name || 'Product'}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between space-y-2.5">
        <div>
          {/* Brand & Swatches */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
              {product.brand || product.category?.replace('-', ' ')}
            </span>

            {colors.length > 0 && (
              <div className="flex items-center gap-1 shrink-0">
                {colors.slice(0, 4).map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setSelectedColor(col.name)}
                    title={col.name}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border transition-all cursor-pointer ${
                      selectedColor === col.name
                        ? 'ring-2 ring-[#E4232C] ring-offset-1 border-transparent scale-110'
                        : 'border-slate-300 hover:scale-115'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.slug || ''}`}>
            <h3 className="text-xs sm:text-sm font-extrabold text-[#14232E] group-hover:text-[#E4232C] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
              <Star size={11} className="fill-amber-400 text-amber-500" />
              <span className="font-bold text-[#14232E]">{product.rating}</span>
              {product.reviewCount > 0 && (
                <span className="text-slate-400">({product.reviewCount})</span>
              )}
            </div>
          )}
        </div>

        {/* Pricing Row with Add to Cart Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-black text-[#14232E] tabular-nums">
              ₹{(product.price || 0).toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through tabular-nums">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            title="Add to cart"
            className={`w-8 h-8 rounded-xl text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs hover:scale-108 shrink-0 active:scale-95 ${
              addedJustNow ? 'bg-emerald-600' : 'bg-[#E4232C] hover:bg-[#C81921]'
            }`}
          >
            {addedJustNow ? <Check size={14} strokeWidth={3} /> : <ShoppingBag size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};

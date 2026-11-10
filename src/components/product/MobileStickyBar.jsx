import React from 'react';
import { ShoppingBag, Zap, Check } from 'lucide-react';

export const MobileStickyBar = ({
  product,
  currentPrice,
  onAddToCart,
  onBuyNow,
  isAdded = false,
  isVisible = true,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 sm:hidden z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-lg safe-bottom animate-in slide-in-from-bottom duration-200">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Left: Price & Mini summary */}
        <div className="min-w-0 flex-1">
          <span className="text-[10px] text-slate-400 block font-bold uppercase truncate">
            {product?.name}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-[#14232E] tabular-nums">
              ₹{(currentPrice || product?.price || 0).toLocaleString('en-IN')}
            </span>
            {product?.mrp && product.mrp > (currentPrice || product.price) && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onAddToCart}
            className={`h-11 px-4 text-white text-xs font-extrabold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
              isAdded ? 'bg-emerald-600' : 'bg-[#E4232C] hover:bg-[#C81921]'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={16} strokeWidth={3} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>Add to Bag</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onBuyNow}
            className="h-11 px-3.5 bg-[#14232E] hover:bg-[#1E3445] text-white text-xs font-extrabold rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer active:scale-95"
            title="Buy Now"
          >
            <Zap size={15} className="text-amber-400 fill-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};


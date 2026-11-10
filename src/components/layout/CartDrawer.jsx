import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { QuantitySelector } from '../common/QuantitySelector';

export const CartDrawer = () => {
  const {
    cart,
    cartCount,
    subtotal,
    discount,
    shipping,
    total,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart
  } = useCart();

  const navigate = useNavigate();
  if (!isCartDrawerOpen) return null;

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop with smooth blur and fade */}
      <div
        className="fixed inset-0 bg-[#14232E]/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-slate-100">
          
          {/* 1. Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#E4232C] flex items-center justify-center shrink-0">
                <ShoppingBag size={17} />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#14232E] tracking-tight">
                  Shopping Bag
                </h2>
                <p className="text-[11px] text-slate-400 font-medium">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-8 h-8 rounded-full text-slate-400 hover:text-[#14232E] hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>

          {/* 2. Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3.5 py-12">
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                  <ShoppingBag size={28} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#14232E]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-slate-400 max-w-[240px] mx-auto leading-relaxed">
                    Explore our curated spectacles, contact lenses and sunglasses collections.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-[#E4232C] text-white text-xs font-bold rounded-xl hover:bg-[#C81921] transition-all shadow-xs cursor-pointer"
                >
                  <span>Explore Eyewear</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ) : (
              cart.map((item, idx) => {
                const identifier = item.configurationHash || item.id;
                const activeColor = item.product?.colors?.find((c) => c.name?.toLowerCase() === (item.selectedColor || item.variantName)?.toLowerCase());
                const displayImage = item.image || activeColor?.image || item.product?.primaryImage || item.productSnapshot?.image || '';
                const itemUnit = item.unitPrice || item.product?.price || 0;
                const config = item.configuration || {};

                return (
                  <div
                    key={`${identifier}-${idx}`}
                    className="flex gap-3.5 p-3.5 rounded-2xl bg-[#F8F9FA]/60 border border-slate-200/70 hover:border-slate-300 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-white rounded-xl border border-slate-200/70 p-1.5 shrink-0 flex items-center justify-center shadow-2xs">
                      {displayImage ? (
                        <img
                          src={displayImage}
                          alt={item.product?.name || 'Eyewear'}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                          Frame
                        </div>
                      )}
                    </div>

                    {/* Info Column */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1.5">
                          <Link
                            to={`/product/${item.product?.slug || ''}`}
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="text-xs font-bold text-[#14232E] hover:text-[#E4232C] transition-colors line-clamp-1 leading-snug"
                          >
                            {item.product?.name || item.productSnapshot?.name || 'Eyewear Frame'}
                          </Link>
                          <button
                            onClick={() => removeFromCart(identifier)}
                            className="text-slate-400 hover:text-[#E4232C] transition-colors p-1 rounded-md hover:bg-rose-50/50 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        {/* Variant & Specifications */}
                        <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-1.5">
                          {item.selectedColor && (
                            <span className="font-medium">Color: {item.selectedColor}</span>
                          )}
                          {config.lensSelection?.lensType && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="capitalize">{config.lensSelection.lensType.replace('-', ' ')}</span>
                            </>
                          )}
                          {config.contactLens && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span>{config.contactLens.boxes || 1} Box{(config.contactLens.boxes || 1) > 1 ? 'es' : ''}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Quantity Selector & Item Subtotal */}
                      <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-slate-200/50">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() => updateQuantity(identifier, item.quantity + 1)}
                          onDecrease={() => updateQuantity(identifier, item.quantity - 1)}
                          size="sm"
                        />
                        <span className="text-xs font-extrabold text-[#14232E] tabular-nums">
                          ₹{(itemUnit * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* 3. Footer Summary & Action Buttons */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-[#F8F9FA]/80 space-y-4">
              {/* Free Shipping Alert if applicable */}
              {subtotal < 999 && (
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-800 flex items-center justify-between">
                  <span>Add ₹{(999 - subtotal).toLocaleString('en-IN')} more for <strong>FREE Delivery</strong></span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#14232E] tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span className="tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-[#14232E]">
                    {shipping === 0 ? <span className="text-emerald-700">FREE</span> : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-[#14232E] pt-2.5 border-t border-slate-200/80">
                  <span>Total Amount</span>
                  <span className="text-[#E4232C] tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleViewCart}
                  className="w-full py-2.5 px-3 border border-slate-200 bg-white hover:border-slate-300 text-xs font-bold text-[#14232E] rounded-xl transition-all shadow-2xs cursor-pointer text-center"
                >
                  View Cart
                </button>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-2.5 px-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Checkout</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>100% Optical Quality Guarantee · Safe Payments</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};



export default CartDrawer;
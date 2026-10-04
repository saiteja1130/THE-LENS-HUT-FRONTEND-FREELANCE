import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, Trash2, Edit3 } from 'lucide-react';
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#14232E]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#14232E]" />
              <h2 className="text-base font-bold text-[#14232E]">
                Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-[#14232E] hover:bg-slate-100 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="text-base font-bold text-[#14232E]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-slate-500 max-w-[240px]">
                  Explore our curated spectacles, contact lenses and sunglasses collections.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="mt-2 px-5 py-2 bg-[#E4232C] text-white text-xs font-semibold rounded-md hover:bg-[#C81921] transition-colors"
                >
                  Explore Eyewear
                </button>
              </div>
            ) : (
              cart.map((item, idx) => {
                const identifier = item.configurationHash || item.id;
                const activeColor = item.product.colors?.find((c) => c.name === item.selectedColor);
                const displayImage = activeColor?.image || item.product.primaryImage || item.productSnapshot?.image;
                const itemUnit = item.unitPrice || item.product.price;
                const config = item.configuration || {};

                return (
                  <div
                    key={`${identifier}-${idx}`}
                    className="flex gap-4 pb-4 border-b border-slate-100 last:border-b-0"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-[#F5F6F7] rounded-lg border border-slate-100 p-1 shrink-0 flex items-center justify-center">
                      <img
                        src={displayImage}
                        alt={item.product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <Link
                            to={`/product/${item.product.slug}`}
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="text-xs font-bold text-[#14232E] hover:text-[#E4232C] transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(identifier)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-0.5"
                            title="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-1.5">
                          <span>Color: {item.selectedColor}</span>
                          {config.lensSelection?.lensType && (
                            <>
                              <span>·</span>
                              <span className="capitalize">{config.lensSelection.lensType.replace('-', ' ')}</span>
                            </>
                          )}
                          {config.contactLens && (
                            <>
                              <span>·</span>
                              <span>{config.contactLens.boxes || 1} Box{(config.contactLens.boxes || 1) > 1 ? 'es' : ''}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() => updateQuantity(identifier, item.quantity + 1)}
                          onDecrease={() => updateQuantity(identifier, item.quantity - 1)}
                          size="sm"
                        />
                        <span className="text-xs font-bold text-[#14232E] tabular-nums">
                          ₹{(itemUnit * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
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
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="font-bold text-[#14232E]">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#14232E] pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-[#E4232C] tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleViewCart}
                  className="w-full py-2.5 px-3 border border-slate-300 text-xs font-bold text-[#14232E] rounded-xl hover:bg-white transition-colors"
                >
                  View Cart
                </button>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-2.5 px-3 bg-[#E4232C] text-white text-xs font-bold rounded-xl hover:bg-[#C81921] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, Edit3, Glasses, Package, Sun, Tag, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const {
    cart,
    subtotal,
    discount,
    appliedCoupon,
    shipping,
    total,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res.message);
    if (res.success) {
      setCouponInput('');
    }
  };

  const renderConfigurationDetails = (item) => {
    const config = item.configuration || {};
    const pType = item.productType || config.productType || 'eyeglasses';

    if (pType === 'eyeglasses') {
      const lt = config.lensSelection?.lensType || 'single-vision';
      const lensName = config.lensSelection?.lensName;
      const rx = config.prescription;

      return (
        <div className="space-y-1 mt-1 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div className="flex items-center gap-1.5 font-bold text-[#14232E]">
            <Glasses size={12} className="text-[#E4232C]" />
            <span className="capitalize">Spectacles · {lt.replace('-', ' ')}</span>
          </div>
          {lensName && lt !== 'frame-only' && (
            <div>Lens Package: <strong className="text-slate-800">{lensName}</strong></div>
          )}
          {lt !== 'frame-only' && rx && (
            <div className="text-slate-500 font-mono text-[10px]">
              {rx.method === 'upload' ? (
                <span className="text-emerald-700 font-bold">✓ Doctor Rx Uploaded</span>
              ) : (
                <span>
                  OD: {rx.od?.sph || '0.00'} / {rx.od?.cyl || '0.00'} · OS: {rx.os?.sph || '0.00'} / {rx.os?.cyl || '0.00'}
                  {rx.pd && ` · PD: ${rx.pd}mm`}
                </span>
              )}
            </div>
          )}
        </div>
      );
    }

    if (pType === 'contact-lens') {
      const cl = config.contactLens || {};
      return (
        <div className="space-y-1 mt-1 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div className="flex items-center gap-1.5 font-bold text-[#14232E]">
            <Package size={12} className="text-[#E4232C]" />
            <span className="capitalize">Contact Lenses · {cl.boxes || 1} Box{(cl.boxes || 1) > 1 ? 'es' : ''} ({cl.piecesPerBox || 6} Pcs/Box)</span>
          </div>
          <div className="text-[10px] font-mono text-slate-700">
            {cl.prescriptionMethod === 'post-checkout' ? (
              <span className="text-amber-700 font-semibold">Powers to be confirmed post-checkout</span>
            ) : cl.prescriptionMethod === 'upload' ? (
              <span className="text-emerald-700 font-bold">✓ Contact Lens Rx Uploaded</span>
            ) : (
              <span>
                OD: <strong>{cl.od?.sph || 'Plano'}</strong>{cl.od?.cyl && ` (CYL ${cl.od?.cyl} ${cl.od?.axis})`} · OS: <strong>{cl.os?.sph || 'Plano'}</strong>{cl.os?.cyl && ` (CYL ${cl.os?.cyl} ${cl.os?.axis})`}
              </span>
            )}
          </div>
        </div>
      );
    }

    if (pType === 'sunglasses') {
      const sg = config.sunglass || {};
      return (
        <div className="space-y-1 mt-1 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div className="flex items-center gap-1.5 font-bold text-[#14232E]">
            <Sun size={12} className="text-[#E4232C]" />
            <span>Sunglasses · {sg.lensName || 'Standard Tint'}</span>
          </div>
          {sg.mode === 'power' && (
            <div className="text-[10px] text-[#E4232C] font-bold">
              Corrective Prescription Lenses Included
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'Shopping Cart' }]} />

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight mt-4 mb-8">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-[#F5F6F7] rounded-xl border border-slate-200/80 p-12 sm:p-16 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <ShoppingBag size={28} />
            </div>
            <h2 className="text-xl font-bold text-[#14232E]">
              Your optical cart is currently empty.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Explore our titanium eyeglasses, polarized sunglasses, and daily disposable contact lenses.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-bold rounded-md transition-colors"
              >
                <span>EXPLORE EYEWEAR</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="hidden sm:grid grid-cols-12 text-xs font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-200">
                <div className="col-span-6">Configured Eyewear Details</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {cart.map((item, idx) => {
                const itemTotal = (item.unitPrice || item.product.price) * item.quantity;
                const activeColor = item.product.colors?.find((c) => c.name === item.selectedColor);
                const displayImage = activeColor?.image || item.product.primaryImage || item.productSnapshot?.image;
                const identifier = item.configurationHash || item.id;

                return (
                  <div
                    key={`${identifier}-${idx}`}
                    className="flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center gap-4 py-4 border-b border-slate-100 last:border-b-0"
                  >
                    {/* Item Details */}
                    <div className="sm:col-span-6 flex items-start gap-4 w-full">
                      <div className="w-20 h-20 bg-[#F5F6F7] rounded-lg p-2 shrink-0 border border-slate-100 flex items-center justify-center">
                        <img
                          src={displayImage}
                          alt={item.product.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase font-bold text-slate-400">
                          {item.product.brand || item.productSnapshot?.brand}
                        </div>
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="text-xs sm:text-sm font-bold text-[#14232E] hover:text-[#E4232C] transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Color: <strong>{item.selectedColor}</strong>
                        </div>

                        {/* Optical Configuration Details */}
                        {renderConfigurationDetails(item)}

                        {/* Actions: Edit Configuration & Remove */}
                        <div className="flex items-center gap-3 mt-2">
                          <Link
                            to={`/product/${item.product.slug}?editItem=${identifier}`}
                            className="text-[11px] font-bold text-[#14232E] hover:text-[#E4232C] flex items-center gap-1 transition-colors"
                          >
                            <Edit3 size={11} />
                            <span>Edit Configuration</span>
                          </Link>
                          <span className="text-slate-300">·</span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(identifier)}
                            className="text-slate-400 hover:text-rose-600 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Trash2 size={11} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="sm:col-span-2 text-center text-xs font-semibold text-slate-700 hidden sm:block tabular-nums">
                      ₹{(item.unitPrice || item.product.price).toLocaleString('en-IN')}
                    </div>

                    {/* Quantity Controls */}
                    <div className="sm:col-span-2 flex items-center justify-center w-full sm:w-auto">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white h-8">
                        <button
                          type="button"
                          onClick={() => updateQuantity(identifier, item.quantity - 1)}
                          className="w-7 h-full flex items-center justify-center text-slate-500 hover:text-[#14232E] text-xs font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#14232E] select-none tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(identifier, item.quantity + 1)}
                          className="w-7 h-full flex items-center justify-center text-slate-500 hover:text-[#14232E] text-xs font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="sm:col-span-2 text-right text-xs sm:text-sm font-extrabold text-[#14232E] tabular-nums w-full sm:w-auto flex sm:block justify-between items-center border-t sm:border-t-0 pt-2 sm:pt-0">
                      <span className="sm:hidden text-slate-500 font-normal">Subtotal:</span>
                      <span>₹{itemTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 bg-[#F8F9FA] rounded-2xl border border-slate-200 p-6 space-y-6">
              <h2 className="text-base font-extrabold text-[#14232E] pb-3 border-b border-slate-200">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-[#14232E] tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({appliedCoupon})</span>
                    <span className="tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Optical Delivery</span>
                  <span className="font-bold text-[#14232E]">
                    {shipping === 0 ? <span className="text-emerald-700">FREE</span> : `₹${shipping}`}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-black text-[#14232E]">
                  <span>Total Amount</span>
                  <span className="text-[#E4232C] tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. BOGO)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs py-2 px-3 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#14232E]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#14232E] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponFeedback && (
                  <div className="text-[11px] font-semibold text-slate-600">
                    {couponFeedback}
                  </div>
                )}
              </form>

              {/* Proceed to Checkout CTA */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>100% Secure Checkout · 7 Days Easy Returns</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
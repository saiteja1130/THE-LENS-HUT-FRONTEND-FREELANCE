import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  Edit3,
  Glasses,
  Package,
  Sun,
  ShieldCheck,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const {
    cart,
    cartCount,
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
        <div className="space-y-1.5 mt-2 text-xs text-slate-600 bg-[#F8F9FA] p-3 rounded-xl border border-slate-200/70">
          <div className="flex items-center gap-1.5 font-bold text-[#14232E]">
            <Glasses size={13} className="text-[#E4232C]" />
            <span className="capitalize">Spectacles · {lt.replace('-', ' ')}</span>
          </div>
          {lensName && lt !== 'frame-only' && (
            <div className="text-[11px] text-slate-600">
              Lens Package: <strong className="text-slate-800">{lensName}</strong>
            </div>
          )}
          {lt !== 'frame-only' && rx && (
            <div className="text-slate-500 font-mono text-[11px]">
              {rx.method === 'upload' || rx.fileUrl ? (
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                  <span>Doctor Rx:</span>
                  {rx.fileUrl ? (
                    <a
                      href={rx.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-emerald-800 hover:text-emerald-950 truncate max-w-[200px]"
                      title={rx.fileName || 'View Prescription'}
                    >
                      {rx.fileName || 'Prescription Doc'}
                    </a>
                  ) : (
                    <span>{rx.fileName || 'Uploaded'}</span>
                  )}
                </div>
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
        <div className="space-y-1.5 mt-2 text-xs text-slate-600 bg-[#F8F9FA] p-3 rounded-xl border border-slate-200/70">
          <div className="flex items-center gap-1.5 font-bold text-[#14232E]">
            <Package size={13} className="text-[#E4232C]" />
            <span className="capitalize">Contact Lenses · {cl.boxes || 1} Box{(cl.boxes || 1) > 1 ? 'es' : ''} ({cl.piecesPerBox || 6} Pcs/Box)</span>
          </div>
          <div className="text-[11px] font-mono text-slate-700">
            {cl.prescriptionMethod === 'post-checkout' ? (
              <span className="text-amber-700 font-semibold">Powers to be confirmed post-checkout</span>
            ) : cl.prescriptionMethod === 'upload' ? (
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                <span>Contact Lens Rx:</span>
                {cl.prescriptionFile?.fileUrl ? (
                  <a
                    href={cl.prescriptionFile.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-emerald-800 hover:text-emerald-950 truncate max-w-[200px]"
                    title={cl.prescriptionFile.fileName || 'View Prescription'}
                  >
                    {cl.prescriptionFile.fileName || 'Document'}
                  </a>
                ) : (
                  <span>{cl.prescriptionFile?.fileName || 'Uploaded'}</span>
                )}
              </div>
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
        <div className="space-y-1 mt-2 text-xs text-slate-600 bg-[#F8F9FA] p-3 rounded-xl border border-slate-200/70">
          <div className="flex items-center gap-1.5 font-bold text-[#14232E]">
            <Sun size={13} className="text-[#E4232C]" />
            <span>Sunglasses · {sg.lensName || 'Standard Tint'}</span>
          </div>
          {sg.mode === 'power' && (
            <div className="text-[11px] text-[#E4232C] font-bold">
              Corrective Prescription Lenses Included
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Shopping Cart' }]} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mt-4 mb-8 pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14232E] tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review your customized eyewear, prescription specifications, and price breakdown.
            </p>
          </div>
          {cart.length > 0 && (
            <span className="text-xs sm:text-sm font-bold text-slate-500">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} {cart.reduce((sum, item) => sum + item.quantity, 0) === 1 ? 'item' : 'items'} in your cart
            </span>
          )}
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="bg-[#F8F9FA] rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-white border border-slate-200/80 text-slate-400 mx-auto flex items-center justify-center shadow-2xs">
              <ShoppingBag size={28} />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#14232E]">
                Your optical cart is currently empty.
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                Explore our titanium eyeglasses, polarized sunglasses, and daily disposable contact lenses.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs"
              >
                <span>EXPLORE EYEWEAR</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          /* Main 2-Column Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Desktop Table Header */}
              <div className="hidden sm:grid grid-cols-12 text-[11px] font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-200 px-2">
                <div className="col-span-6">Configured Eyewear Details</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Items Rows */}
              <div className="space-y-4">
                {cart.map((item, idx) => {
                  const itemTotal = (item.unitPrice || item.product?.price || 0) * item.quantity;
                  const activeColor = item.product?.colors?.find((c) => c.name?.toLowerCase() === (item.selectedColor || item.variantName)?.toLowerCase());
                  const displayImage = item.image || activeColor?.image || item.product?.primaryImage || item.productSnapshot?.image || '';
                  const identifier = item.configurationHash || item.id;

                  return (
                    <div
                      key={`${identifier}-${idx}`}
                      className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 hover:border-slate-300 transition-all shadow-xs flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center gap-4"
                    >
                      {/* Product Details & Thumbnail */}
                      <div className="sm:col-span-6 flex items-start gap-4 w-full">
                        <div className="w-20 sm:w-24 h-20 sm:h-24 bg-[#F8F9FA] rounded-xl p-2 shrink-0 border border-slate-200/80 flex items-center justify-center shadow-2xs">
                          {displayImage ? (
                            <img
                              src={displayImage}
                              alt={item.product?.name || 'Eyewear Frame'}
                              className="w-full h-full object-contain mix-blend-multiply"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                              Frame
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                            {item.product?.brand || item.productSnapshot?.brand || 'The Lens Hut'}
                          </span>
                          
                          <Link
                            to={`/product/${item.product?.slug || ''}`}
                            className="text-xs sm:text-sm font-bold text-[#14232E] hover:text-[#E4232C] transition-colors line-clamp-1 leading-snug"
                          >
                            {item.product?.name || item.productSnapshot?.name || 'Eyewear Frame'}
                          </Link>

                          {item.selectedColor && (
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Color: <strong className="text-slate-700">{item.selectedColor}</strong>
                            </div>
                          )}

                          {/* Optical Configuration Details */}
                          {renderConfigurationDetails(item)}

                          {/* Actions: Edit Configuration & Remove */}
                          <div className="flex items-center gap-3 mt-2.5 pt-1">
                            <Link
                              to={`/product/${item.product?.slug || ''}?editItem=${identifier}`}
                              className="text-[11px] font-bold text-[#14232E] hover:text-[#E4232C] flex items-center gap-1 transition-colors"
                            >
                              <Edit3 size={12} />
                              <span>Edit Configuration</span>
                            </Link>
                            <span className="text-slate-200">·</span>
                            <button
                              type="button"
                              onClick={() => removeFromCart(identifier)}
                              className="text-slate-400 hover:text-[#E4232C] text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 size={12} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="sm:col-span-2 text-center text-xs font-bold text-slate-700 hidden sm:block tabular-nums">
                        ₹{(item.unitPrice || item.product?.price || 0).toLocaleString('en-IN')}
                      </div>

                      {/* Quantity Controls */}
                      <div className="sm:col-span-2 flex items-center justify-center w-full sm:w-auto">
                        <div className="flex items-center border border-slate-200 rounded-xl bg-white h-9 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(identifier, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-[#14232E] text-xs font-bold cursor-pointer transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-extrabold text-[#14232E] select-none tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(identifier, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-[#14232E] text-xs font-bold cursor-pointer transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="sm:col-span-2 text-right text-xs sm:text-sm font-extrabold text-[#14232E] tabular-nums w-full sm:w-auto flex sm:block justify-between items-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <span className="sm:hidden text-slate-400 font-normal">Subtotal:</span>
                        <span>₹{itemTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 bg-[#F8F9FA] rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-6 shadow-xs sticky top-24">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#14232E]">
                  Order Summary
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Taxes and express shipping calculated
                </p>
              </div>

              {/* Price Details */}
              <div className="space-y-3 text-xs text-slate-600 border-t border-slate-200/70 pt-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-[#14232E] tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount {appliedCoupon && `(${appliedCoupon})`}</span>
                    <span className="tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Optical Delivery</span>
                  <span className="font-bold text-[#14232E]">
                    {shipping === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${shipping}`}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-extrabold text-[#14232E]">
                  <span>Total Amount</span>
                  <span className="text-[#E4232C] tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2 pt-1 border-t border-slate-200/70">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Promo / Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. BOGO, VISION10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs h-10 px-3.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                  />
                  <button
                    type="submit"
                    className="px-4 h-10 bg-[#14232E] hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponFeedback && (
                  <div className="text-[11px] font-semibold text-slate-600 pt-1">
                    {couponFeedback}
                  </div>
                )}
              </form>

              {/* Proceed to Checkout CTA */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3.5 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>PROCEED TO SECURE CHECKOUT</span>
                  <ArrowRight size={15} />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                  <span>100% Secure Checkout · 7 Days Easy Returns</span>
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

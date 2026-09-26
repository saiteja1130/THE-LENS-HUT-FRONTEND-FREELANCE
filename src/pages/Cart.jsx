import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { QuantitySelector } from '../components/common/QuantitySelector';
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
  const handleApplyCoupon = e => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res.message);
    if (res.success) {
      setCouponInput('');
    }
  };
  return <div className="bg-[#FFFFFF] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{
        label: 'Shopping Cart'
      }]} />

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight mt-4 mb-8">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? <div className="bg-[#F5F6F7] rounded-xl border border-slate-200/80 p-12 sm:p-16 text-center max-w-lg mx-auto space-y-4">
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
              <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-bold rounded-md transition-colors">
                <span>EXPLORE EYEWEAR</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div> : <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="hidden sm:grid grid-cols-12 text-xs font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-200">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {cart.map((item, idx) => {
            const itemTotal = item.product.price * item.quantity;
            const activeColor = item.product.colors.find(c => c.name === item.selectedColor);
            const displayImage = activeColor?.image || item.product.primaryImage;
            return <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`} className="flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center gap-4 py-4 border-b border-slate-100 last:border-b-0">
                    {/* Item Details */}
                    <div className="sm:col-span-6 flex items-center gap-4 w-full">
                      <div className="w-20 h-20 bg-[#F5F6F7] rounded-lg p-2 shrink-0 border border-slate-100 flex items-center justify-center">
                        <img src={displayImage} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase font-bold text-slate-400">
                          {item.product.brand}
                        </div>
                        <Link to={`/product/${item.product.slug}`} className="text-xs sm:text-sm font-bold text-[#14232E] hover:text-[#E4232C] transition-colors line-clamp-1">
                          {item.product.name}
                        </Link>
                        <div className="text-[11px] text-slate-500 mt-0.5 space-x-2">
                          <span>Color: {item.selectedColor}</span>
                          <span>·</span>
                          <span>Size: {item.selectedSize}</span>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)} className="text-slate-400 hover:text-rose-600 text-[11px] flex items-center gap-1 mt-1 transition-colors cursor-pointer">
                          <Trash2 size={12} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="sm:col-span-2 text-center text-xs font-semibold text-slate-700 hidden sm:block tabular-nums">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </div>

                    {/* Quantity */}
                    <div className="sm:col-span-2 flex justify-start sm:justify-center w-full sm:w-auto">
                      <QuantitySelector quantity={item.quantity} onIncrease={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)} onDecrease={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)} size="sm" />
                    </div>

                    {/* Subtotal */}
                    <div className="sm:col-span-2 sm:text-right font-bold text-[#14232E] text-sm tabular-nums w-full sm:w-auto flex justify-between sm:block">
                      <span className="sm:hidden text-xs font-normal text-slate-500">Item Total:</span>
                      <span>₹{itemTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>;
          })}

              <div className="pt-4 flex justify-between items-center">
                <Link to="/shop" className="text-xs font-semibold text-[#14232E] hover:text-[#E4232C] transition-colors">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 bg-[#F5F6F7] rounded-xl border border-slate-200/80 p-6 space-y-6">
              <h2 className="text-base font-bold text-[#14232E] border-b border-slate-200 pb-3">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#14232E] flex items-center gap-1.5">
                  <Tag size={13} className="text-[#E4232C]" />
                  <span>Have a Promo Code?</span>
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input type="text" value={couponInput} onChange={e => setCouponInput(e.target.value)} placeholder="e.g. BOGO, VISION10" className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded text-xs text-[#14232E] uppercase focus:outline-none focus:border-[#14232E]" />
                  <button type="submit" className="px-4 py-2 bg-[#14232E] text-white text-xs font-semibold rounded hover:bg-[#E4232C] transition-colors cursor-pointer">
                    Apply
                  </button>
                </form>

                {couponFeedback && <p className="text-[11px] text-slate-600 font-medium">
                    {couponFeedback}
                  </p>}

                {appliedCoupon ? (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded">
                    <span>Code <strong>{appliedCoupon}</strong> active</span>
                    <button onClick={removeCoupon} className="text-xs text-rose-600 hover:underline cursor-pointer">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        applyCoupon('BOGO');
                        setCouponInput('');
                      }}
                      className="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded text-[10px] font-bold cursor-pointer"
                    >
                      🎁 BOGO (Buy 1 Get 1)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        applyCoupon('VISION10');
                        setCouponInput('');
                      }}
                      className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded text-[10px] font-bold cursor-pointer"
                    >
                      VISION10 (10% Off)
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#14232E] tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discount > 0 && <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount Savings</span>
                    <span className="tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>}

                <div className="flex justify-between">
                  <span>Express Courier Delivery</span>
                  <span className="font-medium text-[#14232E]">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-[#14232E] pt-3 border-t border-slate-200">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button onClick={() => navigate('/checkout')} className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#E4232C] hover:bg-[#C81921] text-white text-sm font-bold rounded-md shadow-sm transition-colors cursor-pointer">
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} />
              </button>

              <div className="pt-2 text-[11px] text-slate-500 text-center flex items-center justify-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>256-Bit SSL Encrypted & Secure Checkout</span>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};
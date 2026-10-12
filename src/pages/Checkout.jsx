import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Lock, ShieldCheck, ArrowRight, Check, Tag, Gift, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const Checkout = () => {
  const { toast } = useNotification();
  const {
    cart,
    subtotal: cartSubtotal,
    discount: cartDiscount,
    shipping: cartShipping,
    total: cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
    calculateBogoDiscount
  } = useCart();

  const {
    user,
    isAuthenticated,
    placeOrder
  } = useAuth();

  const navigate = useNavigate();

  // Contact & delivery address form state
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState(user?.phone || '');
  const [fullName, setFullName] = useState(user?.name || '');
  const [street, setStreet] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  // Shipping & Payment selection matching screenshot
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Items to display: active cart items
  const hasCartItems = cart.length > 0;
  const displayItems = cart;

  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState(null);

  const handleApplyCoupon = (e, codeToApply) => {
    if (e) e.preventDefault();
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) return;

    const res = applyCoupon(code);
    if (res.success) {
      setCouponStatus({ type: 'success', message: res.message });
      setCouponInput('');
      toast.success(res.message);
    } else {
      setCouponStatus({ type: 'error', message: res.message });
      toast.error(res.message);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponStatus(null);
  };

  // Dynamic financial calculations with BOGO support
  const rawSubtotal = displayItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  let activeDiscount = 0;
  if (appliedCoupon === 'BOGO' || appliedCoupon === 'BUY1GET1' || appliedCoupon === 'B1G1') {
    activeDiscount = calculateBogoDiscount ? calculateBogoDiscount(displayItems) : 0;
  } else if (appliedCoupon === 'VISION10') {
    activeDiscount = Math.round(rawSubtotal * 0.1);
  } else if (appliedCoupon === 'BRIGHT20') {
    activeDiscount = rawSubtotal >= 3000 ? Math.round(rawSubtotal * 0.2) : 0;
  } else if (appliedCoupon === 'FIRSTHUT') {
    activeDiscount = Math.min(rawSubtotal, 300);
  } else if (hasCartItems) {
    activeDiscount = cartDiscount;
  } else {
    activeDiscount = 0;
  }

  const subtotal = rawSubtotal;
  const discount = activeDiscount;
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discount + (shippingMethod === 'express' ? 149 : shipping));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !contactPhone.trim() || !street.trim() || !pincode.trim()) {
      toast.warning('Please complete all required shipping address fields');
      return;
    }

    setIsProcessing(true);

    const shippingAddress = {
      id: 'addr-' + Date.now(),
      fullName,
      phone: contactPhone,
      street,
      locality,
      city,
      state,
      pincode,
      isDefault: true
    };

    const paymentLabel =
      paymentMethod === 'upi'
        ? `UPI (${upiId || 'Instant App Link / QR'})`
        : paymentMethod === 'card'
          ? 'Debit / Credit Card'
          : 'Cash on Delivery';

    await new Promise((r) => setTimeout(r, 800));

    const orderItemsSnapshot = displayItems.map((item) => ({
      productId: item.productId || item.product?.id,
      productType: item.productType || item.configuration?.productType || 'eyeglasses',
      name: item.product?.name || item.productSnapshot?.name,
      brand: item.product?.brand || item.productSnapshot?.brand || 'The Lens Hut',
      sku: item.product?.sku || item.productSnapshot?.sku || 'LH-OPTICAL',
      image: item.product?.colors?.[0]?.image || item.product?.primaryImage || item.product?.image || item.productSnapshot?.image,
      configuration: item.configuration || {},
      selectedColor: item.selectedColor || item.configuration?.variantName || 'Standard',
      selectedSize: item.selectedSize || 'Standard',
      unitPrice: item.unitPrice || item.product?.price || 0,
      quantity: item.quantity || 1,
      totalPrice: (item.unitPrice || item.product?.price || 0) * (item.quantity || 1)
    }));

    const newOrder = placeOrder({
      items: orderItemsSnapshot,
      shippingAddress,
      paymentMethod: paymentLabel,
      subtotal,
      discount,
      shipping,
      total
    });

    if (hasCartItems) {
      clearCart();
    }
    setIsProcessing(false);
    setConfirmedOrder(newOrder);
    toast.success('Your order has been placed successfully!');
  };

  // Order Confirmed State
  if (confirmedOrder) {
    return (
      <div className="bg-[#FFFFFF] min-h-screen py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FAF9F6] rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center space-y-6 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                ORDER SUCCESSFUL
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14232E]">
                Thank you for your order!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Order <strong className="text-[#14232E]">{confirmedOrder.id}</strong> has been received and is being prepared by our certified optical lab.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-6 text-left space-y-3.5 max-w-lg mx-auto text-xs shadow-2xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Tracking Number:</span>
                <span className="font-bold text-[#14232E]">{confirmedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-600">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Payment:</span>
                <span className="font-medium text-[#14232E]">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-[#14232E] pt-1">
                <span>Total Paid:</span>
                <span className="tabular-nums text-[#E4232C]">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <Link
                to="/account?tab=orders"
                className="px-6 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
              >
                View Live Order Status
              </Link>
              <Link
                to="/"
                className="px-6 py-3 bg-white border border-slate-300 text-[#14232E] hover:bg-slate-50 text-xs font-bold rounded-lg transition-colors shadow-2xs"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* 1. Hero Banner matching exact screenshot */}
      <section className="relative w-full bg-[#FAF8F5] overflow-hidden  min-h-[200px] sm:min-h-[300px] flex items-center">
        {/* Full-Bleed Background Image on Right with top alignment to prevent cropping */}
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
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
            <Link to="/" className="hover:text-[#E4232C] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">›</span>
            <Link to="/cart" className="hover:text-[#E4232C] transition-colors">
              Cart
            </Link>
          </nav>

          {/* Heading & Subtitle */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14232E] tracking-tight">
            Checkout
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
            Complete your purchase and enjoy clear vision.
          </p>
        </div>
      </section>

      {/* 2. Main Checkout Form & Summary Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Form: Steps 1 to 4 */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Information */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-[#14232E] flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#14232E] text-white text-[11px] flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Contact Information</span>
                </h2>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 transition-all">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Address */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-[#14232E] flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#14232E] text-white text-[11px] flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Delivery Address</span>
                </h2>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 transition-all space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Recipient's full name"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="6-digit PIN code"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    House No. / Flat / Building / Street *
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Flat/House no., Floor, Building, Street name"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Area / Locality / Landmark
                  </label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="Near landmark, sector, or locality (optional)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai / Bangalore / Hyderabad"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Maharashtra / Karnataka / Telangana"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method */}
            <div className="space-y-2.5">
              <h2 className="text-sm sm:text-base font-bold text-[#14232E] flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#14232E] text-white text-[11px] flex items-center justify-center font-bold">
                  3
                </span>
                <span>Shipping Method</span>
              </h2>

              <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 sm:p-4 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  Standard Delivery (3-5 business days) - Free
                </span>
              </div>
            </div>

            {/* Step 4: Payment Method */}
            <div className="space-y-2.5">
              <h2 className="text-sm sm:text-base font-bold text-[#14232E] flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#14232E] text-white text-[11px] flex items-center justify-center font-bold">
                  4
                </span>
                <span>Payment Method</span>
              </h2>

              <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                  {/* UPI / QR Radio */}
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-medium text-slate-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="w-4 h-4 accent-[#E4232C] cursor-pointer"
                    />
                    <span>UPI / QR</span>
                  </label>

                  {/* Credit / Debit Card Radio */}
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-medium text-slate-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="w-4 h-4 accent-[#E4232C] cursor-pointer"
                    />
                    <span>Credit / Debit Card</span>
                  </label>

                  {/* Cash on Delivery Radio */}
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-medium text-slate-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 accent-[#E4232C] cursor-pointer"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                {/* Optional UPI Input if UPI selected */}
                {paymentMethod === 'upi' && (
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g. yourname@okhdfcbank)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs text-[#14232E] placeholder:text-slate-400 focus:outline-none focus:border-[#14232E]"
                    />
                    <span className="text-[11px] text-slate-400">or Scan QR upon order</span>
                  </div>
                )}
              </div>

              {/* Security Footnote */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <Lock size={14} className="text-slate-400 shrink-0" />
                <span>Your payment information is secure and encrypted.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Card matching screenshot */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-5">
              <h2 className="text-base sm:text-lg font-bold text-[#14232E]">
                Order Summary
              </h2>

              {/* Product Items List */}
              <div className="space-y-4">
                {displayItems.map((item, idx) => {
                  const itemImage =
                    item.product?.images?.front ||
                    item.product?.colors?.[0]?.images?.front ||
                    item.product?.primaryImage ||
                    item.product?.image ||
                    item.productSnapshot?.image ||
                    '';

                  const config = item.configuration || {};
                  const pType = item.productType || config.productType || 'eyeglasses';
                  const unitPrice = item.unitPrice || item.product?.price || 0;
                  const itemTotal = unitPrice * (item.quantity || 1);

                  return (
                    <div
                      key={item.configurationHash || item.product?.id || idx}
                      className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-14 h-14 bg-[#F5F6F7] rounded-xl p-1.5 flex items-center justify-center shrink-0 border border-slate-100">
                          <img
                            src={itemImage}
                            alt={item.product?.name || 'Eyewear item'}
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-[#14232E] truncate">
                            {item.product?.name || item.name}
                          </h4>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Color: <strong className="text-slate-700">{item.selectedColor || 'Standard'}</strong> × {item.quantity || 1}
                          </div>

                          {/* Optical Configuration Details */}
                          {pType === 'eyeglasses' && config.lensSelection && (
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              {config.lensSelection.lensType?.replace('-', ' ')}
                              {config.lensSelection.lensName && ` · ${config.lensSelection.lensName}`}
                            </div>
                          )}
                          {pType === 'contact-lens' && config.contactLens && (
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              {config.contactLens.boxes || 1} Box{(config.contactLens.boxes || 1) > 1 ? 'es' : ''} ({config.contactLens.piecesPerBox || 6} Pcs/Box)
                              {config.contactLens.od?.sph && ` · OD ${config.contactLens.od.sph}`}
                            </div>
                          )}
                          {pType === 'sunglasses' && config.sunglass && (
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              {config.sunglass.lensName || 'Sunglasses'}
                              {config.sunglass.mode === 'power' && ' · Corrective Rx'}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm font-extrabold text-[#14232E] tabular-nums shrink-0 text-right">
                        <div>₹{itemTotal.toLocaleString('en-IN')}</div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] font-normal text-slate-400">
                            ₹{unitPrice.toLocaleString('en-IN')} each
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promo / Coupon Box */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#14232E] flex items-center gap-1.5">
                    <Tag size={13} className="text-[#E4232C]" />
                    <span>Have a coupon code?</span>
                  </span>
                  {appliedCoupon && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                      Applied
                    </span>
                  )}
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50/90 border border-emerald-200 rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold text-emerald-950 uppercase tracking-wide">
                          {appliedCoupon}
                        </span>
                        <span className="text-[11px] text-emerald-700 block">
                          {appliedCoupon === 'BOGO' || appliedCoupon === 'BUY1GET1' || appliedCoupon === 'B1G1'
                            ? 'Buy 1 Get 1 Free applied'
                            : appliedCoupon === 'VISION10'
                            ? '10% order discount applied'
                            : appliedCoupon === 'BRIGHT20'
                            ? '20% discount applied'
                            : 'Coupon discount applied'}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          if (couponStatus) setCouponStatus(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleApplyCoupon(null, couponInput);
                          }
                        }}
                        placeholder="e.g. BOGO, VISION10"
                        className="w-full pl-3 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-[#14232E] uppercase placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:border-[#14232E] focus:bg-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon(null, couponInput)}
                      className="px-4 py-2 bg-[#14232E] hover:bg-[#0b1622] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {/* Status Message */}
                {couponStatus && (
                  <p
                    className={`text-[11px] font-medium ${
                      couponStatus.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {couponStatus.message}
                  </p>
                )}

                {/* Quick Coupon Chips including BOGO */}
                {!appliedCoupon && (
                  <div className="pt-0.5">
                    <span className="text-[10px] text-slate-400 font-medium block mb-1.5">
                      Available offers:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon(null, 'BOGO')}
                        className="group flex items-center gap-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200/90 text-amber-900 rounded-lg text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
                        title="Click to apply Buy 1 Get 1 Free"
                      >
                        <Gift size={11} className="text-amber-600" />
                        <span>BOGO</span>
                        <span className="font-normal text-[10px] text-amber-700 hidden sm:inline">(Buy 1 Get 1)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleApplyCoupon(null, 'VISION10')}
                        className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                        title="Click to apply 10% off"
                      >
                        <span>VISION10</span>
                        <span className="font-normal text-[10px] text-slate-500">(10% Off)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleApplyCoupon(null, 'FIRSTHUT')}
                        className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                        title="Click to apply ₹300 off"
                      >
                        <span>FIRSTHUT</span>
                        <span className="font-normal text-[10px] text-slate-500">(₹300 Off)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#14232E] tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span>Discount</span>
                    {appliedCoupon && (
                      <span className="text-[10px] font-extrabold text-[#E4232C] bg-rose-50 px-1.5 py-0.5 rounded uppercase">
                        {appliedCoupon === 'BOGO' ? 'BOGO Free' : appliedCoupon}
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-[#E4232C] tabular-nums">
                    -₹{discount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-emerald-600">
                    Free
                  </span>
                </div>
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <span className="text-sm sm:text-base font-bold text-[#14232E]">
                  Total
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-[#14232E] tabular-nums">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Place Order Red Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#E4232C] hover:bg-[#C81921] text-white text-sm sm:text-base font-bold rounded-xl transition-all duration-200 cursor-pointer shadow-xs hover:shadow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing Order...</span>
                ) : (
                  <span>Place Order</span>
                )}
              </button>

              {/* 100% Secure Payment Reassurance */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
                <ShieldCheck size={15} className="text-slate-400" />
                <span>100% Secure Payment</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
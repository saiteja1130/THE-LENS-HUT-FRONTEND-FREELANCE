import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Lock,
  ShieldCheck,
  ArrowRight,
  Check,
  Tag,
  Gift,
  Sparkles,
  CreditCard,
  QrCode,
  Banknote,
  Truck,
  Glasses,
  Package,
  Sun,
  MapPin,
  Mail,
  Phone,
  User
} from 'lucide-react';
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

  // Shipping & Payment selection
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
    (sum, item) => sum + (item.product?.price || item.unitPrice || 0) * (item.quantity || 1),
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

    if (displayItems.length === 0) {
      toast.warning('Your cart is empty');
      return;
    }

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
      productId: item.productId || item.product?.id || item.product?._id,
      productType: item.productType || item.configuration?.productType || 'eyeglasses',
      name: item.product?.name || item.productSnapshot?.name || item.name,
      brand: item.product?.brand || item.productSnapshot?.brand || '',
      sku: item.product?.sku || item.productSnapshot?.sku || '',
      image: item.product?.colors?.[0]?.image || item.product?.primaryImage || item.product?.image || item.productSnapshot?.image || item.image,
      configuration: item.configuration || {},
      selectedColor: item.selectedColor || item.configuration?.variantName || 'Standard',
      selectedSize: item.selectedSize || 'Standard',
      unitPrice: item.unitPrice || item.product?.price || 0,
      quantity: item.quantity || 1,
      totalPrice: (item.unitPrice || item.product?.price || 0) * (item.quantity || 1)
    }));

    try {
      const newOrder = await placeOrder({
        items: orderItemsSnapshot,
        shippingAddress,
        paymentMethod: paymentLabel,
        subtotal,
        discount,
        discountAmount: discount,
        couponCode: appliedCoupon || '',
        shipping: shippingMethod === 'express' ? 149 : shipping,
        shippingFee: shippingMethod === 'express' ? 149 : shipping,
        total,
        totalAmount: total,
        customerEmail: contactEmail,
        customerPhone: contactPhone,
        customerName: fullName,
      });

      if (hasCartItems) {
        clearCart();
      }
      setIsProcessing(false);
      setConfirmedOrder(newOrder);
      toast.success('Your order has been placed successfully!');
    } catch (orderErr) {
      console.error('[Checkout] Error placing order:', orderErr);
      setIsProcessing(false);
      toast.error('An error occurred while creating your order. Please try again.');
    }
  };

  // Order Confirmed State
  if (confirmedOrder) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen py-12 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-6 shadow-sm">
            <div className="w-18 h-18 rounded-full bg-emerald-50 border-2 border-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 size={40} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                ORDER CONFIRMED
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14232E] tracking-tight">
                Thank you for your order!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Order <strong className="text-[#14232E] font-bold">#{confirmedOrder.id}</strong> has been received and is currently being prepared by our optical specialists.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-[#F8F9FA] rounded-2xl border border-slate-200/80 p-5 sm:p-6 text-left space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/70">
                <span className="text-slate-500 font-medium">Tracking Number:</span>
                <span className="font-mono font-bold text-[#14232E]">{confirmedOrder.trackingNumber || 'Assigned on dispatch'}</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/70">
                <span className="text-slate-500 font-medium">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-700">{confirmedOrder.estimatedDelivery || '3-5 business days'}</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/70">
                <span className="text-slate-500 font-medium">Payment Method:</span>
                <span className="font-medium text-[#14232E]">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base font-extrabold text-[#14232E] pt-1">
                <span>Total Amount Paid:</span>
                <span className="tabular-nums text-[#E4232C]">₹{confirmedOrder.total?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <Link
                to="/account?tab=orders"
                className="w-full sm:w-auto px-7 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs"
              >
                View Live Order Status
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto px-7 py-3 bg-white border border-slate-200 text-[#14232E] hover:bg-slate-50 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-2xs"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart State
  if (!confirmedOrder && displayItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
          <Package size={28} />
        </div>
        <h2 className="text-2xl font-extrabold text-[#14232E] mb-2 tracking-tight">Your Cart is Empty</h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
          Add designer frames, optical lenses, or sunglasses to your shopping bag before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-7 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs"
        >
          <span>Explore Collection</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* 1. Hero Banner Header */}
      <section className="relative w-full bg-[#FAF8F5] border-b border-slate-200/70 overflow-hidden min-h-[190px] sm:min-h-[240px] flex items-center">
        {/* Full-Bleed Background Image on Right with smooth gradient */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <img
            src="/images/checkout-hero.png"
            alt="The Lens Hut Checkout"
            className="w-full h-full object-cover object-[82%_center] sm:object-[86%_center] lg:object-[88%_center] opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/95 sm:via-[#FAF8F5]/85 to-transparent w-full md:w-[65%]" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
            <Link to="/" className="hover:text-[#E4232C] transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link to="/cart" className="hover:text-[#E4232C] transition-colors">
              Cart
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#E4232C] font-semibold">Checkout</span>
          </nav>

          {/* Heading & Subtitle */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14232E] tracking-tight">
            Secure Checkout
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
            Complete your order with verified 256-bit encryption.
          </p>
        </div>
      </section>

      {/* 2. Main Checkout Form & Summary Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Form: Steps 1 to 4 */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Contact Information */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-[#14232E] flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#14232E] text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Contact Information</span>
                </h2>
                <span className="text-[11px] text-slate-400">Order updates will be sent here</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-[#E4232C]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full h-11 px-3.5 pl-9 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                      required
                    />
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone Number <span className="text-[#E4232C]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full h-11 px-3.5 pl-9 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                      required
                    />
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Address */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-[#14232E] flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#14232E] text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Delivery Address</span>
                </h2>
                <span className="text-[11px] text-slate-400">
                  Entered directly for this order
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-[#E4232C]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Recipient's full name"
                        className="w-full h-11 px-3.5 pl-9 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                        required
                      />
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Pincode <span className="text-[#E4232C]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="6-digit PIN code"
                        maxLength={6}
                        className="w-full h-11 px-3.5 pl-9 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                        required
                      />
                      <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    House No. / Flat / Building / Street <span className="text-[#E4232C]">*</span>
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Flat/House no., Floor, Building, Street name"
                    className="w-full h-11 px-3.5 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Area / Locality / Landmark
                  </label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="Near landmark, sector, or colony (optional)"
                    className="w-full h-11 px-3.5 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      City / District <span className="text-[#E4232C]">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai / Bangalore / Hyderabad"
                      className="w-full h-11 px-3.5 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      State <span className="text-[#E4232C]">*</span>
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Maharashtra / Karnataka / Telangana"
                      className="w-full h-11 px-3.5 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              <h2 className="text-base font-bold text-[#14232E] flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-[#14232E] text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>Shipping Method</span>
              </h2>

              <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Truck size={18} />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#14232E] block">
                      Standard Express Optical Delivery (3-5 business days)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Safe temperature-controlled eyewear logistics
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
                  FREE
                </span>
              </div>
            </div>

            {/* Step 4: Payment Method */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#14232E] flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-[#14232E] text-white text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <span>Payment Method</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* UPI / QR Radio Card */}
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#14232E] bg-slate-50/80 ring-1 ring-[#14232E] shadow-2xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <QrCode size={18} className={paymentMethod === 'upi' ? 'text-[#E4232C]' : 'text-slate-400'} />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="w-4 h-4 accent-[#E4232C] cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#14232E] block">UPI / QR</span>
                    <span className="text-[10px] text-slate-400">GPay, PhonePe, Paytm</span>
                  </div>
                </label>

                {/* Credit / Debit Card Radio Card */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#14232E] bg-slate-50/80 ring-1 ring-[#14232E] shadow-2xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard size={18} className={paymentMethod === 'card' ? 'text-[#E4232C]' : 'text-slate-400'} />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="w-4 h-4 accent-[#E4232C] cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#14232E] block">Cards</span>
                    <span className="text-[10px] text-slate-400">Visa, Mastercard, RuPay</span>
                  </div>
                </label>

                {/* Cash on Delivery Radio Card */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#14232E] bg-slate-50/80 ring-1 ring-[#14232E] shadow-2xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Banknote size={18} className={paymentMethod === 'cod' ? 'text-[#E4232C]' : 'text-slate-400'} />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 accent-[#E4232C] cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#14232E] block">Cash on Delivery</span>
                    <span className="text-[10px] text-slate-400">Pay cash upon delivery</span>
                  </div>
                </label>
              </div>

              {/* Optional UPI Input if UPI selected */}
              {paymentMethod === 'upi' && (
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g. yourname@okhdfcbank)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="flex-1 h-10 px-3.5 border border-slate-200 rounded-xl text-xs text-[#14232E] placeholder:text-slate-400 focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                  />
                  <span className="text-[11px] text-slate-400 text-center sm:text-left">
                    or instant dynamic QR code will be generated
                  </span>
                </div>
              )}

              {/* Security Footnote */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <Lock size={14} className="text-emerald-600 shrink-0" />
                <span>Your payment information is end-to-end encrypted and 100% secure.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary Card (Sticky) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-base sm:text-lg font-bold text-[#14232E]">
                  Order Summary
                </h2>
                <span className="text-xs font-semibold text-slate-400">
                  {displayItems.length} {displayItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Product Items List */}
              <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
                {displayItems.map((item, idx) => {
                  const itemImage =
                    item.product?.images?.front ||
                    item.product?.colors?.[0]?.images?.front ||
                    item.product?.primaryImage ||
                    item.product?.image ||
                    item.productSnapshot?.image ||
                    item.image ||
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
                        <div className="w-14 h-14 bg-[#F8F9FA] rounded-xl p-1.5 flex items-center justify-center shrink-0 border border-slate-200/70 shadow-2xs">
                          {itemImage ? (
                            <img
                              src={itemImage}
                              alt={item.product?.name || 'Eyewear item'}
                              className="w-full h-full object-contain mix-blend-multiply"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-400">
                              Frame
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-[#14232E] truncate">
                            {item.product?.name || item.productSnapshot?.name || item.name}
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
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#14232E] uppercase placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:border-[#14232E] focus:bg-white transition-all"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon(null, couponInput)}
                      className="px-4 h-10 bg-[#14232E] hover:bg-black text-white text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 shadow-2xs"
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
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-[#14232E] tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span>Discount</span>
                      {appliedCoupon && (
                        <span className="text-[10px] font-extrabold text-[#E4232C] bg-rose-50 px-1.5 py-0.5 rounded uppercase">
                          {appliedCoupon === 'BOGO' ? 'BOGO Free' : appliedCoupon}
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-[#E4232C] tabular-nums">
                      -₹{discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-slate-600">
                  <span>Express Delivery</span>
                  <span className="font-bold text-emerald-700">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm sm:text-base font-extrabold text-[#14232E]">
                  Total Payable
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#14232E] tabular-nums">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Place Order Red Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#E4232C] hover:bg-[#C81921] text-white text-sm sm:text-base font-extrabold rounded-xl transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <span>Place Order</span>
                )}
              </button>

              {/* 100% Secure Payment Reassurance */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-1">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>100% Secure 256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;

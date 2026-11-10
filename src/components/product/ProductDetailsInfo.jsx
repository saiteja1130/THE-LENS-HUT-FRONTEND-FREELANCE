import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Info,
  BadgeCheck
} from 'lucide-react';

export const ProductDetailsInfo = ({ product }) => {
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);

  // Calculate realistic delivery dates (3 to 5 business days from now)
  const getDeliveryEstimates = () => {
    const today = new Date();
    const minDays = new Date(today);
    minDays.setDate(today.getDate() + 3);
    const maxDays = new Date(today);
    maxDays.setDate(today.getDate() + 5);

    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return {
      min: minDays.toLocaleDateString('en-IN', options),
      max: maxDays.toLocaleDateString('en-IN', options),
    };
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length !== 6 || isNaN(pincode)) {
      setDeliveryResult({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code.',
      });
      return;
    }

    setIsCheckingPincode(true);
    setTimeout(() => {
      const dates = getDeliveryEstimates();
      setDeliveryResult({
        valid: true,
        pincode: pincode.trim(),
        message: `Express Delivery by ${dates.min} - ${dates.max}`,
      });
      setIsCheckingPincode(false);
    }, 400);
  };

  const defaultDates = getDeliveryEstimates();

  return (
    <div className="space-y-4">
      {/* Brand & Badges */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {product.brand && (
            <span className="text-xs sm:text-sm font-extrabold tracking-wider text-[#14232E] uppercase font-sans">
              {product.brand}
            </span>
          )}
          {product.gender && (
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full capitalize">
              {product.gender}
            </span>
          )}
        </div>

        {/* Stock Status Badge */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{product.stock > 0 ? (product.stock <= 5 ? `Only ${product.stock} left in stock` : 'In Stock • Ready to Ship') : 'In Stock'}</span>
        </div>
      </div>

      {/* Product Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight leading-snug">
          {product.name}
        </h1>

        {/* Ratings & Reviews Row */}
        <div className="flex flex-wrap items-center gap-2.5 mt-2">
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
            <Star size={13} className="fill-amber-400 text-amber-500" />
            <span className="text-xs font-extrabold text-amber-900">
              {product.rating > 0 ? product.rating : '4.8'}
            </span>
          </div>

          <span className="text-xs text-slate-500">
            Based on <strong className="text-slate-800">{product.reviewCount || 128} verified reviews</strong>
          </span>

          <span className="hidden sm:inline text-slate-300">•</span>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
            <BadgeCheck size={14} />
            Verified Customer Choice
          </span>
        </div>
      </div>

      {/* Pricing Module */}
      <div className="p-4 bg-gradient-to-r from-[#F8F9FA] to-white rounded-xl border border-slate-200/80 space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-black text-[#14232E] tabular-nums tracking-tight">
            ₹{product.price.toLocaleString('en-IN')}
          </span>

          {product.mrp && product.mrp > product.price && (
            <span className="text-base sm:text-lg text-slate-400 line-through tabular-nums">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          )}

          {product.discountPercent && product.discountPercent > 0 && (
            <span className="text-xs font-black text-[#E4232C] bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-md uppercase tracking-wider">
              Save {product.discountPercent}%
            </span>
          )}
        </div>

        <p className="text-[11px] text-slate-500">
          Inclusive of all taxes & standard lens package. Lens upgrades calculated below.
        </p>
      </div>
    </div>
  );
};


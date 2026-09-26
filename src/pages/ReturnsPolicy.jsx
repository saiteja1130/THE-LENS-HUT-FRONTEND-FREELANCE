import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { RotateCcw, Truck, CheckCircle2 } from 'lucide-react';
export const ReturnsPolicy = () => {
  return <div className="bg-[#FFFFFF] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{
        label: 'Returns & Exchange Policy'
      }]} />

        <div className="mt-4 mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E4232C]">
            NO-HASSLE POLICY
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight">
            14-Day Free Doorstep Return & Exchange
          </h1>
          <p className="text-xs text-slate-500">We want every frame you wear to feel completely effortless.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-[#F5F6F7] rounded-lg border border-slate-200 text-center space-y-1.5">
            <RotateCcw size={22} className="mx-auto text-[#E4232C]" />
            <h3 className="font-bold text-xs text-[#14232E]">14 Days Window</h3>
            <p className="text-[11px] text-slate-500">From the day of delivery</p>
          </div>
          <div className="p-4 bg-[#F5F6F7] rounded-lg border border-slate-200 text-center space-y-1.5">
            <Truck size={22} className="mx-auto text-[#E4232C]" />
            <h3 className="font-bold text-xs text-[#14232E]">Free Doorstep Pickup</h3>
            <p className="text-[11px] text-slate-500">Zero reverse courier charges</p>
          </div>
          <div className="p-4 bg-[#F5F6F7] rounded-lg border border-slate-200 text-center space-y-1.5">
            <CheckCircle2 size={22} className="mx-auto text-[#E4232C]" />
            <h3 className="font-bold text-xs text-[#14232E]">Instant Refund</h3>
            <p className="text-[11px] text-slate-500">Credited directly to UPI/Source</p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#14232E]">How to Request a Return or Exchange</h2>
            <p>
              1. Log into your account and navigate to <strong>My Orders</strong>.<br />
              2. Click on the order containing the item you wish to exchange or return.<br />
              3. Select "Request Doorstep Pickup" and indicate whether you prefer a frame replacement in a different size/color or an immediate refund.<br />
              4. Our logistics partner will pick up the eyewear in its original casing from your doorstep.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#14232E]">Prescription Lens Guarantees</h2>
            <p>
              If your custom prescription lenses cause optical distortion or visual discomfort within 14 days, our clinical optometrists will re-evaluate your prescription and re-edge a fresh set of corrected lenses completely free of charge.
            </p>
          </section>
        </div>
      </div>
    </div>;
};
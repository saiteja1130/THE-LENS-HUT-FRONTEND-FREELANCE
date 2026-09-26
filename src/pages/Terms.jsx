import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
export const Terms = () => {
  return <div className="bg-[#FFFFFF] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{
        label: 'Terms of Service'
      }]} />

        <div className="mt-4 mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E4232C]">
            LEGAL AGREEMENT
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight">
            Terms & Conditions of Sale
          </h1>
          <p className="text-xs text-slate-500">Effective Date: March 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#14232E]">1. Overview & Acceptance</h2>
            <p>
              Welcome to The Lens Hut (operated by The Lens Hut Retail Pvt. Ltd.). By browsing, creating an account, or purchasing optical goods, sunglasses, contact lenses, or accessories on this website, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#14232E]">2. Optical Prescription Accuracy</h2>
            <p>
              When placing an order for corrective prescription lenses, the customer warrants that the optical powers (Sphere, Cylinder, Axis, and Pupillary Distance) entered or uploaded correspond to a valid spectacle prescription issued by a certified optometrist or ophthalmologist within the last 12 months. The Lens Hut offers complimentary telephone verification if power details require clarification.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#14232E]">3. Pricing & Currency</h2>
            <p>
              All prices displayed on this website are denominated in Indian Rupees (INR) and inclusive of all applicable Goods and Services Taxes (GST). We reserve the right to modify prices, discounts, or promotional coupon policies without prior notice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#14232E]">4. Warranty & Guarantees</h2>
            <p>
              Every frame carries an authentic 1-Year Manufacturer Warranty covering hinge defects, material soldering flaws, and anti-reflective lens coating delamination under ordinary usage conditions.
            </p>
          </section>
        </div>
      </div>
    </div>;
};
import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
export const Privacy = () => {
  return <div className="bg-[#FFFFFF] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{
        label: 'Privacy Policy'
      }]} />

        <div className="mt-4 mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E4232C]">
            DATA PROTECTION
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">Last updated: March 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#14232E]">1. Information We Collect</h2>
            <p>
              The Lens Hut respects your privacy and is committed to protecting your personal health and contact data. We collect names, shipping addresses, email addresses, mobile numbers, and optometrist optical prescription slips solely to manufacture and deliver your custom eyewear.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#14232E]">2. Optical Prescription Data Security</h2>
            <p>
              Your medical vision metrics and optometrist slips are stored with bank-grade encryption and accessed solely by our licensed clinical edging optometrists. We never sell, lease, or monetize customer optical records.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#14232E]">3. Payment & Transaction Safety</h2>
            <p>
              We process all digital payments through PCI-DSS Level 1 certified Indian payment gateways (supporting UPI, RuPay, Visa, and Mastercard). The Lens Hut never stores credit card CVVs or net banking credentials on our web servers.
            </p>
          </section>
        </div>
      </div>
    </div>;
};
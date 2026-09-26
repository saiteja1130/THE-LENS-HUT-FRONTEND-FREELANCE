import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

export const ValueProps = () => {
  const items = [
    {
      icon: <Truck size={24} strokeWidth={1.7} className="text-[#14232E] shrink-0" />,
      title: 'Free Shipping',
      desc: 'On orders above ₹999'
    },
    {
      icon: <ShieldCheck size={24} strokeWidth={1.7} className="text-[#14232E] shrink-0" />,
      title: 'Secure Payments',
      desc: '100% safe & reliable'
    },
    {
      icon: <RotateCcw size={24} strokeWidth={1.7} className="text-[#14232E] shrink-0" />,
      title: 'Easy Returns',
      desc: 'Hassle free policy'
    },
    {
      icon: <Headphones size={24} strokeWidth={1.7} className="text-[#14232E] shrink-0" />,
      title: 'Expert Support',
      desc: "We're here to help"
    }
  ];

  return (
    <section className="w-full bg-[#F8F9FA] py-7 border-y border-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center sm:justify-start lg:justify-center gap-4 px-3 ${
                idx !== items.length - 1 ? 'lg:border-r lg:border-slate-200/70' : ''
              }`}
            >
              {item.icon}
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#111827]">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
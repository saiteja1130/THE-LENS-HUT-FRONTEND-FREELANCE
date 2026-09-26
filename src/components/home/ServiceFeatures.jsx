import React from 'react';
import { Truck, RotateCcw, Tag, ShieldCheck } from 'lucide-react';
export const ServiceFeatures = () => {
  const features = [{
    icon: <Truck size={22} className="text-[#E4232C]" />,
    title: 'FREE DELIVERY',
    description: 'Fast delivery on orders above ₹999 across all Indian pin codes.'
  }, {
    icon: <RotateCcw size={22} className="text-[#E4232C]" />,
    title: 'EASY RETURNS',
    description: '14-day hassle-free doorstep return and exchange policy.'
  }, {
    icon: <Tag size={22} className="text-[#E4232C]" />,
    title: 'DAILY DEALS',
    description: 'Fresh seasonal offers on selected optical and sunglass styles.'
  }, {
    icon: <ShieldCheck size={22} className="text-[#E4232C]" />,
    title: 'QUALITY ASSURANCE',
    description: '100% genuine certified lenses and trusted designer brands.'
  }];
  return <section className="bg-white border-b border-slate-200/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feat, index) => <div key={index} className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#F5F6F7] transition-colors">
              <div className="p-2.5 bg-rose-50/60 rounded-md shrink-0">
                {feat.icon}
              </div>
              <div className="space-y-0.5 min-w-0">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#14232E] tracking-wider uppercase">
                  {feat.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
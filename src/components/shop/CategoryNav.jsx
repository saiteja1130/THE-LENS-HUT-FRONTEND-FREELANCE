import React from 'react';
import { Glasses, Sun, Eye, Package, Sparkles } from 'lucide-react';

export const CategoryNav = ({ activeCategory = 'all', onSelectCategory }) => {
  const categories = [
    {
      id: 'all',
      name: 'All Products',
      subtitle: 'Complete Optical Catalog',
      icon: Sparkles,
    },
    {
      id: 'eyeglasses',
      name: 'Eyeglasses',
      subtitle: 'Single Vision & Progressive',
      icon: Glasses,
    },
    {
      id: 'sunglasses',
      name: 'Sunglasses',
      subtitle: 'Polarized & UV400 Protection',
      icon: Sun,
    },
    {
      id: 'contact-lenses',
      name: 'Contact Lenses',
      subtitle: 'Daily & Monthly Disposables',
      icon: Eye,
    },
    {
      id: 'accessories',
      name: 'Accessories',
      subtitle: 'Optical Care Kits & Cases',
      icon: Package,
    },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive =
          activeCategory === cat.id ||
          (cat.id === 'contact-lenses' && activeCategory === 'contact-lens') ||
          (cat.id === 'all' && (!activeCategory || activeCategory === 'all' || activeCategory === 'All'));

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-2xs ${
              isActive
                ? 'bg-[#14232E] text-white border-[#14232E] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              <Icon size={14} />
            </div>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};


import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <span className="text-xs text-slate-500 font-medium select-none hidden sm:inline">
        Sort by:
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs font-bold text-[#14232E] bg-white border border-slate-200/90 rounded-xl px-3 py-2 pr-8 focus:outline-hidden focus:border-[#14232E] cursor-pointer shadow-2xs hover:border-slate-300 transition-colors"
        >
          <option value="popularity">Most Popular</option>
          <option value="newest">New Arrivals</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Highest Savings</option>
        </select>
        <ArrowUpDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
};

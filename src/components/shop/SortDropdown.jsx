import React from 'react';
import { ArrowUpDown } from 'lucide-react';
export const SortDropdown = ({
  value,
  onChange
}) => {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-slate-500 font-medium leading-tight text-right sm:text-left select-none">
        <span className="block sm:inline">Sort </span>
        <span className="block sm:inline">by:</span>
      </span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="text-xs font-semibold text-[#14232E] bg-white border border-slate-200 rounded-lg px-2 sm:px-2.5 py-1.5 focus:outline-none focus:border-[#14232E] cursor-pointer"
      >
        <option value="popularity">Popularity</option>
        <option value="featured">Featured</option>
        <option value="newest">New Arrivals</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="discount">Discount</option>
      </select>
    </div>
  );
};
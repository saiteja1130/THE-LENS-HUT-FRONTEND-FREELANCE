import React, { useEffect } from 'react';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';

export const MobileFilterDrawer = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalResultsCount = 0,
}) => {
  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#14232E]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-[#E4232C]" />
            <h3 className="text-sm font-extrabold text-[#14232E]">Filter Products</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Filters Body */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onReset}
            totalResultsCount={totalResultsCount}
          />
        </div>

        {/* Sticky Drawer Footer with Action CTAs */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-2.5">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
          >
            <Check size={15} strokeWidth={3} />
            <span>Show {totalResultsCount} {totalResultsCount === 1 ? 'Product' : 'Products'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};


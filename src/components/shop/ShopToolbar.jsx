import React from 'react';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { SortDropdown } from './SortDropdown';

export const ShopToolbar = ({
  totalCount = 0,
  sortBy,
  onSortChange,
  layout,
  onLayoutChange,
  onOpenMobileFilters,
  activeFilterCount = 0
}) => {
  return (
    <div className="flex items-center justify-between gap-3 mb-5 py-2">
      {/* Left: Mobile filter button & Total products count */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-1.5 py-2 px-3 bg-[#14232E] hover:bg-[#1E3445] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <SlidersHorizontal size={13} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#E4232C] text-white text-[10px] flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        <span className="text-xs sm:text-sm font-bold text-slate-700">
          <strong className="text-[#14232E]">{totalCount}</strong> {totalCount === 1 ? 'Product' : 'Products'} Found
        </span>
      </div>

      {/* Right: Sort Dropdown & Layout Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        <SortDropdown value={sortBy} onChange={onSortChange} />

        {/* Desktop Layout Buttons */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => onLayoutChange('grid')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              layout === 'grid'
                ? 'bg-white text-[#14232E] shadow-2xs'
                : 'text-slate-400 hover:text-slate-700'
            }`}
            title="Grid view"
            aria-label="Grid view"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            type="button"
            onClick={() => onLayoutChange('list')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              layout === 'list'
                ? 'bg-white text-[#14232E] shadow-2xs'
                : 'text-slate-400 hover:text-slate-700'
            }`}
            title="List view"
            aria-label="List view"
          >
            <List size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

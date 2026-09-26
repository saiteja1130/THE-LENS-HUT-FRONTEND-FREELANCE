import React from 'react';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { SortDropdown } from './SortDropdown';
export const ShopToolbar = ({
  totalCount,
  sortBy,
  onSortChange,
  layout,
  onLayoutChange,
  onOpenMobileFilters,
  activeFilterCount = 0
}) => {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4 mb-5">
      {/* Left: Mobile filter button & Total products text */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-1.5 py-1.5 px-3 bg-[#14232E] hover:bg-[#0b1622] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
        >
          <SlidersHorizontal size={13} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#E4232C] text-white text-[10px] flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
        <div className="leading-tight select-none">
          <span className="block sm:inline text-xs sm:text-sm font-bold text-[#14232E]">
            {totalCount}{' '}
          </span>
          <span className="block sm:inline text-[11px] sm:text-sm font-bold text-[#14232E]">
            Products
          </span>
        </div>
      </div>

      {/* Right: Sort and View mode switch */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* <SortDropdown value={sortBy} onChange={onSortChange} /> */}

        <div className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onLayoutChange('grid')}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              layout === 'grid'
                ? 'bg-[#E4232C] text-white'
                : 'text-slate-400 hover:text-slate-700 bg-white border border-slate-200'
            }`}
            title="Grid view"
            aria-label="Grid view"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            type="button"
            onClick={() => onLayoutChange('list')}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              layout === 'list'
                ? 'bg-[#E4232C] text-white'
                : 'text-slate-400 hover:text-slate-700 bg-white border border-slate-200'
            }`}
            title="List view"
            aria-label="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
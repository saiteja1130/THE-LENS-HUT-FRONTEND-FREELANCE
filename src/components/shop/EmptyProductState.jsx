import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export const EmptyProductState = ({ onReset, hasFilters = false }) => {
  return (
    <div className="py-16 sm:py-20 px-4 text-center bg-white rounded-2xl border border-slate-200/90 shadow-2xs max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-[#E4232C] flex items-center justify-center mx-auto mb-4 shadow-2xs">
        <SearchX size={32} />
      </div>

      <h3 className="text-lg font-extrabold text-[#14232E] mb-2">
        No Matching Eyewear Found
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
        We couldn't find any frames matching your active filter criteria. Try adjusting your parameters or resetting filters to explore the full collection.
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#14232E] hover:bg-[#1E3445] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <RotateCcw size={14} />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
};


import React from 'react';
import { X, RotateCcw } from 'lucide-react';

export const ActiveFilterChips = ({
  filters,
  searchFilter = '',
  onRemoveFilter,
  onResetAll,
  onClearSearch
}) => {
  const chips = [];

  // Search chip
  if (searchFilter) {
    chips.push({
      type: 'search',
      label: `Search: "${searchFilter}"`,
      onRemove: onClearSearch,
    });
  }

  // Category chip (only if not 'all')
  if (filters.category && filters.category !== 'all' && filters.category !== 'All') {
    chips.push({
      type: 'category',
      label: `Category: ${filters.category}`,
      onRemove: () => onRemoveFilter('category', 'all'),
    });
  }

  // Gender chip
  if (filters.gender && filters.gender !== 'All' && filters.gender !== 'all') {
    chips.push({
      type: 'gender',
      label: `Gender: ${filters.gender}`,
      onRemove: () => onRemoveFilter('gender', 'All'),
    });
  }

  // Shapes chips
  if (Array.isArray(filters.frameShape)) {
    filters.frameShape.forEach((shape) => {
      chips.push({
        type: 'frameShape',
        label: `Shape: ${shape}`,
        onRemove: () => onRemoveFilter('frameShape', shape),
      });
    });
  }

  // Brand / Material chips
  if (Array.isArray(filters.brand)) {
    filters.brand.forEach((b) => {
      chips.push({
        type: 'brand',
        label: `Material: ${b}`,
        onRemove: () => onRemoveFilter('brand', b),
      });
    });
  }

  // Frame Type chips
  if (Array.isArray(filters.frameType)) {
    filters.frameType.forEach((ft) => {
      chips.push({
        type: 'frameType',
        label: `Rim: ${ft}`,
        onRemove: () => onRemoveFilter('frameType', ft),
      });
    });
  }

  // Color chips
  if (Array.isArray(filters.color)) {
    filters.color.forEach((col) => {
      chips.push({
        type: 'color',
        label: `Color: ${col}`,
        onRemove: () => onRemoveFilter('color', col),
      });
    });
  }

  // Price range chip
  if (filters.maxPrice && filters.maxPrice < 15000) {
    chips.push({
      type: 'price',
      label: `Up to ₹${filters.maxPrice.toLocaleString('en-IN')}`,
      onRemove: () => onRemoveFilter('maxPrice', 15000),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 pb-4">
      <span className="text-xs font-bold text-slate-500 mr-1 select-none">
        Active Filters:
      </span>

      {chips.map((chip, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
          onClick={chip.onRemove}
        >
          <span>{chip.label}</span>
          <X size={12} className="text-slate-500 hover:text-[#E4232C]" />
        </span>
      ))}

      <button
        type="button"
        onClick={onResetAll}
        className="text-xs font-bold text-[#E4232C] hover:text-[#C81921] transition-colors ml-1 cursor-pointer flex items-center gap-1 underline underline-offset-2"
      >
        <RotateCcw size={12} />
        <span>Clear All</span>
      </button>
    </div>
  );
};


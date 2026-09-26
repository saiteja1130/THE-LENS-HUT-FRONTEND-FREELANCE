import React from 'react';
import { Minus, Plus } from 'lucide-react';
export const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 10,
  size = 'md'
}) => {
  const isSm = size === 'sm';
  return <div className={`inline-flex items-center border border-slate-200 rounded-md bg-white ${isSm ? 'h-7' : 'h-10'}`}>
      <button type="button" onClick={onDecrease} disabled={quantity <= min} className={`flex items-center justify-center text-slate-600 hover:text-[#14232E] hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${isSm ? 'w-7 h-7' : 'w-10 h-10'}`} aria-label="Decrease quantity">
        <Minus size={isSm ? 12 : 14} />
      </button>

      <span className={`font-semibold text-[#14232E] text-center tabular-nums select-none ${isSm ? 'w-8 text-xs' : 'w-12 text-sm'}`}>
        {quantity}
      </span>

      <button type="button" onClick={onIncrease} disabled={quantity >= max} className={`flex items-center justify-center text-slate-600 hover:text-[#14232E] hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${isSm ? 'w-7 h-7' : 'w-10 h-10'}`} aria-label="Increase quantity">
        <Plus size={isSm ? 12 : 14} />
      </button>
    </div>;
};
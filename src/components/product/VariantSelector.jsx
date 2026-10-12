import React from 'react';
import { Check } from 'lucide-react';

export const VariantSelector = ({
  variants = [],
  selectedVariantId,
  onSelectVariant
}) => {
  if (!variants || variants.length === 0) return null;

  const currentVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#14232E]">
        <span>
          Color: <span className="font-semibold text-slate-700">{currentVariant?.colorName}</span>
        </span>
        {currentVariant?.sku && (
          <span className="text-[11px] font-mono font-normal text-slate-400">
            SKU: {currentVariant.sku}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {variants.map((v) => {
          const isSelected = v.id === selectedVariantId;
          const isOutOfStock = v.stock <= 0;

          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelectVariant(v)}
              disabled={isOutOfStock}
              className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#14232E] bg-slate-50 ring-2 ring-[#14232E]/10 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              } ${isOutOfStock ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {v.image ? (
                <img
                  src={v.image}
                  alt={v.colorName}
                  className="w-5 h-4 object-contain rounded bg-slate-50 border border-slate-200 shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <span
                  className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs shrink-0"
                  style={{ backgroundColor: v.colorCode || '#14232E' }}
                />
              )}
              <span className="text-[#14232E]">{v.colorName}</span>
              {v.price && v.compareAtPrice && v.price < v.compareAtPrice && (
                <span className="text-[10px] font-bold text-[#E4232C]">
                  ₹{v.price.toLocaleString('en-IN')}
                </span>
              )}
              {isSelected && <Check size={12} className="text-[#14232E] shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

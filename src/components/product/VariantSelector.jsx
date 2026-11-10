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
      <div className="flex items-center justify-between text-xs">
        <div className="font-bold text-[#14232E] flex items-center gap-1.5">
          <span>Frame Color:</span>
          <span className="font-extrabold text-[#E4232C]">{currentVariant?.colorName}</span>
        </div>
        {currentVariant?.sku && (
          <span className="text-[11px] font-mono text-slate-400">
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
              className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#14232E] bg-slate-50 ring-2 ring-[#14232E]/10 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              } ${isOutOfStock ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
              title={v.colorName}
            >
              {/* Color Swatch Circle / Image preview */}
              <div className="relative flex items-center justify-center">
                {v.image ? (
                  <img
                    src={v.image}
                    alt={v.colorName}
                    className="w-5 h-4 object-contain rounded bg-slate-100 border border-slate-200 shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span
                    className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs shrink-0 block ring-1 ring-black/5"
                    style={{ backgroundColor: v.colorCode || '#14232E' }}
                  />
                )}
                {isSelected && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E4232C] rounded-full border border-white" />
                )}
              </div>

              <span className={`text-[#14232E] ${isSelected ? 'font-black' : 'font-semibold'}`}>
                {v.colorName}
              </span>

              {isSelected && <Check size={12} className="text-[#14232E] shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

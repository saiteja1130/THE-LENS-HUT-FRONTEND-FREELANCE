import React from 'react';
import { Check, ShieldCheck, Sparkles, Layers, Zap } from 'lucide-react';

export const LensOptionSelector = ({
  lenses = [],
  selectedLensId,
  onSelectLens
}) => {
  if (!lenses || lenses.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-extrabold text-[#14232E] uppercase tracking-wider flex items-center gap-1.5">
          <Layers size={14} className="text-[#E4232C]" />
          <span>Choose Lens Package & Coatings:</span>
        </label>
        <span className="text-[11px] text-slate-400 font-normal">All lenses 100% UV400 certified</span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {lenses.map((lens, index) => {
          const isSelected = lens.id === selectedLensId;
          const isBestSeller = index === 1; // Mark 1.60 BlueCut as popular choice

          return (
            <div
              key={lens.id}
              onClick={() => onSelectLens(lens)}
              className={`relative p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isSelected
                  ? 'border-[#E4232C] bg-rose-50/20 ring-1.5 ring-[#E4232C] shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              {isBestSeller && !isSelected && (
                <span className="absolute -top-2.5 right-4 bg-[#14232E] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-2xs">
                  Most Popular
                </span>
              )}

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Custom Radio Circle */}
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-[#E4232C] bg-[#E4232C] text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check size={11} strokeWidth={3} />}
                  </span>

                  <span className="text-xs sm:text-sm font-extrabold text-[#14232E]">
                    {lens.name}
                  </span>

                  {lens.index && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                      Index {lens.index}
                    </span>
                  )}

                  {lens.material && (
                    <span className="text-[10px] font-medium text-slate-500 hidden sm:inline">
                      ({lens.material})
                    </span>
                  )}
                </div>

                {lens.description && (
                  <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                    {lens.description}
                  </p>
                )}

                {lens.coating && (
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 pl-6">
                    <ShieldCheck size={13} className="shrink-0 text-emerald-600" />
                    <span>{lens.coating}</span>
                  </div>
                )}
              </div>

              {/* Price Tag */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between pl-6 sm:pl-0 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <span className={`text-xs sm:text-sm font-black tabular-nums ${
                  isSelected ? 'text-[#E4232C]' : 'text-[#14232E]'
                }`}>
                  {lens.price === 0 ? 'Included' : `+₹${lens.price.toLocaleString('en-IN')}`}
                </span>
                <span className="text-[10px] text-slate-400">per pair fitted</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

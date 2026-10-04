import React from 'react';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';

export const LensOptionSelector = ({
  lenses = [],
  selectedLensId,
  onSelectLens
}) => {
  if (!lenses || lenses.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="text-xs font-bold text-[#14232E]">
        Select Lens Package:
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {lenses.map((lens) => {
          const isSelected = lens.id === selectedLensId;

          return (
            <div
              key={lens.id}
              onClick={() => onSelectLens(lens)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isSelected
                  ? 'border-[#E4232C] bg-rose-50/20 ring-1 ring-[#E4232C] shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-[#E4232C] bg-[#E4232C] text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <Check size={10} />}
                  </span>
                  <span className="text-xs font-bold text-[#14232E]">{lens.name}</span>
                  {lens.index && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Index {lens.index}
                    </span>
                  )}
                </div>

                {lens.description && (
                  <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                    {lens.description}
                  </p>
                )}

                {lens.coating && (
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pl-6 pt-0.5">
                    <ShieldCheck size={12} className="text-emerald-600 shrink-0" />
                    <span>{lens.coating}</span>
                  </div>
                )}
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between pl-6 sm:pl-0 shrink-0">
                <span className="text-xs font-black text-[#14232E] tabular-nums">
                  {lens.price === 0 ? 'Included' : `+₹${lens.price.toLocaleString('en-IN')}`}
                </span>
                <span className="text-[10px] text-slate-400">per pair</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

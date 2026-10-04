import React from 'react';
import { VariantSelector } from './VariantSelector';
import { PrescriptionForm } from './PrescriptionForm';
import { PrescriptionUpload } from './PrescriptionUpload';
import { Sun, Shield, Sparkles, FileUp, Edit3 } from 'lucide-react';

export const SunglassesConfigurator = ({
  product,
  configuration,
  onChangeConfiguration
}) => {
  const sgConfig = product.sunglassesConfig || {};
  const variants = product.variants || [];
  const sunglassMode = configuration.sunglass?.mode || 'standard';
  const selectedLensTypeId = configuration.sunglass?.lensType || 'sg-only';
  const availableLensTypes = sgConfig.lensTypes || [
    {
      id: 'sg-only',
      name: 'Sunglass Only',
      description: 'Standard UV400 sun protection tint',
      price: 0,
      polarized: false
    }
  ];

  const handleVariantSelect = (variant) => {
    onChangeConfiguration({
      ...configuration,
      variantId: variant.id,
      variantName: variant.colorName
    });
  };

  const handleLensTypeSelect = (lens) => {
    onChangeConfiguration({
      ...configuration,
      sunglass: {
        ...configuration.sunglass,
        lensType: lens.id,
        lensName: lens.name,
        lensPrice: lens.price
      }
    });
  };

  const handleModeToggle = (mode) => {
    onChangeConfiguration({
      ...configuration,
      sunglass: {
        ...configuration.sunglass,
        mode
      },
      prescription: mode === 'standard' ? { method: 'none' } : (
        configuration.prescription?.method && configuration.prescription.method !== 'none'
          ? configuration.prescription
          : { method: 'manual', od: {}, os: {} }
      )
    });
  };

  return (
    <div className="space-y-6 pt-2">
      {/* 1. Color Variant Selection */}
      <VariantSelector
        variants={variants}
        selectedVariantId={configuration.variantId}
        onSelectVariant={handleVariantSelect}
      />

      {/* 2. Standard vs Power Sunglasses Mode (If product supports power/both) */}
      {(sgConfig.sunglassMode === 'both' || sgConfig.sunglassMode === 'power') && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-[#14232E]">
            Eyewear Vision Mode:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleModeToggle('standard')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                sunglassMode === 'standard'
                  ? 'border-[#E4232C] bg-rose-50/20 ring-1 ring-[#E4232C] shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Sun size={16} className={sunglassMode === 'standard' ? 'text-[#E4232C]' : 'text-slate-500'} />
                {sunglassMode === 'standard' && <span className="w-1.5 h-1.5 rounded-full bg-[#E4232C]" />}
              </div>
              <div className="text-xs font-bold text-[#14232E]">Standard Sunglasses</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Non-powered designer tint</div>
            </button>

            <button
              type="button"
              onClick={() => handleModeToggle('power')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                sunglassMode === 'power'
                  ? 'border-[#E4232C] bg-rose-50/20 ring-1 ring-[#E4232C] shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Sparkles size={16} className={sunglassMode === 'power' ? 'text-[#E4232C]' : 'text-slate-500'} />
                {sunglassMode === 'power' && <span className="w-1.5 h-1.5 rounded-full bg-[#E4232C]" />}
              </div>
              <div className="text-xs font-bold text-[#14232E]">Prescription Sunglasses</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Custom corrective sun lenses</div>
            </button>
          </div>
        </div>
      )}

      {/* 3. Sunglass Lens Type (e.g. Polarized, Photochromic) */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-[#14232E]">
          Select Sunglass Lens Package:
        </label>

        <div className="grid grid-cols-1 gap-2">
          {availableLensTypes.map((lens) => {
            const isSelected = selectedLensTypeId === lens.id;
            return (
              <div
                key={lens.id}
                onClick={() => handleLensTypeSelect(lens)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-[#E4232C] bg-rose-50/20 ring-1 ring-[#E4232C] shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-[#14232E]">{lens.name}</div>
                  {lens.description && (
                    <div className="text-[11px] text-slate-500 mt-0.5">{lens.description}</div>
                  )}
                  {lens.polarized && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                      <Shield size={10} />
                      Polarized Filter Certified
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-[#14232E] shrink-0 tabular-nums">
                  {lens.price === 0 ? 'Included' : `+₹${lens.price.toLocaleString('en-IN')}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. If Power Mode is Active, Reuse Prescription Engine */}
      {sunglassMode === 'power' && (
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#14232E]">
              Corrective Prescription:
            </span>

            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => onChangeConfiguration({
                  ...configuration,
                  prescription: { ...configuration.prescription, method: 'manual' }
                })}
                className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  configuration.prescription?.method === 'manual'
                    ? 'bg-white text-[#14232E] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Edit3 size={11} />
                <span>Enter Manually</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeConfiguration({
                  ...configuration,
                  prescription: { ...configuration.prescription, method: 'upload' }
                })}
                className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  configuration.prescription?.method === 'upload'
                    ? 'bg-white text-[#14232E] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileUp size={11} />
                <span>Upload Rx</span>
              </button>
            </div>
          </div>

          {configuration.prescription?.method === 'upload' ? (
            <PrescriptionUpload
              prescriptionFile={configuration.prescription}
              onUploadSuccess={(fileData) => {
                onChangeConfiguration({
                  ...configuration,
                  prescription: {
                    ...configuration.prescription,
                    ...fileData
                  }
                });
              }}
              onRemoveFile={() => {
                onChangeConfiguration({
                  ...configuration,
                  prescription: { method: 'upload', fileId: null, fileName: null, fileUrl: null }
                });
              }}
            />
          ) : (
            <PrescriptionForm
              prescription={configuration.prescription || {}}
              onChange={(rxData) => {
                onChangeConfiguration({
                  ...configuration,
                  prescription: {
                    ...rxData,
                    method: 'manual'
                  }
                });
              }}
              isProgressive={false}
            />
          )}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { VariantSelector } from './VariantSelector';
import { LensOptionSelector } from './LensOptionSelector';
import { PrescriptionForm } from './PrescriptionForm';
import { PrescriptionUpload } from './PrescriptionUpload';
import { Glasses, Sparkles, Layers, FileUp, Edit3, CheckCircle2, ShieldCheck } from 'lucide-react';

export const EyeglassesConfigurator = ({
  product,
  configuration,
  onChangeConfiguration
}) => {
  const eyeglassesConfig = product.eyeglassesConfig || {};
  const variants = product.variants || [];
  const selectedLensType = configuration.lensSelection?.lensType || 'single-vision';

  // Filter available lenses for selected lens type
  const availableLenses = (eyeglassesConfig.availableLenses || []).filter((l) =>
    l.applicableTypes?.includes(selectedLensType)
  );

  const handleVariantSelect = (variant) => {
    onChangeConfiguration({
      ...configuration,
      variantId: variant.id,
      variantName: variant.colorName
    });
  };

  const handleLensTypeSelect = (type) => {
    // When changing lens type, reset dependent lens and adjust prescription requirements
    let nextLens = null;
    if (type !== 'frame-only') {
      const matchingLenses = (eyeglassesConfig.availableLenses || []).filter((l) =>
        l.applicableTypes?.includes(type)
      );
      nextLens = matchingLenses[0] || null;
    }

    onChangeConfiguration({
      ...configuration,
      lensSelection: {
        lensType: type,
        lensId: nextLens ? nextLens.id : undefined,
        lensName: nextLens ? nextLens.name : (type === 'frame-only' ? 'Frame Only (Zero Power)' : undefined),
        lensPrice: nextLens ? nextLens.price : 0
      },
      // If switching to frame-only, clear prescription requirements
      prescription: type === 'frame-only' ? { method: 'none' } : (
        configuration.prescription?.method && configuration.prescription.method !== 'none'
          ? configuration.prescription
          : { method: 'manual', od: { sph: '-1.00', cyl: '0.00', axis: '' }, os: { sph: '-1.00', cyl: '0.00', axis: '' }, pd: '63' }
      )
    });
  };

  const handleLensSelect = (lens) => {
    onChangeConfiguration({
      ...configuration,
      lensSelection: {
        ...configuration.lensSelection,
        lensId: lens.id,
        lensName: lens.name,
        lensPrice: lens.price
      }
    });
  };

  const handlePrescriptionMethodChange = (method) => {
    onChangeConfiguration({
      ...configuration,
      prescription: {
        ...configuration.prescription,
        method
      }
    });
  };

  return (
    <div className="space-y-6 pt-1">
      {/* STEP 1: Frame Color Variant */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#14232E] text-white text-[11px] font-black flex items-center justify-center shrink-0">
            1
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#14232E]">
            Choose Frame Color
          </span>
        </div>
        <div className="pl-7">
          <VariantSelector
            variants={variants}
            selectedVariantId={configuration.variantId}
            onSelectVariant={handleVariantSelect}
          />
        </div>
      </div>

      {/* STEP 2: Lens Type Selection */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#14232E] text-white text-[11px] font-black flex items-center justify-center shrink-0">
              2
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#14232E]">
              Select Vision Type
            </span>
          </div>
          {selectedLensType === 'frame-only' && (
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Zero Power
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pl-0 sm:pl-7">
          {[
            {
              id: 'frame-only',
              label: 'Frame Only',
              sub: 'Zero power demo lenses / fashion wear',
              icon: Glasses
            },
            {
              id: 'single-vision',
              label: 'Single Vision',
              sub: 'Corrects distance OR reading vision',
              icon: Sparkles
            },
            {
              id: 'progressive',
              label: 'Progressive',
              sub: 'Distance + intermediate + near corridor',
              icon: Layers
            }
          ].map((lt) => {
            const isSelected = selectedLensType === lt.id;
            const Icon = lt.icon;

            return (
              <button
                key={lt.id}
                type="button"
                onClick={() => handleLensTypeSelect(lt.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#E4232C] bg-rose-50/20 ring-1.5 ring-[#E4232C] shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`p-1.5 rounded-lg ${
                    isSelected ? 'bg-[#E4232C] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon size={16} />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#E4232C]" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-black text-[#14232E]">{lt.label}</div>
                  <div className="text-[10px] text-slate-500 leading-tight mt-1">
                    {lt.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3: Lens Package & Technology (If not Frame Only) */}
      {selectedLensType !== 'frame-only' && (
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#14232E] text-white text-[11px] font-black flex items-center justify-center shrink-0">
              3
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#14232E]">
              Select Lens Coatings & Index
            </span>
          </div>
          <div className="pl-0 sm:pl-7">
            <LensOptionSelector
              lenses={availableLenses}
              selectedLensId={configuration.lensSelection?.lensId}
              onSelectLens={handleLensSelect}
            />
          </div>
        </div>
      )}

      {/* STEP 4: Prescription Entry or Upload (If Single Vision or Progressive) */}
      {selectedLensType !== 'frame-only' && (
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#14232E] text-white text-[11px] font-black flex items-center justify-center shrink-0">
                4
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#14232E]">
                Provide Prescription
              </span>
            </div>

            {/* Method Tabs */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200/80">
              <button
                type="button"
                onClick={() => handlePrescriptionMethodChange('manual')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  configuration.prescription?.method === 'manual'
                    ? 'bg-white text-[#14232E] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Edit3 size={13} />
                <span>Enter Manually</span>
              </button>
              <button
                type="button"
                onClick={() => handlePrescriptionMethodChange('upload')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  configuration.prescription?.method === 'upload'
                    ? 'bg-white text-[#14232E] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileUp size={13} />
                <span>Upload Doctor Rx</span>
              </button>
            </div>
          </div>

          <div className="pl-0 sm:pl-7">
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
                    prescription: {
                      method: 'upload',
                      fileId: null,
                      fileName: null,
                      fileUrl: null
                    }
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
                isProgressive={selectedLensType === 'progressive'}
                config={eyeglassesConfig.prescriptionConfig}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

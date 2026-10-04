import React from 'react';
import { VariantSelector } from './VariantSelector';
import { LensOptionSelector } from './LensOptionSelector';
import { PrescriptionForm } from './PrescriptionForm';
import { PrescriptionUpload } from './PrescriptionUpload';
import { Glasses, Sparkles, Layers, FileUp, Edit3 } from 'lucide-react';

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
        lensName: nextLens ? nextLens.name : (type === 'frame-only' ? 'Frame Only' : undefined),
        lensPrice: nextLens ? nextLens.price : 0
      },
      // If switching to frame-only, clear prescription requirements
      prescription: type === 'frame-only' ? { method: 'none' } : (
        configuration.prescription?.method && configuration.prescription.method !== 'none'
          ? configuration.prescription
          : { method: 'manual', od: {}, os: {} }
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
    <div className="space-y-6 pt-2">
      {/* 1. Frame Variant / Color */}
      <VariantSelector
        variants={variants}
        selectedVariantId={configuration.variantId}
        onSelectVariant={handleVariantSelect}
      />

      {/* 2. Lens Type Selection */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-[#14232E] flex items-center justify-between">
          <span>Choose Lens Type:</span>
          {selectedLensType === 'frame-only' && (
            <span className="text-[11px] font-semibold text-emerald-600">
              No Prescription Required
            </span>
          )}
        </label>

        <div className="grid grid-cols-3 gap-2">
          {[
            {
              id: 'frame-only',
              label: 'Frame Only',
              sub: 'Zero power or demo lenses',
              icon: Glasses
            },
            {
              id: 'single-vision',
              label: 'Single Vision',
              sub: 'Distance or Reading',
              icon: Sparkles
            },
            {
              id: 'progressive',
              label: 'Progressive',
              sub: 'Distance + Near Corridor',
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
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#E4232C] bg-rose-50/20 ring-1 ring-[#E4232C] shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Icon
                    size={16}
                    className={isSelected ? 'text-[#E4232C]' : 'text-slate-500'}
                  />
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E4232C]" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#14232E]">{lt.label}</div>
                  <div className="text-[10px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                    {lt.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Lens Package (If not Frame Only) */}
      {selectedLensType !== 'frame-only' && (
        <div className="pt-2 border-t border-slate-100">
          <LensOptionSelector
            lenses={availableLenses}
            selectedLensId={configuration.lensSelection?.lensId}
            onSelectLens={handleLensSelect}
          />
        </div>
      )}

      {/* 4. Prescription Selection (If Single Vision or Progressive) */}
      {selectedLensType !== 'frame-only' && (
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#14232E]">
              Provide Prescription:
            </span>

            {/* Method Tabs */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => handlePrescriptionMethodChange('manual')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  configuration.prescription?.method === 'manual'
                    ? 'bg-white text-[#14232E] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Edit3 size={12} />
                <span>Enter Manually</span>
              </button>
              <button
                type="button"
                onClick={() => handlePrescriptionMethodChange('upload')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  configuration.prescription?.method === 'upload'
                    ? 'bg-white text-[#14232E] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileUp size={12} />
                <span>Upload Doctor Rx</span>
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
      )}
    </div>
  );
};

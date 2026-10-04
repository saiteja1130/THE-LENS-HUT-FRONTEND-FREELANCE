import React from 'react';
import { CheckCircle2, Shield, Eye, Package, Glasses, Sun } from 'lucide-react';

export const ConfigurationSummary = ({
  product,
  configuration,
  pricingBreakdown,
  quantity = 1
}) => {
  const pType = product.productType || 'eyeglasses';
  const selectedVariant = product.variants?.find((v) => v.id === configuration.variantId);

  return (
    <div className="bg-[#F8F9FA] rounded-xl border border-slate-200/90 p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#14232E] flex items-center gap-1.5">
          {pType === 'eyeglasses' && <Glasses size={14} className="text-[#E4232C]" />}
          {pType === 'contact-lens' && <Package size={14} className="text-[#E4232C]" />}
          {pType === 'sunglasses' && <Sun size={14} className="text-[#E4232C]" />}
          <span>Configuration Summary</span>
        </span>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Verified Specs
        </span>
      </div>

      <div className="text-xs space-y-1.5 text-slate-600">
        {/* Color / Variant */}
        {selectedVariant && (
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Color Variant:</span>
            <span className="font-bold text-[#14232E] flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full border border-slate-300 inline-block"
                style={{ backgroundColor: selectedVariant.colorCode || '#14232E' }}
              />
              <span>{selectedVariant.colorName}</span>
            </span>
          </div>
        )}

        {/* Eyeglasses Details */}
        {pType === 'eyeglasses' && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Lens Type:</span>
              <span className="font-bold text-[#14232E] capitalize">
                {configuration.lensSelection?.lensType?.replace('-', ' ')}
              </span>
            </div>

            {configuration.lensSelection?.lensType !== 'frame-only' && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Lens Package:</span>
                  <span className="font-bold text-[#14232E]">
                    {configuration.lensSelection?.lensName || 'Selected Lens'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Prescription:</span>
                  <span className="font-semibold text-slate-800">
                    {configuration.prescription?.method === 'upload'
                      ? 'Doctor Rx Document Uploaded'
                      : configuration.prescription?.method === 'manual'
                      ? `Manual (OD: ${configuration.prescription.od?.sph || '0.00'} · OS: ${configuration.prescription.os?.sph || '0.00'}${configuration.prescription.pd ? ` · PD: ${configuration.prescription.pd}mm` : ''})`
                      : 'None'}
                  </span>
                </div>
              </>
            )}
          </>
        )}

        {/* Contact Lens Details */}
        {pType === 'contact-lens' && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Pack Size:</span>
              <span className="font-bold text-[#14232E]">
                {product.contactLensConfig?.packSize || '6 Pieces / Box'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Boxes Ordered:</span>
              <span className="font-bold text-[#14232E]">
                {configuration.contactLens?.boxes || 1} Box{(configuration.contactLens?.boxes || 1) > 1 ? 'es' : ''}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Power Type:</span>
              <span className="font-bold text-[#14232E] capitalize">
                {configuration.contactLens?.powerType || 'Spherical'}
              </span>
            </div>

            <div className="flex items-start justify-between pt-1 border-t border-slate-200">
              <span className="text-slate-500">Selected Powers:</span>
              <div className="text-right text-[11px] font-mono">
                <div>
                  OD: <strong>{configuration.contactLens?.od?.sph || 'Plano'}</strong>
                  {configuration.contactLens?.od?.cyl && ` / CYL ${configuration.contactLens?.od?.cyl} ${configuration.contactLens?.od?.axis}`}
                </div>
                <div>
                  OS: <strong>{configuration.contactLens?.os?.sph || 'Plano'}</strong>
                  {configuration.contactLens?.os?.cyl && ` / CYL ${configuration.contactLens?.os?.cyl} ${configuration.contactLens?.os?.axis}`}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Sunglasses Details */}
        {pType === 'sunglasses' && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Lens Option:</span>
              <span className="font-bold text-[#14232E]">
                {configuration.sunglass?.lensName || 'Standard Sunglass'}
              </span>
            </div>

            {configuration.sunglass?.mode === 'power' && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Vision Mode:</span>
                <span className="font-bold text-[#E4232C]">
                  Corrective Prescription Sunglass
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pricing Strip */}
      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">Total Price:</span>
        <div className="text-right">
          <span className="text-lg font-black text-[#14232E] tabular-nums">
            ₹{(pricingBreakdown?.totalPrice || product.price * quantity).toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-400 block">
            Inclusive of all taxes & optical lab certification
          </span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { CheckCircle2, Shield, Eye, Package, Glasses, Sun, Sparkles } from 'lucide-react';

export const ConfigurationSummary = ({
  product,
  configuration,
  pricingBreakdown,
  quantity = 1
}) => {
  const pType = product.productType || 'eyeglasses';
  const selectedVariant = product.variants?.find((v) => v.id === configuration.variantId);

  const unitBasePrice = pricingBreakdown?.basePrice || product.price;
  const lensPrice = pricingBreakdown?.lensPrice || 0;
  const optionPrice = pricingBreakdown?.optionPrice || 0;
  const unitPrice = pricingBreakdown?.unitPrice || (unitBasePrice + lensPrice + optionPrice);
  const totalPrice = pricingBreakdown?.totalPrice || unitPrice * quantity;

  return (
    <div className="bg-[#F8F9FA] rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3.5 shadow-2xs">
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <span className="text-xs font-black uppercase tracking-wider text-[#14232E] flex items-center gap-2">
          {pType === 'eyeglasses' && <Glasses size={16} className="text-[#E4232C]" />}
          {pType === 'contact-lens' && <Package size={16} className="text-[#E4232C]" />}
          {pType === 'sunglasses' && <Sun size={16} className="text-[#E4232C]" />}
          <span>Configuration & Pricing Summary</span>
        </span>
        <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
          <CheckCircle2 size={11} />
          Certified Specs
        </span>
      </div>

      <div className="text-xs space-y-2 text-slate-600">
        {/* Color / Variant */}
        {selectedVariant && (
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Selected Frame Color:</span>
            <span className="font-extrabold text-[#14232E] flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full border border-slate-300 inline-block shrink-0"
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
              <span className="text-slate-500 font-medium">Vision Type:</span>
              <span className="font-extrabold text-[#14232E] capitalize">
                {configuration.lensSelection?.lensType?.replace('-', ' ')}
              </span>
            </div>

            {configuration.lensSelection?.lensType !== 'frame-only' && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Lens Package:</span>
                  <span className="font-bold text-[#14232E]">
                    {configuration.lensSelection?.lensName || 'Standard Package'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Prescription Method:</span>
                  <span className="font-bold text-slate-800">
                    {configuration.prescription?.method === 'upload' || configuration.prescription?.fileUrl
                      ? `Doctor Rx Uploaded (${configuration.prescription.fileName || 'Document'})`
                      : configuration.prescription?.method === 'manual'
                      ? `Manual (OD: ${configuration.prescription.od?.sph || '0.00'} • OS: ${configuration.prescription.os?.sph || '0.00'}${configuration.prescription.pd ? ` • PD: ${configuration.prescription.pd}mm` : ''})`
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
              <span className="text-slate-500 font-medium">Pack Volume:</span>
              <span className="font-extrabold text-[#14232E]">
                {configuration.contactLens?.boxes || 1} Box{((configuration.contactLens?.boxes || 1) > 1) ? 'es' : ''} ({product.contactLensConfig?.packSize || 'Standard Pack'})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Corrective Power:</span>
              <span className="font-mono font-bold text-[#14232E]">
                OD: {configuration.contactLens?.od?.sph || 'Plano'} • OS: {configuration.contactLens?.os?.sph || 'Plano'}
              </span>
            </div>
          </>
        )}

        {/* Sunglasses Details */}
        {pType === 'sunglasses' && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Sun Lens Option:</span>
              <span className="font-extrabold text-[#14232E]">
                {configuration.sunglass?.lensName || 'Standard UV400 Tint'}
              </span>
            </div>

            {configuration.sunglass?.mode === 'power' && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Vision Mode:</span>
                <span className="font-extrabold text-[#E4232C]">
                  Prescription Corrective Sunglasses
                </span>
              </div>
            )}
          </>
        )}

        {/* Itemized Price Breakdown */}
        <div className="pt-2 border-t border-slate-200/80 space-y-1 text-[11px]">
          <div className="flex justify-between text-slate-500">
            <span>Base Frame ({quantity} {quantity === 1 ? 'unit' : 'units'}):</span>
            <span className="font-semibold text-slate-700">₹{(unitBasePrice * quantity).toLocaleString('en-IN')}</span>
          </div>

          {lensPrice > 0 && (
            <div className="flex justify-between text-slate-500">
              <span>Lens Upgrade:</span>
              <span className="font-semibold text-slate-700">+₹{(lensPrice * quantity).toLocaleString('en-IN')}</span>
            </div>
          )}

          {optionPrice > 0 && (
            <div className="flex justify-between text-slate-500">
              <span>Lens Treatment / Tint:</span>
              <span className="font-semibold text-slate-700">+₹{(optionPrice * quantity).toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Total Strip */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-500 block">Total Configured Amount:</span>
          <span className="text-[10px] text-slate-400">Includes all taxes & lab mounting</span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-[#14232E] tabular-nums">
            ₹{totalPrice.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { PrescriptionUpload } from './PrescriptionUpload';
import { AlertTriangle, Package, Check, Eye, Clock, Upload, Edit2 } from 'lucide-react';

export const ContactLensConfigurator = ({
  product,
  configuration,
  onChangeConfiguration
}) => {
  const clConfig = product.contactLensConfig || {};
  const cl = configuration.contactLens || {
    boxes: 1,
    piecesPerBox: clConfig.piecesPerBox || 6,
    powerType: clConfig.powerType || 'spherical',
    prescriptionMethod: 'manual',
    od: { sph: '-2.00', cyl: '', axis: '' },
    os: { sph: '-2.00', cyl: '', axis: '' },
    singleEye: 'BOTH'
  };

  const selectedBoxes = cl.boxes || 1;
  const powerType = cl.powerType || 'spherical';
  const rxMethod = cl.prescriptionMethod || 'manual';

  // Box options from boxPricing or 1, 2, 4
  const boxTiers = clConfig.boxPricing || [
    { boxes: 1, price: product.price, label: '1 Box' },
    { boxes: 2, price: Math.round(product.price * 1.95), label: '2 Boxes (5% Off)' },
    { boxes: 4, price: Math.round(product.price * 3.7), label: '4 Boxes (10% Off)' }
  ];

  const sphereOptions = clConfig.powerOptions?.sphere || [
    -0.5, -0.75, -1.0, -1.25, -1.5, -1.75, -2.0, -2.25, -2.5, -2.75,
    -3.0, -3.25, -3.5, -3.75, -4.0, -4.25, -4.5, -4.75, -5.0, -5.5,
    -6.0, -6.5, -7.0, -7.5, -8.0, -8.5, -9.0,
    +0.5, +1.0, +1.5, +2.0, +2.5, +3.0, +3.5, +4.0
  ];

  const cylinderOptions = clConfig.powerOptions?.cylinder || [-0.75, -1.25, -1.75, -2.25];
  const axisOptions = clConfig.powerOptions?.axis || [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];

  const updateClState = (updates) => {
    onChangeConfiguration({
      ...configuration,
      contactLens: {
        ...cl,
        ...updates
      }
    });
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Contact Lens Prescription Warning Banner */}
      <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
        <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Important Clinical Advisory:</strong> Please use your <strong>contact lens prescription</strong>, not your spectacle prescription. Contact lens parameters differ from eyeglass powers.
        </p>
      </div>

      {/* 1. Pack Size & Box Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-[#14232E] flex items-center gap-1.5">
            <Package size={14} className="text-slate-500" />
            <span>Select Box Quantity:</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            {clConfig.packSize || '6 Pieces / Box'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {boxTiers.map((tier) => {
            const isSelected = selectedBoxes === tier.boxes;
            return (
              <button
                key={tier.boxes}
                type="button"
                onClick={() => updateClState({ boxes: tier.boxes })}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#E4232C] bg-rose-50/20 ring-1 ring-[#E4232C] shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-[#14232E]">
                  {tier.boxes} {tier.boxes === 1 ? 'Box' : 'Boxes'}
                </div>
                <div className="text-[11px] font-extrabold text-[#E4232C] mt-1 tabular-nums">
                  ₹{tier.price.toLocaleString('en-IN')}
                </div>
                {tier.label?.includes('(') && (
                  <div className="text-[9px] text-emerald-700 font-semibold mt-0.5">
                    {tier.label.split('(')[1].replace(')', '')}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Prescription Method Tabs */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#14232E]">
            Prescription Method:
          </span>

          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => updateClState({ prescriptionMethod: 'manual' })}
              className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                rxMethod === 'manual'
                  ? 'bg-white text-[#14232E] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Edit2 size={11} />
              <span>Enter Power</span>
            </button>
            <button
              type="button"
              onClick={() => updateClState({ prescriptionMethod: 'upload' })}
              className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                rxMethod === 'upload'
                  ? 'bg-white text-[#14232E] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Upload size={11} />
              <span>Upload Rx</span>
            </button>
            <button
              type="button"
              onClick={() => updateClState({ prescriptionMethod: 'post-checkout' })}
              className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                rxMethod === 'post-checkout'
                  ? 'bg-white text-[#14232E] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Clock size={11} />
              <span>Provide Later</span>
            </button>
          </div>
        </div>

        {/* Post Checkout Notice */}
        {rxMethod === 'post-checkout' && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-xs space-y-1">
            <p className="font-bold text-[#14232E]">
              Provide Power Post-Checkout
            </p>
            <p className="text-[11px] text-slate-500">
              Our optical optometrist will WhatsApp or call you immediately after placing your order to confirm your exact contact lens powers.
            </p>
          </div>
        )}

        {/* Upload Prescription */}
        {rxMethod === 'upload' && (
          <PrescriptionUpload
            prescriptionFile={cl.prescriptionFile}
            onUploadSuccess={(fileData) => updateClState({ prescriptionFile: fileData })}
            onRemoveFile={() => updateClState({ prescriptionFile: null })}
          />
        )}

        {/* Manual Power Entry */}
        {rxMethod === 'manual' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3.5">
            {/* Eye configuration mode */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-[11px] font-bold text-slate-600">Prescription Eyes:</span>
              <div className="flex items-center gap-1 text-[10px]">
                {['BOTH', 'OD', 'OS'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => updateClState({ singleEye: m })}
                    className={`px-2 py-0.5 rounded-sm font-bold cursor-pointer transition-colors ${
                      cl.singleEye === m
                        ? 'bg-[#14232E] text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {m === 'BOTH' ? 'Both Eyes' : m === 'OD' ? 'Right Eye Only' : 'Left Eye Only'}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Eye (OD) */}
            {(cl.singleEye === 'BOTH' || cl.singleEye === 'OD') && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#14232E]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E4232C]" />
                    <span>Right Eye (OD) Power</span>
                  </span>
                </div>

                <div className={`grid gap-2 ${powerType === 'toric' ? 'grid-cols-3' : 'grid-cols-1'}`}>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      SPH / Power *
                    </label>
                    <select
                      value={cl.od?.sph || ''}
                      onChange={(e) => updateClState({ od: { ...cl.od, sph: e.target.value } })}
                      className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E]"
                    >
                      <option value="">Select SPH</option>
                      {sphereOptions.map((v) => {
                        const fmt = v > 0 ? `+${v.toFixed(2)}` : v.toFixed(2);
                        return <option key={v} value={fmt}>{fmt}</option>;
                      })}
                    </select>
                  </div>

                  {powerType === 'toric' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                          CYL *
                        </label>
                        <select
                          value={cl.od?.cyl || ''}
                          onChange={(e) => updateClState({ od: { ...cl.od, cyl: e.target.value } })}
                          className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E]"
                        >
                          <option value="">Select CYL</option>
                          {cylinderOptions.map((c) => (
                            <option key={c} value={c.toFixed(2)}>{c.toFixed(2)}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                          Axis *
                        </label>
                        <select
                          value={cl.od?.axis || ''}
                          onChange={(e) => updateClState({ od: { ...cl.od, axis: e.target.value } })}
                          className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E]"
                        >
                          <option value="">Select Axis</option>
                          {axisOptions.map((a) => (
                            <option key={a} value={`${a}°`}>{a}°</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Left Eye (OS) */}
            {(cl.singleEye === 'BOTH' || cl.singleEye === 'OS') && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-[#14232E]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                    <span>Left Eye (OS) Power</span>
                  </span>
                </div>

                <div className={`grid gap-2 ${powerType === 'toric' ? 'grid-cols-3' : 'grid-cols-1'}`}>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      SPH / Power *
                    </label>
                    <select
                      value={cl.os?.sph || ''}
                      onChange={(e) => updateClState({ os: { ...cl.os, sph: e.target.value } })}
                      className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E]"
                    >
                      <option value="">Select SPH</option>
                      {sphereOptions.map((v) => {
                        const fmt = v > 0 ? `+${v.toFixed(2)}` : v.toFixed(2);
                        return <option key={v} value={fmt}>{fmt}</option>;
                      })}
                    </select>
                  </div>

                  {powerType === 'toric' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                          CYL *
                        </label>
                        <select
                          value={cl.os?.cyl || ''}
                          onChange={(e) => updateClState({ os: { ...cl.os, cyl: e.target.value } })}
                          className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E]"
                        >
                          <option value="">Select CYL</option>
                          {cylinderOptions.map((c) => (
                            <option key={c} value={c.toFixed(2)}>{c.toFixed(2)}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                          Axis *
                        </label>
                        <select
                          value={cl.os?.axis || ''}
                          onChange={(e) => updateClState({ os: { ...cl.os, axis: e.target.value } })}
                          className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E]"
                        >
                          <option value="">Select Axis</option>
                          {axisOptions.map((a) => (
                            <option key={a} value={`${a}°`}>{a}°</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

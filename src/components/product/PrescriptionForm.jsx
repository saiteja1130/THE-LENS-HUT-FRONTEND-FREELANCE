import React from 'react';
import { HelpCircle } from 'lucide-react';

export const PrescriptionForm = ({
  prescription,
  onChange,
  isProgressive = false,
  config = {}
}) => {
  const od = prescription.od || {};
  const os = prescription.os || {};
  const pd = prescription.pd || '';
  const notes = prescription.notes || '';

  const handleOdChange = (field, value) => {
    onChange({
      ...prescription,
      od: {
        ...od,
        [field]: value
      }
    });
  };

  const handleOsChange = (field, value) => {
    onChange({
      ...prescription,
      os: {
        ...os,
        [field]: value
      }
    });
  };

  // Generate options based on ranges or sensible defaults
  const sphOptions = [];
  for (let s = 6.0; s >= -10.0; s -= 0.25) {
    const formatted = s > 0 ? `+${s.toFixed(2)}` : s === 0 ? '0.00' : s.toFixed(2);
    sphOptions.push(formatted);
  }

  const cylOptions = ['0.00'];
  for (let c = -0.25; c >= -4.0; c -= 0.25) {
    cylOptions.push(c.toFixed(2));
  }

  const addOptions = [];
  for (let a = 0.75; a <= 3.5; a += 0.25) {
    addOptions.push(`+${a.toFixed(2)}`);
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 space-y-4">
        {/* Right Eye (OD) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#14232E]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E4232C]" />
              <span>Right Eye (OD)</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">Oculus Dexter</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                SPH *
              </label>
              <select
                value={od.sph || ''}
                onChange={(e) => handleOdChange('sph', e.target.value)}
                className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E] focus:outline-hidden"
              >
                <option value="">Select</option>
                {sphOptions.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                CYL
              </label>
              <select
                value={od.cyl || '0.00'}
                onChange={(e) => handleOdChange('cyl', e.target.value)}
                className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E] focus:outline-hidden"
              >
                {cylOptions.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Axis (1-180°)
              </label>
              <input
                type="number"
                min="1"
                max="180"
                placeholder="180"
                value={od.axis || ''}
                disabled={!od.cyl || od.cyl === '0.00'}
                onChange={(e) => handleOdChange('axis', e.target.value)}
                className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E] focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>

            {isProgressive && (
              <div>
                <label className="block text-[10px] font-bold text-[#E4232C] uppercase mb-1">
                  ADD *
                </label>
                <select
                  value={od.add || ''}
                  onChange={(e) => handleOdChange('add', e.target.value)}
                  className="w-full text-xs font-bold py-1.5 px-2 bg-white border border-[#E4232C]/40 rounded-lg focus:ring-1 focus:ring-[#E4232C] focus:outline-hidden"
                >
                  <option value="">Select ADD</option>
                  {addOptions.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Left Eye (OS) */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between text-xs font-bold text-[#14232E]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-700" />
              <span>Left Eye (OS)</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">Oculus Sinister</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                SPH *
              </label>
              <select
                value={os.sph || ''}
                onChange={(e) => handleOsChange('sph', e.target.value)}
                className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E] focus:outline-hidden"
              >
                <option value="">Select</option>
                {sphOptions.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                CYL
              </label>
              <select
                value={os.cyl || '0.00'}
                onChange={(e) => handleOsChange('cyl', e.target.value)}
                className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E] focus:outline-hidden"
              >
                {cylOptions.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Axis (1-180°)
              </label>
              <input
                type="number"
                min="1"
                max="180"
                placeholder="180"
                value={os.axis || ''}
                disabled={!os.cyl || os.cyl === '0.00'}
                onChange={(e) => handleOsChange('axis', e.target.value)}
                className="w-full text-xs font-semibold py-1.5 px-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E] focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>

            {isProgressive && (
              <div>
                <label className="block text-[10px] font-bold text-[#E4232C] uppercase mb-1">
                  ADD *
                </label>
                <select
                  value={os.add || ''}
                  onChange={(e) => handleOsChange('add', e.target.value)}
                  className="w-full text-xs font-bold py-1.5 px-2 bg-white border border-[#E4232C]/40 rounded-lg focus:ring-1 focus:ring-[#E4232C] focus:outline-hidden"
                >
                  <option value="">Select ADD</option>
                  {addOptions.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Pupillary Distance (PD) & Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-bold text-slate-600 uppercase">
                Pupillary Distance (PD mm)
              </label>
              <span className="text-[9px] text-slate-400">Default: 63mm</span>
            </div>
            <input
              type="number"
              min="40"
              max="80"
              placeholder="e.g. 63"
              value={pd}
              onChange={(e) => onChange({ ...prescription, pd: e.target.value })}
              className="w-full text-xs font-semibold py-1.5 px-2.5 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
              Doctor / Optician Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Prism or special instructions"
              value={notes}
              onChange={(e) => onChange({ ...prescription, notes: e.target.value })}
              className="w-full text-xs font-normal py-1.5 px-2.5 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#14232E] focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

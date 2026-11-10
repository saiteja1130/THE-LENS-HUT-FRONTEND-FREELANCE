import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';

export const FilterSidebar = ({
  filters,
  onFilterChange,
  onReset,
  totalResultsCount = 0
}) => {
  // Accordion open/close states
  const [openSections, setOpenSections] = useState({
    gender: true,
    frameShape: true,
    frameType: true,
    frameMaterial: true,
    priceRange: true,
    color: true,
    features: true,
  });

  const toggleSection = (sec) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const genders = [
    { label: 'Men', value: 'Men' },
    { label: 'Women', value: 'Women' },
    { label: 'Unisex', value: 'Unisex' }
  ];

  const frameShapes = [
    { label: 'Rectangle', value: 'Rectangle' },
    { label: 'Round', value: 'Round' },
    { label: 'Square', value: 'Square' },
    { label: 'Cat-Eye', value: 'Cat-Eye' },
    { label: 'Aviator', value: 'Aviator' }
  ];

  const frameTypes = [
    { label: 'Full Rim', value: 'Full Rim' },
    { label: 'Half Rim', value: 'Half Rim' },
    { label: 'Rimless', value: 'Rimless' }
  ];

  const frameMaterials = [
    { label: 'Acetate', value: 'Acetate' },
    { label: 'Titanium', value: 'Titanium' },
    { label: 'Metal', value: 'Metal' },
    { label: 'Nylon / Shell', value: 'Nylon' }
  ];

  const colors = [
    { name: 'Black', hex: '#111827' },
    { name: 'Tortoiseshell', hex: '#78350F' },
    { name: 'Grey', hex: '#475569' },
    { name: 'Crystal Clear', hex: '#E2E8F0' },
    { name: 'Blue', hex: '#1E3A8A' },
    { name: 'Olive Green', hex: '#3F6212' },
    { name: 'Wine Red', hex: '#991B1B' }
  ];

  const toggleArrayFilter = (field, val) => {
    const arr = filters[field] || [];
    const next = arr.includes(val) ? arr.filter((item) => item !== val) : [...arr, val];
    onFilterChange({
      ...filters,
      [field]: next
    });
  };

  const maxPriceVal = filters.maxPrice || 15000;

  return (
    <div className="space-y-4 text-xs text-slate-600">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-1.5 font-bold text-sm text-[#14232E]">
          <SlidersHorizontal size={14} className="text-[#E4232C]" />
          <span>Filters</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-[#E4232C] transition-colors cursor-pointer font-bold flex items-center gap-1"
        >
          <RotateCcw size={11} />
          <span>Clear All</span>
        </button>
      </div>

      {/* 1. Price Range Slider */}
      <div className="border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('priceRange')}
          className="flex items-center justify-between w-full font-bold text-xs text-[#14232E] py-1 cursor-pointer"
        >
          <span>Price Range</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              openSections.priceRange ? 'rotate-180 text-slate-600' : 'text-slate-400'
            }`}
          />
        </button>

        {openSections.priceRange && (
          <div className="pt-3 space-y-2.5">
            <input
              type="range"
              min="499"
              max="15000"
              step="100"
              value={maxPriceVal}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxPrice: Number(e.target.value)
                })
              }
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#E4232C]"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold pt-0.5">
              <span>₹499</span>
              <span className="text-[#14232E]">Up to ₹{maxPriceVal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Gender */}
      <div className="border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('gender')}
          className="flex items-center justify-between w-full font-bold text-xs text-[#14232E] py-1 cursor-pointer"
        >
          <span>Gender</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              openSections.gender ? 'rotate-180 text-slate-600' : 'text-slate-400'
            }`}
          />
        </button>

        {openSections.gender && (
          <div className="space-y-2 pt-2.5">
            {genders.map((g) => {
              const isChecked = filters.gender?.toLowerCase() === g.value.toLowerCase();
              return (
                <label
                  key={g.value}
                  className="flex items-center justify-between text-xs cursor-pointer hover:text-[#14232E] group select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        onFilterChange({
                          ...filters,
                          gender: isChecked ? 'All' : g.value
                        })
                      }
                      className="w-3.5 h-3.5 rounded border-slate-300 accent-[#E4232C] cursor-pointer"
                    />
                    <span className={isChecked ? 'font-bold text-[#14232E]' : 'text-slate-600'}>
                      {g.label}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Frame Shape */}
      <div className="border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('frameShape')}
          className="flex items-center justify-between w-full font-bold text-xs text-[#14232E] py-1 cursor-pointer"
        >
          <span>Frame Shape</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              openSections.frameShape ? 'rotate-180 text-slate-600' : 'text-slate-400'
            }`}
          />
        </button>

        {openSections.frameShape && (
          <div className="space-y-2 pt-2.5">
            {frameShapes.map((shape) => {
              const isChecked = (filters.frameShape || []).includes(shape.value);
              return (
                <label
                  key={shape.value}
                  className="flex items-center justify-between text-xs cursor-pointer hover:text-[#14232E] group select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleArrayFilter('frameShape', shape.value)}
                      className="w-3.5 h-3.5 rounded border-slate-300 accent-[#E4232C] cursor-pointer"
                    />
                    <span className={isChecked ? 'font-bold text-[#14232E]' : 'text-slate-600'}>
                      {shape.label}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Frame Type / Rim */}
      <div className="border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('frameType')}
          className="flex items-center justify-between w-full font-bold text-xs text-[#14232E] py-1 cursor-pointer"
        >
          <span>Frame Type</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              openSections.frameType ? 'rotate-180 text-slate-600' : 'text-slate-400'
            }`}
          />
        </button>

        {openSections.frameType && (
          <div className="space-y-2 pt-2.5">
            {frameTypes.map((ft) => {
              const isChecked = (filters.frameType || []).includes(ft.value);
              return (
                <label
                  key={ft.value}
                  className="flex items-center justify-between text-xs cursor-pointer hover:text-[#14232E] group select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleArrayFilter('frameType', ft.value)}
                      className="w-3.5 h-3.5 rounded border-slate-300 accent-[#E4232C] cursor-pointer"
                    />
                    <span className={isChecked ? 'font-bold text-[#14232E]' : 'text-slate-600'}>
                      {ft.label}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Frame Material */}
      <div className="border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('frameMaterial')}
          className="flex items-center justify-between w-full font-bold text-xs text-[#14232E] py-1 cursor-pointer"
        >
          <span>Frame Material</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              openSections.frameMaterial ? 'rotate-180 text-slate-600' : 'text-slate-400'
            }`}
          />
        </button>

        {openSections.frameMaterial && (
          <div className="space-y-2 pt-2.5">
            {frameMaterials.map((mat) => {
              const isChecked = (filters.brand || []).includes(mat.value);
              return (
                <label
                  key={mat.value}
                  className="flex items-center justify-between text-xs cursor-pointer hover:text-[#14232E] group select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleArrayFilter('brand', mat.value)}
                      className="w-3.5 h-3.5 rounded border-slate-300 accent-[#E4232C] cursor-pointer"
                    />
                    <span className={isChecked ? 'font-bold text-[#14232E]' : 'text-slate-600'}>
                      {mat.label}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Color Palette */}
      <div className="border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full font-bold text-xs text-[#14232E] py-1 cursor-pointer"
        >
          <span>Color</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              openSections.color ? 'rotate-180 text-slate-600' : 'text-slate-400'
            }`}
          />
        </button>

        {openSections.color && (
          <div className="pt-3 flex flex-wrap gap-2.5">
            {colors.map((c) => {
              const isSelected = (filters.color || []).includes(c.name);
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => toggleArrayFilter('color', c.name)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full transition-all cursor-pointer border flex items-center justify-center ${
                    isSelected
                      ? 'ring-2 ring-[#E4232C] ring-offset-2 scale-110 border-transparent shadow-xs'
                      : 'border-slate-300 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {isSelected && <Check size={11} className={c.name === 'Crystal Clear' ? 'text-slate-900' : 'text-white'} />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 7. Special Optical Features */}
      <div className="pb-2">
        <button
          type="button"
          onClick={() => toggleSection('features')}
          className="flex items-center justify-between w-full font-bold text-xs text-[#14232E] py-1 cursor-pointer"
        >
          <span>Special Features</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              openSections.features ? 'rotate-180 text-slate-600' : 'text-slate-400'
            }`}
          />
        </button>

        {openSections.features && (
          <div className="space-y-2 pt-2.5">
            <label className="flex items-center justify-between text-xs cursor-pointer hover:text-[#14232E] group select-none">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={Boolean(filters.polarizedOnly)}
                  onChange={() =>
                    onFilterChange({
                      ...filters,
                      polarizedOnly: !filters.polarizedOnly
                    })
                  }
                  className="w-3.5 h-3.5 rounded border-slate-300 accent-[#E4232C] cursor-pointer"
                />
                <span className={filters.polarizedOnly ? 'font-bold text-[#14232E]' : 'text-slate-600'}>
                  Polarized Sun Filter
                </span>
              </div>
            </label>

            <label className="flex items-center justify-between text-xs cursor-pointer hover:text-[#14232E] group select-none">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={Boolean(filters.blueLightOnly)}
                  onChange={() =>
                    onFilterChange({
                      ...filters,
                      blueLightOnly: !filters.blueLightOnly
                    })
                  }
                  className="w-3.5 h-3.5 rounded border-slate-300 accent-[#E4232C] cursor-pointer"
                />
                <span className={filters.blueLightOnly ? 'font-bold text-[#14232E]' : 'text-slate-600'}>
                  Blue-Light Shield
                </span>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

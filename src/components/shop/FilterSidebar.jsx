import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

export const FilterSidebar = ({
  filters,
  onFilterChange,
  onReset,
  isMobileDrawer = false,
  onCloseMobile,
  totalResultsCount
}) => {
  // Accordion open/close states
  const [openSections, setOpenSections] = useState({
    category: true,
    gender: true,
    frameShape: true,
    frameMaterial: true,
    priceRange: true,
    color: true
  });

  const toggleSection = (sec) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const categories = [
    { label: 'Eyeglasses', value: 'eyeglasses', count: 120 },
    { label: 'Sunglasses', value: 'sunglasses', count: 85 },
    { label: 'Contact Lenses', value: 'contact-lenses', count: 60 },
    { label: 'Accessories', value: 'accessories', count: 40 }
  ];

  const genders = [
    { label: 'Men', value: 'Men', count: 82 },
    { label: 'Women', value: 'Women', count: 96 },
    { label: 'Unisex', value: 'Unisex', count: 27 }
  ];

  const frameShapes = [
    { label: 'Rectangle', value: 'Rectangle', count: 45 },
    { label: 'Round', value: 'Round', count: 38 },
    { label: 'Square', value: 'Square', count: 32 },
    { label: 'Cat Eye', value: 'Cat-Eye', count: 18 },
    { label: 'Aviator', value: 'Aviator', count: 16 }
  ];

  const frameMaterials = [
    { label: 'Acetate', value: 'Acetate', count: 54 },
    { label: 'Metal', value: 'Metal', count: 48 },
    { label: 'Bamboo', value: 'Bamboo', count: 12 },
    { label: 'TR90', value: 'TR90', count: 9 }
  ];

  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Brown', hex: '#593215' },
    { name: 'Grey', hex: '#94A3B8' },
    { name: 'Blue', hex: '#2563EB' },
    { name: 'Green', hex: '#15803D' },
    { name: 'Pink', hex: '#F472B6' },
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Red', hex: '#E4232C' },
    { name: 'Purple', hex: '#7E22CE' }
  ];

  const [priceVal, setPriceVal] = useState(7999);

  const toggleArrayFilter = (field, val) => {
    const arr = filters[field] || [];
    const next = arr.includes(val) ? arr.filter((item) => item !== val) : [...arr, val];
    onFilterChange({
      ...filters,
      [field]: next
    });
  };

  const handleApply = () => {
    if (isMobileDrawer && onCloseMobile) {
      onCloseMobile();
    }
  };

  const content = (
    <div className="space-y-5 text-xs text-slate-600">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-bold text-sm text-[#14232E]">
          Filter Products
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-[#E4232C] transition-colors cursor-pointer font-medium"
        >
          Clear All
        </button>
      </div>

      {/* 1. Category */}
      <div className="border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full font-bold text-xs text-[#14232E] py-1 cursor-pointer"
        >
          <span>Category</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              openSections.category ? 'rotate-180 text-slate-600' : 'text-slate-400'
            }`}
          />
        </button>

        {openSections.category && (
          <div className="space-y-2 pt-2.5">
            {categories.map((cat) => {
              const isChecked = filters.category === cat.value;
              return (
                <label
                  key={cat.value}
                  className="flex items-center justify-between text-xs cursor-pointer hover:text-[#14232E] group"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        onFilterChange({
                          ...filters,
                          category: isChecked ? 'all' : cat.value
                        })
                      }
                      className="w-3.5 h-3.5 rounded border-slate-300 accent-[#E4232C] cursor-pointer"
                    />
                    <span className={isChecked ? 'font-bold text-[#14232E]' : 'text-slate-600'}>
                      {cat.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-600">
                    {cat.count}
                  </span>
                </label>
              );
            })}
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
              const isChecked = filters.gender === g.value;
              return (
                <label
                  key={g.value}
                  className="flex items-center justify-between text-xs cursor-pointer hover:text-[#14232E] group"
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
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-600">
                    {g.count}
                  </span>
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
                  className="flex items-center justify-between text-xs cursor-pointer hover:text-[#14232E] group"
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
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-600">
                    {shape.count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Frame Material */}
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
                  className="flex items-center justify-between text-xs cursor-pointer hover:text-[#14232E] group"
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
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-600">
                    {mat.count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Price Range Slider */}
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
          <div className="pt-3 space-y-2">
            <input
              type="range"
              min="499"
              max="7999"
              value={priceVal}
              onChange={(e) => setPriceVal(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#E4232C]"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold pt-1">
              <span>₹499</span>
              <span>₹{priceVal.toLocaleString('en-IN')}</span>
            </div>
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
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer border ${
                    isSelected
                      ? 'ring-2 ring-[#E4232C] ring-offset-2 scale-110 border-transparent'
                      : 'border-slate-300 hover:scale-115'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Apply Filters Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleApply}
          className="w-full py-2.5 bg-[#14232E] hover:bg-[#0b1622] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
        >
          <SlidersHorizontal size={13} />
          <span>Apply Filters</span>
        </button>
      </div>
    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <h3 className="font-bold text-sm text-[#14232E]">Filters</h3>
          <button onClick={onCloseMobile} className="p-1 text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>
        {content}
      </div>
    );
  }

  return (
    <aside className="w-60 lg:w-64 shrink-0 hidden lg:block bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto">
      {content}
    </aside>
  );
};
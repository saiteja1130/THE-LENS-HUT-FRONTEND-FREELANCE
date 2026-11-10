import React, { useState } from 'react';
import {
  FileText,
  Ruler,
  Layers,
  Truck,
  ShieldCheck,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  Package,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

export const ProductTabsSection = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    specifications: false,
    lens_tech: false,
    shipping: false,
    warranty: false,
    reviews: false,
  });

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const tabs = [
    { id: 'description', label: 'Description & Features', icon: FileText },
    { id: 'specifications', label: 'Dimensions & Specs', icon: Ruler },
    { id: 'lens_tech', label: 'Lens & Technology', icon: Layers },
    { id: 'shipping', label: 'Shipping & Returns', icon: Truck },
    { id: 'warranty', label: 'Warranty & Guarantee', icon: ShieldCheck },
    { id: 'reviews', label: `Reviews (${product.reviewCount || 128})`, icon: Star },
  ];

  const specs = product.frameSpecifications || product.specifications || {};

  return (
    <div className="pt-8">
      {/* Desktop Tabs Header (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-6 border-b border-slate-200 overflow-x-auto text-xs sm:text-sm font-bold scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 pt-1 relative whitespace-nowrap cursor-pointer transition-colors flex items-center gap-2 ${
                isActive ? 'text-[#E4232C]' : 'text-slate-500 hover:text-[#14232E]'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-[#E4232C]' : 'text-slate-400'} />
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#E4232C] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Desktop Tab Contents (Hidden on Mobile) */}
      <div className="hidden md:block py-6 text-sm text-slate-600 leading-relaxed">
        {/* Tab 1: Description & Features */}
        {activeTab === 'description' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h3 className="text-base font-extrabold text-[#14232E] mb-2">Design & Craftsmanship</h3>
              <p className="text-slate-600 leading-relaxed">
                {product.description ||
                  'Engineered with premium optical materials, this frame seamlessly blends timeless aesthetic poise with everyday functional comfort. Designed for versatile all-day wear with lightweight endurance.'}
              </p>
            </div>

            {/* Key Feature Bullets */}
            <div>
              <h3 className="text-base font-extrabold text-[#14232E] mb-3">Product Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(product.features && product.features.length > 0
                  ? product.features
                  : [
                      'High-grade hypoallergenic frame materials for irritation-free prolonged wear',
                      'Integrated ergonomic nose bridge prevents slippage on all nose profiles',
                      'Reinforced barrel hinges engineered for 20,000+ opening and closing cycles',
                      '100% UV400 radiation protection certified on all fitted lenses',
                      'Precision optical laboratory centered and inspected before dispatch',
                      'Includes luxury hardshell case, microfiber cloth, and optical certificate'
                    ]
                ).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-[#F8F9FA] p-3 rounded-xl border border-slate-200/70">
                    <Check size={16} className="text-[#E4232C] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Dimensions & Specifications */}
        {activeTab === 'specifications' && (
          <div className="space-y-8 max-w-4xl">
            {/* Visual Eyewear Dimension Guide Card */}
            <div className="bg-[#F8F9FA] border border-slate-200 rounded-2xl p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#14232E]">Frame Measurements Guide</h3>
                  <p className="text-xs text-slate-500">Standard optical dimensions engraved inside the frame temples</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-700 shadow-2xs">
                  {specs.size || 'Medium (Standard Size)'}
                </span>
              </div>

              {/* 4 Dimension Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Lens Width</span>
                  <span className="text-base font-black text-[#14232E]">{specs.lensWidth || '52 mm'}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Bridge Width</span>
                  <span className="text-base font-black text-[#14232E]">{specs.bridgeWidth || '18 mm'}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Temple Length</span>
                  <span className="text-base font-black text-[#14232E]">{specs.templeLength || '142 mm'}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Frame Width</span>
                  <span className="text-base font-black text-[#14232E]">{specs.frameWidth || '138 mm'}</span>
                </div>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="overflow-hidden border border-slate-200 rounded-2xl max-w-2xl shadow-2xs">
              <table className="w-full text-xs sm:text-sm text-left">
                <tbody className="divide-y divide-slate-100">
                  <tr className="even:bg-slate-50/50">
                    <td className="px-5 py-3 font-bold text-slate-500 w-1/3">Frame Shape</td>
                    <td className="px-5 py-3 text-[#14232E] font-semibold">{specs.shape || product.frameShape || 'Rectangle / Classic'}</td>
                  </tr>
                  <tr className="even:bg-slate-50/50">
                    <td className="px-5 py-3 font-bold text-slate-500">Frame Type / Rim</td>
                    <td className="px-5 py-3 text-[#14232E] font-semibold">{specs.frameType || product.frameType || 'Full Rim'}</td>
                  </tr>
                  <tr className="even:bg-slate-50/50">
                    <td className="px-5 py-3 font-bold text-slate-500">Material</td>
                    <td className="px-5 py-3 text-[#14232E] font-semibold">{specs.material || product.material || 'Premium Handcrafted Acetate'}</td>
                  </tr>
                  <tr className="even:bg-slate-50/50">
                    <td className="px-5 py-3 font-bold text-slate-500">Weight</td>
                    <td className="px-5 py-3 text-[#14232E] font-semibold">{specs.weight || '18 grams (Featherweight)'}</td>
                  </tr>
                  <tr className="even:bg-slate-50/50">
                    <td className="px-5 py-3 font-bold text-slate-500">Ideal For Face Shape</td>
                    <td className="px-5 py-3 text-[#14232E] font-semibold">Oval, Round, Heart & Square</td>
                  </tr>
                  <tr className="even:bg-slate-50/50">
                    <td className="px-5 py-3 font-bold text-slate-500">Gender</td>
                    <td className="px-5 py-3 text-[#14232E] font-semibold">{product.gender || 'Unisex'}</td>
                  </tr>
                  <tr className="even:bg-slate-50/50">
                    <td className="px-5 py-3 font-bold text-slate-500">SKU / Model Code</td>
                    <td className="px-5 py-3 text-[#14232E] font-mono">{product.sku || product.id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Lens & Optical Technology */}
        {activeTab === 'lens_tech' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h3 className="text-base font-extrabold text-[#14232E] mb-2">High-Definition Optical Engineering</h3>
              <p className="text-slate-600">
                All lenses mounted at The Lens Hut are edged and fitted using precision robotic 3D edgers. Every lens package offers clear optical refraction, edge-to-edge clarity, and durable scratch resistance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-slate-200">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                  1
                </span>
                <h4 className="text-xs font-black text-[#14232E] mb-1">BlueCut™ Digital Shield</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Filters 99% harmful HEV blue light (380-450nm) emitted by laptops, smartphones, and LED screens to prevent digital eye strain.
                </p>
              </div>

              <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-slate-200">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                  2
                </span>
                <h4 className="text-xs font-black text-[#14232E] mb-1">Hydrophobic Multi-Coating</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Dual-sided oleophobic and anti-static layer repels water droplets, dust, and fingerprint smudges for effortless cleaning.
                </p>
              </div>

              <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-slate-200">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
                  3
                </span>
                <h4 className="text-xs font-black text-[#14232E] mb-1">UV400 Solar Armor</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Complete 100% protection against UVA and UVB solar radiation, keeping delicate corneal and retinal tissue safe.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Shipping & Returns */}
        {activeTab === 'shipping' && (
          <div className="space-y-6 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm">
                  <Truck size={18} className="text-[#E4232C]" />
                  <span>Free Express Shipping</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We offer free courier delivery on all orders above ₹999. Eyeglasses and customized prescription orders are lab-assembled and dispatched within 24 to 48 hours.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm">
                  <RotateCcw size={18} className="text-[#E4232C]" />
                  <span>7-Day Hassle-Free Returns</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If the size or fit isn't completely perfect, initiate a doorstep pickup return within 7 days of delivery. 100% money-back guarantee or free frame exchange.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Warranty & Guarantee */}
        {activeTab === 'warranty' && (
          <div className="space-y-4 max-w-3xl">
            <div className="p-5 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-[#14232E] font-extrabold text-base">
                <ShieldCheck size={20} className="text-emerald-600" />
                <span>1-Year Comprehensive Frame Warranty</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All frames sold on The Lens Hut come with our 12-month manufacturer defect warranty covering hinge breakage, plating degradation, and structural welds.
              </p>
              <ul className="list-disc list-inside text-xs text-slate-500 space-y-1">
                <li>100% Authentic designer optical guarantee</li>
                <li>Certified by licensed opticians before shipment</li>
                <li>Free lifetime ultrasonic cleaning & screw adjustments at our partner stores</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 6: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 max-w-4xl">
            {/* Reviews Summary Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-[#F8F9FA] rounded-2xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <span className="text-4xl font-black text-[#14232E]">
                    {product.rating > 0 ? product.rating : '4.8'}
                  </span>
                  <div className="flex text-amber-400 mt-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">out of 5 stars</span>
                </div>
                <div className="border-l border-slate-200 pl-4 space-y-1">
                  <p className="text-xs font-bold text-[#14232E]">98% of customers recommend this eyewear</p>
                  <p className="text-xs text-slate-500">Based on {product.reviewCount || 128} customer evaluations</p>
                </div>
              </div>
            </div>

            {/* Customer Review Snippets */}
            <div className="space-y-3 pt-2">
              {[
                {
                  author: 'Rahul Sharma',
                  verified: true,
                  rating: 5,
                  date: '2 weeks ago',
                  title: 'Exceptional build quality & crystal clear lenses',
                  comment:
                    'The frame fits snugly without pinching the temples. The blue-cut lenses are noticeably clearer than my previous pair from another brand. Highly recommended!'
                },
                {
                  author: 'Priya Venkat',
                  verified: true,
                  rating: 5,
                  date: '1 month ago',
                  title: 'Perfect prescription accuracy and fast delivery',
                  comment:
                    'I uploaded my doctor prescription and received the glasses in 3 days. The alignment and pupillary distance are spot-on. Lightweight and beautiful finish.'
                }
              ].map((rev, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-[#14232E]">{rev.author}</span>
                      {rev.verified && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-amber-400" />
                    ))}
                  </div>

                  <h5 className="text-xs font-bold text-[#14232E]">{rev.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Expandable Accordions (Hidden on Desktop) */}
      <div className="md:hidden divide-y divide-slate-200 border-y border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isOpen = openAccordions[tab.id];

          return (
            <div key={tab.id} className="py-1">
              <button
                type="button"
                onClick={() => toggleAccordion(tab.id)}
                className="w-full py-3.5 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} className="text-[#E4232C]" />
                  <span className="text-xs font-bold text-[#14232E]">{tab.label}</span>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </button>

              {isOpen && (
                <div className="pb-4 pt-1 text-xs text-slate-600 leading-relaxed animate-in fade-in duration-150">
                  {tab.id === 'description' && (
                    <div className="space-y-3">
                      <p>{product.description}</p>
                      {product.features && (
                        <ul className="space-y-1.5 pl-1">
                          {product.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-700">
                              <Check size={14} className="text-[#E4232C] shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {tab.id === 'specifications' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-center pb-2">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 block font-bold">Lens</span>
                          <span className="text-xs font-bold text-[#14232E]">{specs.lensWidth || '52 mm'}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 block font-bold">Bridge</span>
                          <span className="text-xs font-bold text-[#14232E]">{specs.bridgeWidth || '18 mm'}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 block font-bold">Temple</span>
                          <span className="text-xs font-bold text-[#14232E]">{specs.templeLength || '142 mm'}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 block font-bold">Weight</span>
                          <span className="text-xs font-bold text-[#14232E]">{specs.weight || '18g'}</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex justify-between border-b border-slate-100 py-1">
                          <span className="text-slate-400">Shape</span>
                          <span className="font-semibold text-slate-800">{specs.shape || 'Rectangle'}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 py-1">
                          <span className="text-slate-400">Material</span>
                          <span className="font-semibold text-slate-800">{specs.material || 'Acetate'}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-400">Gender</span>
                          <span className="font-semibold text-slate-800">{product.gender || 'Unisex'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {tab.id === 'lens_tech' && (
                    <div className="space-y-2">
                      <p>
                        All lenses come with Anti-Reflective Hydrophobic coating, Scratch Resistance, and complete 100% UV400 radiation protection.
                      </p>
                    </div>
                  )}

                  {tab.id === 'shipping' && (
                    <div className="space-y-2">
                      <p><strong>Free Express Delivery:</strong> 2 to 4 business days on all orders.</p>
                      <p><strong>7-Day Returns:</strong> Easy doorstep returns if the frame fit isn't right.</p>
                    </div>
                  )}

                  {tab.id === 'warranty' && (
                    <div className="space-y-1.5">
                      <p><strong>1-Year Frame Warranty:</strong> Covers manufacturing defects, flex hinges, and welds.</p>
                      <p><strong>100% Genuine Guarantee:</strong> Sourced directly from certified brand labs.</p>
                    </div>
                  )}

                  {tab.id === 'reviews' && (
                    <div className="space-y-2">
                      <p className="font-bold text-[#14232E]">{product.rating || '4.8'} out of 5 stars ({product.reviewCount || 128} verified reviews)</p>
                      <p className="text-slate-500">98% of customers would recommend this product to a friend.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};


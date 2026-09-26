import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Eye, Sparkles, HeartHandshake } from 'lucide-react';
export const AboutUs = () => {
  return <div className="bg-[#FFFFFF] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{
        label: 'About Us'
      }]} />

        {/* Hero Banner */}
        <div className="mt-4 mb-16 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E4232C]">
            OUR HERITAGE & VISION
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14232E] tracking-tight">
            Better Vision, Brighter Tomorrow.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The Lens Hut was founded to bridge the divide between world-class optical precision and accessible luxury eyewear. We believe every pair of spectacles should elevate how you see and how the world sees you.
          </p>
        </div>

        {/* Editorial Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 relative aspect-16/11 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img src="https://images.unsplash.com/photo-1591076482161-42ce6da69f68?q=80&w=1000&auto=format&fit=crop" alt="The Lens Hut Optical Craftsmanship" className="w-full h-full object-cover" />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E4232C]">
              THE LENS HUT STORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight">
              Optical Integrity Without the Traditional Markup
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Traditional optical retail involves layers of middlemen, exorbitant licensing royalties, and opaque lens coatings. At The Lens Hut, we cut through the noise.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We source raw cellulose acetate from Mazzucchelli Italy, aerospace-grade beta-titanium from Sabae Japan, and calibrate digital high-index lenses in our cleanroom laboratories. The result: designer-grade frames delivered directly to your doorstep at fair, transparent Indian prices.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <div className="text-2xl font-black text-[#14232E] tabular-nums">50,000+</div>
                <div className="text-xs text-slate-500">Satisfied Wearers Pan-India</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <div className="text-2xl font-black text-[#14232E] tabular-nums">99.8%</div>
                <div className="text-xs text-slate-500">Optical Prescription Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="py-16 border-t border-slate-100">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E4232C]">
              OUR COMMITMENT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] mt-1">
              Why Choose The Lens Hut?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[{
            icon: <ShieldCheck size={24} className="text-[#E4232C]" />,
            title: 'Japanese Beta-Titanium',
            desc: 'Featherweight 10g frames offering extreme flexibility and corrosion immunity.'
          }, {
            icon: <Eye size={24} className="text-[#E4232C]" />,
            title: 'Cleanroom Optical Edging',
            desc: '12-point computer-guided lens calibration ensuring zero aberration.'
          }, {
            icon: <Sparkles size={24} className="text-[#E4232C]" />,
            title: 'Anti-Glare Hydrophobic',
            desc: 'Premium oleophobic barrier repels fingerprints, rain droplets, and mask fog.'
          }, {
            icon: <HeartHandshake size={24} className="text-[#E4232C]" />,
            title: '14-Day Free Returns',
            desc: 'Unconditional doorstep exchange if your frame fit isn’t absolutely perfect.'
          }].map((pillar, i) => <div key={i} className="p-6 bg-[#F5F6F7] rounded-xl border border-slate-200/80 space-y-3">
                <div className="p-2.5 bg-white w-fit rounded-lg shadow-2xs">
                  {pillar.icon}
                </div>
                <h3 className="font-bold text-sm text-[#14232E]">{pillar.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
              </div>)}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="bg-[#14232E] text-white rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4 my-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Experience Better Vision?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Explore our curated collections or visit our flagship Bandra optical clinic for a complimentary vision check.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link to="/shop" className="px-6 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-bold rounded-md transition-colors">
              SHOP EYEWEAR NOW
            </Link>
            <Link to="/book-appointment" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-md transition-colors">
              BOOK FREE EYE CHECKUP
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
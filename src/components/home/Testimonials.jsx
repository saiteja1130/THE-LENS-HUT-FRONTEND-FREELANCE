import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
export const Testimonials = () => {
  const reviews = [{
    name: 'Rohan Mehra',
    location: 'Mumbai, Maharashtra',
    role: 'Creative Director',
    rating: 5,
    comment: 'The Lumina Round Titanium frames are genuinely weightless. I work 10-hour days in front of studio monitors and haven’t felt any nose-bridge fatigue. The anti-reflective blue coating is remarkable.',
    purchased: 'Lumina Round Titanium'
  }, {
    name: 'Dr. Ananya Roy',
    location: 'Bengaluru, Karnataka',
    role: 'Consultant Dermatologist',
    rating: 5,
    comment: 'Ordering prescription lenses online used to make me nervous, but The Lens Hut optometrist verified my pupillary distance over a quick call. The progressive focus is calibrated flawlessly.',
    purchased: 'Verona Sculpted Cat-Eye'
  }, {
    name: 'Aditya Singhania',
    location: 'New Delhi',
    role: 'Automotive Journalist',
    rating: 5,
    comment: 'The polarized Aviators cut through blinding highway tarmac glare during my road tests. Build quality rivals European luxury brands at less than half the price tag.',
    purchased: 'Aviator Reserve Polarized'
  }];
  return <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E4232C] block mb-1">
            VERIFIED EXPERIENCES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Over 50,000+ happy customers seeing the world clearer every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => <div key={idx} className="bg-[#F5F6F7] p-6 sm:p-7 rounded-xl border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={15} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <Quote size={20} className="text-slate-300" />
                </div>

                <p className="text-xs sm:text-sm text-[#2B2F33] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#14232E] flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <span title="Verified Customer">
                      <CheckCircle2 size={13} className="text-emerald-500" />
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {rev.role} · {rev.location}
                  </div>
                </div>

                <div className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded text-slate-600 font-medium">
                  {rev.purchased}
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CategoryStrip = () => {
  const categories = [
    {
      title: 'Eyeglasses',
      subtitle: 'Classic / Modern / Everyday',
      link: '/eyeglasses',
      image: '/images/home/cat-eyeglasses.png'
    },
    {
      title: 'Sunglasses',
      subtitle: 'Style / UV Protection / Premium',
      link: '/sunglasses',
      image: '/images/home/cat-sunglasses.png'
    },
    {
      title: 'Contact Lenses',
      subtitle: 'Clear Vision / Comfort / Daily',
      link: '/contact-lenses',
      image: '/images/home/cat-sunglasses.png'
    },
    {
      title: 'Accessories',
      subtitle: 'Cases / Cleaners / More',
      link: '/accessories',
      image: '/images/home/cat-sunglasses.png'
    }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group bg-[#F4F6F8] hover:bg-[#EBF0F5] transition-all duration-300 rounded-2xl p-3 flex flex-col justify-between border border-slate-200/50 hover:border-slate-300 hover:shadow-md min-h-[200px]"
            >
              {/* Product Visual Centered with Clean Aspect */}
              <div className="w-full h-32 flex items-center justify-center p-2">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="max-h-full max-w-[200px] object-contain mix-blend-multiply group-hover:scale-106 transition-transform duration-300 drop-shadow-xs"
                />
              </div>

              {/* Card Meta & Navigation Arrow */}
              <div className="flex items-end justify-between pt-3">
                <div>
                  <h3 className="font-extrabold text-[#111827] text-base group-hover:text-[#E4232C] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="text-slate-700 group-hover:text-[#E4232C] group-hover:translate-x-1 transition-all shrink-0 pb-0.5">
                  <ArrowRight size={17} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
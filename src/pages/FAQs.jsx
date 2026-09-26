import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQS } from '../data/faqs';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
export const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState('faq-1');
  const categories = ['All', 'Orders', 'Delivery', 'Returns', 'Eyeglasses', 'Sunglasses', 'Contact Lenses'];
  const filteredFaqs = FAQS.filter(faq => {
    if (activeCategory === 'All') return true;
    return faq.category === activeCategory;
  });
  return <div className="bg-[#FFFFFF] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{
        label: 'FAQs'
      }]} />

        <div className="mt-4 mb-10 text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E4232C]">
            HELP & KNOWLEDGE BASE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14232E] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Everything you need to know about lens prescription submission, anti-reflective coatings, doorstep returns, and frame fit dimensions.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 justify-start sm:justify-center">
          {categories.map(cat => <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${activeCategory === cat ? 'bg-[#14232E] text-white shadow-xs' : 'bg-[#F5F6F7] text-slate-600 hover:text-[#14232E]'}`}>
              {cat}
            </button>)}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map(faq => {
          const isOpen = openFaq === faq.id;
          return <div key={faq.id} className="border border-slate-200 rounded-lg overflow-hidden transition-colors">
                <button type="button" onClick={() => setOpenFaq(isOpen ? null : faq.id)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white hover:bg-slate-50 cursor-pointer">
                  <span className="text-xs sm:text-sm font-bold text-[#14232E]">
                    {faq.question}
                  </span>
                  <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#E4232C]' : ''}`} />
                </button>

                {isOpen && <div className="p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-[#F5F6F7]">
                    {faq.answer}
                  </div>}
              </div>;
        })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 bg-[#F5F6F7] border border-slate-200 rounded-xl text-center space-y-3">
          <HelpCircle size={28} className="mx-auto text-[#E4232C]" />
          <h3 className="text-sm font-bold text-[#14232E]">Still have optical or prescription questions?</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Our certified opticians are on standby to evaluate your prescription slip and recommend ideal lens refractive indexes.
          </p>
          <div className="pt-2">
            <a href="/contact-us" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#14232E] hover:bg-[#E4232C] text-white text-xs font-bold rounded-md transition-colors">
              <MessageSquare size={13} />
              <span>Contact Optometrist Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>;
};
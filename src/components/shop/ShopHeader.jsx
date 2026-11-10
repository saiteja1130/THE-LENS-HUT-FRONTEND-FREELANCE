import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

export const ShopHeader = ({
  categorySlug = 'all',
  pageTitle = 'Our Eyewear Collection',
  pageDescription = 'Discover designer eyeglasses, polarized sunglasses, and precision contact lenses handcrafted for optimal vision and effortless everyday elegance.',
  totalCount = 0
}) => {
  const getCategoryBreadcrumb = () => {
    switch (categorySlug?.toLowerCase()) {
      case 'eyeglasses':
        return 'Eyeglasses';
      case 'sunglasses':
        return 'Sunglasses';
      case 'contact-lenses':
      case 'contact-lens':
        return 'Contact Lenses';
      case 'accessories':
        return 'Accessories';
      default:
        return null;
    }
  };

  const catBreadcrumb = getCategoryBreadcrumb();

  return (
    <div className="bg-[#FAF8F5] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 font-medium">
          <Link to="/" className="hover:text-[#E4232C] transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-400 shrink-0" />
          <Link
            to="/shop"
            className={catBreadcrumb ? 'hover:text-[#E4232C] transition-colors' : 'text-[#E4232C] font-semibold'}
          >
            Shop
          </Link>
          {catBreadcrumb && (
            <>
              <ChevronRight size={13} className="text-slate-400 shrink-0" />
              <span className="text-[#E4232C] font-semibold">{catBreadcrumb}</span>
            </>
          )}
        </nav>

        {/* Title, Description & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-1.5">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#14232E] tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {pageDescription}
            </p>
          </div>

          {/* Product Count Pill */}
          <div className="self-start md:self-auto shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200/90 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#E4232C]" />
              <span>{totalCount} {totalCount === 1 ? 'Design' : 'Designs'} Available</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


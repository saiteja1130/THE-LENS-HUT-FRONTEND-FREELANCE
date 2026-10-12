import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productApi } from '../services/productApi';
import { categoryApi } from '../services/categoryApi';
import { FilterSidebar } from '../components/shop/FilterSidebar';
import { ShopToolbar } from '../components/shop/ShopToolbar';
import { ProductGrid } from '../components/common/ProductGrid';
import { Modal } from '../components/common/Modal';
import { Newsletter } from '../components/home/Newsletter';
import { ArrowRight, ChevronRight, Loader2 } from 'lucide-react';

export const Shop = ({
  initialCategory,
  pageTitle = 'Our Collection',
  pageDescription = 'Discover the perfect eyewear for your style, comfort and vision.'
}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || initialCategory || 'all';
  const urlGender = searchParams.get('gender') || 'All';
  const urlShape = searchParams.get('shape');

  const [filters, setFilters] = useState({
    category: urlCategory,
    gender: urlGender,
    brand: [],
    frameShape: urlShape ? [urlShape] : [],
    frameType: [],
    color: [],
    priceRange: 'all',
    polarizedOnly: false
  });

  const [sortBy, setSortBy] = useState('popularity');
  const [layout, setLayout] = useState('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    let isMounted = true;
    const fetchCatalog = async () => {
      setLoading(true);
      const res = await productApi.getProducts();
      if (isMounted && res.success && Array.isArray(res.data)) {
        setProducts(res.data);
      }
      if (isMounted) setLoading(false);
    };
    fetchCatalog();

    categoryApi.getActiveCategories().then((res) => {
      if (isMounted && res.success && Array.isArray(res.data)) {
        setCategories(res.data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: initialCategory || searchParams.get('category') || prev.category,
      gender: searchParams.get('gender') || prev.gender,
      frameShape: searchParams.get('shape') ? [searchParams.get('shape')] : prev.frameShape
    }));
  }, [initialCategory, searchParams]);

  const handleResetFilters = () => {
    setFilters({
      category: initialCategory || 'all',
      gender: 'All',
      brand: [],
      frameShape: [],
      frameType: [],
      color: [],
      priceRange: 'all',
      polarizedOnly: false
    });
  };

  const handleCategoryShortcut = (catValue) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === catValue ? 'all' : catValue
    }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        const matchesSearch =
          p.name.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.frameShape?.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Category
      if (filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }

      // Gender
      if (filters.gender !== 'All' && p.gender !== filters.gender && p.gender !== 'Unisex') {
        return false;
      }

      // Brand
      if (filters.brand?.length > 0 && !filters.brand.includes(p.material)) {
        return false;
      }

      // Frame Shape
      if (filters.frameShape?.length > 0 && !filters.frameShape.includes(p.frameShape)) {
        return false;
      }

      // Color
      if (filters.color?.length > 0) {
        const matchCol = p.colors?.some((c) =>
          filters.color.some((fc) => c.name.toLowerCase().includes(fc.toLowerCase()))
        );
        if (!matchCol) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // popularity / featured default
    });
  }, [filters, sortBy, searchFilter]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);


  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* 1. Hero Banner matching exact screenshot with /images/wishlist/wishlist-hero.png */}
      <section className="relative w-full bg-[#FAF8F5] overflow-hidden  min-h-[200px] sm:min-h-[300px] flex items-center">
        {/* Full-Bleed Background Image on Right with top alignment to prevent cropping */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <img
            src="/images/checkout-hero.png"
            alt="Our collection banner"
            className="w-full h-full object-cover object-[82%_center] sm:object-[86%_center] lg:object-[88%_center] transition-all duration-500"
          />
          {/* Smooth gradient blend for crisp text readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 sm:via-[#FAF8F5]/75 to-transparent w-full md:w-[62%]" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2.5 font-medium">
            <Link to="/" className="hover:text-[#E4232C] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">›</span>
            <span className="text-[#E4232C] font-semibold">Shop</span>
          </nav>

          {/* Heading & Subtitle */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14232E] tracking-tight">
            {pageTitle}
          </h1>
          <p className="hidden sm:block text-xs sm:text-sm text-slate-500 mt-1.5 font-normal max-w-lg">
            {pageDescription}
          </p>
        </div>

        {/* Slogan with stylish cursive typography & underline placed at top-right clear of model's face */}
        <div className="hidden xl:block absolute top-7 right-8 lg:right-14 z-10 pointer-events-none select-none text-right">
          <span className="font-serif italic text-slate-800 text-xl lg:text-2xl font-bold tracking-tight -rotate-3 block leading-tight drop-shadow-xs">
            Better Vision,<br />Brighter Tomorrow.
          </span>
          <div className="w-16 h-1 bg-[#E4232C] rounded-full mt-1.5 ml-auto -rotate-2"></div>
        </div>
      </section>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Dynamic Category Strip under Hero Banner */}
        {categories.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {categories.map((cat) => {
              const catSlug = cat.slug || cat.name?.toLowerCase().replace(/\s+/g, '-');
              const isActive = filters.category === catSlug;
              return (
                <div
                  key={catSlug}
                  onClick={() => handleCategoryShortcut(catSlug)}
                  className={`group bg-[#F8F9FA] hover:bg-slate-50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between border transition-all cursor-pointer shadow-2xs hover:shadow-xs ${
                    isActive ? 'border-[#E4232C] ring-1 ring-[#E4232C]' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {/* Image */}
                  <div className="w-full h-24 sm:h-28 flex items-center justify-center p-2">
                    {cat.imageUrl ? (
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-xs text-slate-400 font-medium">{cat.name}</div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="pt-2">
                    <h3 className="text-sm sm:text-base font-bold text-[#14232E] group-hover:text-[#E4232C] transition-colors">
                      {cat.name}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                      <span>{cat.subtitle || 'Browse Collection'}</span>
                      <ArrowRight size={13} className="text-slate-400 group-hover:text-[#E4232C] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. Shop Toolbar & Main 2-Column Area */}
        <div className="flex gap-8 items-start mb-16">
          {/* Left Desktop Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            totalResultsCount={filteredProducts.length}
          />

          {/* Right Product Grid Area */}
          <main className="flex-1 min-w-0">
            {/* Top Toolbar matching screenshot (120 Products, Sort by: Popularity, Red active Grid button) */}
            <ShopToolbar
              totalCount={filteredProducts.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              layout={layout}
              onLayoutChange={setLayout}
              onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
            />

            {/* 3-Column Product Grid matching screenshot */}
            <ProductGrid
              products={paginatedProducts}
              layout={layout}
              columns={3}
            />

            {/* Pagination Controls matching screenshot */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-12 pb-4">
                {[...Array(totalPages)].map((_, i) => {
                  const pNum = i + 1;
                  const isCur = currentPage === pNum;
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center ${isCur
                        ? 'bg-[#E4232C] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                {currentPage < totalPages && (
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-slate-300 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center"
                    title="Next page"
                  >
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Mobile Filters Drawer Modal */}
      <Modal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Products"
      >
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          isMobileDrawer={true}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
          totalResultsCount={filteredProducts.length}
        />
      </Modal>
    </div>
  );
};
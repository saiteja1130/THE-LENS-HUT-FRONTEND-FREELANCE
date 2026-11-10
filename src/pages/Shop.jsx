import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productApi } from '../services/productApi';
import { categoryApi } from '../services/categoryApi';
import { ShopHeader } from '../components/shop/ShopHeader';
import { CategoryNav } from '../components/shop/CategoryNav';
import { ShopToolbar } from '../components/shop/ShopToolbar';
import { FilterSidebar } from '../components/shop/FilterSidebar';
import { MobileFilterDrawer } from '../components/shop/MobileFilterDrawer';
import { ActiveFilterChips } from '../components/shop/ActiveFilterChips';
import { ProductGrid } from '../components/common/ProductGrid';
import { ProductSkeleton } from '../components/shop/ProductSkeleton';
import { EmptyProductState } from '../components/shop/EmptyProductState';
import { Newsletter } from '../components/home/Newsletter';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';

export const Shop = ({
  initialCategory,
  pageTitle = 'Our Eyewear Collection',
  pageDescription = 'Discover designer eyeglasses, polarized sunglasses, and precision contact lenses handcrafted for optimal vision and effortless everyday elegance.'
}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || initialCategory || 'all';
  const urlGender = searchParams.get('gender') || 'All';
  const urlShape = searchParams.get('shape');

  const productSectionRef = useRef(null);

  const [filters, setFilters] = useState({
    category: urlCategory,
    gender: urlGender,
    brand: [],
    frameShape: urlShape ? [urlShape] : [],
    frameType: [],
    color: [],
    maxPrice: 15000,
    polarizedOnly: false,
    blueLightOnly: false,
  });

  const [sortBy, setSortBy] = useState('popularity');
  const [layout, setLayout] = useState('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch catalog from product API
  const fetchCatalog = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await productApi.getProducts();
      if (res.success && Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.warn('[Shop] Product fetch warning:', err);
      setApiError('Unable to load optical catalog right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchCatalog();

    categoryApi.getActiveCategories().then((res) => {
      if (isMounted && res.success && Array.isArray(res.data)) {
        setCategories(res.data);
      }
    }).catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync category changes from props or URL
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: initialCategory || searchParams.get('category') || prev.category,
      gender: searchParams.get('gender') || prev.gender,
      frameShape: searchParams.get('shape') ? [searchParams.get('shape')] : prev.frameShape,
    }));
    setCurrentPage(1);
  }, [initialCategory, searchParams]);

  // Reset page when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      category: initialCategory || 'all',
      gender: 'All',
      brand: [],
      frameShape: [],
      frameType: [],
      color: [],
      maxPrice: 15000,
      polarizedOnly: false,
      blueLightOnly: false,
    });
    setCurrentPage(1);
  };

  const handleCategoryShortcut = (catValue) => {
    setFilters((prev) => ({
      ...prev,
      category: catValue,
    }));
    setCurrentPage(1);
  };

  const handleRemoveSingleFilter = (field, value) => {
    if (field === 'category') {
      setFilters((prev) => ({ ...prev, category: initialCategory || 'all' }));
    } else if (field === 'gender') {
      setFilters((prev) => ({ ...prev, gender: 'All' }));
    } else if (field === 'maxPrice') {
      setFilters((prev) => ({ ...prev, maxPrice: 15000 }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [field]: Array.isArray(prev[field]) ? prev[field].filter((item) => item !== value) : [],
      }));
    }
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('search');
    setSearchParams(nextParams);
    setCurrentPage(1);
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search text
        if (searchFilter) {
          const q = searchFilter.toLowerCase();
          const matchesSearch =
            p.name?.toLowerCase().includes(q) ||
            p.brand?.toLowerCase().includes(q) ||
            p.category?.toLowerCase().includes(q) ||
            p.frameShape?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q);
          if (!matchesSearch) return false;
        }

        // Category filter
        if (filters.category && filters.category !== 'all' && filters.category !== 'All') {
          const catFilter = filters.category.toLowerCase().trim();
          const pCat = (p.category || '').toLowerCase().trim();
          const pSlug = (p.categorySlug || '').toLowerCase().trim();
          const pType = (p.productType || '').toLowerCase().trim();

          const matchesCat =
            pCat === catFilter ||
            pSlug === catFilter ||
            pType === catFilter ||
            (catFilter === 'eyeglasses' && (pCat.includes('eyeglass') || pType === 'eyeglasses')) ||
            (catFilter === 'sunglasses' && (pCat.includes('sunglass') || pType === 'sunglasses')) ||
            ((catFilter === 'contact-lenses' || catFilter === 'contact-lens') &&
              (pCat.includes('contact') || pType === 'contact-lens')) ||
            (catFilter === 'accessories' && (pCat.includes('accessor') || pType === 'accessories'));

          if (!matchesCat) return false;
        }

        // Gender filter
        if (filters.gender && filters.gender !== 'All' && filters.gender !== 'all') {
          const gFilter = filters.gender.toLowerCase();
          const pGender = (p.gender || '').toLowerCase();
          if (pGender !== gFilter && pGender !== 'unisex' && pGender !== 'all') {
            return false;
          }
        }

        // Frame Material / Brand
        if (filters.brand?.length > 0) {
          const pMat = (p.material || p.frameSpecifications?.material || '').toLowerCase();
          const pBrand = (p.brand || '').toLowerCase();
          const matches = filters.brand.some((b) => {
            const bl = b.toLowerCase();
            return pMat.includes(bl) || pBrand.includes(bl);
          });
          if (!matches) return false;
        }

        // Frame Shape
        if (filters.frameShape?.length > 0) {
          const pShape = (p.frameShape || p.frameSpecifications?.shape || '').toLowerCase();
          const matchesShape = filters.frameShape.some((s) => pShape.includes(s.toLowerCase()));
          if (!matchesShape) return false;
        }

        // Frame Type / Rim
        if (filters.frameType?.length > 0) {
          const pRim = (p.frameType || p.frameSpecifications?.frameType || '').toLowerCase();
          const matchesRim = filters.frameType.some((ft) => pRim.includes(ft.toLowerCase()));
          if (!matchesRim) return false;
        }

        // Color
        if (filters.color?.length > 0) {
          const matchCol = p.colors?.some((c) =>
            filters.color.some((fc) => c.name?.toLowerCase().includes(fc.toLowerCase()))
          );
          if (!matchCol) return false;
        }

        // Price
        if (filters.maxPrice && p.price > filters.maxPrice) {
          return false;
        }

        // Polarized
        if (filters.polarizedOnly) {
          const isPolarized =
            p.sunglassesConfig?.lensTypes?.some((l) => l.polarized) ||
            p.description?.toLowerCase().includes('polarized') ||
            p.name?.toLowerCase().includes('polarized');
          if (!isPolarized) return false;
        }

        // Blue-light
        if (filters.blueLightOnly) {
          const hasBlue =
            p.lensCompatibility?.blueLightBlock ||
            p.description?.toLowerCase().includes('blue') ||
            p.name?.toLowerCase().includes('blue');
          if (!hasBlue) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low-high') return a.price - b.price;
        if (sortBy === 'price-high-low') return b.price - a.price;
        if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        // Default: popularity
        return (b.isBestSeller ? 2 : b.isFeatured ? 1 : 0) - (a.isBestSeller ? 2 : a.isFeatured ? 1 : 0);
      });
  }, [products, filters, sortBy, searchFilter]);

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category && filters.category !== 'all' && filters.category !== 'All') count++;
    if (filters.gender && filters.gender !== 'All' && filters.gender !== 'all') count++;
    if (filters.frameShape?.length) count += filters.frameShape.length;
    if (filters.brand?.length) count += filters.brand.length;
    if (filters.frameType?.length) count += filters.frameType.length;
    if (filters.color?.length) count += filters.color.length;
    if (filters.maxPrice && filters.maxPrice < 15000) count++;
    if (filters.polarizedOnly) count++;
    if (filters.blueLightOnly) count++;
    if (searchFilter) count++;
    return count;
  }, [filters, searchFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Derive dynamic header title based on category if not customized
  const currentCategoryTitle = useMemo(() => {
    if (pageTitle && pageTitle !== 'Our Eyewear Collection') return pageTitle;
    switch (filters.category?.toLowerCase()) {
      case 'eyeglasses':
        return 'Designer Eyeglasses';
      case 'sunglasses':
        return 'Polarized & UV400 Sunglasses';
      case 'contact-lenses':
      case 'contact-lens':
        return 'Contact Lenses & Disposables';
      case 'accessories':
        return 'Eyewear Care & Accessories';
      default:
        return 'Our Complete Eyewear Collection';
    }
  }, [pageTitle, filters.category]);

  const currentCategoryDesc = useMemo(() => {
    if (pageDescription && pageDescription !== 'Discover the perfect eyewear for your style, comfort and vision.') {
      return pageDescription;
    }
    switch (filters.category?.toLowerCase()) {
      case 'eyeglasses':
        return 'Handcrafted prescription optical frames engineered with titanium, Italian acetate, and minimal rimless silhouettes for all-day comfort.';
      case 'sunglasses':
        return 'Protect your vision from harmful UV rays and road glare with certified UV400 and high-definition polarized lenses in iconic silhouettes.';
      case 'contact-lenses':
      case 'contact-lens':
        return 'Breathable high-oxygen hydrogel daily and monthly contact lenses engineered for 16+ hours of continuous corneal hydration.';
      case 'accessories':
        return 'Keep your eyewear in pristine optical clarity with ultrasonic care kits, anti-fog lens sprays, and structured vegan leather cases.';
      default:
        return 'Browse our optical catalog featuring premium prescription spectacles, luxury sunglasses, daily contact lenses, and certified eyewear care.';
    }
  }, [pageDescription, filters.category]);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Shop Header Banner */}
      <ShopHeader
        categorySlug={filters.category}
        pageTitle={currentCategoryTitle}
        pageDescription={currentCategoryDesc}
        totalCount={filteredProducts.length}
      />

      {/* 2. Main Catalog Container */}
      <div ref={productSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Category Navigation Pills */}
        <div className="mb-6">
          <CategoryNav
            activeCategory={filters.category}
            onSelectCategory={handleCategoryShortcut}
          />
        </div>

        {/* API Error Notification */}
        {apiError && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-xs text-rose-800">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-600 shrink-0" />
              <span>{apiError}</span>
            </div>
            <button
              onClick={fetchCatalog}
              className="font-bold underline hover:text-rose-950 ml-4 shrink-0 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Main 2-Column Catalog Area */}
        <div className="flex gap-8 items-start mb-16">
          
          {/* Desktop Filter Sidebar */}
          <aside className="w-60 lg:w-64 shrink-0 hidden lg:block bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              totalResultsCount={filteredProducts.length}
            />
          </aside>

          {/* Product Grid & Controls Area */}
          <main className="flex-1 min-w-0">
            {/* Top Toolbar: Results count, Sorting dropdown, Grid/List view switcher */}
            <ShopToolbar
              totalCount={filteredProducts.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              layout={layout}
              onLayoutChange={setLayout}
              onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
              activeFilterCount={activeFiltersCount}
            />

            {/* Active Filter Chips */}
            <ActiveFilterChips
              filters={filters}
              searchFilter={searchFilter}
              onRemoveFilter={handleRemoveSingleFilter}
              onResetAll={handleResetFilters}
              onClearSearch={handleClearSearch}
            />

            {/* Loading Skeletons */}
            {loading ? (
              <ProductSkeleton count={6} layout={layout} />
            ) : filteredProducts.length === 0 ? (
              <EmptyProductState
                onReset={handleResetFilters}
                hasFilters={activeFiltersCount > 0}
              />
            ) : (
              /* Product Grid */
              <ProductGrid
                products={paginatedProducts}
                layout={layout}
                columns={3}
              />
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-12 pb-4">
                {/* Previous Button */}
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold transition-all cursor-pointer flex items-center justify-center shadow-2xs"
                  title="Previous page"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Page Number Buttons */}
                {[...Array(totalPages)].map((_, i) => {
                  const pNum = i + 1;
                  const isCur = currentPage === pNum;
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => handlePageChange(pNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center ${
                        isCur
                          ? 'bg-[#E4232C] text-white shadow-xs scale-105'
                          : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold transition-all cursor-pointer flex items-center justify-center shadow-2xs"
                  title="Next page"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Newsletter Engagement Banner */}
      <Newsletter />

      {/* Mobile Slide-Over Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        totalResultsCount={filteredProducts.length}
      />
    </div>
  );
};

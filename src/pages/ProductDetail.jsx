import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { productApi } from '../services/productApi';
import { normalizeProduct } from '../services/opticalEngine/productNormalizer';
import { ProductImageGallery } from '../components/product/ProductImageGallery';
import { ProductDetailsInfo } from '../components/product/ProductDetailsInfo';
import { ProductConfigurationEngine } from '../components/product/ProductConfigurationEngine';
import { ProductTabsSection } from '../components/product/ProductTabsSection';
import { MobileStickyBar } from '../components/product/MobileStickyBar';
import { ProductCard } from '../components/common/ProductCard';
import { useCart } from '../context/CartContext';

export const ProductDetail = () => {
  const { productSlug } = useParams();
  const [searchParams] = useSearchParams();
  const editItemId = searchParams.get('editItem');
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeVariantImages, setActiveVariantImages] = useState(null);
  const [isMobileBarVisible, setIsMobileBarVisible] = useState(false);
  const mainPurchaseRef = useRef(null);

  const { cart } = useCart();

  useEffect(() => {
    let isMounted = true;
    const loadProduct = async () => {
      setIsLoading(true);
      const res = await productApi.getProductBySlug(productSlug);
      if (isMounted) {
        if (res.success && res.data) {
          setFetchedProduct(res.data);
          const cat = res.data.category || 'eyeglasses';
          const relRes = await productApi.getProducts({ category: cat });
          if (isMounted && relRes.success && Array.isArray(relRes.data)) {
            setRelatedProducts(relRes.data.filter((p) => p.id !== res.data.id).slice(0, 5));
          }
        } else {
          setFetchedProduct(null);
        }
        setIsLoading(false);
      }
    };
    if (productSlug) {
      loadProduct();
    }
    return () => {
      isMounted = false;
    };
  }, [productSlug]);

  const product = useMemo(() => {
    return fetchedProduct ? normalizeProduct(fetchedProduct) : null;
  }, [fetchedProduct]);

  // Check if returning from cart in edit mode
  const editCartItem = useMemo(() => {
    if (!editItemId) return null;
    return cart.find((i) => i.id === editItemId || i.configurationHash === editItemId);
  }, [editItemId, cart]);

  // Perspective images calculation
  const perspectiveImages = useMemo(() => {
    if (activeVariantImages && activeVariantImages.length > 0) {
      return activeVariantImages;
    }
    const imgs = [];
    if (product?.images?.front) imgs.push(product.images.front);
    if (product?.images?.side) imgs.push(product.images.side);
    if (product?.images?.angle) imgs.push(product.images.angle);
    if (imgs.length === 0 && product?.primaryImage) imgs.push(product.primaryImage);
    return [...new Set(imgs.filter(Boolean))];
  }, [product, activeVariantImages]);

  const handleVariantChange = useCallback(
    (variant) => {
      if (!variant) return;

      let imgs = [];
      if (Array.isArray(variant.perspectiveList) && variant.perspectiveList.length > 0) {
        imgs = variant.perspectiveList;
      } else if (Array.isArray(variant.imageList) && variant.imageList.length > 0) {
        imgs = variant.imageList;
      } else if (Array.isArray(variant.images) && variant.images.length > 0) {
        imgs = variant.images;
      } else if (variant.images && typeof variant.images === 'object') {
        if (variant.images.front) imgs.push(variant.images.front);
        if (variant.images.side) imgs.push(variant.images.side);
        if (variant.images.angle) imgs.push(variant.images.angle);
      }
      if (imgs.length === 0 && variant.image) {
        imgs.push(variant.image);
      }

      // Fallback: look up in product.colors by colorName
      if (imgs.length === 0 && variant.colorName && product?.colors?.length > 0) {
        const matchedCol = product.colors.find(
          (c) => c.name?.toLowerCase() === variant.colorName.toLowerCase()
        );
        if (matchedCol?.images) {
          if (matchedCol.images.front) imgs.push(matchedCol.images.front);
          if (matchedCol.images.side) imgs.push(matchedCol.images.side);
          if (matchedCol.images.angle) imgs.push(matchedCol.images.angle);
        } else if (matchedCol?.image) {
          imgs.push(matchedCol.image);
        }
      }

      imgs = imgs.filter(Boolean);
      if (imgs.length > 0) {
        setActiveVariantImages([...new Set(imgs)]);
        setActiveThumb(0);
      }
    },
    [product]
  );

  // Monitor scroll for mobile sticky purchase bar
  useEffect(() => {
    const handleScroll = () => {
      if (!mainPurchaseRef.current) return;
      const rect = mainPurchaseRef.current.getBoundingClientRect();
      // Show mobile bar when scrolled past the top of the purchase controls
      setIsMobileBarVisible(rect.bottom < window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sleek Skeleton Loading State
  if (isLoading) {
    return (
      <div className="bg-white min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
          {/* Breadcrumb Skeleton */}
          <div className="h-4 w-64 bg-slate-100 rounded-md"></div>

          {/* 2-Column Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-16/11 bg-slate-100 rounded-2xl w-full"></div>
              <div className="flex gap-3">
                <div className="w-18 h-18 bg-slate-100 rounded-xl"></div>
                <div className="w-18 h-18 bg-slate-100 rounded-xl"></div>
                <div className="w-18 h-18 bg-slate-100 rounded-xl"></div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="h-4 w-24 bg-slate-100 rounded"></div>
              <div className="h-8 w-3/4 bg-slate-100 rounded-lg"></div>
              <div className="h-10 w-44 bg-slate-100 rounded-xl"></div>
              <div className="h-48 bg-slate-100 rounded-2xl"></div>
              <div className="h-12 w-full bg-slate-100 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-[#E4232C] flex items-center justify-center mb-4">
          <ArrowLeft size={24} />
        </div>
        <h2 className="text-2xl font-extrabold text-[#14232E] mb-2">Eyewear Product Not Found</h2>
        <p className="text-slate-500 text-sm max-w-md mb-6 leading-relaxed">
          The requested eyeglasses model is currently unavailable or may have been discontinued from our catalog.
        </p>
        <Link
          to="/shop"
          className="px-7 py-3 bg-[#E4232C] hover:bg-[#C81921] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-5 sm:py-8 pb-20 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 font-medium overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link to="/" className="hover:text-[#E4232C] transition-colors">Home</Link>
          <ChevronRight size={12} className="text-slate-400 shrink-0" />
          <Link to="/shop" className="hover:text-[#E4232C] transition-colors">Catalog</Link>
          <ChevronRight size={12} className="text-slate-400 shrink-0" />
          <Link
            to={`/${product.categorySlug || product.category || 'eyeglasses'}`}
            className="hover:text-[#E4232C] transition-colors capitalize"
          >
            {product.category?.replace('-', ' ') || 'Eyeglasses'}
          </Link>
          <ChevronRight size={12} className="text-slate-400 shrink-0" />
          <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Edit Configuration Notice (When returning from Cart) */}
        {editCartItem && (
          <div className="mb-6 p-4 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-900 shadow-2xs">
            <div>
              <strong>Editing Cart Item:</strong> You are modifying previous parameters for <em>{product.name}</em>.
            </div>
            <Link to="/cart" className="font-extrabold underline hover:text-blue-700 ml-4 shrink-0">
              Return to Cart
            </Link>
          </div>
        )}

        {/* Main Product Layout: Balanced 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN: VISUAL EXPERIENCE & TABS ================= */}
          <div className="lg:col-span-7 space-y-8">
            {/* High-Fidelity Product Image Gallery */}
            <ProductImageGallery
              images={perspectiveImages}
              productName={product.name}
              discountPercent={product.discountPercent}
              isBestSeller={product.isBestSeller}
              isNewArrival={product.isNew}
              activeThumb={activeThumb}
              onThumbChange={setActiveThumb}
            />

            {/* Comprehensive Product Information Tabs Section */}
            <ProductTabsSection product={product} />
          </div>

          {/* ================= RIGHT COLUMN: INFO, CONFIGURATION & PURCHASE ================= */}
          <div ref={mainPurchaseRef} className="lg:col-span-5 space-y-6">
            {/* Header: Brand, Title, Rating, Pricing, Pincode */}
            <ProductDetailsInfo product={product} />

            <div className="border-t border-slate-100 pt-5">
              {/* Guided Configuration Engine */}
              <ProductConfigurationEngine
                product={product}
                initialConfiguration={editCartItem?.configuration}
                initialQuantity={editCartItem?.quantity || 1}
                onVariantChange={handleVariantChange}
              />
            </div>
          </div>

        </div>

        {/* ================= BOTTOM: RELATED PRODUCTS CAROUSEL / GRID ================= */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E4232C]">
                  Curated Collection
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#14232E] tracking-tight">
                  You May Also Like
                </h2>
              </div>
              <Link
                to={`/${product.categorySlug || product.category || 'eyeglasses'}`}
                className="text-xs font-bold text-slate-600 hover:text-[#E4232C] transition-colors flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} layout="grid" />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Mobile Sticky Purchase Bar */}
      <MobileStickyBar
        product={product}
        currentPrice={product.price}
        onAddToCart={() => {
          // Scroll up to configurator on mobile if needed, or trigger buy
          if (mainPurchaseRef.current) {
            mainPurchaseRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onBuyNow={() => {
          if (mainPurchaseRef.current) {
            mainPurchaseRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        isVisible={isMobileBarVisible}
      />
    </div>
  );
};

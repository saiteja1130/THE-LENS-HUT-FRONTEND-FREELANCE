import React, { useState, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import {
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  Ruler
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { normalizeProduct } from '../services/opticalEngine/productNormalizer';
import { ProductConfigurationEngine } from '../components/product/ProductConfigurationEngine';
import { ProductCard } from '../components/common/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetail = () => {
  const { productSlug } = useParams();
  const [searchParams] = useSearchParams();
  const editItemId = searchParams.get('editItem');

  const { cart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Find and normalize the product
  const rawProduct = useMemo(() => {
    return PRODUCTS.find((p) => p.slug === productSlug) || PRODUCTS[0];
  }, [productSlug]);

  const product = useMemo(() => {
    return normalizeProduct(rawProduct);
  }, [rawProduct]);

  // Check if returning from cart in edit mode
  const editCartItem = useMemo(() => {
    if (!editItemId) return null;
    return cart.find((i) => i.id === editItemId || i.configurationHash === editItemId);
  }, [editItemId, cart]);

  const [activeThumb, setActiveThumb] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [activeVariantImages, setActiveVariantImages] = useState(null);

  // Gallery calculation
  const gallery = useMemo(() => {
    if (activeVariantImages && activeVariantImages.length > 0) {
      return activeVariantImages;
    }
    const imgs = [];
    if (product.primaryImage) imgs.push(product.primaryImage);
    if (product.secondaryImage) imgs.push(product.secondaryImage);
    if (product.galleryImages?.length) imgs.push(...product.galleryImages);
    if (product.images?.front) imgs.push(product.images.front);
    if (imgs.length === 0) imgs.push('/images/home/cat-eyeglasses.png');
    return [...new Set(imgs)];
  }, [product, activeVariantImages]);

  const isWish = isInWishlist(product.id);

  const relatedProducts = useMemo(() => {
    const others = PRODUCTS.filter((p) => p.id !== product?.id);
    const sameCategory = others.filter((p) => p.category === product?.category);
    if (sameCategory.length >= 5) {
      return sameCategory.slice(0, 5);
    }
    return [...sameCategory, ...others.filter((p) => p.category !== product?.category)].slice(0, 5);
  }, [product]);

  return (
    <div className="bg-white min-h-screen py-5 sm:py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link to="/" className="hover:text-[#E4232C] transition-colors">Home</Link>
          <span>&gt;</span>
          <Link to="/shop" className="hover:text-[#E4232C] transition-colors">Shop</Link>
          <span>&gt;</span>
          <Link to={`/${product.category || 'eyeglasses'}`} className="hover:text-[#E4232C] transition-colors capitalize">
            {product.category?.replace('-', ' ') || 'Eyeglasses'}
          </Link>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">{product.name}</span>
        </nav>

        {/* Edit Configuration Banner (if present) */}
        {editCartItem && (
          <div className="mb-6 p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900">
            <div>
              <strong>Editing Cart Item:</strong> You are modifying previous configuration for <em>{product.name}</em>.
            </div>
            <Link to="/cart" className="font-bold underline hover:text-blue-700">
              Return to Cart
            </Link>
          </div>
        )}

        {/* Main Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN: GALLERY & TABS ================= */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start">
              
              {/* Large Main Showcase Stage */}
              <div className="order-1 sm:order-2 relative w-full flex-1 aspect-4/3 sm:aspect-16/11 bg-[#F8F9FA] rounded-2xl border border-slate-200/80 p-3 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden">
                {product.discountPercent && (
                  <span className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 bg-[#E4232C] text-white text-xs font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider z-10 shadow-2xs">
                    {product.discountPercent}% OFF
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 p-2 rounded-full transition-all cursor-pointer ${
                    isWish
                      ? 'bg-white text-[#E4232C] shadow-xs'
                      : 'bg-white text-slate-400 hover:text-[#E4232C] shadow-2xs'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} className={isWish ? 'fill-[#E4232C] text-[#E4232C]' : ''} />
                </button>

                {/* Left Arrow */}
                {gallery.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveThumb((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                    className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}

                {/* Right Arrow */}
                {gallery.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveThumb((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                )}

                {/* Main Product Image */}
                <img
                  src={gallery[activeThumb] || gallery[0]}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="order-2 sm:order-1 flex flex-row sm:flex-col gap-2.5 sm:gap-3 shrink-0 justify-center sm:justify-start">
                  {gallery.slice(0, 5).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveThumb(idx)}
                      className={`flex-1 sm:flex-initial w-16 h-16 sm:w-18 sm:h-18 max-w-[80px] aspect-square rounded-xl border p-1 bg-[#F8F9FA] overflow-hidden transition-all cursor-pointer ${
                        activeThumb === idx
                          ? 'border-[#E4232C] ring-2 ring-[#E4232C]/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Detailed Information Tabs */}
            <div className="pt-2">
              <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-200 overflow-x-auto text-xs sm:text-sm font-bold">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'features', label: 'Features' },
                  { id: 'specifications', label: 'Specifications' },
                  { id: 'shipping', label: 'Shipping & Returns' },
                  { id: 'reviews', label: 'Reviews' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3.5 relative whitespace-nowrap cursor-pointer transition-colors ${
                      activeTab === tab.id ? 'text-[#E4232C]' : 'text-slate-500 hover:text-[#14232E]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#E4232C] rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="py-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeTab === 'description' && (
                  <div className="space-y-4">
                    <p>{product.description}</p>
                    {product.features && (
                      <ul className="space-y-2 pt-1 text-slate-700">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {activeTab === 'features' && (
                  <ul className="space-y-2.5 text-slate-700">
                    {(product.features || [
                      'Blue-light blocking and anti-glare scratch resistant coating',
                      'Ergonomic keyhole nose bridge prevents slipping',
                      '100% UV400 radiation protection certified',
                      'Includes premium hard case and microfiber cleaning cloth'
                    ]).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check size={14} className="text-[#E4232C]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'specifications' && (
                  <div className="overflow-hidden border border-slate-200 rounded-xl max-w-lg">
                    <table className="w-full text-xs text-left">
                      <tbody className="divide-y divide-slate-100">
                        {Object.entries(product.specifications || {}).map(([k, v]) => (
                          <tr key={k} className="even:bg-slate-50/50">
                            <td className="px-4 py-2.5 font-bold text-slate-600 w-1/3">{k}</td>
                            <td className="px-4 py-2.5 text-[#14232E]">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2 text-slate-600">
                    <p><strong>Free Express Delivery:</strong> 2 to 4 business days on all orders above ₹999.</p>
                    <p><strong>Hassle-Free Returns:</strong> 7 days easy doorstep pickup if the fit isn't right.</p>
                    <p><strong>Optical Lab Certified:</strong> Centered and adjusted by licensed opticians before shipping.</p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={15} className="fill-amber-400" />
                        ))}
                      </div>
                      <span className="font-bold text-[#14232E]">{product.rating || 4.8} out of 5 stars</span>
                      <span className="text-slate-400">· {product.reviewCount || 120} verified customer ratings</span>
                    </div>
                    <p className="text-slate-500 italic">"Extremely comfortable glasses. Crisp vision and stylish look." - Verified Customer</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: PRODUCT INFO & UNIFIED CONFIGURATION ================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header: Brand & Title */}
            <div>
              <span className="text-xs text-slate-400 font-semibold block mb-1">
                {product.brand || 'The Lens Hut'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight">
                {product.name}
              </h1>

              {/* Rating Row */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  {product.rating || 4.8} <span className="text-slate-400 font-normal">({product.reviewCount || 142} Reviews)</span>
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-black text-[#14232E] tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-sm text-slate-400 line-through tabular-nums">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercent && (
                <span className="text-xs font-extrabold text-[#E4232C] bg-rose-50 px-2 py-0.5 rounded-sm">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Unified Configuration Engine */}
            <ProductConfigurationEngine
              product={product}
              initialConfiguration={editCartItem?.configuration}
              initialQuantity={editCartItem?.quantity || 1}
              onVariantChange={(variant) => {
                if (variant.images && variant.images.length > 0) {
                  setActiveVariantImages(variant.images);
                  setActiveThumb(0);
                }
              }}
            />

            {/* Service Trust Highlights */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2 py-3 px-1 sm:px-2 border-y border-slate-100 text-slate-600 select-none">
              <div className="flex items-center gap-1.5 sm:gap-2.5 pr-1 sm:pr-2">
                <Truck size={17} className="text-[#14232E] shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-[10px] sm:text-[11px] font-bold text-[#14232E] leading-tight truncate">Free Shipping</h4>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">Above ₹999</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2.5 px-1 sm:px-2 border-l border-slate-200/80">
                <RotateCcw size={17} className="text-[#14232E] shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-[10px] sm:text-[11px] font-bold text-[#14232E] leading-tight truncate">7 Days Return</h4>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">Easy returns</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2.5 pl-1 sm:pl-2 border-l border-slate-200/80">
                <ShieldCheck size={17} className="text-[#14232E] shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-[10px] sm:text-[11px] font-bold text-[#14232E] leading-tight truncate">100% Genuine</h4>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">Original gear</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ================= BOTTOM: YOU MAY ALSO LIKE ================= */}
        <div className="mt-16 pt-10 border-t border-slate-100">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#14232E] tracking-tight">
              You May Also Like
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} layout="grid" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
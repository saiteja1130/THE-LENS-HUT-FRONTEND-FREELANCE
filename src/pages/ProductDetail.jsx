import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  CheckCircle2,
  Ruler
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetail = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();

  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.slug === productSlug) || PRODUCTS[0];
  }, [productSlug]);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Component States matching the screenshot
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [pincode, setPincode] = useState('');
  const [pincodeMessage, setPincodeMessage] = useState(null);
  const [addedNotice, setAddedNotice] = useState(false);

  const isWish = isInWishlist(product.id);

  // Gallery items matching the screenshot
  const gallery = [
    '/images/home/cat-eyeglasses.png',
    '/images/home/promo-eyeglasses.png',
    '/images/auth/signup-hero.png',
    '/images/auth/login-hero.png'
  ];

  const colors = [
    { name: 'Black', hex: '#111827' },
    { name: 'Brown', hex: '#78350F' },
    { name: 'Blue', hex: '#1E3A8A' },
    { name: 'Grey', hex: '#4B5563' }
  ];

  const sizes = [
    { id: 'S', label: 'Small', desc: 'Narrow fit' },
    { id: 'M', label: 'Medium', desc: 'Standard fit' },
    { id: 'L', label: 'Large', desc: 'Wide fit' }
  ];

  const handleAddToCart = () => {
    addToCart(product, {
      color: selectedColor,
      size: selectedSize === 'M' ? 'Medium' : selectedSize === 'S' ? 'Small' : 'Wide',
      quantity
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, {
      color: selectedColor,
      size: selectedSize === 'M' ? 'Medium' : selectedSize === 'S' ? 'Small' : 'Wide',
      quantity
    });
    navigate('/checkout');
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.trim().length >= 6) {
      setPincodeMessage({ valid: true, text: 'Delivery by Wednesday · Free Express Shipping' });
    } else {
      setPincodeMessage({ valid: false, text: 'Please enter a valid 6-digit pincode' });
    }
  };

  // 5 Related products matching the "You May Also Like" carousel
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
        
        {/* Breadcrumbs matching the screenshot */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link to="/" className="hover:text-[#E4232C] transition-colors">Home</Link>
          <span>&gt;</span>
          <Link to="/shop" className="hover:text-[#E4232C] transition-colors">Shop</Link>
          <span>&gt;</span>
          <Link to="/eyeglasses" className="hover:text-[#E4232C] transition-colors">Eyeglasses</Link>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">{product.name || 'Classic Square Frame'}</span>
        </nav>

        {/* Main Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN: GALLERY & TABS ================= */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Gallery View: Thumbnails & Main Stage (Mobile: Main stage on top, 4 thumbnails at bottom in flex-row; Desktop: Thumbnails on left, main stage on right) */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start">
              
              {/* Large Main Showcase Stage */}
              <div className="order-1 sm:order-2 relative w-full flex-1 aspect-4/3 sm:aspect-16/11 bg-[#F8F9FA] rounded-2xl border border-slate-200/80 p-3 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden">
                {/* 20% OFF Badge */}
                <span className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 bg-[#E4232C] text-white text-xs font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider z-10 shadow-2xs">
                  20% OFF
                </span>

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

                {/* Left Arrow Navigation */}
                <button
                  type="button"
                  onClick={() => setActiveThumb((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                  className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Right Arrow Navigation */}
                <button
                  type="button"
                  onClick={() => setActiveThumb((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Main Product Image */}
                <img
                  src={gallery[activeThumb]}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
                />
              </div>

              {/* 4 Thumbnails: Mobile at bottom in flex-row, Desktop on left in vertical flex-col */}
              <div className="order-2 sm:order-1 flex flex-row sm:flex-col gap-2.5 sm:gap-3 shrink-0 justify-center sm:justify-start">
                {gallery.map((img, idx) => (
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

            </div>

            {/* Detailed Information Tabs directly beneath the Gallery */}
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
                    <p>
                      The Classic Square Frame combines timeless design with modern comfort. Perfect for both professional and casual settings, this frame is crafted with high-quality materials for long-lasting durability.
                    </p>
                    <ul className="space-y-2 pt-1 text-slate-700">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Premium acetate frame</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Lightweight &amp; comfortable</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Suitable for prescription lenses</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === 'features' && (
                  <ul className="space-y-2.5 text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#E4232C]" />
                      <span>Blue-light blocking and anti-glare scratch resistant coating</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#E4232C]" />
                      <span>Ergonomic keyhole nose bridge prevents slipping</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#E4232C]" />
                      <span>100% UV400 radiation protection certified</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#E4232C]" />
                      <span>Includes premium clamshell hard case and microfiber cleaning cloth</span>
                    </li>
                  </ul>
                )}

                {activeTab === 'specifications' && (
                  <div className="overflow-hidden border border-slate-200 rounded-xl max-w-lg">
                    <table className="w-full text-xs text-left">
                      <tbody className="divide-y divide-slate-100">
                        <tr className="bg-slate-50/50">
                          <td className="px-4 py-2.5 font-bold text-slate-600 w-1/3">Frame Material</td>
                          <td className="px-4 py-2.5 text-[#14232E]">Handcrafted Italian Acetate</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-bold text-slate-600">Weight</td>
                          <td className="px-4 py-2.5 text-[#14232E]">18 grams (Ultra-lightweight)</td>
                        </tr>
                        <tr className="bg-slate-50/50">
                          <td className="px-4 py-2.5 font-bold text-slate-600">Hinge Type</td>
                          <td className="px-4 py-2.5 text-[#14232E]">5-Barrel Stainless Steel Hinges</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-bold text-slate-600">Lens Width</td>
                          <td className="px-4 py-2.5 text-[#14232E]">52 mm · Bridge: 18 mm · Temple: 142 mm</td>
                        </tr>
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
                      <span className="font-bold text-[#14232E]">4.8 out of 5 stars</span>
                      <span className="text-slate-400">· 1,248 verified customer ratings</span>
                    </div>
                    <p className="text-slate-500 italic">"Extremely comfortable glasses. Crisp vision and stylish look." - Rahul K.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: PRODUCT INFO & PURCHASE ================= */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Header: Brand & Title */}
            <div>
              <span className="text-xs text-slate-400 font-semibold block mb-1">
                Ray-Ban
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14232E] tracking-tight">
                Classic Square Frame
              </h1>

              {/* Rating Row */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  4.5 <span className="text-slate-400 font-normal">(1.2k Reviews)</span>
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-black text-[#14232E] tabular-nums">
                ₹2,999
              </span>
              <span className="text-sm text-slate-400 line-through tabular-nums">
                ₹3,749
              </span>
              <span className="text-xs font-extrabold text-[#E4232C] bg-rose-50 px-2 py-0.5 rounded-sm">
                20% OFF
              </span>
            </div>

            {/* Short Tagline Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              A timeless square frame designed for modern everyday style. Lightweight, durable and comfortable for all-day wear.
            </p>

            {/* Color Selector */}
            <div>
              <div className="text-xs font-bold text-[#14232E] mb-2">
                Color: <span className="font-semibold text-slate-700">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
                      selectedColor === col.name
                        ? 'ring-2 ring-slate-800 ring-offset-2 border-transparent scale-105'
                        : 'border-slate-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#14232E]">
                  Size: <span className="font-semibold text-slate-700">Medium</span>
                </span>
                <Link to="/faqs" className="text-slate-500 hover:text-[#E4232C] font-semibold flex items-center gap-1 transition-colors">
                  <Ruler size={13} />
                  <span>Size Guide</span>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz.id}
                    onClick={() => setSelectedSize(sz.id)}
                    className={`w-10 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                      selectedSize === sz.id
                        ? 'bg-[#E4232C] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {sz.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Row: Quantity + Add to Cart + Buy Now + Wishlist */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Quantity Box */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-white h-11 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 sm:w-9 h-full flex items-center justify-center text-slate-500 hover:text-[#14232E] cursor-pointer text-sm font-semibold"
                  >
                    -
                  </button>
                  <span className="w-7 sm:w-8 text-center text-xs font-bold text-[#14232E] select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-8 sm:w-9 h-full flex items-center justify-center text-slate-500 hover:text-[#14232E] cursor-pointer text-sm font-semibold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-11 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap px-3 sm:px-5"
                >
                  <ShoppingBag size={16} />
                  <span>{addedNotice ? 'Added to Cart' : 'Add to Cart'}</span>
                </button>

                {/* Buy Now Button (Desktop / Tablet inline) */}
                <button
                  onClick={handleBuyNow}
                  className="hidden sm:inline-flex px-6 h-11 bg-white hover:bg-slate-50 border border-slate-300 text-[#14232E] text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer shrink-0 items-center justify-center"
                >
                  Buy Now
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                    isWish
                      ? 'border-[#E4232C] bg-rose-50 text-[#E4232C]'
                      : 'border-slate-300 bg-white text-slate-500 hover:text-[#E4232C]'
                  }`}
                  title="Wishlist"
                  aria-label="Save to wishlist"
                >
                  <Heart size={18} className={isWish ? 'fill-[#E4232C]' : ''} />
                </button>
              </div>

              {/* Full-Width Buy Now Button for Mobile View */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full sm:hidden h-11 bg-white hover:bg-slate-50 border border-slate-300 text-[#14232E] text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center shadow-2xs"
              >
                Buy Now
              </button>
            </div>

            {/* Service Trust Highlights Strip with Vertical Dividers */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2 py-3 px-1 sm:px-2 border-y border-slate-100 text-slate-600 select-none">
              {/* Item 1 */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 pr-1 sm:pr-2">
                <Truck size={17} className="text-[#14232E] shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-[10px] sm:text-[11px] font-bold text-[#14232E] leading-tight truncate">Free Shipping</h4>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">Above ₹999</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 px-1 sm:px-2 border-l border-slate-200/80">
                <RotateCcw size={17} className="text-[#14232E] shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-[10px] sm:text-[11px] font-bold text-[#14232E] leading-tight truncate">7 Days Return</h4>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">Easy returns</p>
                </div>
              </div>

              {/* Item 3 */}
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
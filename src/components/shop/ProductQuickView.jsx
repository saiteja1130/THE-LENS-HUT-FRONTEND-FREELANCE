import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';
import { Modal } from '../common/Modal';
import { QuantitySelector } from '../common/QuantitySelector';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
export const ProductQuickView = ({
  product,
  isOpen,
  onClose
}) => {
  const {
    addToCart
  } = useCart();
  const {
    isInWishlist,
    toggleWishlist
  } = useWishlist();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.size);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const activeColorObj = product.colors.find(c => c.name === selectedColor);
  const currentImage = activeColorObj?.image || product.primaryImage;
  const isWish = isInWishlist(product.id);
  const handleAdd = () => {
    addToCart(product, {
      color: selectedColor,
      variantId: activeColorObj?.id || (selectedColor ? `var-${selectedColor.toLowerCase().replace(/\s+/g, '-')}` : 'default'),
      image: currentImage,
      size: selectedSize,
      quantity
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };
  return <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Product Image */}
        <div className="relative bg-[#F5F6F7] rounded-lg p-6 flex items-center justify-center aspect-square">
          {product.discountPercent > 0 && <span className="absolute top-3 left-3 bg-[#E4232C] text-white text-xs font-bold px-2 py-0.5 rounded">
              {product.discountPercent}% OFF
            </span>}
          <img src={currentImage} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
        </div>

        {/* Right: Info */}
        <div className="space-y-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
              {product.brand}
            </div>
            <h2 className="text-xl font-bold text-[#14232E] leading-snug">
              {product.name}
            </h2>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 py-2 border-y border-slate-100">
            <span className="text-2xl font-bold text-[#14232E] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && <span className="text-sm text-slate-400 line-through tabular-nums">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>}
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              In Stock & Ready to Ship
            </span>
          </div>

          {/* Color Selection */}
          {product.colors.length > 0 && <div>
              <div className="text-xs font-semibold text-[#14232E] mb-2">
                Color: <span className="font-normal text-slate-600">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map(col => <button key={col.name} onClick={() => setSelectedColor(col.name)} className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${selectedColor === col.name ? 'ring-2 ring-[#E4232C] ring-offset-2 border-transparent scale-105' : 'border-slate-300 hover:scale-105'}`} style={{
              backgroundColor: col.hex
            }} title={col.name} />)}
              </div>
            </div>}

          {/* Quantity & CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#14232E]">Qty:</span>
              <QuantitySelector quantity={quantity} onIncrease={() => setQuantity(q => Math.min(10, q + 1))} onDecrease={() => setQuantity(q => Math.max(1, q - 1))} size="sm" />
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handleAdd} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#E4232C] hover:bg-[#C81921] text-white rounded-md text-sm font-semibold transition-colors cursor-pointer shadow-sm">
                {added ? <Check size={16} /> : <ShoppingBag size={16} />}
                <span>{added ? 'Added to Cart' : 'Add to Cart'}</span>
              </button>

              <button onClick={() => toggleWishlist(product)} className={`p-2.5 rounded-md border transition-colors cursor-pointer ${isWish ? 'bg-rose-50 text-[#E4232C] border-[#E4232C]' : 'bg-white text-slate-500 border-slate-200 hover:text-[#E4232C]'}`} title="Wishlist">
                <Heart size={18} className={isWish ? 'fill-[#E4232C]' : ''} />
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>1-Year Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-slate-600" />
                <span>Free Express Shipping</span>
              </div>
              <Link to={`/product/${product.slug}`} onClick={onClose} className="font-semibold text-[#E4232C] hover:underline">
                Full Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>;
};
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Zap, AlertCircle, Check, MessageCircle, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';
import { EyeglassesConfigurator } from './EyeglassesConfigurator';
import { ContactLensConfigurator } from './ContactLensConfigurator';
import { SunglassesConfigurator } from './SunglassesConfigurator';
import { VariantSelector } from './VariantSelector';
import { ConfigurationSummary } from './ConfigurationSummary';
import { calculateItemPrice } from '../../services/opticalEngine/pricing';
import { validateConfiguration } from '../../services/opticalEngine/validation';
import { useCart } from '../../context/CartContext';

export const ProductConfigurationEngine = ({
  product,
  initialConfiguration = null,
  initialQuantity = 1,
  onVariantChange
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const pType = product.productType || 'eyeglasses';
  const [justAdded, setJustAdded] = useState(false);

  // 1. Initial State Setup
  const defaultVariant = product.variants?.[0] || {
    id: `var-${product.id}-default`,
    colorName: 'Standard',
    price: product.price
  };

  const [configuration, setConfiguration] = useState(() => {
    if (initialConfiguration) return initialConfiguration;

    return {
      productId: product.id,
      productType: pType,
      variantId: defaultVariant.id,
      variantName: defaultVariant.colorName,
      lensSelection: pType === 'eyeglasses' ? {
        lensType: 'single-vision',
        lensId: product.eyeglassesConfig?.availableLenses?.[0]?.id,
        lensName: product.eyeglassesConfig?.availableLenses?.[0]?.name,
        lensPrice: product.eyeglassesConfig?.availableLenses?.[0]?.price || 0
      } : undefined,
      prescription: pType === 'eyeglasses' ? {
        method: 'manual',
        od: { sph: '-1.00', cyl: '0.00', axis: '' },
        os: { sph: '-1.00', cyl: '0.00', axis: '' },
        pd: '63'
      } : { method: 'none' },
      contactLens: pType === 'contact-lens' ? {
        boxes: 1,
        piecesPerBox: product.contactLensConfig?.piecesPerBox || 6,
        powerType: product.contactLensConfig?.powerType || 'spherical',
        prescriptionMethod: 'manual',
        od: { sph: '-2.00', cyl: '', axis: '' },
        os: { sph: '-2.00', cyl: '', axis: '' },
        singleEye: 'BOTH'
      } : undefined,
      sunglass: pType === 'sunglasses' ? {
        mode: 'standard',
        lensType: product.sunglassesConfig?.lensTypes?.[0]?.id || 'sg-only',
        lensName: product.sunglassesConfig?.lensTypes?.[0]?.name || 'Sunglass Only',
        lensPrice: product.sunglassesConfig?.lensTypes?.[0]?.price || 0
      } : undefined
    };
  });

  const [quantity, setQuantity] = useState(initialQuantity);
  const [validationErrors, setValidationErrors] = useState([]);

  // Sync variant changes to parent for perspective images
  useEffect(() => {
    if (onVariantChange) {
      const activeVariant =
        product.variants?.find((v) => v.id === configuration.variantId) ||
        product.variants?.[0];
      if (activeVariant) {
        onVariantChange(activeVariant);
      }
    }
  }, [configuration.variantId, product.variants, onVariantChange]);

  // 2. Pricing Breakdown
  const pricingBreakdown = useMemo(() => {
    return calculateItemPrice(product, configuration, quantity);
  }, [product, configuration, quantity]);

  // 3. Add to Cart Handler
  const handleAddToCart = () => {
    const { isValid, errors } = validateConfiguration(product, configuration);
    if (!isValid) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    addToCart(product, {
      configuration,
      quantity,
      pricing: pricingBreakdown
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // 4. Buy Now Handler
  const handleBuyNow = () => {
    const { isValid, errors } = validateConfiguration(product, configuration);
    if (!isValid) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    addToCart(product, {
      configuration,
      quantity,
      pricing: pricingBreakdown
    });

    navigate('/checkout');
  };

  return (
    <div className="space-y-6">
      {/* Category Specific Configurator */}
      {pType === 'eyeglasses' && (
        <EyeglassesConfigurator
          product={product}
          configuration={configuration}
          onChangeConfiguration={setConfiguration}
        />
      )}

      {pType === 'contact-lens' && (
        <ContactLensConfigurator
          product={product}
          configuration={configuration}
          onChangeConfiguration={setConfiguration}
        />
      )}

      {pType === 'sunglasses' && (
        <SunglassesConfigurator
          product={product}
          configuration={configuration}
          onChangeConfiguration={setConfiguration}
        />
      )}

      {pType === 'accessories' && (
        <div className="pt-2">
          <VariantSelector
            variants={product.variants}
            selectedVariantId={configuration.variantId}
            onSelectVariant={(v) => setConfiguration({
              ...configuration,
              variantId: v.id,
              variantName: v.colorName
            })}
          />
        </div>
      )}

      {/* Configuration & Pricing Summary Card */}
      <ConfigurationSummary
        product={product}
        configuration={configuration}
        pricingBreakdown={pricingBreakdown}
        quantity={quantity}
      />

      {/* Validation Errors Feedback */}
      {validationErrors.length > 0 && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
            <AlertCircle size={16} className="shrink-0 text-rose-600" />
            <span>Please complete your optical configuration:</span>
          </div>
          <ul className="list-disc list-inside text-xs text-rose-700 pl-4 space-y-1 font-medium">
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Row: Quantity + Add to Cart + Buy Now */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-slate-300 rounded-xl bg-white h-13 shrink-0 shadow-2xs">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-[#14232E] hover:bg-slate-50 transition-colors cursor-pointer text-base font-bold"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-9 text-center text-sm font-extrabold text-[#14232E] select-none tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-[#14232E] hover:bg-slate-50 transition-colors cursor-pointer text-base font-bold"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 h-13 text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap px-4 hover:shadow-lg active:scale-98 ${
              justAdded
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-[#E4232C] hover:bg-[#C81921]'
            }`}
          >
            {justAdded ? (
              <>
                <Check size={18} strokeWidth={3} />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Buy Now Button (Desktop inline) */}
          <button
            type="button"
            onClick={handleBuyNow}
            className="hidden sm:inline-flex px-7 h-13 bg-[#14232E] hover:bg-[#1E3445] text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer shrink-0 items-center justify-center gap-2 active:scale-98"
          >
            <Zap size={16} className="text-amber-400 fill-amber-400" />
            <span>Buy Now</span>
          </button>
        </div>

        {/* Full-width Buy Now for Mobile View */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full sm:hidden h-13 bg-[#14232E] hover:bg-[#1E3445] text-white text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <Zap size={16} className="text-amber-400 fill-amber-400" />
          <span>Buy Now</span>
        </button>

        {/* Free Optometrist WhatsApp Consultation Banner */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <MessageCircle size={16} className="text-emerald-600 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">Confused about your prescription power or fit?</span>
          </div>
          <a
            href="https://wa.me/919999999999?text=Hi%20The%20Lens%20Hut%2C%20I%20need%20help%20with%20my%20eyewear%20prescription"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 underline shrink-0 whitespace-nowrap"
          >
            Talk to Optician
          </a>
        </div>

        {/* Trust Badges Strip */}
        <div className="grid grid-cols-3 gap-2 py-3 px-1 border-t border-slate-100 text-slate-600 select-none">
          <div className="flex items-center gap-2">
            <Truck size={17} className="text-[#E4232C] shrink-0" />
            <div className="min-w-0">
              <h4 className="text-[11px] font-bold text-[#14232E] leading-tight truncate">Free Express Delivery</h4>
              <p className="text-[10px] text-slate-400 truncate">Across India</p>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-2">
            <RotateCcw size={17} className="text-[#E4232C] shrink-0" />
            <div className="min-w-0">
              <h4 className="text-[11px] font-bold text-[#14232E] leading-tight truncate">7-Day Easy Returns</h4>
              <p className="text-[10px] text-slate-400 truncate">Hassle-free pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-2">
            <Award size={17} className="text-[#E4232C] shrink-0" />
            <div className="min-w-0">
              <h4 className="text-[11px] font-bold text-[#14232E] leading-tight truncate">1-Year Warranty</h4>
              <p className="text-[10px] text-slate-400 truncate">100% Genuine</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

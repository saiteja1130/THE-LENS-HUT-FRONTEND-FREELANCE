import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Zap, AlertCircle } from 'lucide-react';
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

      {/* Configuration Summary Card */}
      <ConfigurationSummary
        product={product}
        configuration={configuration}
        pricingBreakdown={pricingBreakdown}
        quantity={quantity}
      />

      {/* Validation Errors Feedback */}
      {validationErrors.length > 0 && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
            <AlertCircle size={15} className="shrink-0" />
            <span>Please complete your optical configuration:</span>
          </div>
          <ul className="list-disc list-inside text-xs text-rose-600 pl-4 space-y-0.5">
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Row: Quantity + Add to Cart + Buy Now */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-slate-300 rounded-xl bg-white h-12 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-full flex items-center justify-center text-slate-500 hover:text-[#14232E] cursor-pointer text-base font-bold"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 text-center text-xs font-extrabold text-[#14232E] select-none tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="w-9 h-full flex items-center justify-center text-slate-500 hover:text-[#14232E] cursor-pointer text-base font-bold"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 h-12 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap px-4"
          >
            <ShoppingBag size={18} />
            <span>Add to Cart</span>
          </button>

          {/* Buy Now Button (Desktop inline) */}
          <button
            type="button"
            onClick={handleBuyNow}
            className="hidden sm:inline-flex px-6 h-12 bg-white hover:bg-slate-50 border-2 border-[#14232E] text-[#14232E] text-xs sm:text-sm font-extrabold rounded-xl transition-colors cursor-pointer shrink-0 items-center justify-center gap-1.5"
          >
            <Zap size={16} />
            <span>Buy Now</span>
          </button>
        </div>

        {/* Full-width Buy Now for Mobile View */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full sm:hidden h-12 bg-white hover:bg-slate-50 border-2 border-[#14232E] text-[#14232E] text-xs font-extrabold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <Zap size={16} />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};

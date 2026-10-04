import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateConfigurationHash } from '../services/opticalEngine/hasher';
import { calculateItemPrice } from '../services/opticalEngine/pricing';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('tlh_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('tlh_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  /**
   * Unified Add to Cart
   * Accepts product and options: { configuration, quantity, color, size }
   */
  const addToCart = (product, options = {}) => {
    const quantityToAdd = options.quantity || 1;
    const config = options.configuration || {
      productId: product.id,
      productType: product.productType || (product.category === 'contact-lenses' ? 'contact-lens' : product.category || 'eyeglasses'),
      variantId: options.variantId || (product.variants?.[0]?.id) || 'default',
      variantName: options.color || product.colors?.[0]?.name || 'Default'
    };

    // Calculate deterministic hash
    const configHash = generateConfigurationHash(product.id, config);

    // Calculate secure price breakdown
    const pricing = options.pricing || calculateItemPrice(product, config, quantityToAdd);
    const unitPrice = pricing.unitPrice;
    const selectedColor = config.variantName || options.color || product.colors?.[0]?.name || 'Standard';

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.configurationHash === configHash);

      if (existingIndex > -1) {
        // Identical configuration: increment quantity
        const next = [...prev];
        const updatedQty = next[existingIndex].quantity + quantityToAdd;
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: updatedQty,
          totalPrice: next[existingIndex].unitPrice * updatedQty
        };
        return next;
      }

      // New unique configuration: create distinct item
      const newItem = {
        id: `cart-item-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
        configurationHash: configHash,
        productId: product.id,
        productType: config.productType,
        product,
        variantId: config.variantId,
        selectedColor,
        selectedSize: options.size || product.size || 'Standard',
        configuration: config,
        quantity: quantityToAdd,
        unitPrice,
        totalPrice: unitPrice * quantityToAdd,
        productSnapshot: {
          name: product.name,
          brand: product.brand || 'The Lens Hut',
          sku: product.sku || product.id,
          image: product.primaryImage || (product.images && product.images[0]) || '',
          basePrice: product.price
        }
      };

      return [newItem, ...prev];
    });

    setIsCartDrawerOpen(true);
  };

  /**
   * Remove item from cart by configurationHash or ID
   */
  const removeFromCart = (identifier) => {
    setCart((prev) => prev.filter((item) => item.configurationHash !== identifier && item.id !== identifier && item.product.id !== identifier));
  };

  /**
   * Update quantity
   */
  const updateQuantity = (identifier, quantity) => {
    if (quantity <= 0) {
      removeFromCart(identifier);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.configurationHash === identifier || item.id === identifier) {
          return {
            ...item,
            quantity,
            totalPrice: item.unitPrice * quantity
          };
        }
        return item;
      })
    );
  };

  /**
   * Update existing cart item configuration (Edit Configuration support)
   */
  const updateCartItemConfiguration = (oldHashOrId, newConfiguration, newQuantity = 1) => {
    setCart((prev) => {
      const itemIndex = prev.findIndex((i) => i.configurationHash === oldHashOrId || i.id === oldHashOrId);
      if (itemIndex === -1) return prev;

      const currentItem = prev[itemIndex];
      const newHash = generateConfigurationHash(currentItem.productId, newConfiguration);
      const newPricing = calculateItemPrice(currentItem.product, newConfiguration, newQuantity);

      const updated = [...prev];
      updated[itemIndex] = {
        ...currentItem,
        configurationHash: newHash,
        configuration: newConfiguration,
        quantity: newQuantity,
        unitPrice: newPricing.unitPrice,
        totalPrice: newPricing.unitPrice * newQuantity,
        selectedColor: newConfiguration.variantName || currentItem.selectedColor
      };
      return updated;
    });
  };

  const calculateBogoDiscount = (items) => {
    if (!items || items.length === 0) return 0;
    const unitPrices = [];
    items.forEach((item) => {
      const qty = item.quantity || 1;
      const price = item.unitPrice || item.product?.price || 0;
      for (let i = 0; i < qty; i++) {
        unitPrices.push(price);
      }
    });
    unitPrices.sort((a, b) => b - a);
    let discountVal = 0;
    for (let i = 1; i < unitPrices.length; i += 2) {
      discountVal += unitPrices[i];
    }
    return discountVal;
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BOGO' || clean === 'BUY1GET1' || clean === 'B1G1') {
      setAppliedCoupon('BOGO');
      const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);
      const freeUnits = Math.floor(totalUnits / 2);
      if (freeUnits > 0) {
        return {
          success: true,
          message: `Buy 1 Get 1 Applied: ${freeUnits} item${freeUnits > 1 ? 's' : ''} FREE!`
        };
      }
      return {
        success: true,
        message: 'BOGO code applied! Add 1 more item to get it 100% FREE.'
      };
    }
    if (clean === 'VISION10') {
      setAppliedCoupon('VISION10');
      return {
        success: true,
        message: 'Coupon VISION10 applied: 10% discount on order!'
      };
    }
    if (clean === 'BRIGHT20') {
      setAppliedCoupon('BRIGHT20');
      return {
        success: true,
        message: 'Coupon BRIGHT20 applied: 20% discount on orders above ₹3,000!'
      };
    }
    if (clean === 'FIRSTHUT') {
      setAppliedCoupon('FIRSTHUT');
      return {
        success: true,
        message: 'Welcome voucher applied: ₹300 flat discount!'
      };
    }
    return {
      success: false,
      message: 'Invalid or expired coupon code. Try BOGO, VISION10 or FIRSTHUT'
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice || item.product.price) * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon === 'BOGO' || appliedCoupon === 'BUY1GET1' || appliedCoupon === 'B1G1') {
    discount = calculateBogoDiscount(cart);
  } else if (appliedCoupon === 'VISION10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'BRIGHT20') {
    discount = subtotal >= 3000 ? Math.round(subtotal * 0.2) : 0;
  } else if (appliedCoupon === 'FIRSTHUT') {
    discount = Math.min(subtotal, 300);
  }

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        discount,
        couponCode: appliedCoupon || '',
        appliedCoupon,
        shipping,
        total,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateCartItemConfiguration,
        applyCoupon,
        removeCoupon,
        clearCart,
        calculateBogoDiscount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
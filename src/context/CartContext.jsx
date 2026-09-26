import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext(undefined);
export const CartProvider = ({
  children
}) => {
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
  const addToCart = (product, options) => {
    const selectedColor = options?.color || product.colors[0]?.name || 'Default';
    const selectedSize = options?.size || product.size || 'Medium';
    const quantityToAdd = options?.quantity || 1;
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantityToAdd
        };
        return next;
      }
      return [...prev, {
        product,
        quantity: quantityToAdd,
        selectedColor,
        selectedSize,
        prescriptionDetails: options?.prescriptionType ? {
          type: options.prescriptionType
        } : undefined
      }];
    });
    setIsCartDrawerOpen(true);
  };
  const removeFromCart = (productId, color, size) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)));
  };
  const updateQuantity = (productId, color, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedColor === color && item.selectedSize === size) {
        return {
          ...item,
          quantity
        };
      }
      return item;
    }));
  };
 const calculateBogoDiscount = (items) => {
  if (!items || items.length === 0) return 0;
  const unitPrices = [];
  items.forEach(item => {
    const qty = item.quantity || 1;
    const price = item.product?.price || 0;
    for (let i = 0; i < qty; i++) {
      unitPrices.push(price);
    }
  });
  unitPrices.sort((a, b) => b - a);
  let discount = 0;
  for (let i = 1; i < unitPrices.length; i += 2) {
    discount += unitPrices[i];
  }
  return discount;
};

  const applyCoupon = code => {
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
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
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
  return <CartContext.Provider value={{
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
    applyCoupon,
    removeCoupon,
    clearCart,
    calculateBogoDiscount
  }}>
      {children}
    </CartContext.Provider>;
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
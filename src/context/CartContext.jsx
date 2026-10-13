import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateConfigurationHash } from '../services/opticalEngine/hasher';
import { calculateItemPrice } from '../services/opticalEngine/pricing';
import { useNotification } from './NotificationContext';
import { useAuth } from './AuthContext';
import { cartApi } from '../services/cartApi';

const CartContext = createContext(undefined);

const LOCAL_STORAGE_KEY = 'tlh_cart';

export const CartProvider = ({ children }) => {
  const { toast } = useNotification();
  const { user } = useAuth();

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync state to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn('Failed to save cart to localStorage:', err);
    }
  }, [cart]);

  // Sync cart with backend when user is authenticated
  const syncWithServer = useCallback(async () => {
    const token = localStorage.getItem('thelenshut_auth_token');
    if (!token) return;

    setIsLoading(true);
    try {
      if (cart.length > 0) {
        // Sync guest items with account cart on server
        const guestPayload = cart.map((item) => ({
          productId: item.productId || item.product?.id || item.product?._id,
          variantId: item.variantId,
          variantName: item.variantName || item.selectedColor,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize || 'Standard',
          image: item.image,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          configuration: item.configuration,
        }));

        const res = await cartApi.syncCart(guestPayload);
        if (res.success && res.data?.items) {
          // Update cart from server response
          setCart(
            res.data.items.map((srvItem) => ({
              id: srvItem._id || `cart-${srvItem.configurationHash}`,
              configurationHash: srvItem.configurationHash,
              productId: srvItem.productId || srvItem.product?._id,
              productType: srvItem.configuration?.productType || srvItem.product?.category || 'eyeglasses',
              product: srvItem.product || {},
              variantId: srvItem.variantId,
              variantName: srvItem.variantName || srvItem.selectedColor,
              selectedColor: srvItem.selectedColor,
              selectedSize: srvItem.selectedSize || 'Standard',
              image: srvItem.image || srvItem.product?.primaryImage || '',
              configuration: srvItem.configuration,
              quantity: srvItem.quantity,
              unitPrice: srvItem.unitPrice,
              totalPrice: srvItem.totalPrice,
              productSnapshot: {
                name: srvItem.product?.name || 'Eyewear Item',
                brand: srvItem.product?.brand || 'The Lens Hut',
                sku: srvItem.product?.sku || srvItem.productId,
                image: srvItem.image || srvItem.product?.primaryImage || '',
                basePrice: srvItem.product?.price || srvItem.unitPrice,
              },
            }))
          );
        }
      } else {
        // Retrieve server cart
        const res = await cartApi.getCart();
        if (res.success && res.data?.items && res.data.items.length > 0) {
          setCart(
            res.data.items.map((srvItem) => ({
              id: srvItem._id || `cart-${srvItem.configurationHash}`,
              configurationHash: srvItem.configurationHash,
              productId: srvItem.productId || srvItem.product?._id,
              productType: srvItem.configuration?.productType || srvItem.product?.category || 'eyeglasses',
              product: srvItem.product || {},
              variantId: srvItem.variantId,
              variantName: srvItem.variantName || srvItem.selectedColor,
              selectedColor: srvItem.selectedColor,
              selectedSize: srvItem.selectedSize || 'Standard',
              image: srvItem.image || srvItem.product?.primaryImage || '',
              configuration: srvItem.configuration,
              quantity: srvItem.quantity,
              unitPrice: srvItem.unitPrice,
              totalPrice: srvItem.totalPrice,
              productSnapshot: {
                name: srvItem.product?.name || 'Eyewear Item',
                brand: srvItem.product?.brand || 'The Lens Hut',
                sku: srvItem.product?.sku || srvItem.productId,
                image: srvItem.image || srvItem.product?.primaryImage || '',
                basePrice: srvItem.product?.price || srvItem.unitPrice,
              },
            }))
          );
        }
      }
    } catch (err) {
      console.warn('Failed to sync cart with backend:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]); // Re-sync when user changes

  useEffect(() => {
    if (user) {
      syncWithServer();
    }
  }, [user, syncWithServer]);

  /**
   * Unified Add to Cart
   * Accepts product and options: { configuration, quantity, color, size, variantId, image }
   */
  const addToCart = (product, options = {}) => {
    const quantityToAdd = options.quantity || 1;
    const selectedColor =
      options.color ||
      options.selectedColor ||
      options.configuration?.variantName ||
      options.configuration?.color ||
      product.colors?.[0]?.name ||
      'Standard';

    const variantId =
      options.variantId ||
      options.configuration?.variantId ||
      (selectedColor ? `var-${selectedColor.toLowerCase().replace(/\s+/g, '-')}` : 'default');

    // Resolve variant-specific visual image
    const variantImage =
      options.image ||
      product.variants?.find(
        (v) =>
          v.id === variantId ||
          v.color?.toLowerCase() === selectedColor?.toLowerCase() ||
          v.name?.toLowerCase() === selectedColor?.toLowerCase()
      )?.image ||
      product.colors?.find((c) => c.name?.toLowerCase() === selectedColor?.toLowerCase())?.image ||
      product.primaryImage ||
      product.images?.front ||
      (Array.isArray(product.images) ? product.images[0] : '') ||
      '';

    const config = options.configuration
      ? {
          ...options.configuration,
          variantId,
          variantName: selectedColor,
          color: selectedColor,
        }
      : {
          productId: product.id || product._id,
          productType:
            product.productType ||
            (product.category === 'contact-lenses' ? 'contact-lens' : product.category || 'eyeglasses'),
          variantId,
          variantName: selectedColor,
          color: selectedColor,
        };

    // Calculate deterministic hash
    const configHash = generateConfigurationHash(product.id || product._id, config);

    // Calculate secure price breakdown
    const pricing = options.pricing || calculateItemPrice(product, config, quantityToAdd);
    const unitPrice = pricing.unitPrice;

    // Optimistic local state update
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.configurationHash === configHash);

      if (existingIndex > -1) {
        // Identical configuration: increment quantity
        const next = [...prev];
        const updatedQty = next[existingIndex].quantity + quantityToAdd;
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: updatedQty,
          totalPrice: next[existingIndex].unitPrice * updatedQty,
        };
        return next;
      }

      // New unique configuration: create distinct item card
      const newItem = {
        id: `cart-item-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
        configurationHash: configHash,
        productId: product.id || product._id,
        productType: config.productType,
        product,
        variantId,
        variantName: selectedColor,
        selectedColor,
        selectedSize: options.size || product.size || 'Standard',
        image: variantImage,
        configuration: config,
        quantity: quantityToAdd,
        unitPrice,
        totalPrice: unitPrice * quantityToAdd,
        productSnapshot: {
          name: product.name,
          brand: product.brand || 'The Lens Hut',
          sku: product.sku || product.id || product._id,
          image: variantImage,
          basePrice: product.price,
        },
      };

      return [newItem, ...prev];
    });

    // Synchronize to backend if user is authenticated
    if (user && localStorage.getItem('thelenshut_auth_token')) {
      cartApi.addToCart({
        productId: product.id || product._id,
        configuration: config,
        quantity: quantityToAdd,
        variantId,
        variantName: selectedColor,
        selectedColor,
        selectedSize: options.size || product.size || 'Standard',
        image: variantImage,
        unitPrice,
      }).catch((err) => {
        console.warn('Backend cart add warning:', err);
      });
    }

    toast.success(`Added ${product.name} (${selectedColor}) to your shopping bag`);
    setIsCartDrawerOpen(true);
  };

  /**
   * Remove item from cart by configurationHash or ID
   */
  const removeFromCart = (identifier) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          item.configurationHash !== identifier &&
          item.id !== identifier &&
          item.product?.id !== identifier &&
          item.product?._id !== identifier
      )
    );

    if (user && localStorage.getItem('thelenshut_auth_token')) {
      cartApi.removeItem(identifier).catch((err) => {
        console.warn('Backend cart item removal warning:', err);
      });
    }

    toast.info('Item removed from shopping bag');
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
            totalPrice: item.unitPrice * quantity,
          };
        }
        return item;
      })
    );

    if (user && localStorage.getItem('thelenshut_auth_token')) {
      cartApi.updateQuantity(identifier, quantity).catch((err) => {
        console.warn('Backend cart update warning:', err);
      });
    }
  };

  /**
   * Update existing cart item configuration (Edit Configuration support)
   */
  const updateCartItemConfiguration = (oldHashOrId, newConfiguration, newQuantity = 1) => {
    setCart((prev) => {
      const itemIndex = prev.findIndex(
        (i) => i.configurationHash === oldHashOrId || i.id === oldHashOrId
      );
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
        selectedColor: newConfiguration.variantName || currentItem.selectedColor,
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
          message: `Buy 1 Get 1 Applied: ${freeUnits} item${freeUnits > 1 ? 's' : ''} FREE!`,
        };
      }
      return {
        success: true,
        message: 'BOGO code applied! Add 1 more item to get it 100% FREE.',
      };
    }
    if (clean === 'VISION10') {
      setAppliedCoupon('VISION10');
      return {
        success: true,
        message: 'Coupon VISION10 applied: 10% discount on order!',
      };
    }
    if (clean === 'BRIGHT20') {
      setAppliedCoupon('BRIGHT20');
      return {
        success: true,
        message: 'Coupon BRIGHT20 applied: 20% discount on orders above ₹3,000!',
      };
    }
    if (clean === 'FIRSTHUT') {
      setAppliedCoupon('FIRSTHUT');
      return {
        success: true,
        message: 'Welcome voucher applied: ₹300 flat discount!',
      };
    }
    return {
      success: false,
      message: 'Invalid or expired coupon code. Try BOGO, VISION10 or FIRSTHUT',
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info('Coupon code removed');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    if (user && localStorage.getItem('thelenshut_auth_token')) {
      cartApi.clearCart().catch((err) => {
        console.warn('Backend clear cart warning:', err);
      });
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.unitPrice || item.product?.price || 0) * item.quantity,
    0
  );

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
        isLoading,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateCartItemConfiguration,
        applyCoupon,
        removeCoupon,
        clearCart,
        calculateBogoDiscount,
        syncWithServer,
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
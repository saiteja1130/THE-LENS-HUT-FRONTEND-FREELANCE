import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
const WishlistContext = createContext(undefined);
export const WishlistProvider = ({
  children
}) => {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('tlh_wishlist');
      return saved ? JSON.parse(saved) : ['tlh-eg-01', 'tlh-sg-01', 'tlh-eg-02', 'tlh-eg-03'];
    } catch {
      return ['tlh-eg-01', 'tlh-sg-01', 'tlh-eg-02', 'tlh-eg-03'];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('tlh_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);
  const isInWishlist = productId => wishlistIds.includes(productId);
  const toggleWishlist = product => {
    setWishlistIds(prev => {
      if (prev.includes(product.id)) {
        return prev.filter(id => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };
  const removeFromWishlist = productId => {
    setWishlistIds(prev => prev.filter(id => id !== productId));
  };
  const clearWishlist = () => {
    setWishlistIds([]);
  };
  const wishlist = PRODUCTS.filter(p => wishlistIds.includes(p.id));
  const wishlistCount = wishlistIds.length;
  return <WishlistContext.Provider value={{
    wishlist,
    wishlistIds,
    wishlistCount,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist
  }}>
      {children}
    </WishlistContext.Provider>;
};
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
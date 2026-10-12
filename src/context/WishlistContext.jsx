import React, { createContext, useContext, useState } from 'react';
import { useNotification } from './NotificationContext';

const WishlistContext = createContext(undefined);

export const WishlistProvider = ({ children }) => {
  const { toast } = useNotification();
  const [wishlist, setWishlist] = useState([]);

  const wishlistIds = wishlist.map((p) => p.id);
  const isInWishlist = (productId) => wishlist.some((p) => p.id === productId);

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        toast.info(`Removed ${product.name || 'item'} from your wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        toast.success(`Saved ${product.name || 'item'} to your wishlist`);
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
    toast.info('Item removed from wishlist');
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.info('Wishlist cleared');
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistIds,
        wishlistCount,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNotification } from './NotificationContext';
import { useAuth } from './AuthContext';
import { wishlistApi } from '../services/wishlistApi';
import { normalizeFrontendProduct } from '../services/productApi';

const WishlistContext = createContext(undefined);

const LOCAL_STORAGE_KEY = 'tlh_wishlist';

export const WishlistProvider = ({ children }) => {
  const { toast } = useNotification();
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync state to localStorage whenever wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (err) {
      console.warn('Failed to save wishlist to localStorage:', err);
    }
  }, [wishlist]);

  // Load wishlist from server if user is authenticated
  const fetchServerWishlist = useCallback(async () => {
    const token = localStorage.getItem('thelenshut_auth_token');
    if (!token) return;

    setIsLoading(true);
    try {
      const res = await wishlistApi.getWishlist();
      if (res.success && res.data?.wishlist) {
        const normalized = res.data.wishlist.map(normalizeFrontendProduct);
        setWishlist(normalized);
      }
    } catch (err) {
      console.warn('Failed to fetch wishlist from server:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync with server whenever user changes / logs in
  useEffect(() => {
    if (user) {
      fetchServerWishlist();
    }
  }, [user, fetchServerWishlist]);

  const wishlistIds = wishlist.map((p) => (p.id || p._id)?.toString());
  const isInWishlist = (productId) => {
    if (!productId) return false;
    const target = productId.toString();
    return wishlist.some((p) => (p.id || p._id)?.toString() === target);
  };

  const toggleWishlist = async (product) => {
    if (!product) return;
    const prodId = product.id || product._id;
    if (!prodId) return;

    const normalizedProd = normalizeFrontendProduct(product);
    const exists = wishlist.some((p) => (p.id || p._id) === prodId);

    // Optimistic state update for instantaneous responsiveness
    if (exists) {
      toast.info(`Removed ${product.name || 'item'} from your wishlist`);
      setWishlist((prev) => prev.filter((p) => (p.id || p._id) !== prodId));
    } else {
      toast.success(`Saved ${product.name || 'item'} to your wishlist`);
      setWishlist((prev) => [normalizedProd, ...prev]);
    }

    // Call server API if logged in
    const token = localStorage.getItem('thelenshut_auth_token');
    if (token) {
      try {
        const res = await wishlistApi.toggleWishlist(prodId);
        if (!res.success && res.errorCode === 'UNAUTHORIZED') {
          console.warn('Unauthorized wishlist toggle on backend');
        }
      } catch (err) {
        console.warn('Server toggleWishlist background sync failed:', err);
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!productId) return;
    setWishlist((prev) => prev.filter((p) => (p.id || p._id) !== productId));
    toast.info('Item removed from wishlist');

    const token = localStorage.getItem('thelenshut_auth_token');
    if (token) {
      try {
        await wishlistApi.removeFromWishlist(productId);
      } catch (err) {
        console.warn('Server removeFromWishlist sync failed:', err);
      }
    }
  };

  const clearWishlist = async () => {
    setWishlist([]);
    toast.info('Wishlist cleared');

    const token = localStorage.getItem('thelenshut_auth_token');
    if (token) {
      try {
        await wishlistApi.clearWishlist();
      } catch (err) {
        console.warn('Server clearWishlist sync failed:', err);
      }
    }
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistIds,
        wishlistCount,
        isLoading,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        fetchServerWishlist,
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

export default WishlistContext;
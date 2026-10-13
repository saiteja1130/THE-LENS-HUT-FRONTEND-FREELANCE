import { api } from './api';

export const wishlistApi = {
  /**
   * Get authenticated user's wishlist from backend
   */
  getWishlist: async () => {
    try {
      const res = await api.get('/wishlist');
      return res;
    } catch (error) {
      console.warn('[wishlistApi Axios] Fetch wishlist failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to fetch wishlist',
        data: { wishlist: [], count: 0 },
      };
    }
  },

  /**
   * Add a product to wishlist
   */
  addToWishlist: async (productId) => {
    try {
      const res = await api.post('/wishlist', { productId });
      return res;
    } catch (error) {
      console.warn('[wishlistApi Axios] Add to wishlist failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to add to wishlist',
      };
    }
  },

  /**
   * Toggle product in wishlist (add if missing, remove if present)
   */
  toggleWishlist: async (productId) => {
    try {
      const res = await api.post('/wishlist/toggle', { productId });
      return res;
    } catch (error) {
      console.warn('[wishlistApi Axios] Toggle wishlist failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to toggle wishlist',
      };
    }
  },

  /**
   * Remove single product from wishlist
   */
  removeFromWishlist: async (productId) => {
    try {
      const res = await api.delete(`/wishlist/${productId}`);
      return res;
    } catch (error) {
      console.warn('[wishlistApi Axios] Remove from wishlist failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to remove from wishlist',
      };
    }
  },

  /**
   * Clear all items in user's wishlist
   */
  clearWishlist: async () => {
    try {
      const res = await api.delete('/wishlist');
      return res;
    } catch (error) {
      console.warn('[wishlistApi Axios] Clear wishlist failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to clear wishlist',
      };
    }
  },

  /**
   * Quick check if product is in wishlist
   */
  checkWishlistStatus: async (productId) => {
    try {
      const res = await api.get(`/wishlist/check/${productId}`);
      return res;
    } catch (error) {
      return {
        success: false,
        data: { productId, isInWishlist: false },
      };
    }
  },
};

export default wishlistApi;

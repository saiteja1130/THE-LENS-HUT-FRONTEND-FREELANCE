import { api } from './api';

export const cartApi = {
  /**
   * Get authenticated user's cart from backend
   */
  getCart: async () => {
    try {
      const res = await api.get('/cart');
      return res;
    } catch (error) {
      console.warn('[cartApi Axios] Fetch cart failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to fetch cart',
        data: { items: [], totalItems: 0, subtotal: 0 },
      };
    }
  },

  /**
   * Add a product variant / configuration to cart
   */
  addToCart: async (payload) => {
    try {
      const res = await api.post('/cart', payload);
      return res;
    } catch (error) {
      console.warn('[cartApi Axios] Add to cart failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to add to cart',
      };
    }
  },

  /**
   * Update quantity of an item in cart
   */
  updateQuantity: async (itemKey, quantity) => {
    try {
      const res = await api.put(`/cart/${encodeURIComponent(itemKey)}`, { quantity });
      return res;
    } catch (error) {
      console.warn('[cartApi Axios] Update cart quantity failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to update cart item',
      };
    }
  },

  /**
   * Remove item variant card from cart
   */
  removeItem: async (itemKey) => {
    try {
      const res = await api.delete(`/cart/${encodeURIComponent(itemKey)}`);
      return res;
    } catch (error) {
      console.warn('[cartApi Axios] Remove item failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to remove item from cart',
      };
    }
  },

  /**
   * Clear all items in cart
   */
  clearCart: async () => {
    try {
      const res = await api.delete('/cart');
      return res;
    } catch (error) {
      console.warn('[cartApi Axios] Clear cart failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to clear cart',
      };
    }
  },

  /**
   * Sync guest items with account cart upon login
   */
  syncCart: async (guestItems) => {
    try {
      const res = await api.post('/cart/sync', { guestItems });
      return res;
    } catch (error) {
      console.warn('[cartApi Axios] Sync cart failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to synchronize cart',
      };
    }
  },
};

export default cartApi;

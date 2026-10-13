import { api } from './api';

export const orderApi = {
  /**
   * Place a new order with backend API
   */
  createOrder: async (orderData) => {
    try {
      const res = await api.post('/orders', orderData);
      return res;
    } catch (error) {
      console.warn('[orderApi Axios] Create order failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to create order',
      };
    }
  },

  /**
   * Fetch authenticated user's order history
   */
  getMyOrders: async () => {
    try {
      const res = await api.get('/orders/my-orders');
      return res;
    } catch (error) {
      console.warn('[orderApi Axios] Fetch my orders failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to fetch order history',
        data: [],
      };
    }
  },

  /**
   * Fetch order details by ID or Order Number
   * @param {string} idOrOrderNumber
   * @param {Object|string} options Verification options (email, phone) or tracking mode
   */
  getOrderById: async (idOrOrderNumber, options = {}) => {
    try {
      const params = new URLSearchParams();
      if (typeof options === 'string') {
        if (options.includes('@')) {
          params.append('email', options);
        } else {
          params.append('phone', options);
        }
      } else if (options && typeof options === 'object') {
        if (options.email) params.append('email', options.email);
        if (options.phone) params.append('phone', options.phone);
        if (options.mode) params.append('mode', options.mode);
        if (options.trackingOnly) params.append('trackingOnly', 'true');
      }

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const res = await api.get(`/orders/${encodeURIComponent(idOrOrderNumber)}${queryString}`);
      return res;
    } catch (error) {
      console.warn('[orderApi Axios] Fetch order by id failed:', error.message);
      return {
        success: false,
        message: 'Network error: Unable to retrieve order details',
      };
    }
  },
};

export default orderApi;

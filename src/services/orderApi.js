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
   */
  getOrderById: async (idOrOrderNumber) => {
    try {
      const res = await api.get(`/orders/${encodeURIComponent(idOrOrderNumber)}`);
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

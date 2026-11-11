import { api } from './api';

export const paymentApi = {
  /**
   * Create Razorpay Order and stage checkout session
   * @param {Object} payload { amount (in paise), currency, receipt, orderData }
   * @returns {Promise<{ success: boolean, order_id?: string, amount?: number, currency?: string, message?: string }>}
   */
  createOrder: async ({ amount, currency = 'INR', receipt, orderData = {} }) => {
    try {
      const response = await api.post('/payment/create-order', {
        amount,
        currency,
        receipt,
        orderData,
      });
      return response;
    } catch (error) {
      console.error('[paymentApi] Error creating Razorpay order:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to initiate payment session.',
      };
    }
  },

  /**
   * Verify Razorpay Payment Signature and finalize order
   * @param {Object} payload { razorpay_order_id, razorpay_payment_id, razorpay_signature }
   * @returns {Promise<{ success: boolean, order?: Object, message?: string }>}
   */
  verifyPayment: async ({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  }) => {
    try {
      const response = await api.post('/payment/verify-payment', {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      return response;
    } catch (error) {
      console.error('[paymentApi] Error verifying payment:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Payment verification failed.',
      };
    }
  },
};

export default paymentApi;


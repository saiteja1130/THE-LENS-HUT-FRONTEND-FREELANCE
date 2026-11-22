import { api } from './api';

export const couponApi = {
  getActive: async () => {
    const response = await api.get('/coupons');
    return Array.isArray(response?.data) ? response.data : [];
  },
  validate: async (code, items) => api.post('/coupons/validate', { code, items }),
};

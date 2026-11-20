import { api } from './api';

export const brandApi = {
  /**
   * Get all active brands
   */
  getActiveBrands: async (params = {}) => {
    try {
      const res = await api.get('/brands', { params });
      return res;
    } catch (error) {
      console.error('[brandApi getActiveBrands]:', error);
      return { success: false, data: [] };
    }
  },

  /**
   * Get brand details by slug or id
   */
  getBrandBySlug: async (idOrSlug) => {
    try {
      const res = await api.get(`/brands/${idOrSlug}`);
      return res;
    } catch (error) {
      console.error('[brandApi getBrandBySlug]:', error);
      return { success: false, data: null };
    }
  },
};

export default brandApi;

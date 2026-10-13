import { api } from './api';

export const categoryApi = {
  /**
   * Fetch active categories for storefront
   */
  getActiveCategories: async (featuredOnly = false) => {
    try {
      const url = `/categories${featuredOnly ? '?featured=true' : ''}`;
      const res = await api.get(url);

      return {
        success: Boolean(res?.success),
        data: Array.isArray(res?.data) ? res.data : [],
      };
    } catch (error) {
      console.warn('[CategoryApi Frontend Axios] Failed to fetch categories from backend:', error.message);
      return { success: false, data: [] };
    }
  },
};

export default categoryApi;

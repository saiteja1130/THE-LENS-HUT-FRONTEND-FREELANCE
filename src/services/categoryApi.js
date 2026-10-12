const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const categoryApi = {
  /**
   * Fetch active categories for storefront
   */
  getActiveCategories: async (featuredOnly = false) => {
    try {
      const url = `${API_BASE_URL}/categories${featuredOnly ? '?featured=true' : ''}`;
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        return { success: false, data: [] };
      }

      const data = await response.json();
      return {
        success: true,
        data: Array.isArray(data.data) ? data.data : [],
      };
    } catch (error) {
      console.warn('[CategoryApi Frontend] Failed to fetch categories from backend, using fallback:', error.message);
      return { success: false, data: [] };
    }
  },
};

export default categoryApi;

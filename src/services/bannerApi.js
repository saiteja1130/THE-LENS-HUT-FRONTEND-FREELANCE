const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const bannerApi = {
  /**
   * Fetch active hero banners
   */
  getHeroBanners: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/banners?position=hero`, {
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
      console.warn('[BannerApi] Backend banner fetch failed, using fallback slides:', error.message);
      return { success: false, data: [] };
    }
  },
};

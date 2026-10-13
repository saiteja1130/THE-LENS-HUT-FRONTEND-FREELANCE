import { api } from './api';

export const bannerApi = {
  /**
   * Fetch active hero banners
   */
  getHeroBanners: async () => {
    try {
      const res = await api.get('/banners?position=hero');
      return {
        success: Boolean(res?.success),
        data: Array.isArray(res?.data) ? res.data : [],
      };
    } catch (error) {
      console.warn('[BannerApi Axios] Backend banner fetch failed, using fallback slides:', error.message);
      return { success: false, data: [] };
    }
  },
};

export default bannerApi;

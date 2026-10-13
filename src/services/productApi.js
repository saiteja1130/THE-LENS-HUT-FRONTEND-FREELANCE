import { api } from './api';

export const normalizeFrontendProduct = (p) => {
  if (!p) return null;
  const frontImg = p.images?.front || p.primaryImage || p.image || '';
  const sideImg = p.images?.side || p.secondaryImage || '';
  const angleImg = p.images?.angle || '';
  const price = Number(p.price) || 0;
  const mrp = Number(p.mrp) || Number(p.offerPrice) || price;
  const discountPercent =
    p.discountPercent !== undefined && p.discountPercent !== null
      ? Number(p.discountPercent)
      : mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : 0;

  return {
    ...p,
    id: p.id || p._id,
    name: p.name,
    slug: p.slug || (p.name ? p.name.toLowerCase().replace(/\s+/g, '-') : 'product'),
    sku: p.sku || `TLH-${p.id || 'PROD'}`,
    brand: p.brand || 'The Lens Hut Reserve',
    category: p.category || 'eyeglasses',
    categorySlug: p.categorySlug || (p.category ? p.category.toLowerCase().replace(/\s+/g, '-') : 'eyeglasses'),
    productType: p.productType || (p.category === 'contact-lenses' ? 'contact-lens' : p.category || 'eyeglasses'),
    gender: p.gender || 'Unisex',
    price,
    mrp,
    discountPercent,
    images: {
      front: frontImg,
      side: sideImg,
      angle: angleImg,
    },
    primaryImage: frontImg,
    secondaryImage: sideImg,
    image: frontImg,
    colors: Array.isArray(p.colors) ? p.colors : [],
    frameShape: p.frameSpecifications?.shape || p.frameShape || 'Round',
    frameType: p.frameSpecifications?.frameType || p.frameType || 'Full Rim',
    material: p.frameSpecifications?.material || p.material || 'Acetate',
    rating: Number(p.rating) || 4.8,
    reviewCount: Number(p.reviewsCount || p.reviewCount) || 0,
    isBestSeller: Boolean(p.isBestSeller),
    isNew: Boolean(p.isNewArrival || p.isNew),
    inStock: p.stock !== undefined ? p.stock > 0 : true,
    stock: p.stock !== undefined ? p.stock : 0,
    isInWishlist: Boolean(p.isInWishlist),
  };
};

export const productApi = {
  /**
   * Fetch products with query filters, sorting, and pagination
   */
  getProducts: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '' && val !== 'all' && val !== 'All') {
          queryParams.append(key, val);
        }
      });

      const queryString = queryParams.toString();
      const res = await api.get(`/products${queryString ? `?${queryString}` : ''}`);

      if (res?.success && Array.isArray(res.data)) {
        return {
          success: true,
          data: res.data.map(normalizeFrontendProduct),
          pagination: res.pagination || { total: res.data.length, page: 1, limit: res.data.length, totalPages: 1 },
        };
      }
    } catch (error) {
      console.warn('[ProductApi Axios] Live API unavailable:', error.message);
    }

    return {
      success: false,
      data: [],
      pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
    };
  },

  /**
   * Fetch single product by slug or id
   */
  getProductBySlug: async (slugOrId) => {
    try {
      const res = await api.get(`/products/${slugOrId}`);
      if (res?.success && res.data) {
        return {
          success: true,
          data: normalizeFrontendProduct(res.data),
        };
      }
    } catch (error) {
      console.warn('[ProductApi Axios] Single product fetch failed:', error.message);
    }

    return {
      success: false,
      data: null,
    };
  },

  /**
   * Fetch featured products for homepage
   */
  getFeaturedProducts: async (limit = 5) => {
    try {
      const res = await api.get(`/products/featured?limit=${limit}`);
      if (res?.success && Array.isArray(res.data)) {
        return {
          success: true,
          data: res.data.map(normalizeFrontendProduct),
        };
      }
    } catch (error) {
      console.warn('[ProductApi Axios] Featured products fetch failed:', error.message);
    }

    return {
      success: false,
      data: [],
    };
  },
};

export default productApi;

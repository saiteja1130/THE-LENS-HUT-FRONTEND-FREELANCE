const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

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

      const response = await fetch(`${API_BASE_URL}/products?${queryParams.toString()}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          return {
            success: true,
            data: result.data.map(normalizeFrontendProduct),
            pagination: result.pagination || { total: result.data.length, page: 1, limit: result.data.length, totalPages: 1 },
          };
        }
      }
    } catch (error) {
      console.warn('[ProductApi Frontend] Live API unavailable:', error.message);
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
      const response = await fetch(`${API_BASE_URL}/products/${slugOrId}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          return {
            success: true,
            data: normalizeFrontendProduct(result.data),
          };
        }
      }
    } catch (error) {
      console.warn('[ProductApi Frontend] Single product fetch failed:', error.message);
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
      const response = await fetch(`${API_BASE_URL}/products/featured?limit=${limit}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          return {
            success: true,
            data: result.data.map(normalizeFrontendProduct),
          };
        }
      }
    } catch (error) {
      console.warn('[ProductApi Frontend] Featured products fetch failed:', error.message);
    }

    return {
      success: false,
      data: [],
    };
  },
};

export default productApi;

import { generateEyewearSvg } from '../utils/productImages';
export const PRODUCTS = [
// ==========================================
// EYEGLASSES (SPECTACLES)
// Shapes: Round, Cat-Eye, Clubmaster, Geometric, Rectangle, Butterfly, Pilot, Square, Wayfarer
// Types: Full Rim, Half Rim, Rimless
// Genders: Men, Women, Unisex
// Colors: Black, Red, Gold, Green, Purple, Blue, Brown, Silver
// ==========================================
{
  id: 'tlh-eg-01',
  slug: 'lumina-round-titanium-eyeglasses',
  name: 'Lumina Round Titanium',
  brand: 'The Lens Hut Reserve',
  category: 'eyeglasses',
  gender: 'Unisex',
  frameShape: 'Round',
  frameType: 'Full Rim',
  material: 'Titanium',
  primaryColor: 'Blue',
  colors: [{
    name: 'Blue',
    hex: '#14232E',
    image: generateEyewearSvg({
      type: 'round',
      color: '#14232E',
      accentColor: '#B8860B'
    })
  }, {
    name: 'Gold',
    hex: '#D4AF37',
    image: generateEyewearSvg({
      type: 'round',
      color: '#D4AF37',
      accentColor: '#14232E'
    })
  }, {
    name: 'Red',
    hex: '#B76E79',
    image: generateEyewearSvg({
      type: 'round',
      color: '#B76E79',
      accentColor: '#F5E6E8'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'round',
    color: '#14232E',
    accentColor: '#B8860B'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'round',
    color: '#D4AF37',
    accentColor: '#14232E'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'round',
    color: '#14232E',
    accentColor: '#B8860B'
  }), generateEyewearSvg({
    type: 'round',
    color: '#D4AF37',
    accentColor: '#14232E'
  })],
  mrp: 3999,
  price: 2499,
  discountPercent: 38,
  rating: 4.8,
  reviewCount: 142,
  isNew: true,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 49,
    bridgeWidth: 20,
    templeLength: 145
  },
  description: 'Crafted from ultra-lightweight aerospace-grade Japanese titanium, the Lumina Round features our signature keyhole bridge and featherweight 11g profile for all-day effortless comfort.',
  features: ['Ultra-lightweight Japanese Titanium (11g)', 'Anti-reflective blue-light block coating', 'Hypoallergenic medical-grade silicone nose pads', 'Includes premium hard case and microfiber cleaning cloth'],
  specifications: {
    'Frame Material': 'Beta Titanium',
    'Weight': '11 grams',
    'Hinge Type': 'German 5-barrel barrel hinges',
    'Prescription Suitability': 'Single Vision, Progressive, Zero-Power Computer'
  }
}, {
  id: 'tlh-eg-02',
  slug: 'verona-cat-eye-acetate-eyeglasses',
  name: 'Verona Sculpted Cat-Eye',
  brand: 'Vogue Eyewear',
  category: 'eyeglasses',
  gender: 'Women',
  frameShape: 'Cat-Eye',
  frameType: 'Full Rim',
  material: 'Italian Acetate',
  primaryColor: 'Brown',
  colors: [{
    name: 'Brown',
    hex: '#593215',
    image: generateEyewearSvg({
      type: 'cat-eye',
      color: '#593215',
      accentColor: '#D4AF37'
    })
  }, {
    name: 'Black',
    hex: '#14232E',
    image: generateEyewearSvg({
      type: 'cat-eye',
      color: '#14232E',
      accentColor: '#E4232C'
    })
  }, {
    name: 'Red',
    hex: '#B76E79',
    image: generateEyewearSvg({
      type: 'cat-eye',
      color: '#B76E79',
      accentColor: '#FFFFFF'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'cat-eye',
    color: '#593215',
    accentColor: '#D4AF37'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'cat-eye',
    color: '#14232E',
    accentColor: '#E4232C'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'cat-eye',
    color: '#593215',
    accentColor: '#D4AF37'
  }), generateEyewearSvg({
    type: 'cat-eye',
    color: '#14232E',
    accentColor: '#E4232C'
  })],
  mrp: 4499,
  price: 2999,
  discountPercent: 33,
  rating: 4.9,
  reviewCount: 98,
  isNew: false,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 52,
    bridgeWidth: 17,
    templeLength: 140
  },
  description: 'An architectural take on the iconic 1960s cat-eye silhouette. Hand-polished Italian cellulose acetate delivers rich tonal depth and lasting optical precision.',
  features: ['Handmade Mazzucchelli Italian Acetate', 'Sculpted temple tips for ergonomic hold', 'Scratch-resistant oleophobic hard-coat', 'Free 1-Year Frame Warranty & 14-Day Returns'],
  specifications: {
    'Frame Material': 'Italian Cellulose Acetate',
    'Weight': '22 grams',
    'Frame Fit': 'Medium / Standard Universal Fit',
    'UV Protection': 'UV400 Category 0 Optical Clear'
  }
}, {
  id: 'tlh-eg-03',
  slug: 'metropolitan-clubmaster-eyeglasses',
  name: 'Metropolitan Browline',
  brand: 'The Lens Hut Reserve',
  category: 'eyeglasses',
  gender: 'Men',
  frameShape: 'Clubmaster',
  frameType: 'Half Rim',
  material: 'Stainless Steel',
  primaryColor: 'Blue',
  colors: [{
    name: 'Blue',
    hex: '#14232E',
    image: generateEyewearSvg({
      type: 'clubmaster',
      color: '#14232E',
      accentColor: '#D4AF37'
    })
  }, {
    name: 'Silver',
    hex: '#94A3B8',
    image: generateEyewearSvg({
      type: 'clubmaster',
      color: '#64748B',
      accentColor: '#CBD5E1'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'clubmaster',
    color: '#14232E',
    accentColor: '#D4AF37'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'clubmaster',
    color: '#64748B',
    accentColor: '#CBD5E1'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'clubmaster',
    color: '#14232E',
    accentColor: '#D4AF37'
  })],
  mrp: 3299,
  price: 1999,
  discountPercent: 39,
  rating: 4.7,
  reviewCount: 86,
  isNew: true,
  isFeatured: false,
  isBestSeller: true,
  inStock: true,
  size: 'Wide',
  dimensions: {
    lensWidth: 53,
    bridgeWidth: 19,
    templeLength: 145
  },
  description: 'A distinguished half-rim browline frame engineered for modern leaders and creatives. Features calibrated steel lower eyewires and hand-finished acetate brows.',
  features: ['Architectural dual-tone browline styling', 'Corrosion-proof surgical stainless steel', 'Custom flex-hinge system for active wear', 'Available with BlueProtect computer lenses'],
  specifications: {
    'Frame Material': 'Stainless Steel & Acetate Brow',
    'Weight': '18 grams',
    'Face Shape Suitability': 'Oval, Round, Diamond, Heart',
    'Warranty': '12 Months Manufacturing Warranty'
  }
}, {
  id: 'tlh-eg-04',
  slug: 'apex-geometric-titanium-eyeglasses',
  name: 'Apex Octagonal Titanium',
  brand: 'John Jacobs',
  category: 'eyeglasses',
  gender: 'Unisex',
  frameShape: 'Geometric',
  frameType: 'Full Rim',
  material: 'Titanium',
  primaryColor: 'Gold',
  colors: [{
    name: 'Gold',
    hex: '#B76E79',
    image: generateEyewearSvg({
      type: 'round',
      color: '#B76E79',
      accentColor: '#14232E'
    })
  }, {
    name: 'Black',
    hex: '#1E293B',
    image: generateEyewearSvg({
      type: 'round',
      color: '#0F172A',
      accentColor: '#E4232C'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'round',
    color: '#B76E79',
    accentColor: '#14232E'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'round',
    color: '#0F172A',
    accentColor: '#E4232C'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'round',
    color: '#B76E79',
    accentColor: '#14232E'
  })],
  mrp: 3799,
  price: 2299,
  discountPercent: 39,
  rating: 4.6,
  reviewCount: 64,
  isNew: true,
  isFeatured: true,
  isBestSeller: false,
  inStock: true,
  size: 'Small',
  dimensions: {
    lensWidth: 48,
    bridgeWidth: 21,
    templeLength: 142
  },
  description: 'Crisp eight-sided geometry reimagined with refined precision. Ultra-thin titanium wire keeps the look subtle yet distinctly modern.',
  features: ['Sculpted 8-sided geometric perimeter', 'Super-elastic beta titanium bridge', 'Laser-etched temple detailing', 'Premium anti-smudge hydrophobic coating'],
  specifications: {
    'Frame Material': 'Aerospace Beta-Titanium',
    'Weight': '10.5 grams',
    'Gender': 'Unisex',
    'Prescription Index': '1.50 to 1.74 High Index Compatible'
  }
}, {
  id: 'tlh-eg-05',
  slug: 'berlin-minimalist-rimless-titanium',
  name: 'Berlin Ultra-Light Rimless',
  brand: 'Titan Eyeplus',
  category: 'eyeglasses',
  gender: 'Unisex',
  frameShape: 'Rectangle',
  frameType: 'Rimless',
  material: 'Titanium',
  primaryColor: 'Silver',
  colors: [{
    name: 'Silver',
    hex: '#94A3B8',
    image: generateEyewearSvg({
      type: 'round',
      color: '#94A3B8',
      accentColor: '#14232E'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'round',
    color: '#94A3B8',
    accentColor: '#14232E'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'round',
    color: '#94A3B8',
    accentColor: '#14232E'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'round',
    color: '#94A3B8',
    accentColor: '#14232E'
  })],
  mrp: 5299,
  price: 3699,
  discountPercent: 30,
  rating: 4.7,
  reviewCount: 54,
  isNew: true,
  isFeatured: false,
  isBestSeller: false,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 51,
    bridgeWidth: 18,
    templeLength: 140
  },
  description: 'Barely-there aesthetics with maximum structural resilience. Weighing merely 8 grams, the Berlin Rimless dissolves onto your face for an unobstructed field of vision.',
  features: ['Featherweight 8g total frame weight', 'Screwless hinge compression mount', 'Custom lens shape tailoring available', 'Anti-reflective clear demo lenses included'],
  specifications: {
    'Frame Material': 'Pure Titanium Grade 2',
    'Weight': '8.2 grams',
    'Frame Style': 'Three-Piece Rimless Mount',
    'Prescription Range': 'High Index 1.60+ Recommended'
  }
}, {
  id: 'tlh-eg-06',
  slug: 'modena-butterfly-luxe-spectacle',
  name: 'Modena Butterfly Luxe',
  brand: 'Vogue Eyewear',
  category: 'eyeglasses',
  gender: 'Women',
  frameShape: 'Butterfly',
  frameType: 'Full Rim',
  material: 'Italian Acetate',
  primaryColor: 'Purple',
  colors: [{
    name: 'Purple',
    hex: '#7E22CE',
    image: generateEyewearSvg({
      type: 'cat-eye',
      color: '#7E22CE',
      accentColor: '#E9D5FF'
    })
  }, {
    name: 'Red',
    hex: '#DC2626',
    image: generateEyewearSvg({
      type: 'cat-eye',
      color: '#B91C1C',
      accentColor: '#FCA5A5'
    })
  }, {
    name: 'Gold',
    hex: '#D4AF37',
    image: generateEyewearSvg({
      type: 'cat-eye',
      color: '#B45309',
      accentColor: '#FEF08A'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'cat-eye',
    color: '#7E22CE',
    accentColor: '#E9D5FF'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'cat-eye',
    color: '#B91C1C',
    accentColor: '#FCA5A5'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'cat-eye',
    color: '#7E22CE',
    accentColor: '#E9D5FF'
  })],
  mrp: 4799,
  price: 3199,
  discountPercent: 33,
  rating: 4.8,
  reviewCount: 42,
  isNew: true,
  isFeatured: true,
  isBestSeller: false,
  inStock: true,
  size: 'Wide',
  dimensions: {
    lensWidth: 54,
    bridgeWidth: 17,
    templeLength: 142
  },
  description: 'Sweeping butterfly wings sculpted from translucent Italian Mazzucchelli acetate, featuring dual-tone temple arms and ergonomic nose bridge.',
  features: ['Distinctive butterfly contour geometry', 'Ergonomic balance prevents cheek resting', 'Blue-light & UV computer filter compatible', 'Includes microfiber sleeve and hard case'],
  specifications: {
    'Frame Material': 'Cellulose Acetate & Nickel-Free Monel',
    'Weight': '21 grams',
    'Gender': 'Women',
    'Warranty': '1 Year'
  }
}, {
  id: 'tlh-eg-07',
  slug: 'aero-pilot-half-rim-spectacle',
  name: 'Aero Pilot Navigator Spectacle',
  brand: 'The Lens Hut Reserve',
  category: 'eyeglasses',
  gender: 'Men',
  frameShape: 'Pilot',
  frameType: 'Half Rim',
  material: 'Stainless Steel',
  primaryColor: 'Silver',
  colors: [{
    name: 'Silver',
    hex: '#94A3B8',
    image: generateEyewearSvg({
      type: 'aviator',
      color: '#64748B',
      accentColor: '#CBD5E1'
    })
  }, {
    name: 'Black',
    hex: '#1E293B',
    image: generateEyewearSvg({
      type: 'aviator',
      color: '#0F172A',
      accentColor: '#475569'
    })
  }, {
    name: 'Gold',
    hex: '#D4AF37',
    image: generateEyewearSvg({
      type: 'aviator',
      color: '#B45309',
      accentColor: '#FEF08A'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'aviator',
    color: '#64748B',
    accentColor: '#CBD5E1'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'aviator',
    color: '#0F172A',
    accentColor: '#475569'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'aviator',
    color: '#64748B',
    accentColor: '#CBD5E1'
  })],
  mrp: 3599,
  price: 2199,
  discountPercent: 39,
  rating: 4.8,
  reviewCount: 75,
  isNew: true,
  isFeatured: false,
  isBestSeller: true,
  inStock: true,
  size: 'Wide',
  dimensions: {
    lensWidth: 56,
    bridgeWidth: 16,
    templeLength: 145
  },
  description: 'Modernized half-rim pilot teardrop frame engineered in aero-grade alloy. Delivers an authoritative profile with featherlight weight balance.',
  features: ['Semi-rimless pilot silhouette', 'Dual-bridge architectural brow bar', 'Cushioned comfort silicone nose pads', 'Corrosion-resistant matte finish'],
  specifications: {
    'Frame Material': 'Surgical Stainless Steel',
    'Weight': '16.5 grams',
    'Gender': 'Men'
  }
}, {
  id: 'tlh-eg-08',
  slug: 'cambridge-executive-square-spectacle',
  name: 'Cambridge Executive Square',
  brand: 'John Jacobs',
  category: 'eyeglasses',
  gender: 'Men',
  frameShape: 'Square',
  frameType: 'Full Rim',
  material: 'Italian Acetate',
  primaryColor: 'Black',
  colors: [{
    name: 'Black',
    hex: '#000000',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#0F172A',
      accentColor: '#64748B'
    })
  }, {
    name: 'Brown',
    hex: '#78350F',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#78350F',
      accentColor: '#B45309'
    })
  }, {
    name: 'Green',
    hex: '#15803D',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#166534',
      accentColor: '#86EFAC'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'wayfarer',
    color: '#0F172A',
    accentColor: '#64748B'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'wayfarer',
    color: '#78350F',
    accentColor: '#B45309'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'wayfarer',
    color: '#0F172A',
    accentColor: '#64748B'
  })],
  mrp: 4199,
  price: 2699,
  discountPercent: 36,
  rating: 4.7,
  reviewCount: 58,
  isNew: false,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 52,
    bridgeWidth: 19,
    templeLength: 145
  },
  description: 'Clean, defined square angles crafted from dense cellulose acetate with custom wire-core temples for bespoke behind-ear shaping.',
  features: ['Structured square optical profile', 'Embedded steel wire cores in acetate temples', 'High-clarity prescription lens mounting', 'Comfort-sculpted keyhole bridge'],
  specifications: {
    'Frame Material': 'Hand-beveled Italian Acetate',
    'Weight': '24 grams',
    'Face Suitability': 'Round, Oval, Diamond'
  }
}, {
  id: 'tlh-eg-09',
  slug: 'oxford-wayfarer-spectacle',
  name: 'Oxford Classic Wayfarer Spectacle',
  brand: 'Ray-Ban',
  category: 'eyeglasses',
  gender: 'Unisex',
  frameShape: 'Wayfarer',
  frameType: 'Full Rim',
  material: 'Italian Acetate',
  primaryColor: 'Brown',
  colors: [{
    name: 'Black',
    hex: '#000000',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#000000',
      accentColor: '#E2E8F0'
    })
  }, {
    name: 'Brown',
    hex: '#78350F',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#593215',
      accentColor: '#D4AF37'
    })
  }, {
    name: 'Red',
    hex: '#DC2626',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#991B1B',
      accentColor: '#FCA5A5'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'wayfarer',
    color: '#593215',
    accentColor: '#D4AF37'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'wayfarer',
    color: '#000000',
    accentColor: '#E2E8F0'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'wayfarer',
    color: '#593215',
    accentColor: '#D4AF37'
  })],
  mrp: 4990,
  price: 3490,
  discountPercent: 30,
  rating: 4.9,
  reviewCount: 110,
  isNew: false,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 50,
    bridgeWidth: 21,
    templeLength: 145
  },
  description: 'The definitive trapezoidal wayfarer silhouette in clear optical execution. Features authentic metal wing rivets and hand-buffed acetate shine.',
  features: ['Iconic trapezoidal wayfarer shape', 'Signature front rivet hardware', 'Optical lab clear demo lenses', 'Includes Ray-Ban presentation box & leather case'],
  specifications: {
    'Frame Material': 'Italian Acetate',
    'Weight': '28 grams',
    'Gender': 'Unisex'
  }
},
// ==========================================
// SUNGLASSES
// Shapes: Aviator, Butterfly, Cat Eye, Pilot, Rectangle, Round, Square, Wayfarer
// Types: Full Rim, Half Rim
// Genders: Men, Women, Unisex
// Colors: Black, Red, Gold, Green, Purple, Blue, Brown, Silver
// ==========================================
{
  id: 'tlh-sg-01',
  slug: 'aviator-classic-polarized-sunglasses',
  name: 'Aviator Reserve Polarized',
  brand: 'The Lens Hut Reserve',
  category: 'sunglasses',
  gender: 'Unisex',
  frameShape: 'Aviator',
  frameType: 'Full Rim',
  material: 'Stainless Steel',
  primaryColor: 'Gold',
  colors: [{
    name: 'Gold',
    hex: '#D4AF37',
    image: generateEyewearSvg({
      type: 'aviator',
      color: '#D4AF37',
      lensTint: '#1B4332',
      accentColor: '#D4AF37',
      polarized: true
    })
  }, {
    name: 'Green',
    hex: '#15803D',
    image: generateEyewearSvg({
      type: 'aviator',
      color: '#166534',
      lensTint: '#0F172A',
      accentColor: '#22C55E',
      polarized: true
    })
  }, {
    name: 'Silver',
    hex: '#94A3B8',
    image: generateEyewearSvg({
      type: 'aviator',
      color: '#64748B',
      lensTint: '#0F172A',
      accentColor: '#CBD5E1',
      polarized: true
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'aviator',
    color: '#D4AF37',
    lensTint: '#1B4332',
    accentColor: '#D4AF37',
    polarized: true
  }),
  secondaryImage: generateEyewearSvg({
    type: 'aviator',
    color: '#64748B',
    lensTint: '#0F172A',
    accentColor: '#CBD5E1',
    polarized: true
  }),
  galleryImages: [generateEyewearSvg({
    type: 'aviator',
    color: '#D4AF37',
    lensTint: '#1B4332',
    accentColor: '#D4AF37',
    polarized: true
  })],
  mrp: 4999,
  price: 3299,
  discountPercent: 34,
  rating: 4.9,
  reviewCount: 218,
  isNew: false,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  lensType: 'Polarized Tri-Acetate Cellulose (TAC)',
  uvProtection: '100% UV400 Protection',
  polarized: true,
  size: 'Wide',
  dimensions: {
    lensWidth: 58,
    bridgeWidth: 14,
    templeLength: 140
  },
  description: 'The definitive pilot shape enhanced with high-definition polarization. Cuts 99.9% of blinding road and water glare while rendering colors vivid and sharp.',
  features: ['HD Polarized Japanese TAC Lenses', '100% UVA/UVB/UVC UV400 blocking', 'Double-bridge military pilot construction', 'Cushioned comfort bridge nose pads'],
  specifications: {
    'Lens Technology': '9-Layer HD Polarized Filter',
    'Frame Material': 'Corrosion-Resistant Monel Alloy',
    'Lens Color': 'Heritage Bottle Green G-15',
    'Polarized': 'Yes, Certified Glare Block'
  }
}, {
  id: 'tlh-sg-02',
  slug: 'monaco-wayfarer-matte-sunglasses',
  name: 'Monaco Bold Wayfarer Polarized',
  brand: 'Ray-Ban',
  category: 'sunglasses',
  gender: 'Men',
  frameShape: 'Wayfarer',
  frameType: 'Full Rim',
  material: 'Italian Acetate',
  primaryColor: 'Blue',
  colors: [{
    name: 'Blue',
    hex: '#14232E',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#14232E',
      lensTint: '#0B131A',
      polarized: true
    })
  }, {
    name: 'Black',
    hex: '#000000',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#0A0A0A',
      lensTint: '#111827',
      polarized: true
    })
  }, {
    name: 'Brown',
    hex: '#78350F',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#593215',
      lensTint: '#451A03',
      polarized: true
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'wayfarer',
    color: '#14232E',
    lensTint: '#0B131A',
    polarized: true
  }),
  secondaryImage: generateEyewearSvg({
    type: 'wayfarer',
    color: '#0A0A0A',
    lensTint: '#111827',
    polarized: true
  }),
  galleryImages: [generateEyewearSvg({
    type: 'wayfarer',
    color: '#14232E',
    lensTint: '#0B131A',
    polarized: true
  })],
  mrp: 6490,
  price: 4890,
  discountPercent: 25,
  rating: 4.9,
  reviewCount: 310,
  isNew: false,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  lensType: 'Mineral Glass Polarized',
  uvProtection: 'UV400',
  polarized: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 50,
    bridgeWidth: 22,
    templeLength: 150
  },
  description: 'Timeless rock-and-roll icon. Featuring thick sculptured acetate bevels, solid metal barrel pins, and premium polarized crystal lenses that resist scratching under all conditions.',
  features: ['Original Italian acetate chunky profile', 'True color perception polarized glass', 'Iconic silver frontal rivet plaques', 'Includes Ray-Ban signature embossed case'],
  specifications: {
    'Frame Material': 'Extruded Italian Acetate',
    'Lens Material': 'Tempered Optical Glass',
    'Polarized': 'Yes',
    'Weight': '38 grams'
  }
}, {
  id: 'tlh-sg-03',
  slug: 'palermo-oversized-cat-eye-sunglasses',
  name: 'Palermo Riviera Cat-Eye',
  brand: 'Vogue Eyewear',
  category: 'sunglasses',
  gender: 'Women',
  frameShape: 'Cat-Eye',
  frameType: 'Full Rim',
  material: 'Italian Acetate',
  primaryColor: 'Brown',
  colors: [{
    name: 'Brown',
    hex: '#78350F',
    image: generateEyewearSvg({
      type: 'cat-eye',
      color: '#78350F',
      lensTint: '#9A3412',
      accentColor: '#F59E0B'
    })
  }, {
    name: 'Black',
    hex: '#14232E',
    image: generateEyewearSvg({
      type: 'cat-eye',
      color: '#14232E',
      lensTint: '#0F172A',
      accentColor: '#CBD5E1'
    })
  }, {
    name: 'Red',
    hex: '#DC2626',
    image: generateEyewearSvg({
      type: 'cat-eye',
      color: '#991B1B',
      lensTint: '#7F1D1D',
      accentColor: '#FECACA'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'cat-eye',
    color: '#78350F',
    lensTint: '#9A3412',
    accentColor: '#F59E0B'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'cat-eye',
    color: '#14232E',
    lensTint: '#0F172A',
    accentColor: '#CBD5E1'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'cat-eye',
    color: '#78350F',
    lensTint: '#9A3412',
    accentColor: '#F59E0B'
  })],
  mrp: 4299,
  price: 2799,
  discountPercent: 35,
  rating: 4.8,
  reviewCount: 78,
  isNew: true,
  isFeatured: false,
  isBestSeller: true,
  inStock: true,
  lensType: 'Gradient UV400 Lens',
  uvProtection: 'UV400 Category 3',
  polarized: false,
  size: 'Wide',
  dimensions: {
    lensWidth: 55,
    bridgeWidth: 18,
    templeLength: 140
  },
  description: 'Channel Mediterranean glam with sculpted flared edges and warm gradient amber tints. The Palermo provides full peripheral sun protection with high fashion allure.',
  features: ['High-coverage flared silhouette', 'Warm brown gradient sun tint', 'Comfort-molded nose bridge', 'Free micro-suede travel pouch'],
  specifications: {
    'Frame Material': 'Cellulose Acetate',
    'Lens Treatment': 'Graduated Sun Shield',
    'UV Level': 'Category 3 - Strong Sunlight Protection'
  }
}, {
  id: 'tlh-sg-04',
  slug: 'mariposa-butterfly-polarized-sunglasses',
  name: 'Mariposa Oversized Butterfly Polarized',
  brand: 'The Lens Hut Reserve',
  category: 'sunglasses',
  gender: 'Women',
  frameShape: 'Butterfly',
  frameType: 'Full Rim',
  material: 'Italian Acetate',
  primaryColor: 'Purple',
  colors: [{
    name: 'Purple',
    hex: '#7E22CE',
    image: generateEyewearSvg({
      type: 'cat-eye',
      color: '#7E22CE',
      lensTint: '#581C87',
      accentColor: '#F3E8FF',
      polarized: true
    })
  }, {
    name: 'Black',
    hex: '#000000',
    image: generateEyewearSvg({
      type: 'cat-eye',
      color: '#000000',
      lensTint: '#0F172A',
      accentColor: '#E2E8F0',
      polarized: true
    })
  }, {
    name: 'Red',
    hex: '#DC2626',
    image: generateEyewearSvg({
      type: 'cat-eye',
      color: '#B91C1C',
      lensTint: '#7F1D1D',
      accentColor: '#FEE2E2',
      polarized: true
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'cat-eye',
    color: '#7E22CE',
    lensTint: '#581C87',
    accentColor: '#F3E8FF',
    polarized: true
  }),
  secondaryImage: generateEyewearSvg({
    type: 'cat-eye',
    color: '#000000',
    lensTint: '#0F172A',
    accentColor: '#E2E8F0',
    polarized: true
  }),
  galleryImages: [generateEyewearSvg({
    type: 'cat-eye',
    color: '#7E22CE',
    lensTint: '#581C87',
    accentColor: '#F3E8FF',
    polarized: true
  })],
  mrp: 4699,
  price: 3199,
  discountPercent: 32,
  rating: 4.8,
  reviewCount: 94,
  isNew: true,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  lensType: 'HD Polarized Glare-Shield',
  uvProtection: 'UV400',
  polarized: true,
  size: 'Wide',
  dimensions: {
    lensWidth: 57,
    bridgeWidth: 16,
    templeLength: 142
  },
  description: 'Statement oversized butterfly wings crafted to shield sensitive eyes from harsh UV while delivering effortless red-carpet presence.',
  features: ['Sculpted butterfly silhouette for maximal sun blockage', 'True-definition polarized tint eliminates glare', 'Integrated featherweight nose pads', 'Resistant to saltwater and sun lotion'],
  specifications: {
    'Frame Material': 'Italian Mazzucchelli Acetate',
    'Lens': 'Polarized TAC UV400',
    'Weight': '29 grams'
  }
}, {
  id: 'tlh-sg-05',
  slug: 'squadron-half-rim-pilot-polarized',
  name: 'Squadron Half-Rim Pilot Polarized',
  brand: 'John Jacobs',
  category: 'sunglasses',
  gender: 'Men',
  frameShape: 'Pilot',
  frameType: 'Half Rim',
  material: 'Stainless Steel',
  primaryColor: 'Silver',
  colors: [{
    name: 'Silver',
    hex: '#94A3B8',
    image: generateEyewearSvg({
      type: 'aviator',
      color: '#64748B',
      lensTint: '#0F172A',
      accentColor: '#CBD5E1',
      polarized: true
    })
  }, {
    name: 'Gold',
    hex: '#D4AF37',
    image: generateEyewearSvg({
      type: 'aviator',
      color: '#B45309',
      lensTint: '#1B4332',
      accentColor: '#FEF08A',
      polarized: true
    })
  }, {
    name: 'Black',
    hex: '#000000',
    image: generateEyewearSvg({
      type: 'aviator',
      color: '#0F172A',
      lensTint: '#020617',
      accentColor: '#475569',
      polarized: true
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'aviator',
    color: '#64748B',
    lensTint: '#0F172A',
    accentColor: '#CBD5E1',
    polarized: true
  }),
  secondaryImage: generateEyewearSvg({
    type: 'aviator',
    color: '#B45309',
    lensTint: '#1B4332',
    accentColor: '#FEF08A',
    polarized: true
  }),
  galleryImages: [generateEyewearSvg({
    type: 'aviator',
    color: '#64748B',
    lensTint: '#0F172A',
    accentColor: '#CBD5E1',
    polarized: true
  })],
  mrp: 4899,
  price: 3299,
  discountPercent: 33,
  rating: 4.8,
  reviewCount: 104,
  isNew: true,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  lensType: 'Polarized TAC',
  uvProtection: 'UV400',
  polarized: true,
  size: 'Wide',
  dimensions: {
    lensWidth: 59,
    bridgeWidth: 15,
    templeLength: 145
  },
  description: 'Precision-engineered half-rim pilot sunglasses featuring an open-bottom suspension lens design for athletic peripheral awareness and sharp military aesthetics.',
  features: ['Half-rim pilot profile for lightweight sport wear', 'Ultra-clear polarization blocks windshield glare', 'Flexible spring hinges adjust to any head width', 'Non-slip grip rubberized ear sleeves'],
  specifications: {
    'Frame Material': 'Corrosion-Resistant Surgical Alloy',
    'Weight': '21 grams',
    'Polarized': 'Yes'
  }
}, {
  id: 'tlh-sg-06',
  slug: 'apex-square-polarized-sunglasses',
  name: 'Apex Geometric Square Polarized',
  brand: 'The Lens Hut Reserve',
  category: 'sunglasses',
  gender: 'Unisex',
  frameShape: 'Square',
  frameType: 'Full Rim',
  material: 'Italian Acetate',
  primaryColor: 'Black',
  colors: [{
    name: 'Black',
    hex: '#000000',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#0F172A',
      lensTint: '#020617',
      accentColor: '#64748B',
      polarized: true
    })
  }, {
    name: 'Green',
    hex: '#15803D',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#166534',
      lensTint: '#14532D',
      accentColor: '#86EFAC',
      polarized: true
    })
  }, {
    name: 'Gold',
    hex: '#D4AF37',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#B45309',
      lensTint: '#451A03',
      accentColor: '#FEF08A',
      polarized: true
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'wayfarer',
    color: '#0F172A',
    lensTint: '#020617',
    accentColor: '#64748B',
    polarized: true
  }),
  secondaryImage: generateEyewearSvg({
    type: 'wayfarer',
    color: '#166534',
    lensTint: '#14532D',
    accentColor: '#86EFAC',
    polarized: true
  }),
  galleryImages: [generateEyewearSvg({
    type: 'wayfarer',
    color: '#0F172A',
    lensTint: '#020617',
    accentColor: '#64748B',
    polarized: true
  })],
  mrp: 4399,
  price: 2899,
  discountPercent: 34,
  rating: 4.7,
  reviewCount: 66,
  isNew: true,
  isFeatured: false,
  isBestSeller: true,
  inStock: true,
  lensType: 'Category 3 Polarized',
  uvProtection: 'UV400',
  polarized: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 53,
    bridgeWidth: 20,
    templeLength: 145
  },
  description: 'Crisp architectural square silhouette with bevel-edged rim surfaces. Polarized lenses ensure comfortable optical clarity in full tropical sunlight.',
  features: ['Bold chiselled square contours', 'Anti-reflective back surface lens treatment', 'Embedded barrel pin hinges for high durability', 'Includes travel microfiber pouch'],
  specifications: {
    'Frame Material': 'Italian Acetate',
    'Weight': '31 grams'
  }
}, {
  id: 'tlh-sg-07',
  slug: 'veloce-sport-rectangle-sunglasses',
  name: 'Veloce Rectangular Sport Polarized',
  brand: 'Titan Eyeplus',
  category: 'sunglasses',
  gender: 'Men',
  frameShape: 'Rectangle',
  frameType: 'Half Rim',
  material: 'TR90',
  primaryColor: 'Black',
  colors: [{
    name: 'Black',
    hex: '#000000',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#000000',
      lensTint: '#0F172A',
      accentColor: '#38BDF8',
      polarized: true
    })
  }, {
    name: 'Blue',
    hex: '#2563EB',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#1D4ED8',
      lensTint: '#1E3A8A',
      accentColor: '#93C5FD',
      polarized: true
    })
  }, {
    name: 'Silver',
    hex: '#94A3B8',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#475569',
      lensTint: '#0F172A',
      accentColor: '#E2E8F0',
      polarized: true
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'wayfarer',
    color: '#000000',
    lensTint: '#0F172A',
    accentColor: '#38BDF8',
    polarized: true
  }),
  secondaryImage: generateEyewearSvg({
    type: 'wayfarer',
    color: '#1D4ED8',
    lensTint: '#1E3A8A',
    accentColor: '#93C5FD',
    polarized: true
  }),
  galleryImages: [generateEyewearSvg({
    type: 'wayfarer',
    color: '#000000',
    lensTint: '#0F172A',
    accentColor: '#38BDF8',
    polarized: true
  })],
  mrp: 3899,
  price: 2499,
  discountPercent: 36,
  rating: 4.8,
  reviewCount: 88,
  isNew: false,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  lensType: 'Hydrophobic Polarized Sports Lens',
  uvProtection: 'UV400',
  polarized: true,
  size: 'Wide',
  dimensions: {
    lensWidth: 58,
    bridgeWidth: 17,
    templeLength: 138
  },
  description: 'High-speed wraparound rectangular frame crafted from ultra-flexible Swiss TR90 polymer. Hydrophobic lens coating repels sweat, rain, and smudge marks during running and driving.',
  features: ['Flexible Swiss TR90 unbreakable memory polymer', 'Wide aerodynamic field of view', 'Water and sweat repellent hydrophobic lenses', 'Secure-grip rubber ear pads'],
  specifications: {
    'Frame Material': 'TR90 Swiss Grilamid',
    'Weight': '19.5 grams',
    'Polarized': 'Yes'
  }
}, {
  id: 'tlh-sg-08',
  slug: 'riviera-round-polarized-sunglasses',
  name: 'Riviera Classic Round Polarized',
  brand: 'The Lens Hut Reserve',
  category: 'sunglasses',
  gender: 'Unisex',
  frameShape: 'Round',
  frameType: 'Full Rim',
  material: 'Stainless Steel',
  primaryColor: 'Gold',
  colors: [{
    name: 'Gold',
    hex: '#D4AF37',
    image: generateEyewearSvg({
      type: 'round',
      color: '#D4AF37',
      lensTint: '#1B4332',
      accentColor: '#FEF08A',
      polarized: true
    })
  }, {
    name: 'Brown',
    hex: '#78350F',
    image: generateEyewearSvg({
      type: 'round',
      color: '#593215',
      lensTint: '#451A03',
      accentColor: '#D4AF37',
      polarized: true
    })
  }, {
    name: 'Green',
    hex: '#15803D',
    image: generateEyewearSvg({
      type: 'round',
      color: '#166534',
      lensTint: '#0F172A',
      accentColor: '#86EFAC',
      polarized: true
    })
  }, {
    name: 'Purple',
    hex: '#7E22CE',
    image: generateEyewearSvg({
      type: 'round',
      color: '#7E22CE',
      lensTint: '#581C87',
      accentColor: '#E9D5FF',
      polarized: true
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'round',
    color: '#D4AF37',
    lensTint: '#1B4332',
    accentColor: '#FEF08A',
    polarized: true
  }),
  secondaryImage: generateEyewearSvg({
    type: 'round',
    color: '#593215',
    lensTint: '#451A03',
    accentColor: '#D4AF37',
    polarized: true
  }),
  galleryImages: [generateEyewearSvg({
    type: 'round',
    color: '#D4AF37',
    lensTint: '#1B4332',
    accentColor: '#FEF08A',
    polarized: true
  })],
  mrp: 4199,
  price: 2699,
  discountPercent: 36,
  rating: 4.8,
  reviewCount: 92,
  isNew: true,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  lensType: 'Polarized TAC UV400',
  uvProtection: 'UV400',
  polarized: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 50,
    bridgeWidth: 21,
    templeLength: 145
  },
  description: 'Iconic intellectual round sunglasses with slender metal rim wire and tinted polarized crystal optics. Effortlessly blends bohemian flair with modern sun safety.',
  features: ['Classic rounded wireframe geometry', 'Ultra-thin 1.5mm coin-edge rim perimeter', 'Glare-free HD polarized vision', 'Adjustable soft silicone nose cushions'],
  specifications: {
    'Frame Material': 'Surgical Monel Alloy',
    'Weight': '17 grams',
    'Polarized': 'Yes'
  }
},
// ==========================================
// CONTACT LENSES
// Vision Types: Toric Lens, Single Vision Lens, Multifocal Lens
// Modalities: Daily, 2 Weekly, Monthly, Quarterly, Yearly
// Speciality: Prosthetic, Occluder, X-Chrome, Pinhole
// Cosmetic: Powered Color Contact Lens, Zero Power Color Contact Lens
// ==========================================
{
  id: 'tlh-cl-01',
  slug: 'aqua-hydro-daily-disposable-contact-lenses',
  name: 'Aqua-Hydro Daily Disposables (30 Pack)',
  brand: 'The Lens Hut Optics',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactVisionType: 'Single Vision Lens',
  contactModality: 'Daily',
  primaryColor: 'Blue',
  colors: [{
    name: 'Clear Blue Tint',
    hex: '#38BDF8',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 2499,
  price: 1699,
  discountPercent: 32,
  rating: 4.9,
  reviewCount: 420,
  isNew: true,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Formulated with 58% water content and HydraLock matrix, Aqua-Hydro delivers breathable oxygen permeability and all-day dew-fresh comfort from morning screen time to late dinners.',
  features: ['58% Hydrogel Water Content with HydraLock', 'Class II UV blocking protects cornea from sun', 'Ultra-thin 0.07mm edge prevents lid irritation', 'Single-use daily hygiene — zero solution required'],
  specifications: {
    'Vision Type': 'Single Vision Lens',
    'Modality': 'Daily Disposable',
    'Base Curve (BC)': '8.6 mm',
    'Diameter (DIA)': '14.2 mm',
    'Material': 'Omafilcon B with Hyaluronic Infusion',
    'Packaging': '30 sterile lenses per box'
  }
}, {
  id: 'tlh-cl-02',
  slug: 'acuvue-oasys-hydraclear-2-weekly-lenses',
  name: 'Acuvue Oasys with Hydraclear Plus (6 Pack)',
  brand: 'Acuvue',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactVisionType: 'Single Vision Lens',
  contactModality: '2 Weekly',
  primaryColor: 'Blue',
  colors: [{
    name: 'Clear',
    hex: '#60A5FA',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 2899,
  price: 2199,
  discountPercent: 24,
  rating: 4.8,
  reviewCount: 388,
  isNew: false,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Designed for dry air and extended digital device use. Senofilcon A silicone hydrogel provides highest level of UV protection and unmatched oxygen transmission.',
  features: ['Hydraclear Plus maintains stable tear film', 'Class 1 UV Protection (99.9% UVB, 96% UVA)', 'Bi-weekly replacement modality', 'Inside-out "123" indicator for easy insertion'],
  specifications: {
    'Vision Type': 'Single Vision Lens',
    'Modality': '2 Weekly Replacement',
    'Base Curve': '8.4 mm or 8.8 mm',
    'Diameter': '14.0 mm',
    'Packaging': '6 sterile lenses per pack'
  }
}, {
  id: 'tlh-cl-03',
  slug: 'airoptix-hydraglyde-monthly-contact-lenses',
  name: 'AirOptix Plus HydraGlyde Monthly (6 Pack)',
  brand: 'The Lens Hut Optics',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactVisionType: 'Single Vision Lens',
  contactModality: 'Monthly',
  primaryColor: 'Blue',
  colors: [{
    name: 'Clear',
    hex: '#38BDF8',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 3199,
  price: 2299,
  discountPercent: 28,
  rating: 4.8,
  reviewCount: 160,
  isNew: true,
  isFeatured: false,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'SmartShield technology delivers an ultra-thin protective layer to shield against irritating deposits all month long. Keeps lens surface hydrated for 16+ continuous hours.',
  features: ['HydraGlyde moisture matrix keeps moisture locked in', 'Deposit protection resists protein deposits', 'High oxygen flow silicone hydrogel material', 'Economical 30-day wear schedule per lens'],
  specifications: {
    'Vision Type': 'Single Vision Lens',
    'Modality': 'Monthly Replacement',
    'Base Curve': '8.6 mm',
    'Diameter': '14.2 mm',
    'Packaging': '6 sterile blister lenses'
  }
}, {
  id: 'tlh-cl-04',
  slug: 'bioclear-toric-astigmatism-monthly-lenses',
  name: 'BioClear Toric for Astigmatism (6 Pack)',
  brand: 'The Lens Hut Optics',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactVisionType: 'Toric Lens',
  contactModality: 'Monthly',
  primaryColor: 'Blue',
  colors: [{
    name: 'Clear Toric',
    hex: '#38BDF8',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 3699,
  price: 2599,
  discountPercent: 30,
  rating: 4.9,
  reviewCount: 112,
  isNew: true,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Precision auto-align ballast stabilization ensures the cylinder axis remains locked in place during rapid blinking and head movement, ending blurry astigmatic vision.',
  features: ['Blink-stabilized ballast prism prevents axis rotation', 'Calibrated for sphere powers +4.00 to -9.00 and cylinder up to -2.75', 'High oxygen silicone hydrogel prevents eye redness', 'Clear vision for sports, night driving, and computing'],
  specifications: {
    'Vision Type': 'Toric Lens (Astigmatism)',
    'Modality': 'Monthly Disposable',
    'Cylinder Options': '-0.75, -1.25, -1.75, -2.25, -2.75',
    'Axis Range': '10° to 180° in 10° steps',
    'Base Curve': '8.7 mm',
    'Diameter': '14.5 mm'
  }
}, {
  id: 'tlh-cl-05',
  slug: 'optifocus-progressive-multifocal-contact-lenses',
  name: 'OptiFocus Progressive Multifocal (6 Pack)',
  brand: 'The Lens Hut Optics',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactVisionType: 'Multifocal Lens',
  contactModality: 'Monthly',
  primaryColor: 'Blue',
  colors: [{
    name: 'Clear Multifocal',
    hex: '#38BDF8',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 4299,
  price: 2999,
  discountPercent: 30,
  rating: 4.8,
  reviewCount: 95,
  isNew: true,
  isFeatured: true,
  isBestSeller: false,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Precision Profile concentric design delivers seamless transitions between distance, intermediate digital screens, and reading fine print without reading glasses.',
  features: ['Concentric progressive optical power zones', 'Eliminates the need for bifocal or reading glasses', 'Low, Medium, and High ADD reading power options', 'Breathable silicone hydrogel for all-day comfort'],
  specifications: {
    'Vision Type': 'Multifocal Lens (Presbyopia)',
    'Modality': 'Monthly Disposable',
    'Add Powers': 'Low (+1.00), Med (+1.75), High (+2.50)',
    'Base Curve': '8.6 mm',
    'Diameter': '14.2 mm'
  }
}, {
  id: 'tlh-cl-06',
  slug: 'ultravue-quarterly-extended-wear-lenses',
  name: 'UltraVue 3-Month Quarterly Wear (2 Pack)',
  brand: 'Titan Eyeplus',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactVisionType: 'Single Vision Lens',
  contactModality: 'Quarterly',
  primaryColor: 'Blue',
  colors: [{
    name: 'Clear',
    hex: '#60A5FA',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 2999,
  price: 1999,
  discountPercent: 33,
  rating: 4.7,
  reviewCount: 48,
  isNew: false,
  isFeatured: false,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Resilient high-durability hydrogel designed for a 90-day replacement cycle. Provides excellent tear exchange and shape retention for dependable long-term vision.',
  features: ['Quarterly 3-month modality for value and longevity', 'Tear-resistant ionic hydrogel matrix', 'Stable visual acuity across high prescription powers', 'Includes optical antibacterial storage case'],
  specifications: {
    'Vision Type': 'Single Vision Lens',
    'Modality': 'Quarterly (3 Months)',
    'Base Curve': '8.6 mm',
    'Diameter': '14.0 mm',
    'Water Content': '45%'
  }
}, {
  id: 'tlh-cl-07',
  slug: 'opticon-annual-conventional-yearly-lenses',
  name: 'OptiCon Annual Conventional Vials (1 Pair)',
  brand: 'The Lens Hut Optics',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactVisionType: 'Single Vision Lens',
  contactModality: 'Yearly',
  primaryColor: 'Blue',
  colors: [{
    name: 'Clear Sterile Vial',
    hex: '#38BDF8',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 3499,
  price: 2399,
  discountPercent: 31,
  rating: 4.8,
  reviewCount: 62,
  isNew: false,
  isFeatured: false,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Precision lathe-cut conventional yearly contact lenses packaged in glass sterile vials. Perfect for patients requiring custom diameter, deep curvature, or high dioptric prescriptions.',
  features: ['Full 12-month annual wear durability', 'Available in extreme prescription ranges (-20.00 to +15.00)', 'Individually lathe-cut optical surfaces', 'Hermetically sealed medical glass vials'],
  specifications: {
    'Vision Type': 'Single Vision Lens',
    'Modality': 'Yearly (12 Months)',
    'Base Curve': '8.4 mm to 8.8 mm',
    'Diameter': '14.0 mm',
    'Packaging': '2 sterile glass vials'
  }
}, {
  id: 'tlh-cl-08',
  slug: 'iriscare-prosthetic-corneal-contact-lens',
  name: 'IrisCare Custom Prosthetic Corneal Lens',
  brand: 'The Lens Hut Optics',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactSpeciality: 'Prosthetic',
  contactModality: 'Yearly',
  primaryColor: 'Brown',
  colors: [{
    name: 'Natural Brown Iris',
    hex: '#78350F',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }, {
    name: 'Dark Brown',
    hex: '#451A03',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 8999,
  price: 6499,
  discountPercent: 28,
  rating: 4.9,
  reviewCount: 38,
  isNew: true,
  isFeatured: true,
  isBestSeller: false,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Custom handcrafted cosmetic prosthetic lens tailored to match fellow eye color and iris structure. Restores appearance and masks corneal scarring, trauma, or aniridia.',
  features: ['Hand-painted multi-layer iris pigmentation', 'Masks leukoma, traumatic aniridia, and corneal scars', 'Black pupil or clear optical pupil customization', '12-month conventional medical wear schedule'],
  specifications: {
    'Speciality': 'Prosthetic',
    'Modality': 'Yearly',
    'Pupil Type': 'Black Opaque or Clear Optical',
    'Custom Matching': 'Hospital prescription photo matching supported'
  }
}, {
  id: 'tlh-cl-09',
  slug: 'optishield-total-occluder-contact-lens',
  name: 'OptiShield Total Black Occluder Amblyopia Lens',
  brand: 'The Lens Hut Optics',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactSpeciality: 'Occluder',
  contactModality: 'Yearly',
  primaryColor: 'Black',
  colors: [{
    name: 'Opaque Black Pupil',
    hex: '#000000',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 5499,
  price: 3899,
  discountPercent: 29,
  rating: 4.8,
  reviewCount: 29,
  isNew: true,
  isFeatured: false,
  isBestSeller: false,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Medical-grade total black pupil occluder contact lens prescribed for occlusion therapy in amblyopia (lazy eye) or intractable diplopia (double vision). Completely blocks light input.',
  features: ['100% light-blocking central black occlusion disc', 'Superior social compliance over adhesive eye patches', 'Gentle hydrogel material prevents corneal erosion', 'Standard 4.5mm or custom 6.0mm occlusion diameter'],
  specifications: {
    'Speciality': 'Occluder',
    'Modality': 'Yearly',
    'Occlusion Diameter': '4.5 mm / 6.0 mm',
    'Indication': 'Amblyopia / Diplopia Light Exclusion'
  }
}, {
  id: 'tlh-cl-10',
  slug: 'x-chrom-color-deficiency-contact-lens',
  name: 'X-Chrom Monocular Color Deficiency Lens',
  brand: 'The Lens Hut Optics',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactSpeciality: 'X-Chrome',
  contactModality: 'Yearly',
  primaryColor: 'Red',
  colors: [{
    name: 'Ruby Spectral Red',
    hex: '#DC2626',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 9499,
  price: 6999,
  discountPercent: 26,
  rating: 4.9,
  reviewCount: 34,
  isNew: true,
  isFeatured: true,
  isBestSeller: false,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Specially filtered ruby-red monocular contact lens worn on the non-dominant eye. Enhances color brightness differences, helping red-green color deficient patients pass Ishihara plates.',
  features: ['Clinical X-Chrom selective wavelength optical filter', 'Aids in Ishihara and Farnsworth color discrimination', 'Monocular application — worn on non-dominant eye only', 'Comfort hydrogel design with annual wear life'],
  specifications: {
    'Speciality': 'X-Chrome',
    'Modality': 'Yearly',
    'Filter Spectrum': '590nm - 700nm Long Pass',
    'Application': 'Monocular (Single Eye)'
  }
}, {
  id: 'tlh-cl-11',
  slug: 'stenopeic-pinhole-corneal-contact-lens',
  name: 'Stenopeic Precision Pinhole Depth Lens',
  brand: 'The Lens Hut Optics',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactSpeciality: 'Pinhole',
  contactModality: 'Yearly',
  primaryColor: 'Black',
  colors: [{
    name: 'Black Opaque Ring with Clear Pinhole',
    hex: '#1E293B',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 6999,
  price: 4999,
  discountPercent: 28,
  rating: 4.7,
  reviewCount: 22,
  isNew: true,
  isFeatured: false,
  isBestSeller: false,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Features an opaque annular iris mask with a 1.5mm central optical pinhole aperture. Dramatically expands depth of focus and mitigates irregular astigmatism, keratoconus, and corneal distortion.',
  features: ['Stenopeic optical aperture increases depth of field', 'Neutralizes high-order corneal aberrations & glare', 'Dark iris ring reduces photophobia in bright sun', 'Precision lathe hydrogel geometry'],
  specifications: {
    'Speciality': 'Pinhole',
    'Modality': 'Yearly',
    'Pinhole Aperture': '1.5 mm clear center',
    'Mask Diameter': '11.5 mm opaque annular ring'
  }
}, {
  id: 'tlh-cl-12',
  slug: 'colorvivid-powered-cosmetic-color-lenses',
  name: 'ColorVivid Powered Cosmetic 3-Tone (Hazel, Blue, Green)',
  brand: 'The Lens Hut Optics',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactCosmetic: 'Powered Color Contact Lens',
  contactModality: 'Monthly',
  primaryColor: 'Green',
  colors: [{
    name: 'Jade Green',
    hex: '#15803D',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }, {
    name: 'Sapphire Blue',
    hex: '#2563EB',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }, {
    name: 'Pure Hazel',
    hex: '#78350F',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 2999,
  price: 1999,
  discountPercent: 33,
  rating: 4.9,
  reviewCount: 280,
  isNew: true,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Stunning 3-in-1 color blend technology provides rich eye transformation while correcting nearsightedness or farsightedness. Power ranges available from 0.00 to -8.00D.',
  features: ['Prescription vision correction combined with beauty tints', '3-in-1 iris matrix for photorealistic depth', 'Color locked inside hydrogel layer — zero pigment touch', 'Monthly modality for easy maintenance'],
  specifications: {
    'Cosmetic Type': 'Powered Color Contact Lens',
    'Modality': 'Monthly (30 Days)',
    'Power Range': '-0.50D to -8.00D in 0.25 steps',
    'Base Curve': '8.6 mm',
    'Diameter': '14.2 mm'
  }
}, {
  id: 'tlh-cl-13',
  slug: 'glowtone-zero-power-glamour-color-lenses',
  name: 'GlowTone Zero Power Glamour Color (Plano Beauty)',
  brand: 'The Lens Hut Optics',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactCosmetic: 'Zero Power Color Contact Lens',
  contactModality: 'Monthly',
  primaryColor: 'Purple',
  colors: [{
    name: 'Amethyst Purple',
    hex: '#7E22CE',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }, {
    name: 'Sterling Grey',
    hex: '#94A3B8',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }, {
    name: 'Honey Brown',
    hex: '#B45309',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 2499,
  price: 1499,
  discountPercent: 40,
  rating: 4.8,
  reviewCount: 310,
  isNew: true,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Zero optical power (0.00 Plano) aesthetic contact lenses designed purely for beauty and style makeover. Deep limbal ring visibly enlarges iris definition.',
  features: ['Zero optical power (Plano 0.00) — safe for 20/20 vision', 'Dramatic outer limbal ring for youthful eye enlargement', 'Breathable oxygen-permeable daily/monthly comfort', 'Includes complimentary antimicrobial storage case'],
  specifications: {
    'Cosmetic Type': 'Zero Power Color Contact Lens',
    'Modality': 'Monthly (30 Days)',
    'Power': '0.00 (Plano)',
    'Base Curve': '8.6 mm',
    'Diameter': '14.2 mm'
  }
},
// ==========================================
// HOME SCREEN FEATURED PRODUCTS
// ==========================================
{
  id: 'prod-feat-01',
  slug: 'classic-clear-frame',
  name: 'Classic Clear Frame',
  brand: 'The Lens Hut Reserve',
  category: 'eyeglasses',
  gender: 'Unisex',
  frameShape: 'Round',
  frameType: 'Full Rim',
  material: 'Italian Acetate',
  primaryColor: 'Silver',
  colors: [{
    name: 'Crystal Clear',
    hex: '#E2E8F0',
    image: generateEyewearSvg({
      type: 'round',
      color: '#CBD5E1',
      accentColor: '#94A3B8'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'round',
    color: '#CBD5E1',
    accentColor: '#94A3B8'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'round',
    color: '#CBD5E1',
    accentColor: '#94A3B8'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'round',
    color: '#CBD5E1',
    accentColor: '#94A3B8'
  })],
  mrp: 3749,
  price: 2999,
  discountPercent: 20,
  rating: 4.5,
  reviewCount: 164,
  isNew: true,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 50,
    bridgeWidth: 19,
    templeLength: 145
  },
  description: 'Minimalist transparency crafted from crystal-clear hand-polished Italian acetate. Pairs seamlessly with any outfit and skin tone with modern flair.',
  features: ['Crystal-clear transparent cellulose acetate', 'Anti-reflective blue cut computer lens ready', 'Featherweight ergonomic balance', 'Includes protective travel case and microfiber cloth'],
  specifications: {
    'Frame Material': 'Italian Cellulose Acetate',
    'Weight': '18 grams',
    'Prescription Index': 'Single Vision, Progressive, Zero Power'
  }
}, {
  id: 'prod-feat-02',
  slug: 'urban-classic-sunglasses',
  name: 'Urban Classic Sunglasses',
  brand: 'Ray-Ban',
  category: 'sunglasses',
  gender: 'Unisex',
  frameShape: 'Aviator',
  frameType: 'Full Rim',
  material: 'Stainless Steel',
  primaryColor: 'Black',
  colors: [{
    name: 'Midnight Black',
    hex: '#000000',
    image: generateEyewearSvg({
      type: 'aviator',
      color: '#1E293B',
      lensTint: '#0F172A',
      accentColor: '#475569',
      polarized: true
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'aviator',
    color: '#1E293B',
    lensTint: '#0F172A',
    accentColor: '#475569',
    polarized: true
  }),
  secondaryImage: generateEyewearSvg({
    type: 'aviator',
    color: '#1E293B',
    lensTint: '#0F172A',
    accentColor: '#475569',
    polarized: true
  }),
  galleryImages: [generateEyewearSvg({
    type: 'aviator',
    color: '#1E293B',
    lensTint: '#0F172A',
    accentColor: '#475569',
    polarized: true
  })],
  mrp: 3999,
  price: 3399,
  discountPercent: 15,
  rating: 5.0,
  reviewCount: 248,
  isNew: true,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  polarized: true,
  size: 'Wide',
  dimensions: {
    lensWidth: 56,
    bridgeWidth: 16,
    templeLength: 142
  },
  description: 'Iconic urban teardrop metal sunglasses equipped with dark polarized glare-reducing lenses and sleek black steel construction.',
  features: ['100% UV400 HD polarized lenses', 'Stainless steel corrosion-proof alloy', 'Silicone cushioned nose pads', 'Anti-glare back surface coating'],
  specifications: {
    'Frame Material': 'Stainless Steel',
    'Lens': 'Polarized TAC UV400',
    'Weight': '21 grams'
  }
}, {
  id: 'prod-feat-03',
  slug: 'blue-light-blocking-frame',
  name: 'Blue Light Blocking Frame',
  brand: 'The Lens Hut Reserve',
  category: 'eyeglasses',
  gender: 'Unisex',
  frameShape: 'Square',
  frameType: 'Full Rim',
  material: 'TR90',
  primaryColor: 'Black',
  colors: [{
    name: 'Matte Black',
    hex: '#000000',
    image: generateEyewearSvg({
      type: 'wayfarer',
      color: '#0F172A',
      accentColor: '#334155'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'wayfarer',
    color: '#0F172A',
    accentColor: '#334155'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'wayfarer',
    color: '#0F172A',
    accentColor: '#334155'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'wayfarer',
    color: '#0F172A',
    accentColor: '#334155'
  })],
  mrp: 4999,
  price: 4499,
  discountPercent: 10,
  rating: 4.0,
  reviewCount: 88,
  isNew: false,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 52,
    bridgeWidth: 18,
    templeLength: 142
  },
  description: 'Engineered specifically for heavy computer and mobile screen users. Filters out 90% of harmful digital blue light to prevent digital eye strain and headaches.',
  features: ['Advanced BlueProtect anti-radiation lenses', 'Ultra-flexible TR90 lightweight memory polymer', 'Zero-distortion optical clarity', 'Includes case and anti-smudge cleaning cloth'],
  specifications: {
    'Frame Material': 'Swiss TR90 Grilamid',
    'Weight': '14 grams',
    'Blue Light Filter': 'Blocks 415nm - 455nm high energy blue light'
  }
}, {
  id: 'prod-feat-04',
  slug: 'daily-contact-lenses',
  name: 'Daily Contact Lenses',
  brand: 'Acuvue',
  category: 'contact-lenses',
  gender: 'Unisex',
  contactVisionType: 'Single Vision Lens',
  contactModality: 'Daily',
  primaryColor: 'Blue',
  colors: [{
    name: 'Clear Aqua',
    hex: '#38BDF8',
    image: generateEyewearSvg({
      type: 'contact'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'contact'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'contact'
  })],
  mrp: 1599,
  price: 1299,
  discountPercent: 19,
  rating: 4.5,
  reviewCount: 320,
  isNew: true,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 14,
    bridgeWidth: 8,
    templeLength: 0
  },
  description: 'Single-use daily disposable contact lenses with high oxygen transmission and moisture seal matrix for all-day screen freshness.',
  features: ['58% water content with HydraLock hydration', 'Single-use daily hygienic convenience', 'UV blocking class 2 protection', '30 sterile blister packs per box'],
  specifications: {
    'Vision Type': 'Single Vision Lens',
    'Modality': 'Daily Disposable',
    'Base Curve': '8.5 mm',
    'Diameter': '14.2 mm'
  }
}, {
  id: 'prod-feat-05',
  slug: 'premium-cleaning-kit',
  name: 'Premium Cleaning Kit',
  brand: 'The Lens Hut Reserve',
  category: 'accessories',
  gender: 'Unisex',
  primaryColor: 'Black',
  colors: [{
    name: 'Obsidian Black',
    hex: '#000000',
    image: generateEyewearSvg({
      type: 'cleaner'
    })
  }],
  primaryImage: generateEyewearSvg({
    type: 'cleaner'
  }),
  secondaryImage: generateEyewearSvg({
    type: 'cleaner'
  }),
  galleryImages: [generateEyewearSvg({
    type: 'cleaner'
  })],
  mrp: 999,
  price: 799,
  discountPercent: 20,
  rating: 4.0,
  reviewCount: 142,
  isNew: false,
  isFeatured: true,
  isBestSeller: true,
  inStock: true,
  size: 'Medium',
  dimensions: {
    lensWidth: 160,
    bridgeWidth: 60,
    templeLength: 40
  },
  description: 'Complete optical care kit including structured hard shell magnetic eyewear case, 2 ultra-fine microfiber lens cloths, and 60ml alcohol-free anti-fog cleaning spray.',
  features: ['Crush-proof structured hard-shell case', 'Anti-fog, alcohol-free lens safe spray (60ml)', 'Dual high-density microfiber cloths', 'Precision mini keychain screwdriver tool included'],
  specifications: {
    'Kit Contents': 'Hard Case + 60ml Spray + 2 Microfiber Cloths + Screwdriver',
    'Compatibility': 'All coated optical and sunglass lenses'
  }
}];
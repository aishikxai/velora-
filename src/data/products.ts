export interface ProductColorway {
  hex: string;
  name: string;
  filterClass: string;
  colorLeft: string;
  colorRight: string;
  textColor: string;
}

export interface VeloraProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  headerTextLeft: string;
  headerTextRight: string;
  footerTextCenter: string;
  description: string;
  fullDetails: string;
  features: string[];
  specs: { label: string; value: string }[];
  bgTextTopRight: string;
  bgTextBottomLeft: string;
  imageUrl: string;
  scale: number;
  sizeLabel: string;
  sizes: string[];
  colorways: ProductColorway[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

export const VELORA_PRODUCTS: VeloraProduct[] = [
  {
    id: 'sneakers',
    slug: 'sneakers',
    name: 'Nike Air Force 1 Low Retro Red',
    category: 'Footwear',
    price: 139.99,
    originalPrice: 169.99,
    headerTextLeft: 'NIKE AIR FORCE 1',
    headerTextRight: 'LOW RETRO RED',
    footerTextCenter: 'CLASSIC LIFESTYLE',
    description: 'The classic Nike Air Force 1 features premium white pebble leather overlays with a bold crimson red swoosh and matching outsoles.',
    fullDetails: 'Engineered for enduring street appeal and everyday comfort. Built with genuine full-grain leather, perforated toe boxes for breathability, encapsulated Air cushioning in the heel, and a durable non-marking rubber outsole with pivot circle grip.',
    features: [
      'Supple full-grain pebble leather upper',
      'Encapsulated Air-Sole unit for lightweight cushioning',
      'Non-marking rubber outsole with classic pivot circle',
      'Padded low-cut collar for ankle comfort'
    ],
    specs: [
      { label: 'Origin', value: 'Imported' },
      { label: 'Material', value: '100% Genuine Leather & Rubber' },
      { label: 'Closure', value: 'Lace-Up with Silver AF1 Dubrae' },
      { label: 'Style Code', value: 'AF1-2026-RED' }
    ],
    bgTextTopRight: 'SNEAK',
    bgTextBottomLeft: 'ERS',
    imageUrl: '/sneaker_red.png',
    scale: 1.15,
    sizeLabel: 'Choose US Men size',
    sizes: ['8', '9.5', '10.5', '11'],
    colorways: [
      { hex: '#991b1b', name: 'Gym Red', filterClass: '', colorLeft: '#450a0a', colorRight: '#fee2e2', textColor: '#2d0000' },
      { hex: '#065f46', name: 'Pine Green', filterClass: 'hue-rotate-[135deg] saturate-[1.1] brightness-[0.95]', colorLeft: '#064e3b', colorRight: '#d1fae5', textColor: '#022d22' },
      { hex: '#1e3a8a', name: 'Royal Blue', filterClass: 'hue-rotate-[240deg] saturate-[1.2] brightness-[0.9]', colorLeft: '#1e1b4b', colorRight: '#e0e7ff', textColor: '#0f0e2b' },
      { hex: '#18181b', name: 'Triple Black', filterClass: 'saturate-0 brightness-[0.25]', colorLeft: '#09090b', colorRight: '#d4d4d8', textColor: '#030303' }
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: 'mens-apparel',
    slug: 'mens-apparel',
    name: "Men's Relaxed Linen Outfit",
    category: 'Menswear',
    price: 189.00,
    originalPrice: 220.00,
    headerTextLeft: 'FASHION THAT',
    headerTextRight: 'MOVES WITH YOU.',
    footerTextCenter: 'NEW COLLECTION 2026',
    description: 'Relaxed linen button-down shirts combined with neutral pleated sand trousers. Lightweight, breathable comfort designed for daily styling.',
    fullDetails: 'Crafted from 100% French flax linen woven into an airy, textured drape. Paired with tailored high-rise pleated sand trousers with an elasticized back waistband, horn button accents, and double slash pockets.',
    features: [
      'Woven from 100% breathable organic French flax',
      'Pre-washed for signature softness and reduced shrinkage',
      'Trousers tailored with clean front pleats and side tabs',
      'Natural corozo buttons and deep functional pockets'
    ],
    specs: [
      { label: 'Fit', value: 'Relaxed Tailored Silhouette' },
      { label: 'Fabric', value: '100% French Linen (Shirt), Linen-Cotton Blend (Pants)' },
      { label: 'Care', value: 'Machine wash cold delicate, hang dry' },
      { label: 'Model Wears', value: 'Size L (6 ft 1 in / 185 cm)' }
    ],
    bgTextTopRight: 'MENS',
    bgTextBottomLeft: 'WEAR',
    imageUrl: '/mens_outfit.png',
    scale: 1.15,
    sizeLabel: 'Choose your size',
    sizes: ['S', 'M', 'L', 'XL'],
    colorways: [
      { hex: '#57534e', name: 'Gazu Stone', filterClass: '', colorLeft: '#1c1917', colorRight: '#e7e5e4', textColor: '#0c0a09' },
      { hex: '#7f1d1d', name: 'Crimson Fit', filterClass: 'hue-rotate-[120deg]', colorLeft: '#450a0a', colorRight: '#fee2e2', textColor: '#2d0000' },
      { hex: '#27272a', name: 'Stealth Fit', filterClass: 'saturate-0 opacity-90', colorLeft: '#09090b', colorRight: '#d4d4d8', textColor: '#030303' }
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 96
  },
  {
    id: 'womens-apparel',
    slug: 'womens-apparel',
    name: "Women's Elegant Linen Ensemble",
    category: 'Womenswear',
    price: 195.00,
    originalPrice: 240.00,
    headerTextLeft: 'ELEGANT LINEN',
    headerTextRight: 'WIDE SILHOUETTE',
    footerTextCenter: 'CHIC ESSENTIALS',
    description: 'Relaxed linen shirts combined with custom black knit tops and flowing ivory wide-leg trousers. High-fashion elegance designed for modern living.',
    fullDetails: 'An effortlessly refined 3-piece look: a relaxed terra-cotta brown linen shirt worn unbuttoned over a ribbed stretch knit camisole, anchored by fluid ivory wide-leg trousers with pressed center creases.',
    features: [
      'Luxurious breathable pure linen overshirt with cuffed sleeves',
      'High-stretch sculpted knit inner cami',
      'Full-length wide leg trousers with elongating center crease',
      'Concealed zip fly with hook-and-bar closure'
    ],
    specs: [
      { label: 'Fit', value: 'Contemporary Wide-Leg Flow' },
      { label: 'Composition', value: '100% Linen (Shirt), Viscose Blend (Trousers)' },
      { label: 'Care', value: 'Dry clean recommended or gentle hand wash' },
      { label: 'Model Wears', value: 'Size S (5 ft 8 in / 173 cm)' }
    ],
    bgTextTopRight: 'WOMEN',
    bgTextBottomLeft: 'WEAR',
    imageUrl: '/womens_wear.png',
    scale: 1.15,
    sizeLabel: 'Choose your size',
    sizes: ['S', 'M', 'L', 'XL'],
    colorways: [
      { hex: '#78350f', name: 'Chic Amber', filterClass: '', colorLeft: '#451a03', colorRight: '#fef3c7', textColor: '#291102' },
      { hex: '#065f46', name: 'Emerald Chic', filterClass: 'hue-rotate-[120deg]', colorLeft: '#064e3b', colorRight: '#d1fae5', textColor: '#022d22' },
      { hex: '#4f46e5', name: 'Indigo Chic', filterClass: 'hue-rotate-[240deg]', colorLeft: '#1e1b4b', colorRight: '#e0e7ff', textColor: '#0f0e2b' }
    ],
    inStock: true,
    rating: 4.95,
    reviewsCount: 118
  },
  {
    id: 'makeup-kits',
    slug: 'makeup-kits',
    name: 'Lush 6-Tone Radiance Palette & Brush',
    category: 'Cosmetics',
    price: 68.00,
    originalPrice: 85.00,
    headerTextLeft: 'LUSH PALETTE',
    headerTextRight: 'VEGAN BRUSHES',
    footerTextCenter: 'PURE RADIANCE',
    description: 'An exquisite collection of high-pigment palettes and brushes. Pure vegan formulations for an effortless, radiant glow.',
    fullDetails: 'Six curated, micro-milled velvet powder blush and highlighter pans housed inside a rose-gold mirrored compact. Accompanied by a plush, cruelty-free dome powder brush with ultra-soft synthetic bristles.',
    features: [
      '6 blendable shades from soft peach to rich berry rose',
      'Infused with squalane and vitamin E for seamless skin melting',
      'Ultra-dense vegan synthetic brush for streak-free application',
      'Clean, cruelty-free, paraben-free & talc-free formulation'
    ],
    specs: [
      { label: 'Net Weight', value: '18g / 0.63 oz' },
      { label: 'Finishes', value: 'Matte, Satin Luster & Luminous Glow' },
      { label: 'Brush Type', value: 'Ultra-Soft Vegan Dome Fibers' },
      { label: 'Formula', value: '100% Vegan & Cruelty-Free' }
    ],
    bgTextTopRight: 'GLAM',
    bgTextBottomLeft: 'UP',
    imageUrl: '/makeup_kit.png',
    scale: 1.15,
    sizeLabel: 'Choose finish style',
    sizes: ['Matte', 'Shimmer', 'Satin'],
    colorways: [
      { hex: '#701a75', name: 'Plum Blush', filterClass: '', colorLeft: '#4a044e', colorRight: '#fdf4ff', textColor: '#2a002d' },
      { hex: '#c2410c', name: 'Amber Peach', filterClass: 'hue-rotate-[300deg] saturate-[1.2]', colorLeft: '#7c2d12', colorRight: '#ffedd5', textColor: '#431407' },
      { hex: '#be185d', name: 'Coral Glow', filterClass: 'hue-rotate-[50deg] saturate-[1.2]', colorLeft: '#831843', colorRight: '#ffe4e6', textColor: '#4d0727' }
    ],
    inStock: true,
    rating: 4.88,
    reviewsCount: 84
  },
  {
    id: 'gym-gear',
    slug: 'gym-gear',
    name: 'Cast Iron Hex Dumbbells (Pair)',
    category: 'Equipment',
    price: 119.00,
    originalPrice: 145.00,
    headerTextLeft: 'CAST IRON',
    headerTextRight: 'HEX WEIGHTS',
    footerTextCenter: 'SECURE GRIP',
    description: 'Heavy-duty cast iron hex dumbbells engineered with secure grip handles. Professional grade gear built for your home or stadium gym.',
    fullDetails: 'Forged from high-density solid cast iron with a structural hexagonal anti-roll profile. Finished with an industrial knurled chrome grip for slip-free control during intense power lifts and HIIT workouts.',
    features: [
      'Anti-roll hexagonal head design for safe floor placement',
      'Ergonomic contour chrome handle with diamond knurling',
      'Heavy-duty cast iron structure resistant to chipping and cracking',
      'Sold as a balanced matching pair'
    ],
    specs: [
      { label: 'Material', value: 'Solid Structural Cast Iron' },
      { label: 'Handle', value: 'Contoured Hardened Chrome' },
      { label: 'Weight Options', value: '10kg, 15kg, 20kg per bell' },
      { label: 'Finish', value: 'Matte Industrial Black Coating' }
    ],
    bgTextTopRight: 'GYM',
    bgTextBottomLeft: 'STUFF',
    imageUrl: '/gym_equipment.png',
    scale: 1.15,
    sizeLabel: 'Choose item weight',
    sizes: ['10kg', '15kg', '20kg'],
    colorways: [
      { hex: '#0f766e', name: 'Teal Iron', filterClass: '', colorLeft: '#115e59', colorRight: '#ccfbf1', textColor: '#042f2e' },
      { hex: '#a16207', name: 'Trophy Gold', filterClass: 'hue-rotate-[300deg] saturate-[1.5]', colorLeft: '#78350f', colorRight: '#fef9c3', textColor: '#451a03' },
      { hex: '#1e40af', name: 'Steel Cobalt', filterClass: 'hue-rotate-[180deg]', colorLeft: '#1e3a8a', colorRight: '#dbeafe', textColor: '#0f172a' }
    ],
    inStock: true,
    rating: 4.92,
    reviewsCount: 67
  },
  {
    id: 'accessories',
    slug: 'accessories',
    name: 'Bioluminescent Jellyfish Crystal Ball',
    category: 'Accessories',
    price: 79.00,
    originalPrice: 99.00,
    headerTextLeft: 'CRYSTAL GLOW',
    headerTextRight: 'HOME AMBIENCE',
    footerTextCenter: 'NIGHT LIGHT 2026',
    description: 'Precision laser-engraved 3D optical crystal ball with illuminated jellyfish motif and natural solid wooden LED pedestal.',
    fullDetails: 'Exquisitely crafted using high-purity K9 optical glass that captures and refracts ambient illumination. Underneath, a natural beech wood base features warm and cool neon LEDs that bring the suspended deep-sea jellyfish and glowing full moon to life.',
    features: [
      'Premium flawless K9 optical clarity crystal sphere',
      'High-precision 3D internal laser etching technique',
      'Solid natural beech wood LED base with USB power',
      'Touchable switch with ambient dimmer function'
    ],
    specs: [
      { label: 'Diameter', value: '80mm (3.15 inches)' },
      { label: 'Base', value: 'Natural Solid Beech Wood' },
      { label: 'Light Source', value: 'Warm / Neon Blue Dual LED' },
      { label: 'Power', value: 'USB 5V (Cable Included)' }
    ],
    bgTextTopRight: 'HOME',
    bgTextBottomLeft: 'DECOR',
    imageUrl: '/jellyfish_ball.png',
    scale: 1.10,
    sizeLabel: 'Choose crystal size',
    sizes: ['60mm', '80mm', '100mm'],
    colorways: [
      { hex: '#2563eb', name: 'Ocean Blue', filterClass: '', colorLeft: '#1e3a8a', colorRight: '#dbeafe', textColor: '#0f172a' },
      { hex: '#7c3aed', name: 'Cosmic Violet', filterClass: 'hue-rotate-[60deg]', colorLeft: '#4c1d95', colorRight: '#ede9fe', textColor: '#2e1065' },
      { hex: '#059669', name: 'Emerald Aurora', filterClass: 'hue-rotate-[150deg]', colorLeft: '#064e3b', colorRight: '#d1fae5', textColor: '#022d22' }
    ],
    inStock: true,
    rating: 4.97,
    reviewsCount: 165
  }
];

export function getProductBySlug(slug: string): VeloraProduct | undefined {
  return VELORA_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}

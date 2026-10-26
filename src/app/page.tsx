'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

// ==========================================
// 1. DATA MODELS & PRODUCTS DEFINITIONS
// ==========================================

interface Colorway {
  hex: string;
  name: string;
  filterClass: string;
  colorLeft: string;
  colorRight: string;
  textColor: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  headerTextLeft: string;
  headerTextRight: string;
  footerTextCenter: string;
  description: string;
  bgTextTopRight: string;
  bgTextBottomLeft: string;
  imageUrl: string;
  scale: number;
  colorways: Colorway[];
  sizeLabel: string;
  sizes: string[];
}

const PRODUCTS_DATA: Product[] = [
  {
    id: 'sneakers',
    name: 'Sneakers',
    category: 'Footwear',
    headerTextLeft: 'NIKE AIR FORCE 1',
    headerTextRight: 'LOW RETRO RED',
    footerTextCenter: 'CLASSIC LIFESTYLE',
    description: 'The classic Nike Air Force 1 features premium white pebble leather overlays with a bold crimson red swoosh and matching outsoles.',
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
    ]
  },
  {
    id: 'mens-apparel',
    name: "Men's Apparel",
    category: 'Menswear',
    headerTextLeft: 'FASHION THAT',
    headerTextRight: 'MOVES WITH YOU.',
    footerTextCenter: 'NEW COLLECTION 2026',
    description: 'Relaxed linen button-down shirts combined with neutral pleated sand trousers. Lightweight, breathable comfort designed for daily styling.',
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
    ]
  },
  {
    id: 'womens-apparel',
    name: "Women's Apparel",
    category: 'Womenswear',
    headerTextLeft: 'ELEGANT LINEN',
    headerTextRight: 'WIDE SILHOUETTE',
    footerTextCenter: 'CHIC ESSENTIALS',
    description: 'Relaxed linen shirts combined with custom black knit tops and flowing ivory wide-leg trousers. High-fashion elegance designed for modern living.',
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
    ]
  },
  {
    id: 'makeup-kits',
    name: 'Makeup Kits',
    category: 'Cosmetics',
    headerTextLeft: 'LUSH PALETTE',
    headerTextRight: 'VEGAN BRUSHES',
    footerTextCenter: 'PURE RADIANCE',
    description: 'An exquisite collection of high-pigment palettes and brushes. Pure vegan formulations for an effortless, radiant glow.',
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
    ]
  },
  {
    id: 'gym-gear',
    name: 'Gym Gear',
    category: 'Equipment',
    headerTextLeft: 'CAST IRON',
    headerTextRight: 'HEX WEIGHTS',
    footerTextCenter: 'SECURE GRIP',
    description: 'Heavy-duty cast iron hex dumbbells engineered with secure grip handles. Professional grade gear built for your home or stadium gym.',
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
    ]
  }
];

// ==========================================
// 2. SYNTHESIZED SOUNDS (WEB AUDIO API)
// ==========================================
const playSound = (type: 'pop' | 'slide' | 'success') => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'slide') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {
    // blocked audio
  }
};

// ==========================================
// 3. INLINE SVG ICON COMPONENTS
// ==========================================
const SvgInstagram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const SvgFacebook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const SvgGlobe = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);
const SvgTikTok = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
);
const SvgArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const SvgChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);
const SvgChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
const SvgCheck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);
const SvgSend = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

// ==========================================
// 4. REUSABLE FLAT WRAPPER COMPONENT (Non cursor movable)
// ==========================================
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function TiltCard({ children, className = '', onClick }: TiltCardProps) {
  return (
    <div onClick={onClick} className={`${className}`}>
      {children}
    </div>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Cart Context integration
  const { addToCart, setCartOpen, getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  const heroRef = useRef<HTMLDivElement>(null);

  const activeProduct = PRODUCTS_DATA[activeCategory];
  const activeColorway = activeProduct.colorways[activeColorIndex] || activeProduct.colorways[0];

  // Auto select first size on product change
  useEffect(() => {
    setSelectedSize(activeProduct.sizes[0]);
    setActiveColorIndex(0);
  }, [activeCategory]);

  const handleNextProduct = () => {
    playSound('slide');
    setActiveCategory((prev) => (prev + 1) % PRODUCTS_DATA.length);
  };

  const handlePrevProduct = () => {
    playSound('slide');
    setActiveCategory((prev) => (prev - 1 + PRODUCTS_DATA.length) % PRODUCTS_DATA.length);
  };

  const handleCategorySelect = (index: number) => {
    playSound('slide');
    setActiveCategory(index);
    setIsContactOpen(false);
    
    // Smooth scroll to the Hero element
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleColorSelect = (index: number) => {
    playSound('pop');
    setActiveColorIndex(index);
  };

  const handleSizeSelect = (size: string) => {
    playSound('pop');
    setSelectedSize(size);
  };

  const handleToggleTab = (toContact: boolean) => {
    playSound('pop');
    setIsContactOpen(toContact);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setIsContactOpen(false);
    }, 2500);
  };

  const renderCategoryIcon = (id: string, color: string) => {
    const sizeClass = "w-[18px] h-[18px]";
    switch (id) {
      case 'sneakers':
        return (
          <svg className={`${sizeClass} ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10c0-1-1-2-1-2s4-3 9-3 9 3 9 3-1 1-1 2M2 10s4 2 10 2 10-2 10-2M3 13s2 1 6 1 6-1 6-1" />
            <path d="M4 17h16M5 20h14" />
          </svg>
        );
      case 'mens-apparel':
        return (
          <svg className={`${sizeClass} ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.38 3.46L16 7.84V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3.84L3.62 3.46a1 1 0 0 0-1.41 0l-1 1a1 1 0 0 0 0 1.41L5.84 10H3a1 1 0 0 0-1 1v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a1 1 0 0 0-1-1h-2.84l4.63-4.13a1 1 0 0 0 0-1.41l-1-1a1 1 0 0 0-1.41 0z" />
          </svg>
        );
      case 'womens-apparel':
        return (
          <svg className={`${sizeClass} ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L3 9v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9L12 2z" />
            <path d="M9 22V12h6v10" />
          </svg>
        );
      case 'makeup-kits':
        return (
          <svg className={`${sizeClass} ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case 'gym-gear':
        return (
          <svg className={`${sizeClass} ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6.5 6.5h11M6.5 17.5h11M3 12h18M18 5v14M6 5v14" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white flex flex-col relative font-sans overflow-x-hidden selection:bg-white selection:text-zinc-950">
      
      {/* Ambient header glow spotlight transition */}
      <div 
        style={{
          background: `radial-gradient(circle, ${activeColorway.colorRight} 20%, ${activeColorway.colorLeft} 100%)`
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[75%] h-[420px] opacity-15 blur-[120px] rounded-full transition-all duration-1000 pointer-events-none z-0" 
      />

      {/* ==========================================
          GLOBAL HEADER
         ========================================== */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-45 relative">
        <div className="flex items-center gap-12">
          {/* Branded Logo */}
          <Link 
            href="/"
            className="flex items-center gap-1.5 cursor-pointer font-bold text-white tracking-widest text-xl uppercase font-display"
          >
            <span className="w-3 h-3 bg-white rounded-sm inline-block" />
            VELORA
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs text-zinc-400 font-bold uppercase tracking-widest">
            <Link href="/" className="text-white transition-colors cursor-pointer">Home</Link>
            <Link href="/collections" className="hover:text-white transition-colors cursor-pointer text-zinc-400">Shop All</Link>
            <button onClick={() => handleCategorySelect(0)} className="hover:text-white transition-colors cursor-pointer">Footwear</button>
            <button onClick={() => handleCategorySelect(1)} className="hover:text-white transition-colors cursor-pointer">Apparel</button>
            <button onClick={() => handleToggleTab(true)} className="hover:text-white transition-colors cursor-pointer">Contact Us</button>
          </nav>
        </div>

        {/* Right Corner Buttons */}
        <div className="flex items-center gap-6">
          <Link href="/collections" className="text-xs font-bold text-zinc-400 hover:text-white tracking-widest uppercase cursor-pointer">
            Catalog
          </Link>
          
          {/* Search Icon */}
          <Link href="/collections" className="text-zinc-400 hover:text-white transition-colors cursor-pointer" title="Search catalog">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </Link>
          
          {/* Cart Icon */}
          <button 
            onClick={() => setCartOpen(true)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer relative"
            aria-label="Open Cart Bag"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-white text-zinc-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center scale-90 shadow-md">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ==========================================
          1. HERO SECTION (Full-Screen Row Stage)
         ========================================== */}
      <section ref={heroRef} className="w-full px-3 sm:px-6 lg:px-8 py-2 md:py-4 z-30 relative">
        <TiltCard>
          <div 
            className="w-full h-[85vh] min-h-[680px] max-h-[920px] bg-zinc-900 rounded-[32px] md:rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.85)] border border-white/10 relative flex flex-col [transform-style:preserve-3d]"
          >
            {/* Inner reflection border */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-[32px] [transform:translateZ(10px)]" />

            {/* Toggle pill selector */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-25 bg-white/10 backdrop-blur-md p-1 rounded-full flex border border-white/5 shadow-inner [transform:translateZ(30px)]">
              <div 
                className={`absolute top-1 bottom-1 rounded-full bg-white transition-all duration-500 shadow-sm ${
                  isContactOpen ? 'left-[calc(50%+4px)] right-1' : 'left-1 right-[calc(50%+4px)]'
                }`}
              />
              <button 
                onClick={() => handleToggleTab(false)}
                className={`px-5 py-1.5 text-xs font-semibold rounded-full relative z-10 cursor-pointer tracking-wider uppercase transition-colors duration-300 ${
                  !isContactOpen ? 'text-zinc-950 font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                Products
              </button>
              <button 
                onClick={() => handleToggleTab(true)}
                className={`px-5 py-1.5 text-xs font-semibold rounded-full relative z-10 cursor-pointer tracking-wider uppercase transition-colors duration-300 ${
                  isContactOpen ? 'text-zinc-950 font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Inline header inside mockup box */}
            <div className="w-full px-8 pt-6 pb-2 flex items-center justify-between z-20 [transform:translateZ(25px)]">
              <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">| studio | velora</span>
              <div className="flex items-center gap-3">
                <Link
                  href={`/products/${activeProduct.id}`}
                  className="hidden sm:inline-flex text-xs font-bold text-zinc-300 hover:text-white uppercase tracking-wider transition-colors px-3 py-2"
                >
                  View Details &rarr;
                </Link>
                <button 
                  onClick={() => {
                    playSound('success');
                    addToCart({
                      id: `${activeProduct.id}-${selectedSize}-${activeColorway.name}`,
                      variantId: `${activeProduct.id}-${activeColorIndex}-${selectedSize}`,
                      title: `${activeProduct.name} (${selectedSize} / ${activeColorway.name})`,
                      productTitle: activeProduct.name,
                      price: '139.99',
                      image: activeProduct.imageUrl,
                      customAttributes: [
                        { key: 'Size', value: selectedSize },
                        { key: 'Color', value: activeColorway.name },
                      ],
                    }, 1);
                  }}
                  className="bg-white text-zinc-950 hover:bg-zinc-100 transition-all duration-300 py-2.5 px-5 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-white/15"
                >
                  Add to Bag
                  <SvgArrowRight />
                </button>
              </div>
            </div>

            {/* Main Stage */}
            <div className="flex-grow flex relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isContactOpen ? (
                  
                  /* ==========================================
                      B1. HERO PRODUCT DISPLAY STAGE (Diagonal Split & Radial Gradient Out-to-In)
                     ========================================== */
                  <motion.div 
                    key="products-stage"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex absolute inset-0 [transform-style:preserve-3d]"
                  >
                    {/* Backdrop Gradient: Spotlight transition inside coming from out to inside */}
                    <div 
                      style={{
                        background: `radial-gradient(circle, ${activeColorway.colorRight} 20%, ${activeColorway.colorLeft} 100%)`
                      }}
                      className="absolute inset-0 opacity-90 transition-all duration-[1200ms] ease-out z-0"
                    />

                    {/* A1. Upper Left Solid text sliding out from center product */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-10 [transform:translateZ(10px)]">
                      <motion.h1 
                        key={activeProduct.id + '-tr'}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0.95 }}
                        animate={{ x: '-18vw', y: '-10vh', opacity: 0.8, scale: 1.15 }}
                        transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.3, delay: 0.15 }}
                        style={{ color: activeColorway.textColor }}
                        className="font-display font-black text-[7vw] md:text-[9vw] tracking-tighter uppercase leading-none select-none transition-colors duration-1000 absolute"
                      >
                        {activeProduct.bgTextTopRight}
                      </motion.h1>
                    </div>

                    {/* A2. Bottom Right Solid text sliding out from center product */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-10 [transform:translateZ(10px)]">
                      <motion.h1 
                        key={activeProduct.id + '-bl'}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0.95 }}
                        animate={{ x: '18vw', y: '10vh', opacity: 0.8, scale: 1.15 }}
                        transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.3, delay: 0.15 }}
                        style={{ color: activeColorway.textColor }}
                        className="font-display font-black text-[7vw] md:text-[9vw] tracking-tighter uppercase leading-none select-none transition-colors duration-1000 absolute"
                      >
                        {activeProduct.bgTextBottomLeft}
                      </motion.h1>
                    </div>
                    
                    {/* Visual Splatter Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none z-5 scale-90 mix-blend-overlay [transform:translateZ(5px)]">
                      <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] text-white fill-current">
                        <path d="M50 20 C60 10, 80 15, 85 30 C90 45, 80 70, 65 80 C50 90, 30 85, 20 70 C10 55, 15 30, 35 20 C40 15, 45 10, 50 20 Z" />
                      </svg>
                    </div>

                    {/* Navigation Arrow Left */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-35 [transform:translateZ(30px)]">
                      <button 
                        onClick={handlePrevProduct}
                        className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
                      >
                        <SvgChevronLeft />
                      </button>
                    </div>

                    {/* Navigation Arrow Right */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-35 [transform:translateZ(30px)]">
                      <button 
                        onClick={handleNextProduct}
                        className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
                      >
                        <SvgChevronRight />
                      </button>
                    </div>

                    {/* 1. Left Description */}
                    <div className="w-[30%] h-full pl-12 flex flex-col justify-center text-white relative z-30 select-none [transform:translateZ(30px)]">
                      <motion.div
                        key={activeProduct.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col gap-4"
                      >
                        <span className="text-white/60 text-xs font-bold uppercase tracking-[0.25em]">
                          {activeProduct.category}
                        </span>
                        
                        {/* Title text on left of center image */}
                        <h2 className="font-display font-black text-4xl lg:text-5xl leading-tight uppercase tracking-tight text-white drop-shadow-sm">
                          {activeProduct.headerTextLeft}
                        </h2>
                        
                        <p className="text-xs text-white/75 leading-relaxed font-medium max-w-[280px] drop-shadow-md">
                          {activeProduct.description}
                        </p>
                      </motion.div>

                      {/* Social Media links */}
                      <div className="absolute bottom-6 left-12 flex flex-col gap-2 text-white/50 items-start">
                        <span className="text-[9px] font-black tracking-widest text-white/60 uppercase">Social Media</span>
                        <div className="flex items-center gap-3">
                          <a href="#" className="hover:text-white transition-colors"><SvgFacebook /></a>
                          <a href="#" className="hover:text-white transition-colors"><SvgInstagram /></a>
                          <a href="#" className="hover:text-white transition-colors"><SvgTikTok /></a>
                        </div>
                      </div>
                    </div>

                    {/* 2. Center Stage (Stationary Product Image - z-depth layered in front) */}
                    <div className="w-[40%] h-full flex flex-col items-center justify-center relative z-20 [transform-style:preserve-3d]">
                      <div 
                        className={`w-full relative flex items-center justify-center [transform:translateZ(110px)] [transform-style:preserve-3d] ${
                          activeProduct.id === 'mens-apparel' || activeProduct.id === 'womens-apparel'
                            ? 'max-w-[540px] h-[640px]' 
                            : 'max-w-[420px] aspect-square'
                        }`}
                      >
                        {/* Styled floor shadow */}
                        <div className="absolute bottom-6 w-[80%] h-6 bg-black/40 rounded-full blur-xl pointer-events-none" />
                        
                        {/* Snappy Bouncing Entry Slide-up from bottom to middle */}
                        <motion.img
                          key={activeProduct.id + '-' + activeColorIndex}
                          initial={{ y: 280, opacity: 0, scale: 0.8 }}
                          animate={{ y: 0, opacity: 1, scale: activeProduct.scale }}
                          transition={{ 
                            type: 'spring', 
                            stiffness: 110, 
                            damping: 20, 
                            mass: 0.95
                          }}
                          src={activeProduct.imageUrl} 
                          alt={activeProduct.name}
                          className={`w-[95%] h-[95%] object-contain select-none pointer-events-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)] ${activeColorway.filterClass}`}
                        />
                      </div>

                      {/* Centered Footer line */}
                      <div className="absolute bottom-6 flex flex-col items-center gap-1.5 [transform:translateZ(15px)] z-30">
                        <span className="text-[10px] text-white/80 font-black uppercase tracking-[0.35em] drop-shadow-md">
                          {activeProduct.footerTextCenter}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-[1px] bg-white/20" />
                          <span className="text-[9px] text-white/50 font-bold uppercase tracking-[0.3em]">
                            {activeProduct.sizeLabel}
                          </span>
                          <span className="w-8 h-[1px] bg-white/20" />
                        </div>
                      </div>
                    </div>

                    {/* 3. Right Panel (Selectors & Title Right) */}
                    <div className="w-[30%] h-full pr-12 flex flex-col justify-center items-end text-white relative z-30 [transform:translateZ(30px)]">
                      <div className="flex flex-col gap-8 items-end mb-6">
                        
                        {/* Title text on right of center image */}
                        <div className="flex flex-col gap-1 items-end">
                          <span className="text-white/60 text-xs font-bold uppercase tracking-[0.25em]">Edition</span>
                          <h4 className="font-display font-black text-2xl lg:text-3xl leading-tight uppercase tracking-tight text-right text-white drop-shadow-sm">
                            {activeProduct.headerTextRight}
                          </h4>
                        </div>

                        {/* Color swatches */}
                        <div className="flex flex-col gap-3 items-end">
                          <span className="text-[10px] text-white/50 font-bold uppercase tracking-[0.25em]">Choose Edition</span>
                          <div className="flex gap-2">
                            {activeProduct.colorways.map((cw, idx) => (
                              <button
                                key={cw.hex}
                                onClick={() => handleColorSelect(idx)}
                                style={{ backgroundColor: cw.hex }}
                                className={`w-6 h-6 rounded-full cursor-pointer relative transition-all duration-300 hover:scale-110 ${
                                  activeColorIndex === idx ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110 shadow-lg' : 'opacity-85'
                                }`}
                                title={cw.name}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Size button circles */}
                        <div className="flex flex-col gap-3 items-end">
                          <span className="text-[10px] text-white/50 font-bold uppercase tracking-[0.25em]">Available Sizes</span>
                          <div className="flex gap-2">
                            {activeProduct.sizes.map((sz) => (
                              <button
                                key={sz}
                                onClick={() => handleSizeSelect(sz)}
                                className={`w-10 h-10 rounded-full border text-xs font-bold flex items-center justify-center cursor-pointer transition-all duration-300 ${
                                  selectedSize === sz 
                                    ? 'bg-white text-zinc-950 border-white scale-105 shadow-md shadow-white/10' 
                                    : 'border-white/25 text-white hover:border-white/60'
                                }`}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-6 right-12">
                        <Link 
                          href="/collections"
                          className="text-white hover:text-white/80 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all hover:translate-x-1"
                        >
                          See all products
                          <SvgArrowRight />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  
                  /* ==========================================
                      B2. HERO CONTACT FORM OVERLAY
                     ========================================== */
                  <motion.div 
                    key="contact-page"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex absolute inset-0 items-center justify-center p-8 z-30 [transform:translateZ(30px)]"
                  >
                    <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md z-0" />
                    <div className="w-full max-w-xl p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 relative z-10 shadow-2xl text-white">
                      {!formSubmitted ? (
                        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.25em]">Let's Connect</span>
                            <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                              <span className="w-3 h-3 bg-white rounded-full inline-block animate-pulse" />
                              Send an Inquiry
                            </h3>
                            <p className="text-xs text-white/60">Have a custom sizing, apparel bulk order, or wholesale request? Fill this card.</p>
                          </div>

                          <div className="flex flex-col gap-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex flex-col gap-1 text-[10px] text-white/50 font-bold uppercase tracking-wider">
                                <label htmlFor="name-input">Full Name</label>
                                <input 
                                  type="text" 
                                  id="name-input"
                                  required
                                  value={contactName}
                                  onChange={(e) => setContactName(e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all mt-1"
                                  placeholder="John Doe"
                                />
                              </div>
                              <div className="flex flex-col gap-1 text-[10px] text-white/50 font-bold uppercase tracking-wider">
                                <label htmlFor="email-input">Email Address</label>
                                <input 
                                  type="email" 
                                  id="email-input"
                                  required
                                  value={contactEmail}
                                  onChange={(e) => setContactEmail(e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all mt-1"
                                  placeholder="john@example.com"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 text-[10px] text-white/50 font-bold uppercase tracking-wider">
                              <label htmlFor="msg-input">Inquiry Message</label>
                              <textarea 
                                id="msg-input"
                                required
                                rows={3}
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all resize-none mt-1"
                                placeholder="Tell us what you need..."
                              />
                            </div>
                          </div>

                          <button 
                            type="submit" 
                            className="w-full bg-white text-zinc-950 hover:bg-zinc-100 transition-all duration-300 py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-white/10"
                          >
                            Submit Message
                            <SvgSend />
                          </button>
                        </form>
                      ) : (
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex flex-col items-center justify-center py-12 text-center gap-4"
                        >
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-zinc-950 shadow-lg">
                            <SvgCheck />
                          </div>
                          <h4 className="text-xl font-bold uppercase tracking-tight">Message Received!</h4>
                          <p className="text-xs text-white/70 max-w-[280px]">Thank you for reaching out. We will get back to you pitch-side within 24 hours.</p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mockup footer tab slider */}
            <footer className="w-full bg-black/40 backdrop-blur-md px-12 py-4 flex items-center justify-between border-t border-white/5 z-40 [transform:translateZ(20px)]">
              <span className="text-[10px] text-white/45 font-bold uppercase tracking-widest">Studio Phlox &copy; 2026</span>
              <div className="flex gap-4">
                {PRODUCTS_DATA.map((prod, index) => {
                  const isActive = activeCategory === index && !isContactOpen;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => handleCategorySelect(index)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                        isActive 
                          ? 'bg-white text-zinc-950 font-bold shadow-md scale-105' 
                          : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5'
                      }`}
                    >
                      {renderCategoryIcon(prod.id, isActive ? 'text-zinc-950' : 'text-white/60')}
                      <span className="text-[10px] font-bold uppercase tracking-wider">{prod.name}</span>
                    </button>
                  );
                })}
              </div>
              <span className="text-[10px] text-white/45 font-bold uppercase tracking-widest hidden sm:block">Next.js + Turbopack</span>
            </footer>
          </div>
        </TiltCard>
      </section>

      {/* ==========================================
          2. CATEGORY PROMO GRID (Asymmetric 3D Parallax Grid)
         ========================================== */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16 z-30 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Card 1: Men's Apparel */}
          <TiltCard className="md:col-span-1 h-[320px] rounded-3xl group shadow-lg overflow-hidden border border-white/5 bg-zinc-900">
            <div className="w-full h-full p-6 relative flex flex-col justify-between [transform-style:preserve-3d]">
              <div className="absolute inset-0 bg-radial-gradient(at_top_left,rgba(255,255,255,0.03),transparent) pointer-events-none" />
              <div className="z-10 flex flex-col gap-1.5 [transform:translateZ(20px)]">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Enjoy With</span>
                <h4 className="text-2xl font-black uppercase tracking-tight leading-none text-white">Menswear</h4>
                <span className="text-[9px] font-black tracking-widest text-zinc-400 bg-white/10 px-2 py-0.5 rounded-md w-max uppercase mt-1">APPAREL</span>
              </div>
              <button 
                onClick={() => handleCategorySelect(1)}
                className="z-10 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-6 rounded-full w-max cursor-pointer transition-colors duration-300 [transform:translateZ(25px)]"
              >
                Browse
              </button>
              
              {/* Product Image */}
              <img 
                src="/mens_outfit.png" 
                alt="Menswear" 
                className="absolute -right-6 -bottom-6 w-[180px] h-[180px] object-contain group-hover:scale-105 transition-all duration-500 pointer-events-none filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] [transform:translateZ(50px)]"
              />
            </div>
          </TiltCard>

          {/* Card 2: Women's Apparel */}
          <TiltCard className="md:col-span-1 h-[320px] rounded-3xl group shadow-lg overflow-hidden bg-amber-500">
            <div className="w-full h-full p-6 relative flex flex-col justify-between [transform-style:preserve-3d] text-zinc-950">
              <div className="absolute inset-0 bg-radial-gradient(at_top_left,rgba(255,255,255,0.1),transparent) pointer-events-none" />
              <div className="z-10 flex flex-col gap-1.5 [transform:translateZ(20px)]">
                <span className="text-[10px] font-bold text-zinc-900/60 uppercase tracking-widest">New Wearable</span>
                <h4 className="text-2xl font-black uppercase tracking-tight leading-none">Womenswear</h4>
                <span className="text-[9px] font-black tracking-widest text-zinc-900 bg-white/30 px-2 py-0.5 rounded-md w-max uppercase mt-1">ACTIVE</span>
              </div>
              <button 
                onClick={() => handleCategorySelect(2)}
                className="z-10 bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold py-2.5 px-6 rounded-full w-max cursor-pointer transition-colors duration-300 [transform:translateZ(25px)]"
              >
                Browse
              </button>
              
              {/* Product Image */}
              <img 
                src="/womens_wear.png" 
                alt="Womenswear" 
                className="absolute -right-6 -bottom-6 w-[170px] h-[170px] object-contain rotate-[-10deg] group-hover:scale-110 group-hover:rotate-[0deg] transition-all duration-500 pointer-events-none filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)] [transform:translateZ(50px)]"
              />
            </div>
          </TiltCard>

          {/* Card 3: Sneakers */}
          <TiltCard className="md:col-span-2 h-[320px] rounded-3xl group shadow-lg overflow-hidden bg-red-600">
            <div className="w-full h-full p-8 relative flex flex-col justify-between [transform-style:preserve-3d] text-white">
              <div className="absolute inset-0 bg-radial-gradient(at_top_left,rgba(255,255,255,0.1),transparent) pointer-events-none" />
              <div className="z-10 flex flex-col gap-1.5 max-w-[200px] [transform:translateZ(20px)]">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Trending Footwear</span>
                <h4 className="text-3xl font-black uppercase tracking-tight leading-none">Sneakers</h4>
                <p className="text-xs text-white/80 leading-relaxed mt-2">Discover premium low-profile and high-top sneakers crafted with bold styling elements.</p>
              </div>
              <button 
                onClick={() => handleCategorySelect(0)}
                className="z-10 bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold py-2.5 px-6 rounded-full w-max cursor-pointer transition-colors duration-300 [transform:translateZ(25px)]"
              >
                Browse
              </button>
              
              {/* Product Image */}
              <img 
                src="/sneaker_red.png" 
                alt="Sneakers" 
                className="absolute -right-6 -bottom-10 w-[270px] h-[270px] object-contain rotate-[-25deg] group-hover:scale-110 group-hover:rotate-[-15deg] transition-all duration-500 pointer-events-none filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)] [transform:translateZ(55px)]"
              />
            </div>
          </TiltCard>

          {/* Card 4: Gym Gear */}
          <TiltCard className="md:col-span-2 h-[320px] rounded-3xl group shadow-lg overflow-hidden bg-zinc-200">
            <div className="w-full h-full p-8 relative flex flex-col justify-between [transform-style:preserve-3d] text-zinc-950">
              <div className="absolute inset-0 bg-radial-gradient(at_top_left,rgba(0,0,0,0.03),transparent) pointer-events-none" />
              <div className="z-10 flex flex-col gap-1.5 max-w-[200px] [transform:translateZ(20px)]">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Premium Strength</span>
                <h4 className="text-3xl font-black uppercase tracking-tight leading-none">Gym Gear</h4>
                <p className="text-xs text-zinc-600 leading-relaxed mt-2">Cast iron hex weights and dumbbells engineered to elevate stadium training.</p>
              </div>
              <button 
                onClick={() => handleCategorySelect(4)}
                className="z-10 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-6 rounded-full w-max cursor-pointer transition-colors duration-300 [transform:translateZ(25px)]"
              >
                Browse
              </button>
              
              {/* Product Image */}
              <img 
                src="/gym_equipment.png" 
                alt="Gym Gear" 
                className="absolute -right-8 -bottom-8 w-[250px] h-[250px] object-contain rotate-[-10deg] group-hover:scale-110 group-hover:rotate-[0deg] transition-all duration-500 pointer-events-none filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.25)] [transform:translateZ(55px)]"
              />
            </div>
          </TiltCard>

          {/* Card 5: Makeup Kits */}
          <TiltCard className="md:col-span-1 h-[320px] rounded-3xl group shadow-lg overflow-hidden bg-emerald-600">
            <div className="w-full h-full p-6 relative flex flex-col justify-between [transform-style:preserve-3d] text-white">
              <div className="absolute inset-0 bg-radial-gradient(at_top_left,rgba(255,255,255,0.1),transparent) pointer-events-none" />
              <div className="z-10 flex flex-col gap-1.5 [transform:translateZ(20px)]">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Glam Style</span>
                <h4 className="text-2xl font-black uppercase tracking-tight leading-none">Makeup Kits</h4>
                <span className="text-[9px] font-black tracking-widest text-white bg-white/20 px-2 py-0.5 rounded-md w-max uppercase mt-1">LUXURY</span>
              </div>
              <button 
                onClick={() => handleCategorySelect(3)}
                className="z-10 bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold py-2.5 px-6 rounded-full w-max cursor-pointer transition-colors duration-300 [transform:translateZ(25px)]"
              >
                Browse
              </button>
              
              {/* Product Image */}
              <img 
                src="/makeup_kit.png" 
                alt="Makeup Kits" 
                className="absolute -right-8 -bottom-8 w-[190px] h-[190px] object-contain rotate-[-15deg] group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-500 pointer-events-none filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] [transform:translateZ(50px)]"
              />
            </div>
          </TiltCard>

          {/* Card 6: Accessories */}
          <TiltCard className="md:col-span-1 h-[320px] rounded-3xl group shadow-lg overflow-hidden bg-blue-600">
            <div className="w-full h-full p-6 relative flex flex-col justify-between [transform-style:preserve-3d] text-white">
              <div className="absolute inset-0 bg-radial-gradient(at_top_left,rgba(255,255,255,0.1),transparent) pointer-events-none" />
              <div className="z-10 flex flex-col gap-1.5 [transform:translateZ(20px)]">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Featured Items</span>
                <h4 className="text-2xl font-black uppercase tracking-tight leading-none">Accessories</h4>
                <span className="text-[9px] font-black tracking-widest text-white bg-white/20 px-2 py-0.5 rounded-md w-max uppercase mt-1">HOME DECOR</span>
              </div>
              <button 
                onClick={() => handleCategorySelect(0)}
                className="z-10 bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold py-2.5 px-6 rounded-full w-max cursor-pointer transition-colors duration-300 [transform:translateZ(25px)]"
              >
                Browse
              </button>
              
              {/* Product Image */}
              <img 
                src="/jellyfish_ball.png" 
                alt="Accessories" 
                className="absolute -right-6 -bottom-6 w-[170px] h-[170px] object-contain group-hover:scale-105 transition-all duration-500 pointer-events-none filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.4)] [transform:translateZ(50px)]"
              />
            </div>
          </TiltCard>

        </div>
      </section>

      {/* ==========================================
          3. BENEFITS VALUE BAR
         ========================================== */}
      <section className="w-full border-t border-zinc-900 bg-zinc-950 py-12 z-30 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="flex items-start gap-4">
            <div className="text-red-500 mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="2" y="6" rx="2"/><path d="M16 8h4l3 3v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h13M16 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-9 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/></svg>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-wider text-white">Free Shipping</h5>
              <p className="text-xs text-zinc-500 mt-0.5">Free Shipping On All Orders</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-red-500 mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-wider text-white">Money Guarantee</h5>
              <p className="text-xs text-zinc-500 mt-0.5">30-Day Money Back Guarantee</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-red-500 mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-wider text-white">Online Support 24/7</h5>
              <p className="text-xs text-zinc-500 mt-0.5">Technical Support 24/7</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-red-500 mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-wider text-white">Secure Payment</h5>
              <p className="text-xs text-zinc-500 mt-0.5">All Cards Accepted</p>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          4. SUMMER SALE BANNER
         ========================================== */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 z-30 relative">
        <TiltCard className="w-full rounded-[32px] overflow-hidden bg-red-600">
          <div className="w-full p-8 md:p-12 relative flex flex-col md:flex-row items-center justify-between shadow-2xl group min-h-[300px] [transform-style:preserve-3d]">
            
            <div className="absolute inset-0 bg-radial-gradient(at_top_right,rgba(255,255,255,0.1),transparent) pointer-events-none" />

            {/* Overlapping promo image */}
            <div className="absolute top-1/2 left-[45%] -translate-y-1/2 -translate-x-1/2 w-[350px] h-[350px] pointer-events-none z-10 hidden lg:block [transform:translateZ(80px)]">
              <img 
                src="/sneaker_red.png" 
                alt="Promo Sneaker" 
                className="w-full h-full object-contain rotate-[-25deg] scale-110 filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.6)] group-hover:scale-120 group-hover:rotate-[-15deg] transition-all duration-700"
              />
            </div>

            {/* Left Column */}
            <div className="flex flex-col gap-2 z-20 text-white [transform:translateZ(30px)]">
              <span className="text-xs font-bold tracking-[0.25em] text-white/80 uppercase">20% OFF</span>
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                FINE<br />SMILE
              </h3>
              <span className="text-[10px] font-bold tracking-widest text-white/70 mt-2 uppercase">15 Nov To 7 Dec</span>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 z-20 text-white max-w-sm mt-8 md:mt-0 text-left md:text-right items-start md:items-end [transform:translateZ(30px)]">
              <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase">Lifestyle Series</span>
              <h4 className="text-3xl font-black uppercase tracking-tight leading-none">Summer Sale</h4>
              <p className="text-xs text-white/85 leading-relaxed">
                Step into style with custom high-top sneakers, matching menswear apparel, active sports sets, and gym accessories discounted up to 20% for a limited time.
              </p>
              <Link 
                href="/collections"
                className="bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold py-3 px-8 rounded-full cursor-pointer shadow-lg hover:shadow-white/10 transition-all duration-300 mt-2 [transform:translateZ(35px)] inline-block"
              >
                Shop Now
              </Link>
            </div>

          </div>
        </TiltCard>
      </section>

      {/* ==========================================
          5. FOOTER
         ========================================== */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-12 text-zinc-500 text-xs z-30 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-zinc-700 rounded-sm inline-block" />
            <span className="font-bold tracking-wider text-zinc-400">PHLOX E-COMMERCE</span>
            <span>&copy; 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund center</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

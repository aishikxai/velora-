'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Share2, 
  Heart,
  ChevronRight 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { VeloraProduct, ProductColorway, VELORA_PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailClient({ product }: { product: VeloraProduct }) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  const { addToCart, setCartOpen } = useCart();

  const activeColor: ProductColorway = product.colorways[selectedColorIdx] || product.colorways[0];

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}-${activeColor.name}`,
      variantId: `${product.id}-${selectedColorIdx}-${selectedSize}`,
      title: `${product.name} (${selectedSize} / ${activeColor.name})`,
      productTitle: product.name,
      price: product.price.toString(),
      image: product.imageUrl,
      customAttributes: [
        { key: 'Size', value: selectedSize },
        { key: 'Color', value: activeColor.name },
      ],
    }, quantity);

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const relatedProducts = VELORA_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white flex flex-col relative font-sans selection:bg-white selection:text-zinc-950">
      
      {/* Ambient background glow matched to active colorway */}
      <div 
        style={{
          background: `radial-gradient(circle at 50% 20%, ${activeColor.colorRight} 0%, transparent 65%)`
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[550px] opacity-20 blur-[140px] rounded-full pointer-events-none z-0 transition-all duration-1000"
      />

      {/* Global Navbar */}
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="w-full max-w-7xl mx-auto px-6 py-4 z-20 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
          <ChevronRight size={12} />
          <span className="text-zinc-500">{product.category}</span>
          <ChevronRight size={12} />
          <span className="text-white font-semibold truncate max-w-[150px] sm:max-w-none">{product.name}</span>
        </div>

        <Link 
          href="/collections" 
          className="hover:text-white flex items-center gap-1.5 transition-colors font-bold uppercase tracking-wider text-[11px]"
        >
          <ArrowLeft size={13} />
          Back to Catalog
        </Link>
      </div>

      {/* Main Product Showcase Grid */}
      <main className="w-full max-w-7xl mx-auto px-6 py-6 md:py-10 z-20 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: Architectural Visual Presentation Stage (Col-span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Main Stage Canvas with 3D Depth Backdrop */}
            <div 
              style={{
                background: `radial-gradient(circle, ${activeColor.colorRight} 15%, ${activeColor.colorLeft} 100%)`
              }}
              className="w-full aspect-[4/3] sm:aspect-[16/11] rounded-[36px] border border-white/10 relative overflow-hidden flex items-center justify-center p-8 transition-all duration-1000 shadow-[0_30px_70px_rgba(0,0,0,0.85)]"
            >
              {/* Background Split Letters Layer */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <span 
                  style={{ color: activeColor.textColor }}
                  className="font-display font-black text-[14vw] tracking-tighter uppercase leading-none opacity-80 absolute top-4 left-6 transition-colors duration-1000"
                >
                  {product.bgTextTopRight}
                </span>
                <span 
                  style={{ color: activeColor.textColor }}
                  className="font-display font-black text-[14vw] tracking-tighter uppercase leading-none opacity-80 absolute bottom-4 right-6 transition-colors duration-1000"
                >
                  {product.bgTextBottomLeft}
                </span>
              </div>

              {/* Tag Overlays */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white">
                  {product.category}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
                  {product.footerTextCenter}
                </span>
              </div>

              {/* Floating Product Image with Snappy Spring Transition */}
              <div className="relative w-full h-full flex items-center justify-center z-10">
                <div className="absolute bottom-4 w-[70%] h-6 bg-black/50 rounded-full blur-xl pointer-events-none" />
                <motion.img
                  key={product.id + '-' + selectedColorIdx}
                  initial={{ y: 80, opacity: 0, scale: 0.85 }}
                  animate={{ y: 0, opacity: 1, scale: product.scale }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  src={product.imageUrl}
                  alt={product.name}
                  className={`max-w-[85%] max-h-[85%] object-contain select-none pointer-events-none filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] ${activeColor.filterClass}`}
                />
              </div>

              {/* Colorway Pill Overlay */}
              <div className="absolute bottom-6 left-6 z-20 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeColor.hex }} />
                <span className="font-semibold text-white">{activeColor.name}</span>
              </div>
            </div>

            {/* Value Trust Features Bar */}
            <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-zinc-900/50 border border-white/10 text-center">
              <div className="flex flex-col items-center gap-1.5 text-zinc-400">
                <Truck size={18} className="text-white" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">Free Delivery</span>
                <span className="text-[10px]">On all orders over $150</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-zinc-400 border-x border-white/10">
                <ShieldCheck size={18} className="text-white" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">Authentic</span>
                <span className="text-[10px]">100% Certified Original</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-zinc-400">
                <RotateCcw size={18} className="text-white" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">30-Day Returns</span>
                <span className="text-[10px]">Simple hassle-free policy</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Product Information, Options, & CTA Panel (Col-span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-7">
            
            {/* Header, Rating & Price */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                  {product.headerTextLeft} &bull; {product.headerTextRight}
                </span>

                <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-amber-400">
                  <Star size={12} className="fill-amber-400" />
                  <span className="text-white">{product.rating}</span>
                  <span className="text-zinc-500 font-normal">({product.reviewsCount})</span>
                </div>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
                {product.name}
              </h1>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-display font-black text-3xl text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-semibold text-zinc-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Separator */}
            <div className="h-px bg-white/10" />

            {/* Colorway Selection */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Color / Finish: <strong className="text-white ml-1">{activeColor.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colorways.map((cw, idx) => (
                  <button
                    key={cw.hex}
                    onClick={() => setSelectedColorIdx(idx)}
                    style={{ backgroundColor: cw.hex }}
                    className={`w-9 h-9 rounded-full cursor-pointer relative transition-all duration-300 hover:scale-110 flex items-center justify-center ${
                      selectedColorIdx === idx
                        ? 'ring-2 ring-white ring-offset-3 ring-offset-zinc-950 scale-110 shadow-lg'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={cw.name}
                  >
                    {selectedColorIdx === idx && (
                      <Check size={14} className="text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size / Variant Selection */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  {product.sizeLabel}: <strong className="text-white ml-1">{selectedSize}</strong>
                </span>
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">Size Guide</span>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[48px] h-12 px-4 rounded-xl border text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-zinc-950 border-white shadow-lg shadow-white/15 scale-105'
                          : 'border-white/15 text-zinc-300 hover:border-white/40 hover:text-white bg-white/5'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Pill */}
                <div className="flex items-center border border-white/20 bg-zinc-900 rounded-full px-4 py-3 h-13">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-zinc-400 hover:text-white text-base font-bold cursor-pointer px-1"
                  >
                    &minus;
                  </button>
                  <span className="font-bold text-sm min-w-[32px] text-center text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-zinc-400 hover:text-white text-base font-bold cursor-pointer px-1"
                  >
                    &#43;
                  </button>
                </div>

                {/* Primary Add to Bag CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-white hover:bg-zinc-200 text-zinc-950 font-display font-bold text-xs uppercase tracking-widest h-13 rounded-full transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  Add to Bag &bull; ${(product.price * quantity).toFixed(2)}
                </button>
              </div>

              {/* Instant Buy Button */}
              <button
                onClick={() => {
                  handleAddToCart();
                  setCartOpen(true);
                }}
                className="w-full bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white font-display font-bold text-xs uppercase tracking-widest py-3.5 rounded-full transition-all cursor-pointer"
              >
                Buy Now
              </button>

              <AnimatePresence>
                {addedNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center text-xs font-bold text-emerald-400 flex items-center justify-center gap-2"
                  >
                    <Check size={14} />
                    Added to your bag!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Technical Tabs: Details / Specs / Reviews */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
              <div className="flex border-b border-white/10 gap-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer relative ${
                    activeTab === 'details' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Overview
                  {activeTab === 'details' && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer relative ${
                    activeTab === 'specs' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Specifications
                  {activeTab === 'specs' && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer relative ${
                    activeTab === 'reviews' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Reviews ({product.reviewsCount})
                  {activeTab === 'reviews' && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
              </div>

              {/* Tab Contents */}
              <div className="text-xs leading-relaxed text-zinc-400">
                {activeTab === 'details' && (
                  <div className="flex flex-col gap-3">
                    <p>{product.fullDetails}</p>
                    <ul className="flex flex-col gap-2 mt-2">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-zinc-300">
                          <Check size={12} className="text-white shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-3">
                    {product.specs.map((s, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold block">{s.label}</span>
                        <span className="text-xs text-white font-medium mt-0.5 block">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-3xl font-black font-display text-white">{product.rating}</div>
                      <div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] text-zinc-400">Based on {product.reviewsCount} verified purchase ratings</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* You May Also Like Related Products Grid */}
        <section className="mt-20 pt-12 border-t border-white/10">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block mb-1">
                More From Velora
              </span>
              <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white">
                Pair With These Essentials
              </h2>
            </div>
            <Link 
              href="/collections" 
              className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              View Full Catalog
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="group p-5 bg-zinc-900/60 border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/30 transition-all"
              >
                <div className="w-full aspect-square bg-zinc-950 rounded-xl flex items-center justify-center p-4 mb-4 relative overflow-hidden">
                  <img
                    src={rel.imageUrl}
                    alt={rel.name}
                    className="w-[80%] h-[80%] object-contain group-hover:scale-110 transition-transform duration-500 filter drop-shadow-md"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">{rel.category}</span>
                  <h4 className="font-display font-bold text-sm text-white line-clamp-1 uppercase tracking-tight mt-0.5">{rel.name}</h4>
                  <span className="font-display font-bold text-sm text-white mt-2 block">${rel.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-10 text-zinc-500 text-xs relative z-20 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-white rounded-sm inline-block" />
            <span className="font-bold tracking-wider text-zinc-300 uppercase">VELORA LUXURY</span>
            <span>&copy; 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
            <Link href="/#contact-section" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

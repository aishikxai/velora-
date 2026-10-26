'use client';

import React, { Suspense, useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowRight, ShoppingBag, Eye, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { VELORA_PRODUCTS, VeloraProduct } from '@/data/products';
import { useCart } from '@/context/CartContext';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const { addToCart } = useCart();

  const categories = ['All', 'Footwear', 'Menswear', 'Womenswear', 'Cosmetics', 'Equipment', 'Accessories'];

  const filteredProducts = useMemo(() => {
    return VELORA_PRODUCTS.filter((product) => {
      // Category match
      let categoryMatch = true;
      if (activeCategory === 'Apparel') {
        categoryMatch = product.category === 'Menswear' || product.category === 'Womenswear';
      } else if (activeCategory !== 'All') {
        categoryMatch = product.category.toLowerCase() === activeCategory.toLowerCase();
      }

      // Search match
      const queryMatch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && queryMatch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [activeCategory, searchQuery, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, product: VeloraProduct) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: `${product.id}-${product.sizes[0] || 'standard'}`,
      variantId: `${product.id}-default`,
      title: `${product.name} (${product.sizes[0] || 'Standard'})`,
      productTitle: product.name,
      price: product.price.toString(),
      image: product.imageUrl,
      customAttributes: [
        { key: 'Size', value: product.sizes[0] || 'Standard' },
        { key: 'Color', value: product.colorways[0]?.name || 'Standard' },
      ],
    }, 1);

    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 1800);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white flex flex-col relative font-sans selection:bg-white selection:text-zinc-950">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[350px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Global Navbar */}
      <Navbar activeTab="collections" />

      {/* Main Container */}
      <main className="w-full max-w-7xl mx-auto px-6 py-8 md:py-12 z-20 flex-grow flex flex-col">
        
        {/* Page Header with Strong Visual Hierarchy */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/10">
          <div>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em] block mb-2">
              Curated Catalog 2026
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-white">
              Collections
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg leading-relaxed">
              Explore high-performance footwear, French flax linen apparel, studio cosmetics, and designer home ambience.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
            </span>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-900 border border-white/15 rounded-full px-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-white/40 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="py-6 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
          
          {/* Categories Pill Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white text-zinc-950 shadow-md scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-all"
            />
            <Search size={14} className="absolute left-3.5 top-3.5 text-zinc-500" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-zinc-400 hover:text-white text-xs font-bold"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center py-20 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500">
              <SlidersHorizontal size={24} />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white">No products found</h3>
            <p className="text-xs text-zinc-400 max-w-sm">
              We couldn&apos;t find any items matching your selected category or search keyword.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-4 pb-16"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => {
                const colorway = product.colorways[0];
                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group flex flex-col bg-zinc-900/70 border border-white/10 rounded-[28px] overflow-hidden hover:border-white/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  >
                    {/* Visual Card Media */}
                    <Link 
                      href={`/products/${product.slug}`}
                      className="relative w-full aspect-[4/3] bg-zinc-900 flex items-center justify-center overflow-hidden cursor-pointer"
                      style={{
                        background: `radial-gradient(circle at center, ${colorway?.colorRight || '#27272a'} 0%, ${colorway?.colorLeft || '#09090b'} 100%)`
                      }}
                    >
                      {/* Subtle category tag */}
                      <span className="absolute top-4 left-4 z-10 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white">
                        {product.category}
                      </span>

                      {/* Rating pill */}
                      <div className="absolute top-4 right-4 z-10 flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </div>

                      {/* Product Isolated Image */}
                      <div className="w-full h-full flex items-center justify-center p-6 relative">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-[85%] h-[85%] object-contain group-hover:scale-110 transition-transform duration-700 pointer-events-none filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.65)]"
                        />
                      </div>

                      {/* Quick Action Overlay on Desktop */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <span className="bg-white text-zinc-950 font-display font-bold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg">
                          <Eye size={13} />
                          View Details
                        </span>
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        {/* Title & Brand Header */}
                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                            {product.headerTextLeft}
                          </span>
                          {product.inStock && (
                            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">
                              In Stock
                            </span>
                          )}
                        </div>

                        <Link href={`/products/${product.slug}`}>
                          <h3 className="font-display font-bold text-lg text-white hover:text-zinc-200 transition-colors line-clamp-1 uppercase tracking-tight">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed font-normal">
                          {product.description}
                        </p>
                      </div>

                      {/* Colorways and Sizes previews */}
                      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {product.colorways.map((cw) => (
                            <span
                              key={cw.hex}
                              style={{ backgroundColor: cw.hex }}
                              className="w-3.5 h-3.5 rounded-full border border-white/20 inline-block"
                              title={cw.name}
                            />
                          ))}
                        </div>
                        <div className="flex gap-1">
                          {product.sizes.slice(0, 3).map((sz) => (
                            <span key={sz} className="text-[9px] text-zinc-500 font-bold border border-white/5 px-1.5 py-0.5 rounded">
                              {sz}
                            </span>
                          ))}
                          {product.sizes.length > 3 && (
                            <span className="text-[9px] text-zinc-600 font-bold">
                              +{product.sizes.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price and CTA Placement */}
                      <div className="flex justify-between items-center mt-5 pt-3 border-t border-white/10">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display font-black text-xl text-white">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-zinc-500 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => handleQuickAdd(e, product)}
                            className="bg-white/10 hover:bg-white text-white hover:text-zinc-950 p-2.5 rounded-full transition-all cursor-pointer"
                            title="Add to Cart"
                          >
                            {quickAddedId === product.id ? (
                              <span className="text-[10px] font-bold px-1 text-emerald-400">Added!</span>
                            ) : (
                              <ShoppingBag size={15} />
                            )}
                          </button>
                          
                          <Link
                            href={`/products/${product.slug}`}
                            className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full transition-all flex items-center gap-1"
                          >
                            Buy
                            <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-10 text-zinc-500 text-xs relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-white rounded-sm inline-block" />
            <span className="font-bold tracking-wider text-zinc-300 uppercase">VELORA LUXURY</span>
            <span>&copy; 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/collections" className="hover:text-white transition-colors">Catalog</Link>
            <Link href="/#contact-section" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-zinc-950 text-white flex items-center justify-center">
        <span className="text-xs uppercase font-bold tracking-widest text-zinc-400">Loading Velora Catalog...</span>
      </div>
    }>
      <CollectionsContent />
    </Suspense>
  );
}

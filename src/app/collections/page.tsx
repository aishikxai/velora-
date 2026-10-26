'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import { getProducts, ShopifyProduct } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';

type CategoryFilter = 'All' | 'Jerseys' | 'Caps' | 'Mugs' | 'Gear';

export default function CollectionsPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Fetch products on mount
  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        console.error('Failed to load products on collections page:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleResetFilters = () => {
    setSearch('');
    setActiveCategory('All');
    setSelectedSizes([]);
    setMaxPrice(200);
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((product) => {
    const price = parseFloat(product.priceRange.minVariantPrice.amount);
    
    // Category match
    const categoryMatch = activeCategory === 'All' || product.productType === activeCategory;
    
    // Search match
    const searchMatch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
      
    // Price match
    const priceMatch = price <= maxPrice;
    
    // Size match: If size filter active, check if product has a variant matching that size value
    let sizeMatch = true;
    if (selectedSizes.length > 0) {
      sizeMatch = product.variants.edges.some((variantEdge) =>
        variantEdge.node.selectedOptions.some(
          (opt) => opt.name === 'Size' && selectedSizes.includes(opt.value)
        )
      );
    }

    return categoryMatch && searchMatch && priceMatch && sizeMatch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
    const priceB = parseFloat(b.priceRange.minVariantPrice.amount);

    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    return 0; // Default Featured match
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Page header */}
      <div className="text-center md:text-left mb-10 border-b border-border-color pb-8">
        <span className="text-[10px] text-pitch-green uppercase font-bold tracking-widest block mb-2">
          Loot Locker
        </span>
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight">
          FUTGEAR Collections
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          Equip your setup and dress your squad with our custom collections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: FILTERS PANEL (Col-span 3) */}
        <aside className="lg:col-span-3 flex flex-col gap-6 glass-panel border-border-color rounded-3xl p-6 lg:sticky lg:top-24">
          
          <div className="flex justify-between items-center pb-4 border-b border-border-color">
            <span className="font-display font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-pitch-green" />
              Locker Filters
            </span>
            <button
              onClick={handleResetFilters}
              className="text-[10px] uppercase font-bold text-pitch-green hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={10} />
              Reset
            </button>
          </div>

          {/* Search bar */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Search Loot
            </label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Jersey, caps..."
                className="w-full bg-stadium-dark/50 border border-border-color rounded-2xl pl-10 pr-4 py-3 text-xs text-foreground focus:border-pitch-green outline-none smooth-transition"
              />
              <Search size={14} className="absolute left-3.5 top-3.5 text-muted-foreground" />
            </div>
          </div>

          {/* Categories select options */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Collections
            </label>
            <div className="flex flex-col gap-1.5">
              {(['All', 'Jerseys', 'Caps', 'Mugs', 'Gear'] as CategoryFilter[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left py-2 px-3 rounded-xl text-xs font-semibold flex justify-between items-center smooth-transition cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-pitch-green/10 text-pitch-green border-l-2 border-pitch-green pl-4'
                      : 'text-muted-foreground hover:bg-stadium-dark/50 hover:text-foreground'
                  }`}
                >
                  {cat === 'All' ? 'All Products' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sizing Toggles (Jerseys/Caps) */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Size Locker
            </label>
            <div className="flex gap-2 flex-wrap">
              {['S', 'M', 'L', 'XL'].map((size) => {
                const isActive = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`w-10 h-10 rounded-xl font-display font-bold text-xs border flex items-center justify-center smooth-transition cursor-pointer ${
                      isActive
                        ? 'bg-pitch-green border-pitch-green text-matte-black'
                        : 'bg-stadium-dark border-border-color text-foreground hover:border-foreground/20'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range selection slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-baseline">
              <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                Max Price
              </label>
              <span className="font-display font-extrabold text-sm text-pitch-green">
                ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={250}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full h-1 bg-stadium-dark rounded-lg appearance-none cursor-pointer accent-pitch-green outline-none"
            />
          </div>

        </aside>

        {/* RIGHT COLUMN: CATALOG DISPLAY (Col-span 9) */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Controls sort by */}
          <div className="flex justify-between items-center bg-stadium-dark/30 border border-border-color rounded-2xl px-6 py-4 flex-wrap gap-4">
            <span className="text-xs font-semibold text-muted-foreground">
              Showing {sortedProducts.length} of {products.length} drops
            </span>

            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stadium-dark border border-border-color rounded-xl px-4 py-2 text-xs font-semibold text-foreground focus:border-pitch-green outline-none cursor-pointer smooth-transition"
              >
                <option value="featured">Featured Drops</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Dynamic animating catalog grid */}
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center text-muted-foreground gap-4">
              <svg className="animate-spin h-8 w-8 text-pitch-green" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-xs uppercase font-bold tracking-wider">Unlocking Locker...</span>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="h-96 glass-panel border-border-color rounded-3xl flex flex-col items-center justify-center text-center p-8 gap-4">
              <span className="text-lg font-bold text-foreground">No drops matched your query</span>
              <p className="text-xs text-muted-foreground max-w-xs mt-1">Try resetting the filters or modifying your search parameters to find setup gear.</p>
              <Button variant="secondary" size="sm" onClick={handleResetFilters} className="mt-2">
                Reset Locker
              </Button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {sortedProducts.map((p) => (
                  <motion.div
                    layout
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Settings2 } from 'lucide-react';
import { ShopifyProduct, ShopifyProductVariant } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  // Get price details
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  
  // Find first variant for quick checkout
  const firstVariantNode = product.variants.edges[0]?.node;
  const firstVariantId = firstVariantNode?.id || '';
  
  // Check if compared price exists
  const comparePrice = firstVariantNode?.compareAtPrice 
    ? parseFloat(firstVariantNode.compareAtPrice.amount) 
    : null;

  // Determine badge text
  const isCustom = product.isCustomizable || product.productType === 'Jerseys' || product.productType === 'Caps' || product.productType === 'Mugs';
  const badgeText = isCustom ? 'Customizable' : (comparePrice ? 'On Sale' : null);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCustom) {
      // Redirect to customizer
      window.location.href = `/#configurator-section`;
      return;
    }

    // Standard Quick Add
    const cartItem = {
      id: firstVariantId,
      variantId: firstVariantId,
      title: product.title,
      productTitle: product.title,
      price: price.toString(),
      image: product.images.edges[0]?.node.url || '',
      isCustomizable: false,
    };
    
    addToCart(cartItem, 1);
  };

  // Generate clean inline SVG graphics for product fallback thumbnails
  const renderFallbackGraphic = (type: string) => {
    if (type === 'Jerseys') {
      return (
        <svg viewBox="0 0 100 100" className="w-28 h-28 opacity-80 text-pitch-green">
          <path d="M25 15 L40 5 L60 5 L75 15 L80 35 L70 38 L65 25 L65 90 L35 90 L35 25 L30 38 L20 35 Z" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="2"/>
          <path d="M40 5 C45 15, 55 15, 60 5" fill="none" stroke="currentColor" stroke-width="2"/>
          <text x="50" y="60" fill="currentColor" font-family="Outfit" font-size="20" font-weight="900" text-anchor="middle">10</text>
        </svg>
      );
    }
    if (type === 'Caps') {
      return (
        <svg viewBox="0 0 100 100" className="w-24 h-24 opacity-80 text-neon-cyan">
          <path d="M20 70 C20 40, 80 40, 80 70 L95 72 L90 80 L75 75 L15 75 Z" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="2"/>
          <circle cx="50" cy="45" r="4" fill="currentColor"/>
        </svg>
      );
    }
    if (type === 'Mugs') {
      return (
        <svg viewBox="0 0 100 100" className="w-24 h-24 opacity-80 text-trophy-gold">
          <rect x="25" y="25" width="40" height="55" rx="8" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="2"/>
          <path d="M65 35 C75 35, 75 60, 65 60" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 100 100" className="w-28 h-28 opacity-80 text-pitch-green">
        <rect x="15" y="25" width="70" height="50" rx="4" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="2"/>
        <path d="M5 25 L15 25 M5 45 L15 45 M85 25 L95 25 M85 45 L95 45 M50 2 L50 12" stroke="currentColor" stroke-width="2"/>
      </svg>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col glass-panel rounded-3xl overflow-hidden p-5 border border-border-color smooth-transition hover:border-pitch-green hover:shadow-[0_0_25px_rgba(0,255,102,0.12)]"
    >
      {badgeText && (
        <span className="absolute top-4 left-4 z-10 text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-matte-black text-white shadow-sm">
          {badgeText}
        </span>
      )}
      
      {/* Product Image Panel */}
      <div className="relative w-full h-56 rounded-2xl bg-stadium-dark border border-border-color flex items-center justify-center overflow-hidden mb-5">
        {product.images.edges[0]?.node.url ? (
          <motion.img
            src={product.images.edges[0].node.url}
            alt={product.images.edges[0].node.altText || product.title}
            className="w-[75%] h-[75%] object-contain group-hover:scale-108 group-hover:rotate-2 smooth-transition"
          />
        ) : (
          renderFallbackGraphic(product.productType)
        )}
        
        {/* Hover Quick actions overlay */}
        <div className="absolute inset-0 bg-matte-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
          {isCustom ? (
            <Link
              href="/#configurator-section"
              className="flex items-center gap-2 bg-matte-black hover:bg-pitch-green text-white font-display font-extrabold text-[10px] uppercase tracking-wider px-5 py-3 smooth-transition"
            >
              <Settings2 size={12} />
              Customize
            </Link>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="flex items-center gap-2 bg-matte-black hover:bg-pitch-green text-white font-display font-extrabold text-[10px] uppercase tracking-wider px-5 py-3 smooth-transition cursor-pointer"
            >
              <ShoppingBag size={12} />
              Quick Add
            </button>
          )}
        </div>
      </div>

      {/* Details Footer */}
      <div className="flex flex-col flex-grow">
        <span className="text-[10px] text-pitch-green uppercase font-semibold tracking-wider mb-1">
          {product.productType}
        </span>
        <h3 className="font-display font-semibold text-lg text-foreground mb-2 line-clamp-1 group-hover:text-pitch-green smooth-transition">
          {product.title}
        </h3>
        
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-auto pt-3 border-t border-border-color">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-xl text-foreground">
              ${price.toFixed(2)}
            </span>
            {comparePrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${comparePrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <button
            onClick={handleQuickAdd}
            className="w-10 h-10 rounded-full bg-stadium-dark border border-border-color text-foreground hover:bg-pitch-green hover:border-pitch-green hover:text-matte-black flex items-center justify-center smooth-transition cursor-pointer"
            title={isCustom ? 'Customize product' : 'Add to Cart'}
          >
            {isCustom ? <Settings2 size={16} /> : <ShoppingBag size={16} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

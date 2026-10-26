'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  activeTab?: 'home' | 'collections' | 'about' | 'contact';
  onContactClick?: () => void;
}

export default function Navbar({ activeTab = 'home', onContactClick }: NavbarProps) {
  const { setCartOpen, getCartItemsCount } = useCart();
  const count = getCartItemsCount();

  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-40 relative">
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
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
          <Link 
            href="/" 
            className={`transition-colors cursor-pointer ${activeTab === 'home' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            Home
          </Link>
          <Link 
            href="/collections" 
            className={`transition-colors cursor-pointer ${activeTab === 'collections' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            Shop All
          </Link>
          <Link 
            href="/collections?category=Footwear" 
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Footwear
          </Link>
          <Link 
            href="/collections?category=Apparel" 
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Apparel
          </Link>
          {onContactClick ? (
            <button 
              onClick={onContactClick} 
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer uppercase font-bold"
            >
              Contact Us
            </button>
          ) : (
            <Link 
              href="/#contact-section" 
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer uppercase font-bold"
            >
              Contact
            </Link>
          )}
        </nav>
      </div>

      {/* Right Corner Buttons */}
      <div className="flex items-center gap-6">
        <Link 
          href="/collections"
          className="text-xs font-bold text-zinc-400 hover:text-white tracking-widest uppercase cursor-pointer hidden sm:inline"
        >
          Catalog
        </Link>
        
        {/* Search Icon */}
        <Link 
          href="/collections"
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          title="Search products"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
        </Link>
        
        {/* Cart Icon with real count */}
        <button 
          onClick={() => setCartOpen(true)}
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer relative"
          aria-label="Open Cart Drawer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
          {count > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-white text-zinc-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center scale-90 shadow-md">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { setCartOpen, getCartItemsCount } = useCart();
  const count = getCartItemsCount();

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border-color smooth-transition">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Left Side: Secondary Links/Actions */}
        <div className="flex items-center gap-4 text-foreground/80 hover:text-pitch-green cursor-pointer">
          <Search size={18} />
          <span className="hidden sm:inline font-display font-bold text-xs uppercase tracking-wider">Search</span>
        </div>

        {/* Center: Main Brand Logo (GAZU Style) */}
        <Link href="/" className="font-display font-black text-3xl uppercase tracking-tighter text-foreground absolute left-1/2 -translate-x-1/2">
          <span className="text-pitch-green">FUT</span>
          <span className="text-trophy-gold">GEAR</span>
        </Link>

        {/* Right Side: Navigation & Actions */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-display font-extrabold text-xs uppercase tracking-widest text-foreground/85 hover:text-pitch-green smooth-transition">
              Home
            </Link>
            <Link href="/collections" className="font-display font-extrabold text-xs uppercase tracking-widest text-foreground/85 hover:text-pitch-green smooth-transition">
              Collections
            </Link>
            <Link href="/#configurator-section" className="font-display font-extrabold text-xs uppercase tracking-widest text-foreground/85 hover:text-pitch-green smooth-transition">
              Configurator
            </Link>
          </nav>

          <div className="h-4 w-px bg-border-color hidden md:block" />

          <div className="flex items-center gap-4">
            {/* User Icon */}
            <button className="text-foreground/85 hover:text-pitch-green smooth-transition cursor-pointer">
              <User size={18} />
            </button>

            {/* Shopping Bag Cart Icon with Badge */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-foreground/85 hover:text-pitch-green smooth-transition cursor-pointer"
              aria-label="Open Locker Cart"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-4.5 h-4.5 rounded-full bg-pitch-green text-white text-[9px] font-extrabold flex items-center justify-center shadow-md">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}

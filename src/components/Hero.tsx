'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-background py-16 px-6">
      
      {/* 1. GIANT BACKGROUND TYPOGRAPHY (GAZU STYLE) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h1 className="font-display font-black text-[16vw] leading-none uppercase text-foreground/5 tracking-tighter select-none select-none">
          CHAMPIONS
        </h1>
      </div>

      {/* 2. FLOATING GOLDEN FIFA TROPHY SVG (OVERLAPS THE BACKGROUND TEXT) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', type: 'spring', stiffness: 50 }}
          className="relative w-72 h-[450px] flex items-center justify-center pointer-events-auto"
        >
          {/* Trophy Vector SVG with custom linear gradients */}
          <svg viewBox="0 0 200 400" className="w-full h-full filter drop-shadow-[0_25px_35px_rgba(212,175,55,0.35)] hover:scale-105 smooth-transition">
            <defs>
              {/* Trophy Shiny Gold Gradient */}
              <linearGradient id="trophy-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff8db" />
                <stop offset="30%" stopColor="#f7d050" />
                <stop offset="70%" stopColor="#c58e11" />
                <stop offset="100%" stopColor="#754b00" />
              </linearGradient>
              {/* Base Malachite Green Gradient */}
              <linearGradient id="malachite-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#008f39" />
                <stop offset="50%" stopColor="#004d1a" />
                <stop offset="100%" stopColor="#002b10" />
              </linearGradient>
            </defs>
            
            {/* Base: Green Malachite and Gold Plaque */}
            <path d="M50 330 L150 330 L160 375 L40 375 Z" fill="url(#malachite-grad)" stroke="#000" strokeWidth="1" />
            <path d="M55 350 L145 350 L150 370 L50 370 Z" fill="url(#trophy-gold-grad)" />
            <text x="100" y="364" fill="#583400" fontFamily="Outfit" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="0.5">FIFA WORLD CUP</text>
            
            {/* Trophy Stem & Dynamic Figures Wrapping Upwards */}
            <path
              d="M75 330 C75 300, 60 250, 75 190 C78 180, 85 160, 92 150 C95 130, 85 110, 80 95 C82 90, 88 88, 92 95 C98 105, 96 120, 100 135 C104 120, 102 105, 108 95 C112 88, 118 90, 120 95 C115 110, 105 130, 108 150 C115 160, 122 180, 125 190 C140 250, 125 300, 125 330 Z"
              fill="url(#trophy-gold-grad)"
            />
            {/* Embossed Textures and Figures details */}
            <path d="M75 190 C85 210, 115 210, 125 190" fill="none" stroke="#633b00" strokeWidth="3" opacity="0.4" />
            <path d="M85 240 C95 260, 105 260, 115 240" fill="none" stroke="#633b00" strokeWidth="3" opacity="0.4" />
            
            {/* Top Globe Shape */}
            <circle cx="100" cy="95" r="42" fill="url(#trophy-gold-grad)" stroke="#c58e11" strokeWidth="1" />
            {/* Continents Outline embossing */}
            <path d="M78 80 C80 68, 95 62, 105 72 C115 72, 125 65, 132 82 C135 95, 125 110, 118 115 C110 120, 90 120, 80 105 C75 92, 75 85, 78 80 Z" fill="#633b00" opacity="0.12" />
          </svg>

          {/* Glowing Aura Effect */}
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_70%) pointer-events-none -z-10" />
        </motion.div>
      </div>

      {/* 3. HERO CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto w-full px-6 flex-grow flex flex-col justify-between relative z-20">
        
        {/* Top Segment: Headline details */}
        <div className="flex flex-col items-start max-w-sm mt-8">
          <span className="font-display font-extrabold text-[10px] uppercase tracking-widest text-pitch-green mb-1.5 block">
            FUTGEAR ARENA
          </span>
          <p className="text-sm font-semibold text-foreground/80 leading-relaxed uppercase tracking-wider">
            Fashion & setup gear <br />
            that moves with you.
          </p>
        </div>

        {/* Bottom Segment: Left (CTAs) & Right (New Collection label) */}
        <div className="flex flex-col sm:flex-row justify-between items-end gap-8 mt-auto pt-20">
          
          {/* Bottom Left: Shop buttons */}
          <div className="flex flex-col gap-4 max-w-xs">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
              Equip Champions Setup
            </span>
            <div className="flex items-center gap-3">
              <Link href="/collections" className="bg-matte-black hover:bg-pitch-green text-background hover:text-white font-display font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-none smooth-transition flex items-center gap-2">
                <ShoppingBag size={12} />
                Shop Now
              </Link>
              <Link href="#configurator-section" className="border border-border-color hover:border-pitch-green text-foreground hover:text-pitch-green font-display font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-none smooth-transition">
                Custom Lab
              </Link>
            </div>
          </div>

          {/* Bottom Right: Collection info */}
          <div className="text-right flex flex-col items-end gap-1.5">
            <span className="font-display font-black text-lg text-foreground tracking-tight leading-none uppercase">
              NEW SEASON
            </span>
            <span className="font-display font-black text-2xl text-pitch-green tracking-tight leading-none uppercase">
              NEW VIBES
            </span>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block border-t border-border-color pt-1.5 mt-1">
              Kickoff Collection 2026
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Check, Shirt, Trophy, Layers } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from './Button';

type CanvasItem = 'jersey' | 'mug' | 'cap';

interface CustomSettings {
  name: string;
  number: string;
  badge: string;
  color: string;
  size: string;
}

const COLOR_OPTIONS = [
  { name: 'Matte Black', value: '#0f121d' },
  { name: 'Stadium Green', value: '#064e3b' },
  { name: 'Trophy Gold', value: '#b45309' },
  { name: 'Violet', value: '#1e1b4b' },
];

const BADGE_OPTIONS = [
  { id: 'wc26', name: 'World Cup 2026', icon: '🏆' },
  { id: 'cwc', name: 'Club World Cup', icon: '⭐' },
  { id: 'cl', name: 'Champions League', icon: '⚽' },
  { id: 'pl', name: 'Premier League', icon: '🦁' },
];

const SIZES = ['S', 'M', 'L', 'XL'];

export default function ProductConfigurator() {
  const { addToCart } = useCart();
  const [activeCanvas, setActiveCanvas] = useState<CanvasItem>('jersey');
  const [successMsg, setSuccessMsg] = useState(false);

  // Configuration States
  const [settings, setSettings] = useState<CustomSettings>({
    name: 'PELÉ',
    number: '10',
    badge: 'wc26',
    color: '#0f121d',
    size: 'M',
  });

  const handleSettingChange = (key: keyof CustomSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddConfiguredToCart = () => {
    // Map Canvas to Shopify Mock Variant IDs
    let variantId = '';
    let productTitle = '';
    let basePrice = '24.99';
    let image = '';

    if (activeCanvas === 'jersey') {
      productTitle = 'FUTGEAR Custom Stadium Jersey';
      basePrice = '79.99';
      image = 'https://images.unsplash.com/photo-1578269174936-2709b5a11030?q=80&w=600&auto=format&fit=crop';
      // Map size to mock variant
      const sizeIndex = SIZES.indexOf(settings.size);
      variantId = `gid://shopify/ProductVariant/10${sizeIndex + 1}`;
    } else if (activeCanvas === 'cap') {
      productTitle = 'FUTGEAR Embroidered Custom Cap';
      basePrice = '34.99';
      image = 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop';
      variantId = 'gid://shopify/ProductVariant/201';
    } else {
      productTitle = 'FUTGEAR Dynamic Logo Mug';
      basePrice = '24.99';
      image = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop';
      variantId = 'gid://shopify/ProductVariant/301';
    }

    const customAttributes = [
      { key: 'Name', value: settings.name },
      { key: 'Number', value: settings.number },
      { key: 'Badge', value: BADGE_OPTIONS.find(b => b.id === settings.badge)?.name || '' },
      { key: 'Color', value: COLOR_OPTIONS.find(c => c.value === settings.color)?.name || '' },
    ];

    if (activeCanvas === 'jersey') {
      customAttributes.push({ key: 'Size', value: settings.size });
    }

    // Hash unique cart item ID
    const uniqueCartId = `${variantId}-${settings.name}-${settings.number}-${settings.badge}-${settings.color}`;

    addToCart({
      id: uniqueCartId,
      variantId,
      title: activeCanvas === 'jersey' ? settings.size : 'Default Title',
      productTitle,
      price: basePrice,
      image,
      isCustomizable: true,
      customAttributes,
    }, 1);

    // Trigger Success whistle pop
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  // Live Canvas View Renders
  const renderLivePreview = () => {
    const activeBadge = BADGE_OPTIONS.find(b => b.id === settings.badge);
    
    if (activeCanvas === 'jersey') {
      return (
        <div className="relative w-72 h-80 flex flex-col items-center justify-center">
          {/* Jersey Canvas Back View */}
          <svg viewBox="0 0 200 220" className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
            {/* Sleeves + Torso */}
            <path
              d="M30 45 L50 25 L85 25 L100 35 L115 25 L150 25 L170 45 L180 85 L160 92 L152 65 L152 200 L48 200 L48 65 L40 92 L20 85 Z"
              fill={settings.color}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="2"
            />
            {/* Jersey Trim Stripes */}
            <path d="M48 65 L48 200 M152 65 L152 200" stroke="var(--pitch-green)" strokeWidth="4" opacity="0.8" />
            <path d="M50 25 L85 25 M115 25 L150 25" stroke="var(--pitch-green)" strokeWidth="3" opacity="0.6" />
            {/* Collar Trim */}
            <path d="M85 25 C90 35, 110 35, 115 25" fill="none" stroke="var(--pitch-green)" strokeWidth="4" />
          </svg>

          {/* Sleeve Badge Icon Overlay */}
          <div className="absolute top-[65px] right-[28px] w-6 h-6 rounded-full bg-matte-black border border-border-color flex items-center justify-center text-[10px] shadow" title={activeBadge?.name}>
            {activeBadge?.icon}
          </div>

          {/* Custom Nameplate text overlay */}
          <div className="absolute top-[48px] w-full text-center">
            <span className="font-display font-black text-sm text-foreground uppercase tracking-widest block transform scale-x-[1.15]">
              {settings.name || 'YOUR NAME'}
            </span>
          </div>

          {/* Custom Squad Number overlay */}
          <div className="absolute top-[75px] w-full text-center">
            <span className="font-display font-black text-7xl text-foreground block transform scale-y-[1.1]">
              {settings.number || '10'}
            </span>
          </div>
        </div>
      );
    }

    if (activeCanvas === 'cap') {
      return (
        <div className="relative w-64 h-64 flex flex-col items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
            {/* Cap Dome */}
            <path d="M30 140 C30 50, 170 50, 170 140 Z" fill={settings.color} stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            {/* Visor Brim */}
            <path d="M15 140 C5 155, 195 155, 185 140 Z" fill="#0b0c10" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {/* Crown Button */}
            <circle cx="100" cy="50" r="6" fill="var(--pitch-green)" />
            {/* Vent holes */}
            <circle cx="70" cy="80" r="3" fill="#000" opacity="0.3" />
            <circle cx="130" cy="80" r="3" fill="#000" opacity="0.3" />
          </svg>

          {/* Custom Embroidery parameters Overlay */}
          <div className="absolute top-[95px] w-full text-center px-8">
            <span className="font-display font-extrabold text-xs text-foreground uppercase tracking-widest block bg-matte-black/40 py-1.5 border border-border-color/25 rounded-md">
              {settings.name || 'CAP TEXT'}
            </span>
          </div>
        </div>
      );
    }

    // Mug view
    return (
      <div className="relative w-60 h-60 flex flex-col items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
          {/* Mug Handle */}
          <path d="M140 60 C185 60, 185 140, 140 140" fill="none" stroke="#2c303f" strokeWidth="16" strokeLinecap="round" />
          <path d="M140 60 C185 60, 185 140, 140 140" fill="none" stroke={settings.color} strokeWidth="8" strokeLinecap="round" />
          {/* Cylinder Mug body */}
          <rect x="40" y="40" width="110" height="120" rx="10" fill={settings.color} stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
          <ellipse cx="95" cy="40" rx="55" ry="10" fill="#2c303f" />
          <ellipse cx="95" cy="40" rx="50" ry="6" fill="#0b0c10" />
        </svg>

        {/* Custom Print Overlay on side of mug */}
        <div className="absolute top-[75px] left-[65px] flex flex-col items-center">
          <span className="font-display font-black text-[10px] text-foreground uppercase tracking-widest block">
            {settings.name || 'STADIUM'}
          </span>
          <span className="font-display font-black text-3xl text-pitch-green block leading-none mt-1">
            {settings.number || '07'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Visual Workspace viewport (Col-span 5) */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center glass-panel rounded-3xl p-8 border border-border-color min-h-[460px] relative overflow-hidden">
        {/* Pitch lines background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,var(--pitch-green)_1.5px,transparent_1.5px)] bg-[size:24px_24px] z-0" />
        
        {/* Animated canvas loader */}
        <div className="relative z-10 w-full flex justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCanvas + settings.color + settings.name + settings.number + settings.badge}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {renderLivePreview()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic canvas name display */}
        <div className="text-center mt-4 z-10">
          <h4 className="font-display font-bold text-lg text-foreground">
            {activeCanvas === 'jersey' ? 'Premium Custom Jersey' : activeCanvas === 'cap' ? 'Embroidered Cap' : 'Stadium Ceramic Mug'}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">Live Configurator Preview</p>
        </div>
      </div>

      {/* Inputs Configuration Workspace (Col-span 7) */}
      <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-border-color flex flex-col gap-6">
        
        {/* Workspace select tab headers */}
        <div>
          <span className="text-[10px] text-pitch-green uppercase font-bold tracking-wider mb-2 block flex items-center gap-1.5">
            <Settings size={12} />
            Step 1: Choose Canvas Base
          </span>
          <div className="grid grid-cols-3 gap-3">
            {(['jersey', 'cap', 'mug'] as CanvasItem[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActiveCanvas(type);
                  // Adjust defaults based on items
                  if (type === 'cap') {
                    handleSettingChange('name', settings.name === 'PELÉ' ? 'FUTGEAR' : settings.name);
                  } else if (type === 'mug') {
                    handleSettingChange('number', settings.number === '10' ? '07' : settings.number);
                  }
                }}
                className={`py-3.5 px-4 rounded-2xl font-display font-semibold text-xs border flex items-center justify-center gap-2 smooth-transition cursor-pointer ${
                  activeCanvas === type
                    ? 'bg-gradient-to-r from-pitch-green/10 to-neon-cyan/10 border-pitch-green text-pitch-green'
                    : 'bg-stadium-dark border-border-color hover:border-foreground/20 text-muted-foreground'
                }`}
              >
                <Shirt size={14} />
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Customize Panel Forms */}
        <div className="flex flex-col gap-5 border-t border-border-color pt-6">
          <span className="text-[10px] text-pitch-green uppercase font-bold tracking-wider flex items-center gap-1.5">
            <Layers size={12} />
            Step 2: Customize Visuals
          </span>

          {/* Name & Number Text Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Embroidery/Print Name
              </label>
              <input
                type="text"
                maxLength={activeCanvas === 'jersey' ? 12 : 14}
                value={settings.name}
                onChange={(e) => handleSettingChange('name', e.target.value.toUpperCase())}
                className="w-full bg-stadium-dark/50 border border-border-color rounded-2xl px-5 py-3.5 text-sm text-foreground focus:border-pitch-green outline-none smooth-transition"
                placeholder="YOUR NAME"
              />
            </div>
            
            {activeCanvas !== 'cap' && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Squad Number
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={settings.number}
                  onChange={(e) => handleSettingChange('number', e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full bg-stadium-dark/50 border border-border-color rounded-2xl px-5 py-3.5 text-sm text-foreground focus:border-pitch-green outline-none smooth-transition"
                  placeholder="10"
                />
              </div>
            )}
          </div>

          {/* Colorways selections */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Canvas colorway
            </label>
            <div className="flex gap-3">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSettingChange('color', opt.value)}
                  className={`w-10 h-10 rounded-full border-2 smooth-transition flex items-center justify-center cursor-pointer ${
                    settings.color === opt.value ? 'border-pitch-green scale-105' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: opt.value }}
                  title={opt.name}
                >
                  {settings.color === opt.value && (
                    <Check size={14} className="text-pitch-green mix-blend-difference" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom patches (Only for jerseys) */}
          {activeCanvas === 'jersey' && (
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Trophy size={12} />
                Sleeve Tournament Badge
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {BADGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSettingChange('badge', opt.id)}
                    className={`py-3 px-3 rounded-xl border font-display text-xs font-semibold flex items-center gap-2 smooth-transition cursor-pointer ${
                      settings.badge === opt.id
                        ? 'bg-gradient-to-r from-pitch-green/5 to-neon-cyan/5 border-pitch-green text-pitch-green'
                        : 'bg-stadium-dark border-border-color text-muted-foreground hover:border-foreground/15'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span className="truncate">{opt.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizing dropdown selectors (Only for Jersey/Cap) */}
          {activeCanvas !== 'mug' && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Select Size
              </label>
              <div className="flex gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSettingChange('size', size)}
                    className={`w-12 h-11 rounded-xl font-display font-bold text-xs border flex items-center justify-center smooth-transition cursor-pointer ${
                      settings.size === size
                        ? 'bg-pitch-green border-pitch-green text-matte-black'
                        : 'bg-stadium-dark border-border-color text-foreground hover:border-foreground/15'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action checkout panel */}
        <div className="border-t border-border-color pt-6 mt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
              Estimated Config price
            </span>
            <span className="font-display font-extrabold text-3xl text-pitch-green">
              {activeCanvas === 'jersey' ? '$79.99' : activeCanvas === 'cap' ? '$34.99' : '$24.99'}
            </span>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleAddConfiguredToCart}
            className="w-full sm:w-auto px-8"
          >
            Add Custom Gear to Cart
          </Button>
        </div>

        {/* Confetti-like Notification feedback */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-pitch-green/10 border border-pitch-green rounded-2xl p-4 text-center text-sm font-semibold text-pitch-green"
            >
              🎉 Customized item successfully added to your cart locker!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

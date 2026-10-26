'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shirt, Coffee, Award, Settings } from 'lucide-react';

interface CategoryCard {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  colorClass: string;
  visualGraphic: React.ReactNode;
}

export default function CategoryGrid() {
  const categories: CategoryCard[] = [
    {
      title: 'Kits & Jerseys',
      description: 'Official tournament-fit jerseys engineered for esports champions.',
      link: '/collections',
      icon: <Shirt size={20} />,
      colorClass: 'group-hover:text-pitch-green',
      visualGraphic: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-pitch-green/20 group-hover:text-pitch-green/30 smooth-transition">
          <path d="M25 15 L40 5 L60 5 L75 15 L80 35 L70 38 L65 25 L65 90 L35 90 Z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Embroidered Caps',
      description: 'Matte athletic caps featuring dense premium stitch parameters.',
      link: '/collections',
      icon: <Award size={20} />,
      colorClass: 'group-hover:text-neon-cyan',
      visualGraphic: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-neon-cyan/20 group-hover:text-neon-cyan/30 smooth-transition">
          <path d="M20 70 C20 40, 80 40, 80 70 L95 72 L75 75 Z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Custom Mugs',
      description: 'Keep your hydration levels high with stadium-outline ceramic mugs.',
      link: '/collections',
      icon: <Coffee size={20} />,
      colorClass: 'group-hover:text-trophy-gold',
      visualGraphic: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-trophy-gold/20 group-hover:text-trophy-gold/30 smooth-transition">
          <rect x="25" y="25" width="40" height="55" rx="8" fill="currentColor" />
          <path d="M65 35 C75 35, 75 60, 65 60" fill="none" stroke="currentColor" strokeWidth="8" />
        </svg>
      )
    },
    {
      title: 'Customization Lab',
      description: 'Step into the designer booth. Live configurations overlay workspace.',
      link: '/#configurator-section',
      icon: <Settings size={20} />,
      colorClass: 'group-hover:text-pitch-green',
      visualGraphic: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-pitch-green/20 group-hover:text-pitch-green/30 smooth-transition animate-spin-slow">
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="12 6" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((cat, index) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="group relative h-64 rounded-3xl overflow-hidden glass-panel border border-border-color p-6 flex flex-col justify-between hover:border-pitch-green hover:shadow-[0_0_20px_rgba(0,255,102,0.08)] smooth-transition"
        >
          {/* Background shape */}
          <div className="absolute right-4 bottom-4 z-0">
            {cat.visualGraphic}
          </div>

          <div className="z-10">
            <div className={`w-10 h-10 rounded-2xl bg-stadium-dark border border-border-color flex items-center justify-center text-foreground mb-4 smooth-transition ${cat.colorClass}`}>
              {cat.icon}
            </div>
            
            <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-pitch-green smooth-transition">
              {cat.title}
            </h3>
            
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              {cat.description}
            </p>
          </div>

          <Link
            href={cat.link}
            className="z-10 text-xs font-display font-extrabold uppercase tracking-wider text-pitch-green hover:underline flex items-center gap-1.5"
          >
            Explore Collection
            <span className="transform group-hover:translate-x-1 smooth-transition">&rarr;</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

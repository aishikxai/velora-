'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    checkoutLoading,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
    triggerCheckout,
  } = useCart();

  const subtotal = getCartSubtotal();
  const shipping = subtotal > 150 ? 0 : 9.99;
  const total = subtotal + (subtotal > 0 ? shipping : 0);

  const drawerVariants = {
    closed: { x: '100%', transition: { type: 'tween', duration: 0.35, ease: 'easeInOut' } },
    open: { x: 0, transition: { type: 'tween', duration: 0.35, ease: 'easeInOut' } },
  } as const;

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  } as const;

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop Shadow overlay */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 cursor-pointer"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 z-50 flex flex-col shadow-2xl text-white selection:bg-white selection:text-zinc-950"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center font-bold">
                  <ShoppingBag size={16} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg uppercase tracking-tight text-white">
                    Your Bag
                  </h3>
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold tracking-widest">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} {cart.reduce((sum, item) => sum + item.quantity, 0) === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close cart"
              >
                <X size={16} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400 gap-4 py-16">
                  <div className="w-20 h-20 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500">
                    <ShoppingBag size={28} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-base uppercase tracking-tight">Your cart is empty</p>
                    <p className="text-xs text-zinc-400 max-w-[260px] mt-1.5 mx-auto leading-relaxed">
                      Discover our curated collections of footwear, luxury apparel, cosmetics, and accessories.
                    </p>
                  </div>
                  <Link
                    href="/collections"
                    onClick={() => setCartOpen(false)}
                    className="mt-2 bg-white text-zinc-950 hover:bg-zinc-200 transition-all text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full"
                  >
                    Browse Collections
                  </Link>
                </div>
              ) : (
                cart.map((item) => {
                  const sizeAttr = item.customAttributes?.find((a) => a.key === 'Size')?.value;
                  const colorAttr = item.customAttributes?.find((a) => a.key === 'Color')?.value;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 relative group"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-20 h-20 bg-zinc-950 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden shrink-0 p-2">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-contain filter drop-shadow-md" />
                        ) : (
                          <ShoppingBag size={24} className="text-zinc-600" />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex flex-col justify-between flex-grow pr-6">
                        <div>
                          <h4 className="font-display font-bold text-sm text-white line-clamp-1">
                            {item.productTitle || item.title}
                          </h4>
                          
                          <div className="flex flex-wrap gap-2 items-center mt-1 text-[10px] text-zinc-400">
                            {sizeAttr && (
                              <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md font-semibold">
                                Size: <strong className="text-white">{sizeAttr}</strong>
                              </span>
                            )}
                            {colorAttr && (
                              <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md font-semibold">
                                Color: <strong className="text-white">{colorAttr}</strong>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Adjust quantities and Price info */}
                        <div className="flex justify-between items-center mt-3">
                          <span className="font-display font-extrabold text-sm text-white">
                            ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                          </span>

                          <div className="flex items-center gap-2 border border-white/15 bg-black/40 rounded-full px-2.5 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-0.5"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-0.5"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Trash Delete button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer calculations and Checkout trigger */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-zinc-900/80 backdrop-blur-md flex flex-col gap-3">
                <div className="flex justify-between items-baseline text-xs text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-white font-semibold">
                    {shipping === 0 ? <span className="text-emerald-400 font-bold uppercase text-[10px]">Free</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-zinc-400">
                    Add ${(150 - subtotal).toFixed(2)} more to unlock <span className="text-emerald-400 font-bold">Free Shipping</span>
                  </p>
                )}
                <div className="flex justify-between items-baseline border-t border-white/10 pt-3">
                  <span className="text-sm font-bold text-white uppercase tracking-wider">Total</span>
                  <span className="font-display font-extrabold text-xl text-white">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <button
                  disabled={checkoutLoading}
                  onClick={triggerCheckout}
                  className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-display font-bold text-xs uppercase tracking-widest py-3.5 rounded-full shadow-lg shadow-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  <ShoppingBag size={14} />
                  Proceed to Checkout
                  <ArrowRight size={14} />
                </button>

                <p className="text-[9px] text-center text-zinc-500 leading-normal tracking-wide uppercase">
                  Encrypted 256-bit checkout &bull; 30-day effortless returns
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

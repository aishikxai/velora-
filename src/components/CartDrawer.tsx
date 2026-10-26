'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from './Button';

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
            className="fixed inset-0 bg-matte-black/70 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-matte-black border-l border-border-color z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-border-color flex justify-between items-center bg-stadium-dark/45">
              <h3 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
                <ShoppingBag size={20} className="text-pitch-green" />
                Locker Cart
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full border border-border-color hover:border-pitch-green hover:text-pitch-green flex items-center justify-center smooth-transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground gap-4">
                  <div className="w-16 h-16 rounded-full border border-dashed border-border-color flex items-center justify-center">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Your locker is empty</p>
                    <p className="text-xs max-w-[240px] mt-1 mx-auto">Build your custom jersey or browse stadium gear to load up your cart!</p>
                  </div>
                </div>
              ) : (
                cart.map((item) => {
                  const hasCustomAttributes = item.customAttributes && item.customAttributes.length > 0;
                  
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-2xl bg-stadium-dark/40 border border-border-color relative"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-20 h-20 bg-matte-black border border-border-color rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-[85%] h-[85%] object-contain" />
                        ) : (
                          // Fallback
                          <ShoppingBag size={24} className="text-muted-foreground" />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex flex-col justify-between flex-grow pr-6">
                        <div>
                          <h4 className="font-display font-semibold text-sm text-foreground line-clamp-1">
                            {item.productTitle}
                          </h4>
                          {item.isCustomizable ? (
                            <span className="text-[10px] text-pitch-green font-bold uppercase tracking-wider block mt-0.5">
                              Custom Configured
                            </span>
                          ) : (
                            item.title !== 'Default Title' && (
                              <span className="text-[10px] text-muted-foreground font-semibold block mt-0.5">
                                Size: {item.title}
                              </span>
                            )
                          )}
                          
                          {/* Render custom jersey stats or details */}
                          {hasCustomAttributes && (
                            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                              {item.customAttributes?.map((attr) => (
                                <span key={attr.key} className="text-[9px] text-muted-foreground bg-matte-black/50 border border-border-color px-1.5 py-0.5 rounded">
                                  <strong>{attr.key === 'Name' ? 'NAME' : attr.key === 'Number' ? 'NUM' : attr.key.toUpperCase()}:</strong> {attr.value}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Adjust quantities and Price info */}
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-display font-bold text-sm text-foreground">
                            ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                          </span>

                          <div className="flex items-center gap-2.5 border border-border-color bg-matte-black/50 rounded-lg px-2.5 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold font-display min-w-[12px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Trash Delete button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 smooth-transition cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer calculations and Shopify trigger */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-border-color bg-stadium-dark/45 flex flex-col gap-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-muted-foreground">Stadium Shipping</span>
                  <span className="text-xs text-pitch-green font-bold uppercase tracking-wider">Free Promo</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-border-color pb-4">
                  <span className="text-sm text-muted-foreground font-semibold">Subtotal</span>
                  <span className="font-display font-extrabold text-2xl text-pitch-green">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  loading={checkoutLoading}
                  onClick={triggerCheckout}
                  className="w-full justify-center gap-2 py-3.5 rounded-2xl shadow-xl shadow-pitch-green/20"
                >
                  <ShoppingBag size={18} />
                  Checkout on Shopify
                </Button>

                <p className="text-[10px] text-center text-muted-foreground leading-normal mt-1 mx-auto max-w-[280px]">
                  Secure transactions fulfilled directly via Shopify. Customs processing tags applied.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

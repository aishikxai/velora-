'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createCheckout } from '@/lib/shopify';

export interface CartItem {
  id: string; // Unique string based on variantId + custom configurations
  variantId: string;
  title: string;
  productTitle: string;
  price: string;
  image: string;
  quantity: number;
  customAttributes?: { key: string; value: string }[];
  isCustomizable?: boolean;
}

interface CartContextType {
  cart: CartItem[];
  cartOpen: boolean;
  checkoutLoading: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartItemsCount: () => number;
  triggerCheckout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const local = localStorage.getItem('futgear_cart');
    if (local) {
      try {
        setCart(JSON.parse(local));
      } catch (e) {
        console.error('Failed to parse cart items:', e);
      }
    }
  }, []);

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem('futgear_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { ...item, quantity }];
    });
    
    // Automatically open the cart slide drawer on add
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartSubtotal = () => {
    return cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const triggerCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutLoading(true);

    try {
      const lineItems = cart.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
        customAttributes: item.customAttributes || [],
      }));

      const url = await createCheckout(lineItems);
      if (url) {
        // Redirect to Shopify Checkout
        window.location.href = url;
      } else {
        alert('Failed to generate checkout link. Reverting to sandbox checkout...');
      }
    } catch (e) {
      console.error('Checkout error:', e);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        checkoutLoading,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartSubtotal,
        getCartItemsCount,
        triggerCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}

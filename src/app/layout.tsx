import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'Velora — Luxury Fashion & Lifestyle',
  description: 'Curated apparel, footwear, cosmetics, and accessories with architectural design.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-white antialiased selection:bg-white selection:text-zinc-950">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

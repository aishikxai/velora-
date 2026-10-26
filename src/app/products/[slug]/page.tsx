import { VELORA_PRODUCTS, getProductBySlug } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return VELORA_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found — Velora',
    };
  }

  return {
    title: `${product.name} — Velora Luxury`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

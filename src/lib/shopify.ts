/**
 * Type-safe Shopify Storefront API Client
 */

// ============================================================================
// 1. TYPES & SCHEMAS
// ============================================================================

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: MoneyV2;
  compareAtPrice: MoneyV2 | null;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  productType: string;
  vendor: string;
  priceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  variants: {
    edges: {
      node: ShopifyProductVariant;
    }[];
  };
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
  // Custom metadata or helpers
  isCustomizable?: boolean;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
}

export interface CustomAttributeInput {
  key: string;
  value: string;
}

export interface CheckoutLineItemInput {
  variantId: string;
  quantity: number;
  customAttributes?: CustomAttributeInput[];
}

// ============================================================================
// 2. CONFIGURATION & GRAPHQL FETCH
// ============================================================================

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const API_VERSION = '2024-04';

async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<{ data?: T; errors?: any[] } | null> {
  // If credentials are not set, return null to trigger mock fallback
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    return null;
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch from Shopify Storefront API:', error);
    return null;
  }
}

// ============================================================================
// 3. MOCK PRODUCT DATABASE
// ============================================================================

const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/1',
    title: 'FUTGEAR Custom Stadium Jersey',
    handle: 'custom-stadium-jersey',
    description: 'The ultimate canvas for your squad. Engineered with moisture-wicking technology and customized with your name, number, and badges.',
    productType: 'Jerseys',
    vendor: 'FUTGEAR',
    isCustomizable: true,
    priceRange: {
      minVariantPrice: { amount: '79.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '79.99', currencyCode: 'USD' }
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1578269174936-2709b5a11030?q=80&w=600&auto=format&fit=crop',
            altText: 'Custom Stadium Jersey Back',
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/101',
            title: 'S',
            price: { amount: '79.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '99.99', currencyCode: 'USD' },
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: 'S' }]
          }
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/102',
            title: 'M',
            price: { amount: '79.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '99.99', currencyCode: 'USD' },
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: 'M' }]
          }
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/103',
            title: 'L',
            price: { amount: '79.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '99.99', currencyCode: 'USD' },
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: 'L' }]
          }
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/104',
            title: 'XL',
            price: { amount: '79.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '99.99', currencyCode: 'USD' },
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: 'XL' }]
          }
        }
      ]
    },
    options: [
      { id: 'opt-size', name: 'Size', values: ['S', 'M', 'L', 'XL'] }
    ]
  },
  {
    id: 'gid://shopify/Product/2',
    title: 'FUTGEAR Embroidered Custom Cap',
    handle: 'embroidered-custom-cap',
    description: 'Sleek sports cap with personal embroidery details. Textured stitch detailing and adjustable metal strap.',
    productType: 'Caps',
    vendor: 'FUTGEAR',
    isCustomizable: true,
    priceRange: {
      minVariantPrice: { amount: '34.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '34.99', currencyCode: 'USD' }
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop',
            altText: 'Custom Embroidered Sports Cap',
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/201',
            title: 'Default Title',
            price: { amount: '34.99', currencyCode: 'USD' },
            compareAtPrice: null,
            availableForSale: true,
            selectedOptions: []
          }
        }
      ]
    },
    options: []
  },
  {
    id: 'gid://shopify/Product/3',
    title: 'FUTGEAR Dynamic Logo Mug',
    handle: 'dynamic-logo-mug',
    description: 'Keep your focus hydration high. Double-walled ceramic mug printed with stadium outlines and your custom number details.',
    productType: 'Mugs',
    vendor: 'FUTGEAR',
    isCustomizable: true,
    priceRange: {
      minVariantPrice: { amount: '24.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '24.99', currencyCode: 'USD' }
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
            altText: 'Dynamic Logo Mug',
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/301',
            title: 'Default Title',
            price: { amount: '24.99', currencyCode: 'USD' },
            compareAtPrice: null,
            availableForSale: true,
            selectedOptions: []
          }
        }
      ]
    },
    options: []
  },
  {
    id: 'gid://shopify/Product/4',
    title: 'Stadium Smart LED Panel Pack',
    handle: 'stadium-smart-led-panel-pack',
    description: 'Modular smart light bars that plug into your TV sound setup to glow green during matches and flash gold on goals.',
    productType: 'Gear',
    vendor: 'FUTGEAR',
    priceRange: {
      minVariantPrice: { amount: '89.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '89.99', currencyCode: 'USD' }
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
            altText: 'Neon Smart Light Panels',
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/401',
            title: '6 Panels',
            price: { amount: '89.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '109.99', currencyCode: 'USD' },
            availableForSale: true,
            selectedOptions: [{ name: 'Pack Size', value: '6 Panels' }]
          }
        }
      ]
    },
    options: [
      { id: 'opt-pack', name: 'Pack Size', values: ['6 Panels'] }
    ]
  },
  {
    id: 'gid://shopify/Product/5',
    title: 'Tactile Analog Grip Cap Kit',
    handle: 'tactile-analog-grip-cap-kit',
    description: 'Precision molded grips compatible with standard controller joysticks. Offers enhanced friction during dribbles.',
    productType: 'Gear',
    vendor: 'FUTGEAR',
    priceRange: {
      minVariantPrice: { amount: '14.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '14.99', currencyCode: 'USD' }
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=600&auto=format&fit=crop',
            altText: 'Controller Custom Grip Caps',
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/501',
            title: 'Default Pack',
            price: { amount: '14.99', currencyCode: 'USD' },
            compareAtPrice: null,
            availableForSale: true,
            selectedOptions: []
          }
        }
      ]
    },
    options: []
  }
];

// ============================================================================
// 4. GRAPHQL QUERIES
// ============================================================================

const getProductsQuery = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          vendor
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            id
            name
            values
          }
        }
      }
    }
  }
`;

const getCollectionProductsQuery = `
  query getCollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const createCheckoutMutation = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

// ============================================================================
// 5. PUBLIC API IMPLEMENTATION WITH FALLBACKS
// ============================================================================

export async function getProducts(first = 10): Promise<ShopifyProduct[]> {
  const result = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
    query: getProductsQuery,
    variables: { first },
  });

  if (result?.data?.products?.edges) {
    return result.data.products.edges.map(edge => edge.node);
  }

  // Fallback to Mock Products
  console.log('Using Mock Product database (Shopify Credentials missing/inactive)');
  return MOCK_PRODUCTS;
}

export async function getCollectionProducts(collectionHandle: string, first = 10): Promise<ShopifyProduct[]> {
  const result = await shopifyFetch<{
    collection: { products: { edges: { node: ShopifyProduct }[] } };
  }>({
    query: getCollectionProductsQuery,
    variables: { handle: collectionHandle, first },
  });

  if (result?.data?.collection?.products?.edges) {
    return result.data.collection.products.edges.map(edge => edge.node);
  }

  // Fallback Mock Filter
  return MOCK_PRODUCTS.filter(p => {
    if (collectionHandle === 'custom') return p.isCustomizable;
    if (collectionHandle === 'apparel') return p.productType === 'Jerseys' || p.productType === 'Caps';
    if (collectionHandle === 'gear') return p.productType === 'Gear';
    return true;
  });
}

export async function createCheckout(lineItems: CheckoutLineItemInput[]): Promise<string | null> {
  const formattedLines = lineItems.map(item => ({
    variantId: item.variantId,
    quantity: item.quantity,
    customAttributes: item.customAttributes || [],
  }));

  const result = await shopifyFetch<{
    checkoutCreate: {
      checkout?: { webUrl: string };
      checkoutUserErrors?: { message: string }[];
    };
  }>({
    query: createCheckoutMutation,
    variables: {
      input: {
        lineItems: formattedLines,
      },
    },
  });

  if (result?.data?.checkoutCreate?.checkout?.webUrl) {
    return result.data.checkoutCreate.checkout.webUrl;
  }

  if (result?.data?.checkoutCreate?.checkoutUserErrors?.length) {
    console.error('Shopify checkout errors:', result.data.checkoutCreate.checkoutUserErrors);
  }

  // Mock checkout URL fallback
  console.log('Simulating Checkout Link Generation (Shopify Credentials missing)');
  return 'https://checkout.shopify.com/mock-checkout-url-success';
}

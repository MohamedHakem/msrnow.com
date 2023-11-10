// import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from '@/components/marketplace//grid';
import ProductGridItems from '@/components/marketplace//layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/marketplace/constants';

export const runtime = 'edge';

// export async function generateMetadata({
//   params
// }: {
//   params: { collection: string };
// }): Promise<Metadata> {
//   // const collection = await getCollection(params.collection);

//   // if (!collection) return notFound();

//   return {
//     title: collection.seo?.title || collection.title,
//     description:
//       collection.seo?.description || collection.description || `${collection.title} products`
//   };
// }

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  // const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });

  const products = [
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },{
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },{
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },{
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    {
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    },
    { 
      id: 1,
      title: 'product title here',
      featuredImage: {
        url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
        width: '200px',
        height: '400px',
        altText: 'alt text here'
      },
      seo: { title: 'product title here', description: 'product description here' },
      description: 'product description here',
      tags: ['tag1', 'tag2'],
      availableForSale: true,
      priceRange: {
        currencyCode: 'EGP',
        minVariantPrice: { amount: 20 },
        maxVariantPrice: { amount: 40 }
      },
      images: [
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        },
        {
          url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
          altText: 'image alt text',
          width: '200px',
          height: '400px'
        }
      ],
      size: 'full',
      priority: true
    }
  ];
 
  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  ); 
}

import Grid from '@/components/marketplace/grid';
import ProductGridItems from '@/components/marketplace/layout/product-grid-items';
import { db } from '@/lib/db';
import { defaultSort, sorting } from '@/lib/marketplace/constants';
// import { getProducts } from 'lib/shopify';

// export const runtime = 'edge';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

async function getProducts(sortKey: string, reverse: boolean, filterKey: string) {
  console.log("[getProducts] sortKey: ", sortKey, ', reverse: ', reverse);
  // sort by: low-to-high, sort by high-to-low price
  // filter by: color or size
  return await db.product.findMany({
    orderBy: { [sortKey]: reverse ? 'asc' : 'desc' },
    include: {
      images: {
        select: { url: true, alt: true }
      }
    }
  })
}

export default async function MarketplacePage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, filter } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  console.log("sort, filter: ", sort, ' - ', filter);
  console.log("sortKey: ", sortKey);


  // const products = await getProducts({ sortKey, reverse, query: searchValue });
  // const resultsText = products.length > 1 ? 'results' : 'result';
  // const products = [
  //   {
  //     id: 1,
  //     title: 'product title here',
  //     featuredImage: {
  //       url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //       width: '200px',
  //       height: '400px',
  //       altText: 'alt text here'
  //     },
  //     seo: { title: 'product title here', description: 'product description here' },
  //     description: 'product description here',
  //     tags: ['tag1', 'tag2'],
  //     availableForSale: true,
  //     priceRange: {
  //       currencyCode: 'EGP',
  //       minVariantPrice: { amount: 20 },
  //       maxVariantPrice: { amount: 40 }
  //     },
  //     images: [
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       },
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       }
  //     ],
  //     size: 'full',
  //     priority: true
  //   },
  //   {
  //     id: 1,
  //     title: 'product title here',
  //     featuredImage: {
  //       url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
  //       width: '200px',
  //       height: '400px',
  //       altText: 'alt text here'
  //     },
  //     seo: { title: 'product title here', description: 'product description here' },
  //     description: 'product description here',
  //     tags: ['tag1', 'tag2'],
  //     availableForSale: true,
  //     priceRange: {
  //       currencyCode: 'EGP',
  //       minVariantPrice: { amount: 20 },
  //       maxVariantPrice: { amount: 40 }
  //     },
  //     images: [
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       },
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       }
  //     ],
  //     size: 'full',
  //     priority: true
  //   },
  //   {
  //     id: 1,
  //     title: 'product title here',
  //     featuredImage: {
  //       url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
  //       width: '200px',
  //       height: '400px',
  //       altText: 'alt text here'
  //     },
  //     seo: { title: 'product title here', description: 'product description here' },
  //     description: 'product description here',
  //     tags: ['tag1', 'tag2'],
  //     availableForSale: true,
  //     priceRange: {
  //       currencyCode: 'EGP',
  //       minVariantPrice: { amount: 20 },
  //       maxVariantPrice: { amount: 40 }
  //     },
  //     images: [
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       },
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       }
  //     ],
  //     size: 'full',
  //     priority: true
  //   }, 
  //   {
  //     id: 1,
  //     title: 'product title here',
  //     featuredImage: {
  //       url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //       width: '200px',
  //       height: '400px',
  //       altText: 'alt text here'
  //     },
  //     seo: { title: 'product title here', description: 'product description here' },
  //     description: 'product description here',
  //     tags: ['tag1', 'tag2'],
  //     availableForSale: true,
  //     priceRange: {
  //       currencyCode: 'EGP',
  //       minVariantPrice: { amount: 20 },
  //       maxVariantPrice: { amount: 40 }
  //     },
  //     images: [
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       },
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       }
  //     ],
  //     size: 'full',
  //     priority: true
  //   },
  //   {
  //     id: 1,
  //     title: 'product title here',
  //     featuredImage: {
  //       url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
  //       width: '200px',
  //       height: '400px',
  //       altText: 'alt text here'
  //     },
  //     seo: { title: 'product title here', description: 'product description here' },
  //     description: 'product description here',
  //     tags: ['tag1', 'tag2'],
  //     availableForSale: true,
  //     priceRange: {
  //       currencyCode: 'EGP',
  //       minVariantPrice: { amount: 20 },
  //       maxVariantPrice: { amount: 40 }
  //     },
  //     images: [
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       },
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       }
  //     ],
  //     size: 'full',
  //     priority: true
  //   },
  //   {
  //     id: 1,
  //     title: 'product title here',
  //     featuredImage: {
  //       url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
  //       width: '200px',
  //       height: '400px',
  //       altText: 'alt text here'
  //     },
  //     seo: { title: 'product title here', description: 'product description here' },
  //     description: 'product description here',
  //     tags: ['tag1', 'tag2'],
  //     availableForSale: true,
  //     priceRange: {
  //       currencyCode: 'EGP',
  //       minVariantPrice: { amount: 20 },
  //       maxVariantPrice: { amount: 40 }
  //     },
  //     images: [
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       },
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       }
  //     ],
  //     size: 'full',
  //     priority: true
  //   },
  //   {
  //     id: 1,
  //     title: 'product title here',
  //     featuredImage: {
  //       url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //       width: '200px',
  //       height: '400px',
  //       altText: 'alt text here'
  //     },
  //     seo: { title: 'product title here', description: 'product description here' },
  //     description: 'product description here',
  //     tags: ['tag1', 'tag2'],
  //     availableForSale: true,
  //     priceRange: {
  //       currencyCode: 'EGP',
  //       minVariantPrice: { amount: 20 },
  //       maxVariantPrice: { amount: 40 }
  //     },
  //     images: [
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       },
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       }
  //     ],
  //     size: 'full',
  //     priority: true
  //   },
  //   {
  //     id: 1,
  //     title: 'product title here',
  //     featuredImage: {
  //       url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=640&q=75',
  //       width: '200px',
  //       height: '400px',
  //       altText: 'alt text here'
  //     },
  //     seo: { title: 'product title here', description: 'product description here' },
  //     description: 'product description here',
  //     tags: ['tag1', 'tag2'],
  //     availableForSale: true,
  //     priceRange: {
  //       currencyCode: 'EGP',
  //       minVariantPrice: { amount: 20 },
  //       maxVariantPrice: { amount: 40 }
  //     },
  //     images: [
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       },
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       }
  //     ],
  //     size: 'full',
  //     priority: true
  //   },
  //   {
  //     id: 1,
  //     title: 'product title here',
  //     featuredImage: {
  //       url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fcup-black.png%3Fv%3D1690003088&w=640&q=75',
  //       width: '200px',
  //       height: '400px',
  //       altText: 'alt text here'
  //     },
  //     seo: { title: 'product title here', description: 'product description here' },
  //     description: 'product description here',
  //     tags: ['tag1', 'tag2'],
  //     availableForSale: true,
  //     priceRange: {
  //       currencyCode: 'EGP',
  //       minVariantPrice: { amount: 20 },
  //       maxVariantPrice: { amount: 40 }
  //     },
  //     images: [
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       },
  //       {
  //         url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
  //         altText: 'image alt text',
  //         width: '200px',
  //         height: '400px'
  //       }
  //     ],
  //     size: 'full',
  //     priority: true
  //   },
  // ];

  // by default: latest first (sort by latest)

  const products = await getProducts(sortKey, reverse, filter)
  // then add: 
  // sort by low-to-high price
  // sort by high-to-low price
  // filter by: color or size
  // category pages (instead of filter by category)

  return (
    <>
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}

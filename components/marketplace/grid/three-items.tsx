import { GridTileImage } from '@/components/marketplace/grid/tile';
// import { getCollectionProducts } from 'lib/shopify';
import type { Product } from '@/lib/marketplace/types';
import Link from 'next/link';

function ThreeItemGridItem({ item, size, priority }: { item: any; size: 'full' | 'half'; priority?: boolean }) {
  // console.log('item: ', item);
  return (
    <div className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}>
      {/* <Link className="relative block aspect-square h-full w-full" href={`/product/${item.handle}`}> */}
      <Link className="relative block aspect-square h-full w-full" href={`/marketplace-1`}>
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  // const homepageItems = await getCollectionProducts({
  //   collection: 'hidden-homepage-featured-items'
  // });

  // if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const homepageItems = [
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
    }
  ];

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} priority={true} />
    </section>
  );
}

/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Gallery } from '@/components/marketplace/product/gallery';
// import { ProductDescription } from '@/components/marketplace/product/product-description';
import getProduct from '@/utils/marketplace/getProduct';
// import { Star } from 'lucide-react';
// import { ColorSizeSelector } from '@/components/marketplace/product/color-size-selector';
// import { AddToCart } from '@/components/marketplace/cart/add-to-cart';
import { ProductDetails } from '@/components/marketplace/product/product-details';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url } = product.images[0] || {};
  const indexable = true;

  return {
    title: product.title,
    description: product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
        images: [
          {
            url,
            width: 1024,
            height: 1024,
            alt: product.title
          }
        ]
      }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle)
  if (!product) return notFound()
 
  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images[0].url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.published_status
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: 'EGP',
      highPrice: product.price,
      lowPrice: product.price
    }
  };

  return (
    <div className="w-full laptop:max-w-screen-xl mx-auto h-full">
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      /> */}
      <div className="bg-white laptop:px-4">
        <nav aria-label="Breadcrumb" className="hidden laptop:block mt-2 laptop:mt-0">
          <ol role="list" className="flex max-w-2xl items-center space-x-2 pl-4 lg:max-w-7xl">
            <li>
              <div className="flex items-center">
                <a href="#" className="text-sm font-medium text-gray-900">أحذية</a>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{product.title}</a>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-4 laptop:flex-row laptop:justify-between">
          <Gallery
            images={product.images.map((image: { url: string }) => ({
              src: image.url,
              altText: product.title
            }))}
          />
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  )
}
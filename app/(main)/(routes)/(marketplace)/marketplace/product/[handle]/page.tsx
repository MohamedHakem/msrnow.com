import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Gallery } from '@/components/marketplace/product/gallery';
import { ProductDescription } from '@/components/marketplace/product/product-description';
import getProduct from '@/utils/marketplace/getProduct';

// export const runtime = 'edge';

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
  const product = await getProduct(params.handle);

  if (!product) return notFound();


  // add the reviews (with review author), and aggregateRatings
  // https://developers.google.com/search/docs/appearance/structured-data/product
  // {
  //   "@context": "https://schema.org/",
  //   "@type": "Product",
  //   "name": "Executive Anvil",
  //   "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
  //   "review": {
  //     "@type": "Review",
  //     "reviewRating": {
  //       "@type": "Rating",
  //       "ratingValue": 4,
  //       "bestRating": 5
  //     },
  //     "author": {
  //       "@type": "Person",
  //       "name": "Fred Benson"
  //     }
  //   },
  //   "aggregateRating": {
  //     "@type": "AggregateRating",
  //     "ratingValue": 4.4,
  //     "reviewCount": 89
  //   }
  // }
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-3/6">
            <Gallery
              images={product.images.map((image: { url: string }) => ({
                src: image.url,
                altText: product.title
              }))}
            />
          </div>

          <div className="basis-full lg:basis-3/6">
            <ProductDescription product={product} />
          </div>
        </div>
        {/* <Suspense>
          <RelatedProducts id={product.id} />
        </Suspense> */}
      </div>
      {/* <Suspense>
        <Footer />
      </Suspense> */}
    </>
  );
}

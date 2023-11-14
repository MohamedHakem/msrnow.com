import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// import { GridTileImage } from '@/components/marketplace/grid/tile';
import Footer from '@/components/marketplace/layout/footer';
import { Gallery } from '@/components/marketplace/product/gallery';
import { ProductDescription } from '@/components/marketplace/product/product-description';
import { HIDDEN_PRODUCT_TAG } from '@/lib/marketplace/constants';
import getProduct from '@/utils/marketplace/getProduct';
// import { getProduct, getProductRecommendations } from 'lib/shopify';
// import { Image } from '@/lib/marketplace/types';
// import Link from 'next/link';

// export const runtime = 'edge';

// const product = {
//   id: 1,
//   title: 'product title here',
//   featuredImage: {
//     url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
//     width: '200px',
//     height: '400px',
//     altText: 'alt text here'
//   },
//   seo: { title: 'product title here', description: 'product description here' },
//   description: 'product description here',
//   tags: ['tag1', 'tag2'],
//   availableForSale: true,
//   priceRange: {
//     currencyCode: 'EGP',
//     minVariantPrice: { amount: 20 },
//     maxVariantPrice: { amount: 40 }
//   },
//   images: [
//     {
//       url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
//       altText: 'image alt text',
//       width: '200px',
//       height: '400px'
//     },
//     {
//       url: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75',
//       altText: 'image alt text',
//       width: '200px',
//       height: '400px'
//     }
//   ]
// }; 

async function callGetProduct(slug: string) {
  // return await getProduct(parseInt(slug));
  return await getProduct(slug);
}

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const product = await callGetProduct(params.handle);
  // console.log("product: ", product)
  if (!product) return notFound();

  const { url } = product.images[0] || {};
  const alt = product.title || undefined
  const { width, height } = { width: 500, height: 500 }
  // const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);
  const indexable = true

  return {
    title: product.title || product.title,
    description: product.description || product.description,
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
            width,
            height,
            alt
          }
        ]
      }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const slug = params.handle
  // const product = await getProduct(slug);
  // console.log("[ProductPage] slug: ", slug)
  const product = await callGetProduct(slug);
  // console.log("[ProductPage] product: ", product)
  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images[0] ? product?.images[0].url : "",
    offers: {
      '@type': 'AggregateOffer',
      availability: product.published_status ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceCurrency: "EGP",
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
      <div dir="ltr" className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white 
        p-8 dark:border-neutral-800 dark:bg-black md:p-10 lg:flex-row lg:gap-8">

          {!product.images[0] ? (<></>) : (
            <div className="h-full w-full basis-full laptop:basis-4/6">
              <Gallery
                images={product.images?.map((image) => ({
                  src: image.url,
                  altText: product.title || ""
                }))}
              />
            </div>
          )}

          <div className={`basis-full ${!product.images[0] ? "laptop:basis-6/6" : "laptop:basis-2/6"}`}>
            {/* <ProductDescription product={product} /> */}
          </div>
        </div>
        {/* <Suspense>
          <RelatedProducts id={product.id} />
        </Suspense> */}
      </div >
      {/* <Suspense>
        <Footer />
      </Suspense> */}
    </>
  );
}

// async function RelatedProducts({ id }: { id: string }) {
//   // const relatedProducts = await getProductRecommendations(id);

//   if (!relatedProducts.length) return null;

//   return (
//     <div className="py-8">
//       <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
//       <ul className="flex w-full gap-4 overflow-x-auto pt-1">
//         {relatedProducts.map((product) => (
//           <li
//             key={product.handle}
//             className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
//           >
//             <Link className="relative h-full w-full" href={`/product/${product.handle}`}>
//               <GridTileImage
//                 alt={product.title}
//                 label={{
//                   title: product.title,
//                   amount: product.priceRange.maxVariantPrice.amount,
//                   currencyCode: product.priceRange.maxVariantPrice.currencyCode
//                 }}
//                 src={product.featuredImage?.url}
//                 fill
//                 sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
//               />
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

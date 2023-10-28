// import { Carousel } from '@/components/marketplace/carousel';
// import Footer from '@/components/marketplace/layout/footer';
import { ThreeItemGrid } from '@/components/marketplace/grid/three-items';
import Grid from '@/components/marketplace/grid';
import ProductGridItems from '@/components/marketplace/layout/product-grid-items';
import { Suspense } from 'react';
import { db } from '@/lib/db';
import FilterList from '@/components/marketplace/layout/search/filter';
import { sorting } from '@/lib/marketplace/constants';
// export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

async function getProducts() {
  return await db.product.findMany({
    include: {
      images: {
        select: { url: true, alt: true }
      }
    }
  })
}

export default async function HomePage() {
  const allProducts = await getProducts()

  return (
    <Suspense>
      <div dir="rtl" className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
        {/* <div className="order-last min-h-screen w-full md:order-none"> */}
        <div className="order-last h-full w-full md:order-none">
          {/* <ThreeItemGrid products={allProducts} /> */}
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={allProducts} />
          </Grid>
          {/* <Suspense>
            <Carousel />
            <Suspense>
              <Footer />
            </Suspense>
          </Suspense> */}
        </div>
        {/* <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sorting} title="Sort by" />
        </div> */}
      </div>
    </Suspense>
  );
}


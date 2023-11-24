import Grid from '@/components/marketplace/grid';
import ProductGridItems from '@/components/marketplace/layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/marketplace/constants';
import { db } from '@/lib/db';
import Footer from '@/components/marketplace/layout/footer';
import Collections from '@/components/marketplace/layout/search/collections';
import FilterList from '@/components/marketplace/layout/search/filter';
import { Suspense } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MarketplaceFilter from './components/marketplace-filter';

export const metadata = {
  title: 'أحذية مقاسات خاصة - بيع واشتري مجانا',
  description: 'بيع واشتري مجانا. أحذية مقاسات خاصة'
};

async function getProducts({ sortKey, reverse, size, color }: { sortKey: string, reverse?: boolean, size?: string, color?: string }) {
  return await db.product.findMany({
    where: {
      ...(
        size && color ? { AND: [{ ProductSizes: { some: { value: size } } }, { ProductColors: { some: { name: color } } }] }
          : size ? { ProductSizes: { some: { value: size } } }
            : color ? { ProductColors: { some: { name: color } } }
              : {})
    },
    orderBy: { [sortKey]: reverse ? 'desc' : 'asc' },
    include: {
      images: {
        select: { url: true, alt: true }
      }
    }
  })
}

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, size, color } = searchParams as { [key: string]: string };
  // console.log("🚀 size:", size, ', sort: ', sort, ', color: ', color);
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, size, color });

  const sizes = ["40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53"]
  const colors = ["أسود", "رمادي", "فضي", "أبيض", "أحمر", "أخضر", "لموني", "برتقالي", "أصفر", "أزرق", "بني"]

  return (
    <>
      <Suspense fallback={<div>جاري البحث...</div>}>
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 p-4 pt-2 text-black dark:text-white">
          <div className="w-full flex flex-row gap-2">
            <FilterList list={sorting} title="ترتيب حسب" />
            <MarketplaceFilter sizes={sizes} colors={colors} />
          </div>

          <Suspense fallback={<div>جاري الترتيب...</div>}>
            <div className="min-h-screen w-full">
              {products.length > 0 ? (
                <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  <ProductGridItems products={products} />
                </Grid>
              ) : null}
            </div>
          </Suspense>
        </div>
      </Suspense>
    </>
  );
}

import Grid from '@/components/marketplace/grid';
import ProductGridItems from '@/components/marketplace/layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/marketplace/constants';
import { db } from '@/lib/db';
import FilterList from '@/components/marketplace/layout/search/filter';
import { Suspense } from 'react';
import MarketplaceFilter from '@/components/marketplace/marketplace-filter';
// import { ProductSeller } from '@/components/marketplace/product/product-seller';
import Image from 'next/image';
import { TrendingUp } from 'lucide-react';
// import Link from 'next/link';

export const metadata = {
  title: 'مصر الان - بيع واشتري مجانا',
  description: 'بيع واشتري مجانا'
};

async function getProducts({ sellerName, sortKey, reverse, size, color }: { sellerName: string, sortKey: string, reverse?: boolean, size?: string, color?: string }) {
  const products = await db.product.findMany({
    where: {
      AND: [{
        ...(
          size && color ? { AND: [{ ProductSizes: { some: { value: size } } }, { ProductColors: { some: { name: color } } }] }
            : size ? { ProductSizes: { some: { value: size } } }
              : color ? { ProductColors: { some: { name: color } } }
                : {})
      },
      {
        user: {
          name: {
            contains: sellerName,
          }
        }
      }
      ]
    },
    orderBy: { [sortKey]: reverse ? 'desc' : 'asc' },
    include: {
      images: {
        select: { url: true, alt: true }
      },
      user: { select: { image: true, name: true, email: true, phone_number: true } }
    }
  })

  return products
}

export default async function MarketplaceCategoryPage({
  params, searchParams
}: {
  params: { seller: string }, searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const { sort, size, color } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const sellerName = params.seller.replace("-", " ")
  // console.log("sellerName: ", sellerName);

  const products = await getProducts({ sellerName, sortKey, reverse, size, color });
  // console.log("products.user: ", products[0].user)

  const seller = products[0].user

  const sizes = ["40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53"]
  const colors = ["أسود", "رمادي", "فضي", "أبيض", "أحمر", "أخضر", "لموني", "برتقالي", "أصفر", "أزرق", "بني"]

  return (
    <>
      <Suspense fallback={<div>جاري البحث...</div>}>
        <div className="w-full flex flex-col gap-2 p-4 pt-2 text-black dark:text-white">
          <div className="w-full flex flex-row gap-2">
            {/* <ProductSeller seller={products[0].user} productCount={products.length} /> */}
            <div className="mb-6 flex flex-col pb-6 w-full">
              <div className="border rounded-xl p-2">
                <div className="border-b-0">
                  <div className="pb-0 px-2" defaultChecked={true}>
                    <div dir="rtl" className="flex h-full flex-col gap-4 overflow-hidden pt-4 p-2">
                      <div className="flex gap-4">
                        {seller.image ? <div className="flex w-[80px]">
                          <Image
                            unoptimized
                            src={seller.image}
                            width={80}
                            height={80}
                            alt={seller.name ? seller.name : "msrnow.com seller"}
                            className="border rounded-full bg-secondary w-20 h-20"
                          />
                        </div> : <div className="border rounded-full bg-secondary w-20 h-20"></div>
                        }

                        <div className="flex flex-col">
                          <p className="flex-1 text-2xl truncate line-clamp-2 font-semibold">{seller.name}</p>
                          <p className="flex flex-1 flex-row gap-1 text-lg truncate line-clamp-2 font-normal pb-2 items-center">
                            <span className="pl-1">{products.length}</span>
                            <span className="pl-2">منتجات</span>
                            <TrendingUp color={"#00c600"} />
                            {/* TODO: add a chart of how many products published on what days/dates using chart2 lib */}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        {/* <button className="bg-[#0277bd] rounded-xl w-full p-3 text-white font-bold text-base">اتصل</button> */}
                        {seller.phone_number ?
                          <p className="w-full pt-3">
                            <span className="ml-2">رقم البائع:</span>
                            {seller.phone_number}
                          </p>
                          : <p className="w-full pt-3">رقم الهاتف لهذا البائع غير متاح</p>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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

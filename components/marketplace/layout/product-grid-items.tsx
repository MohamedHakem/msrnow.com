import Image from 'next/image';
import Link from 'next/link';
import Grid from '@/components/marketplace/grid';
import Label from '@/components/marketplace/label';
import { Suspense } from 'react';
// import GridImage from './grid-image';


export default function ProductGridItems({ products }: { products: any[] }) {

  return (
    <>
      {products.map((product, i) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link href={`/shop/product/${product.slug}`} className="h-[418px] max-h-[418px] w-full bg-[#f0f0f0] relative animate-fadeIn">
            <Suspense fallback={<div className="w-full h-[364px] bg-[#f0f0f0] animate-pulse"></div>}>
              <Image
                unoptimized width={364} height={364} alt={product.title} priority={i < 3 ? true : false}
                src={`https://wsrv.nl/?url=${product.images[0]?.url}&default=${product.images[0]?.url}&l=9&af=''&il=''&n=-1&w=364&h=364&output=webp`}
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="relative h-full w-full object-fill rounded-lg border"
              />
            </Suspense>
            <Label title={product.title} amount={product.price} currencyCode={"EGP"} />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}


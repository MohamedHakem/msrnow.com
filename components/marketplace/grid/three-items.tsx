import { GridTileImage } from '@/components/marketplace/grid/tile';
import { marketplaceProductType } from '@/types';
import Link from 'next/link';


export async function ThreeItemGrid({ products }: { products: marketplaceProductType[] }) {
  const [firstProduct, secondProduct, thirdProduct] = products;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} priority={true} />
    </section>
  );
}


function ThreeItemGridItem({ item, size, priority }: { item: marketplaceProductType; size: 'full' | 'half'; priority?: boolean }) {
  return (
    <div className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}>
      <Link className="relative block aspect-square h-full w-full" href={`/marketplace`}>
        {/* <GridTileImage
          src={item.images[0].url}
          fill
          sizes={size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
          priority={priority}
          alt={item.title}
          label={{
            title: item.title as string,
            amount: item.price.toString(),
            currencyCode: "EGP"
          }}
        /> */}
      </Link>
    </div>
  );
}

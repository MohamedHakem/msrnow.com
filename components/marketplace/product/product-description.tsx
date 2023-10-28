import { AddToCart } from '@/components/marketplace/cart/add-to-cart';
import Price from '@/components/marketplace/price';
import Prose from '@/components/marketplace/prose';
// import { Product } from '@/lib/marketplace/types';
// import { Product } from '@/lib/marketplace/types';
// import { VariantSelector } from './variant-selector';
import { marketplaceProductType } from '@/types';
import { ColorSizeSelector } from './color-size-selector';

export function ProductDescription({ product }: { product: marketplaceProductType }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-2xl font-medium text-right">{product.title}</h1>
        <div dir="ltr" className="mt-4 mr-auto w-auto rounded-full bg-blue-600 px-4 py-2 text-white">
          <Price
            className="flex gap-1 text-right flex-row-reverse"
            amount={product.price.toString()}
            currencyCode={"EGP"}
          />
        </div>
      </div>
      <ColorSizeSelector sizes={product.ProductSizes} colors={product.ProductColors} />

      {product.description ? (
        <Prose className="mb-6 text-sm leading-tight dark:text-white/[60%] text-right" html={product.description.replace(/\n/g, '<br>')} />
      ) : null}

      {/* <AddToCart variants={product.variants} availableForSale={product.availableForSale} /> */}
      <AddToCart variant={product} availableForSale={product.published_status ? true : false} />
    </>
  );
}

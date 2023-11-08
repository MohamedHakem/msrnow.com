'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from '@/components/marketplace/cart/actions';
import LoadingDots from '@/components/marketplace/loading-dots';
// import { ProductVariant } from '@/lib/marketplace/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { marketplaceProductType } from '@/types';
import useCart from '@/hooks/use-cart';

// export function AddToCart({ variants, availableForSale }: { variants: ProductVariant[]; availableForSale: boolean }) {
export function AddToCart({ variant, availableForSale }: { variant: marketplaceProductType; availableForSale: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const color = searchParams.get('color')
  const size = searchParams.get('size')
  const currentVariant = { ...variant, selectedSize: size ? size : undefined, selectedColor: color ? color : undefined }
  const canCheckout =
    variant.ProductSizes ?
      size ?
        variant.ProductColors ? color ? true : false : true
        : false
      : variant.ProductColors ? color ? true : false : true

  // console.log("variant: ", variant);
  // console.log("currentVariant: ", currentVariant);
  // console.log("color, size: ", color, ' - ', size)
  const [isPending, startTransition] = useTransition();
  // const defaultVariantId = variant.id;
  const cart = useCart()

  return (
    <div className="px-0">
      <button
        aria-label="Add item to cart"
        disabled={isPending || !availableForSale || !canCheckout}
        title={currentVariant.title}
        onClick={() => {
          // Safeguard in case someone messes with `disabled` in devtools.
          if (!availableForSale || !currentVariant.id) return;

          startTransition(async () => {
            // const error = await cart.addItem(currentVariant.id.toString());
            const error = cart.addItem(currentVariant);
            // if (error) {
            //   // Trigger the error boundary in the root error.js
            //   throw new Error(error.toString());
            // }
            router.refresh();
          });
        }}
        className={clsx(
          'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90',
          {
            'cursor-not-allowed opacity-60 hover:opacity-60': !availableForSale || !currentVariant.id || !canCheckout,
            'cursor-not-allowed': isPending
          }
        )}
      >
        <div className="absolute left-0 ml-4">
          {!isPending ? <PlusIcon className="h-5" /> : <LoadingDots className="mb-3 bg-white" />}
        </div>
        <span>{availableForSale ? 'اضف الي العربة' : 'Out Of Stock'}</span>
      </button>
      <p className="text-center text-orange-500 mt-1">
        {canCheckout ? null : " اختر "}
        {!canCheckout && variant.ProductSizes ? size ? "" : "مقاس " : ""}
        {!canCheckout && variant.ProductColors ? color ? "" : !canCheckout && variant.ProductSizes ? size ? "لون" : "ولون" : "" : ""}
      </p>
    </div>
  );
}

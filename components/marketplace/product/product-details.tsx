"use client"

import { ColorSizeSelector } from './color-size-selector';
import { AddToCart } from '@/components/marketplace/cart/add-to-cart';

import { Star } from 'lucide-react';
import { marketplaceSingleProductType } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function ProductDetails({ product }: { product: marketplaceSingleProductType }) {
  // const pathname = usePathname();
  // const selectedSize = searchParams.get('size')
  // const selectedColor = searchParams.get('color')

  // const router = useRouter()
  // const searchParams = useSearchParams();
  // const hasSize = product.ProductSizes && product.ProductSizes.length > 0
  // const hasColor = product.ProductColors && product.ProductColors.length > 0
  // const [selectedSize, setSelectedSize] = useState<string | null>(null)
  // const [selectedColor, setSelectedColor] = useState<string | null>(null)
  // const [canCheckout, setCanCheckout] = useState(false)

  // useEffect(() => {
  //   setSelectedSize(searchParams.get('size'))
  //   setSelectedColor(searchParams.get('color'))

  //   if (hasSize) {
  //     if (selectedSize) {
  //       if (hasColor) {
  //         if (selectedColor) {
  //           setCanCheckout(true)
  //         } else {
  //           toast.error("اختر لون")
  //         }
  //       } else {
  //         setCanCheckout(true)
  //       }
  //     } else {
  //       toast.error("اختر مقاس")
  //     }
  //   } else {
  //     if (hasColor) {
  //       if (selectedColor) {
  //         setCanCheckout(true)
  //       } else {
  //         toast.error("اختر لون")
  //       }
  //     } else {
  //       setCanCheckout(true)
  //     }
  //   }
  // }, [hasColor, hasSize, router, searchParams, selectedColor, selectedSize])

  return (
    <div className="flex flex-col mx-auto laptop:w-[40%] max-w-2xl px-4 pb-16 pt-1 sm:px-6 lg:max-w-7xl lg:gap-x-8 lg:px-6 lg:pb-24 lg:pt-4">
      <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1></div>
      <div className="mt-4 lg:row-span-3 lg:mt-0">
        <h2 className="sr-only">تفاصيل المنتج</h2>
        <p className="text-3xl tracking-tight text-[#b12704]">{product.price} جنية </p>

        {product.reviews.length > 0 ? (<div className="mt-6">
          <h3 className="sr-only">مراجعات العملاء</h3>
          <div className="flex items-center">
            <div className="flex items-center">
              <Star color="#ffa41c" fill='#ffa41c' />
              <Star color="#ffa41c" fill='#ffa41c' />
              <Star color="#ffa41c" fill='#ffa41c' />
              <Star color="#ffa41c" fill='#ffa41c' />
              <Star color="#ffa41c" fill='#ffa41c' />
            </div>
            <p className="sr-only">{product.rating} من 5 نجوم</p>
            <a href="#" className="mr-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{product.reviews.length}</a>
          </div>
        </div>) : null
        }

        <ColorSizeSelector sizes={product.ProductSizes} colors={product.ProductColors} />
        {/* if it has a size, check if user selects, [[[[ then ]]]], if it has a color, check if user selects  */}
        {/* {hasSize && selectedSize ?
          hasColor && selectedColor ? <AddToCart variant={product} availableForSale={product.published_status ? true : false} /> : null
          : null
        } */}
        
        <AddToCart variant={product} availableForSale={product.published_status ? true : false} />
      </div>

      <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
        <h3 className="sr-only">الوصف</h3>
        <div className="space-y-6">
          <p className="text-base text-gray-900">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

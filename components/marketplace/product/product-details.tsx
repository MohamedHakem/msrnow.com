"use client"

import { ColorSizeSelector } from './color-size-selector';
import { AddToCart } from '@/components/marketplace/cart/add-to-cart';
import { Star } from 'lucide-react';
import { marketplaceSingleProductType } from '@/types';
import { ProductDescription } from './product-description';
import { ProductSeller } from './product-seller';

export function ProductDetails({ product }: { product: marketplaceSingleProductType }) {
  console.log("product: ", product)
  console.log("product.ProductSizes && product.ProductSizes.length > 0 : ", product.ProductSizes && product.ProductSizes.length > 0)
  console.log("product.ProductColors && product.ProductColors.length > 0 : ", product.ProductColors && product.ProductColors.length > 0)

  return (
    <div className="flex flex-col w-full mx-auto laptop:w-[40%] max-w-2xl px-4 pt-1 sm:px-6 lg:max-w-7xl lg:gap-x-8 lg:px-6 lg:pt-4">
      <div><h1 className="text-2xl font-bold sm:leading-normal text-gray-900 sm:text-3xl">{product.title}</h1></div>
      <div className="mt-2 lg:row-span-3 lg:mt-0">
        <h2 className="sr-only">تفاصيل المنتج</h2>
        <p className="text-3xl tracking-tight text-[#b12704] mt-0 laptop:mt-2">{product.price} جنية </p>

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

        {product.ProductSizes && product.ProductSizes.length > 0
          || product.ProductColors && product.ProductColors.length > 0 ?
          < ColorSizeSelector sizes={product.ProductSizes} colors={product.ProductColors} />
          : null
        }

        <AddToCart variant={product} availableForSale={product.published_status ? true : false} />
      </div>

      <div className="pt-8 lg:col-span-2 lg:col-start-1">{product.description && <ProductDescription description={product.description} />}</div>
      <div className="lg:col-span-2 lg:col-start-1"><ProductSeller seller={product.user} productCount={product.user.Product.length} /></div>
    </div>
  );
}

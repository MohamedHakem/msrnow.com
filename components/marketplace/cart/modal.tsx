'use client';

import Price from '@/components/marketplace/price';
import { DEFAULT_OPTION } from '@/lib/marketplace/constants';
// import type { Cart } from '@/lib/marketplace/types';
import { createUrl } from '@/lib/utils';
import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import CloseCart from './close-cart';
import DeleteItemButton from './delete-item-button';
import EditItemQuantityButton from './edit-item-quantity-button';
import OpenCart from './open-cart';
import useCart, { CartStore } from '@/hooks/use-cart';

type MerchandiseSearchParams = {
  [key: string]: string;
};

// export default function CartModal({ cart }: { cart: Cart | undefined }) {
export default function CartModal({ cart }: { cart: CartStore }) {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart.items.length);
  const items = useCart((state) => state.items)
  const itemsLength = cart.items.length
  const totalQuantity = cart.items.length
  // let totalPrice = 0
  // const totalPrice = cart.items.forEach(item => totalPrice += item.price)
  const totalPrice = items.reduce((total, item) => { return total += Number(item.price) }, 0)
  // console.log("totalPrice: ", totalPrice)
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // for the hydration error
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // rest of the code
  useEffect(() => {
    // Open cart modal when quantity changes.
    if (totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }
      // Always update the quantity reference
      quantityRef.current = totalQuantity;
    }
  }, [isOpen, totalQuantity, quantityRef]);

  if (!isMounted) {
    return (
      <button aria-label="Open cart">
        <OpenCart />
      </button>
    );
  }

  return (
    <div dir="rtl">
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog dir="rtl" onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col 
                border-l border-neutral-200 bg-white/80 p-6 text-black md:w-[390px]
                backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white ">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">العربة</p>

                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart?.items?.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">عربتك فارغة</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.items.map((item, i) => {
                      // these things are for pre-selecting the user's product size/color by putting them 
                      // in the url/params if they click to check out an item on their Cart
                      // unnecessary for now, add later when size/color are ready.

                      // const merchandiseSearchParams = {} as MerchandiseSearchParams;
                      // item.merchandise.selectedOptions.forEach(({ name, value }) => {
                      //   // if (value !== DEFAULT_OPTION) {
                      //   merchandiseSearchParams[name.toLowerCase()] = value;
                      //   // }
                      // });

                      const merchandiseUrl = createUrl(
                        `/marketplace/product/${item.id}`,
                        new URLSearchParams({})
                      );

                      return (
                        <li
                          key={i}
                          className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                        >
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px]">
                              <DeleteItemButton item={item} />
                            </div>
                            <Link href={merchandiseUrl} onClick={closeCart} className={`z-30 flex flex-row gap-2 ${!item.images[0] ? "mr-5" : ""}`}>
                              {!item.images[0] ? (<></>) : (
                                <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                  <Image
                                    unoptimized
                                    className="h-full w-full object-cover"
                                    width={64}
                                    height={64}
                                    alt={item.images[0].alt || item.title}
                                    src={item.images[0].url}
                                  />
                                </div>
                              )}

                              <div className="flex flex-1 flex-col text-base">
                                <span className="leading-tight">{item.title}</span>
                                {item.selectedSize || item.selectedColor ? (
                                <div className="flex flex-row gap-2 mt-2">
                                  {item.selectedSize ? (
                                  <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 border border-blue-600 rounded-full px-2 py-1">
                                    {item.selectedSize}
                                  </p>) : null}
                                  {item.selectedColor ? (
                                    <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 border border-blue-600 rounded-full px-2 py-1">
                                      {item.selectedColor}
                                    </p>) : null}
                                </div>
                              ) : null}
                                {/* {item.selectedColor ? (
                                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {item.selectedColor}
                                  </p>
                                ) : null} */}
                              </div>
                            </Link>
                            <div className="flex h-16 flex-col justify-between">
                              <Price
                                className="flex justify-end gap-1 text-right text-sm"
                                amount={item.price.toString()}
                                currencyCode={"EGP"}
                              />
                              {/* <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                <EditItemQuantityButton item={item} type="minus" />
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm">{item.quantity}</span>
                                </p>
                                <EditItemQuantityButton item={item} type="plus" />
                              </div> */}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      {/* 
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      /> 
                      */}
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      {/* 
                      <p>الشحن</p>
                      <p className="text-right">Calculated at checkout</p>
                       */}
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>الإجمالي</p>
                      <Price
                        className="flex gap-1 text-right text-base text-black dark:text-white"
                        // amount={cart.cost.totalAmount.amount}
                        amount={totalPrice.toString()}
                        currencyCode={"ُEGP"}
                      />
                    </div>
                  </div>
                  <a
                    href={"/marketplace/checkout"}
                    className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    أطلب الان
                  </a>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}

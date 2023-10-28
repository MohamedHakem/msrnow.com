"use client";

// import axios from "axios";
import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import * as React from "react";
import { useWindowSize } from "@uidotdev/usehooks";

// import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
// import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
// import { toast } from "react-hot-toast";
import Price from "@/components/marketplace/price";
import Link from "next/link";
import Image from "next/image";
import DeleteItemButton from "@/components/marketplace/cart/delete-item-button";
import { createUrl } from "@/lib/utils";


const Summary = () => {
  // const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isMounted, setIsMounted] = useState(false);
  const size = useWindowSize();
  // const [value, setValue] = useState(size.width && size.width >= 1024 ? 'summary-list' : "");
  const showSummaryOnDefault = size.width && size.width >= 1024 ? 'summary-list' : ""
  // const [value, setValue] = useState('summary-list');
  const [value, setValue] = useState("summary-list");

  // console.log("size.width && size.width >= 1024 ? 'summary-list' : '' ??", size.width && size.width >= 1024 ? 'summary-list' : "")

  useEffect(() => {
    setIsMounted(true);
    setValue(showSummaryOnDefault)
  }, [showSummaryOnDefault]);

  // useEffect(() => {
  // setValue(showSummaryOnDefault)
  //   if (searchParams.get('success')) {
  //     toast.success('Payment completed.');
  //     removeAll();
  //   }

  //   if (searchParams.get('canceled')) {
  //     toast.error('Something went wrong.');
  //   }
  // }, [searchParams, removeAll, showSummaryOnDefault]);

  if (!isMounted || !size) {
    return null;
  }

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);

  // const onCheckout = async () => {
  //   const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
  //     productIds: items.map((item) => item.id)
  //   });

  //   window.location = response.data.url;
  // }

  return (
    <div className="rounded-lg bg-gray-50 px-4 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      {items.length > 0 ? (
        <Accordion type="single" collapsible className="w-full" value={value} onValueChange={setValue}>
          <AccordionItem value="summary-list" className="border-b-0">
            <AccordionTrigger className="text-lg font-medium">
              إظهار تفاصيل الطلب
              <Price amount={totalPrice.toString()} currencyCode="EGP" />
            </AccordionTrigger>
            <AccordionContent className="pb-0" defaultChecked={true}>
              <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                <ul className="flex-grow overflow-auto py-4">
                  {items.map((item, i) => {
                    const merchandiseUrl = createUrl(`/marketplace/product/${item.id}`, new URLSearchParams({}));
                    return (
                      <li key={i} className={`flex w-full flex-col ${items.length > 1 ? "border-b border-neutral-300 dark:border-neutral-700" : ""}`}>
                        <div className="relative flex w-full flex-row justify-between px-1 py-4">
                          <div className="absolute z-40 -mt-2 ml-[55px]">
                            <DeleteItemButton item={item} />
                          </div>
                          <Link href={merchandiseUrl} className="z-30 flex flex-row gap-2">
                            <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                              <Image
                                className="h-full w-full object-cover"
                                width={64}
                                height={64}
                                alt={item.images[0].alt || item.title}
                                src={item.images[0].url}
                              />
                            </div>
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
                            </div>
                          </Link>
                          <div className="flex h-16 flex-col justify-between">
                            <Price
                              className="flex justify-end gap-1 text-right text-sm"
                              amount={item.price.toString()}
                              currencyCode={"EGP"}
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="pt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                    <p>الإجمالي</p>
                    <Price
                      className="flex gap-1 text-right text-base text-black dark:text-white"
                      amount={totalPrice.toString()}
                      currencyCode={"ُEGP"}
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <div className="pt-6 laptop:py-6 text-lg text-center justify-center font-semibold">عربتك فارغة</div>
      )}
    </div>
  );
}

export default Summary;



{/* <div className="space-y-4">
  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
    <div className="text-base font-medium text-gray-900">الإجمالي</div>
    <Price amount={totalPrice.toString()} currencyCode="EGP" />
  </div>
</div> */}

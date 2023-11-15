"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function ProductSeller({ seller, productCount }: {
  seller: {
    name: string | null;
    image: string | null;
    phone_number: string | null;
  },
  productCount: number
}) {
  const [open, setOpen] = useState("product-description")
  return (
    <div className="mb-6 flex flex-col pb-6">
      <Accordion type="single" collapsible className="" value={open} onValueChange={setOpen}>
        <AccordionItem value="product-description">
          <AccordionTrigger className="text-lg h-[40px] py-0 hover:bg-gray-100 hover:no-underline rounded-md p-2 font-semibold no-underline">
            <span className="text-xl font-bold">عن البائع</span>
          </AccordionTrigger>
          <AccordionContent className="pb-0 px-2" defaultChecked={true}>
            <div dir="ltr" className="flex h-full flex-row gap-4 overflow-hidden pt-4 p-2">
              {seller.image && <div className="flex w-[80px]">
                <Image
                  unoptimized
                  src={seller.image}
                  width={80}
                  height={80}
                  alt={seller.name ? seller.name : "msrnow.com seller"}
                  className="rounded-lg"
                />
              </div>}

              <div className="flex flex-col">
                <p className="flex-1 text-2xl truncate line-clamp-2 font-semibold pb-2">{seller.name}</p>
                <p className="flex flex-1 flex-row gap-1 text-2xl truncate line-clamp-2 font-semibold pb-2 items-center">
                  <span>products: {" "}</span>
                  <span className="text-green-600">{productCount}</span>
                  <TrendingUp color={"#00c600"} />
                  {/* TODO: add a chart of how many products published on what days/dates using chart2 lib */}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { useState } from 'react';

export function ProductSeller({ seller }: {
  seller: {
    name: string | null;
    image: string | null;
    phone_number: string | null;
  }
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

              <p className="flex-1 text-2xl truncate line-clamp-2 font-semibold pb-2">{seller.name}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

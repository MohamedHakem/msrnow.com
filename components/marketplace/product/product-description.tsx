"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useState } from 'react';

export function ProductDescription({ description }: { description: string }) {
  const [open, setOpen] = useState("product-description")
  return (
    <div className="mb-6 flex flex-col">
      <Accordion type="single" collapsible className="" value={open} onValueChange={setOpen}>
        <AccordionItem value="product-description">
          <AccordionTrigger className="text-lg h-[40px] py-0 hover:bg-gray-100 hover:no-underline rounded-md p-2 font-semibold no-underline">
            <span className="">الوصف</span>
          </AccordionTrigger>
          <AccordionContent className="pb-0 px-2 pt-2" defaultChecked={true}>
            <div className="flex h-full flex-col justify-between overflow-hidden p-1">
              <p className="text-base">{description}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

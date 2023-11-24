"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { sanitizeSlug } from '@/utils/sanitizeSlug';
import { ChevronLeft, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
  const [showPhone, setShowPhone] = useState(false)

  return (
    <div className="mb-6 flex flex-col pb-6">
      <Accordion type="single" collapsible className="border rounded-xl p-2" value={open} onValueChange={setOpen}>
        <AccordionItem value="product-description" className="border-b-0">
          <AccordionTrigger className="text-lg h-[40px] py-0 hover:bg-gray-100 hover:no-underline rounded-md p-2 font-semibold no-underline">
            <span className="text-xl font-bold">عن البائع</span>
          </AccordionTrigger>
          <AccordionContent className="pb-0 px-2" defaultChecked={true}>
            <div dir="rtl" className="flex h-full flex-col gap-4 overflow-hidden pt-4 p-2">
              <div className="flex gap-4">
                {seller.image ? <div className="flex w-[80px]">
                  <Image
                    unoptimized
                    src={seller.image}
                    width={80}
                    height={80}
                    alt={seller.name ? seller.name : "msrnow.com seller"}
                    className="border rounded-full bg-secondary w-20 h-20"
                  />
                </div> : <div className="border rounded-full bg-secondary w-20 h-20"></div>
                }

                <div className="flex flex-col">
                  <p className="flex-1 text-2xl truncate line-clamp-2 font-semibold">{seller.name}</p>
                  <p className="flex flex-1 flex-row gap-1 text-lg truncate line-clamp-2 font-normal pb-2 items-center">
                    <span className="pl-1">{productCount}</span>
                    <span className="pl-2">منتجات</span>
                    <TrendingUp color={"#00c600"} />
                    {/* TODO: add a chart of how many products published on what days/dates using chart2 lib */}
                  </p>
                  {seller.name ?
                    <Link href={`/shop/${sanitizeSlug(seller.name.toLocaleLowerCase())}`} className="text-blue-600 font-semibold flex gap-2 text-base items-center">
                      <span>
                        جميع المنتجات
                      </span>
                      <ChevronLeft size={20} />
                    </Link>
                    : null}
                </div>
              </div>
              <div className="mt-4">
                <button className="bg-[#0277bd] rounded-xl w-full p-3 text-white font-bold text-base" onClick={() => setShowPhone(!showPhone)}>اتصل</button>
                {showPhone ? <p className="w-full text-center pt-3">{seller.phone_number}</p>
                  : <p className="w-full text-center pt-3">رقم الهاتف لهذا البائع غير متاح</p>
                }
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

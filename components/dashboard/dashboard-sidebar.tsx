/* eslint-disable react/jsx-no-undef */
"use client"

import { DashboardSections } from "@/data/static/marketplace";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const size = useWindowSize();
  const showMyShop = size.width && size.width >= 1024
  const [open, setOpen] = useState("my-shop");

  useEffect(() => {
    setOpen(showMyShop ? 'my-shop' : "")
  }, [showMyShop])

  return (
    // <aside className="fixed top-18 right-0 w-full laptop:w-[199px] laptop:h-[calc(100vh-88px)] laptop:pt-4 border-b laptop:border-0 shadow-md laptop:shadow-none">
    <aside className="sticky top-0 right-0 w-full laptop:w-[199px] laptop:pt-4 border-b laptop:border-0 shadow-md laptop:shadow-none">
      <div className="h-full laptop:px-4 laptop:pb-4 overflow-y-auto scroll-smooth no-scrollbar bg-white dark:bg-gray-800">
        <ul className="flex flex-row laptop:flex-col justify-between tablet:justify-start  gap-2 font-medium">
          <Link href={"/dashboard/purchases"}
            className={`laptop:w-full ${pathname.startsWith("/dashboard/purchases") ? "border-b-2 border-black laptop:bg-gray-100 laptop:border-b-0 laptop:rounded-md" : ""}`}>
            <li className="min-w-max hover:bg-gray-100 rounded-md p-2 font-semibold">مشترياتي</li>
          </Link>
          {showMyShop ? (
            <Accordion type="single" collapsible className="" value={open} onValueChange={setOpen}>
              <AccordionItem value="my-shop" className={`${open ? "border-b" : "border-b-0"} pb-0`}>
                <AccordionTrigger className="text-lg h-[40px] py-0 hover:bg-gray-100 hover:no-underline rounded-md p-2 font-semibold no-underline">
                  <span className="ml-2">متجري</span>
                </AccordionTrigger>
                <AccordionContent className="pb-0" defaultChecked={true}>
                  <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                    <ul className="flex flex-col flex-grow overflow-auto gap-1">
                      <Link href={"/dashboard/products"} className={`laptop:w-full`}>
                        <li className={`text-base min-w-max hover:bg-gray-100 rounded-md p-2 font-semibold ${pathname.startsWith("/dashboard/products") ? "laptop:bg-gray-100" : ""}`}>
                          منتجات
                        </li>
                      </Link>
                      <Link href={"/dashboard/orders"} className={`laptop:w-full`}>
                        <li className={`text-base min-w-max hover:bg-gray-100 rounded-md p-2 font-semibold ${pathname.startsWith("/dashboard/orders") ? "laptop:bg-gray-100" : ""}`}>
                          طلبات
                        </li>
                      </Link>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Popover>
              <PopoverTrigger>
                <span className="min-w-max hover:bg-gray-100 rounded-md p-2 font-semibold">متجري</span>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex flex-col flex-grow overflow-auto gap-1">
                    <Link href={"/dashboard/products"} className={`laptop:w-full`}>
                      <li className={`text-base min-w-max hover:bg-gray-100 rounded-md p-2 font-semibold ${pathname.startsWith("/dashboard/products") ? "laptop:bg-gray-100" : ""}`}>
                        منتجات
                      </li>
                    </Link>
                    <Link href={"/dashboard/orders"} className={`laptop:w-full`}>
                      <li className={`text-base min-w-max hover:bg-gray-100 rounded-md p-2 font-semibold ${pathname.startsWith("/dashboard/orders") ? "laptop:bg-gray-100" : ""}`}>
                        طلبات
                      </li>
                    </Link>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {DashboardSections.map((s, i) => (
            <Link key={i} href={`${s.url}`}
              className={`laptop:w-full ${pathname.startsWith(s.url) ? "border-b-2 border-black laptop:bg-gray-100 laptop:border-b-0 laptop:rounded-md" : ""}`}>
              <li className="min-w-max hover:bg-gray-100 rounded-md p-2 font-semibold">{s.title}</li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  )
}

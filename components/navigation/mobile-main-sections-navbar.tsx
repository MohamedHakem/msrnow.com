"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { SiteMainNavItems } from '@/data/static/marketplace';

export default function MobileMainSections() {
  const pathname = usePathname()

  return (
    <div className="laptop:hidden w-full whitespace-nowrap justify-center items-center">
      <div className="h-fit laptop:px-4 overflow-y-auto scroll-smooth border-t bg-white dark:bg-gray-800">
        <ul className="flex flex-row justify-between tablet:justify-start font-medium no-scrollbar text-center">
          {SiteMainNavItems.map((section: { title: string, url: string }, i) => (
            <Link key={i} href={`/${section.url}`}
              className={`w-full ${pathname === `/${section.url}` ? "text-black font-bold bg-[#fafafa] border-x border-dashed border-b" : "font-semibold border-b"}`}>
              <li className="text-black min-w-max hover:bg-gray-100 rounded-md p-2">{section.title}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}
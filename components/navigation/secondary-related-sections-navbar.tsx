"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
// import { SiteMainNavItems } from '@/data/static/marketplace';

export default function SecondaryRelatedSections({ marketplaceSections, newsSections }: {
  marketplaceSections: { name: string, url: string | null }[],
  newsSections: { name: string, name_ar: string | null }[];
}) {
  const pathname = usePathname()

  // console.log("newsSections: ", newsSections);

  return (
    <ScrollArea dir="rtl" className="laptop:hidden w-full whitespace-nowrap justify-center items-center">
      <div className="h-fit laptop:px-4 overflow-y-auto scroll-smooth bg-[#fafafa] dark:bg-gray-800">
        <ul className="flex flex-row justify-between tablet:justify-start gap-2 font-medium no-scrollbar text-center">
          {newsSections.map((section, i) => (
            <Link key={i} href={`/news/${section.name}`}
              className={`w-full ${pathname === `/${section.name}` ? "text-black font-bold border-b" : "font-semibold"}`}>
              <li className="text-black min-w-max hover:bg-gray-100 rounded-md p-2">{section.name_ar}</li>
            </Link>
          ))}
        </ul>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

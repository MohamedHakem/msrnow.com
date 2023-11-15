"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MarketplaceSectionsNavbar(sectionsNames: { sectionsNames: { name: string, url: string | null }[]; }) {
  const pathname = usePathname()
  const sections = sectionsNames.sectionsNames

  if (pathname.startsWith('/dashboard')) {
    return null
  } else {

    return (
      <div className="h-fit laptop:px-4 overflow-y-auto scroll-smooth border-t bg-white dark:bg-gray-800">
        <ul className="flex flex-row justify-between tablet:justify-start gap-2 font-medium">
          {sections.map((section: { name: string, url: string | null }, i) => (
            <Link key={i} href={`/marketplace/${section.url}`}
              className={`w-full ${pathname === `/marketplace/${section.url}` ? "text-black font-bold border-b" : "font-semibold"}`}>
              <li className="text-black min-w-max hover:bg-gray-100 rounded-md p-2">{section.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }
}
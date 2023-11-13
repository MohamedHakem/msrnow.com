"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

// type sectionsType = {
//   sectionsNames: {
//     name: string;
//   }[]
// }

export default function MarketplaceSectionsNavbar(sectionsNames: { sectionsNames: { name: string, url: string | null }[]; }) {
  const pathname = usePathname()
  const sections = sectionsNames.sectionsNames

  // console.log("sections: ", sections);

  return (
    // <aside className="fixed top-18 right-0 w-full laptop:w-[199px] laptop:h-[calc(100vh-88px)] laptop:pt-4 border-b laptop:border-0 shadow-md laptop:shadow-none">
    <div className="h-full laptop:px-4 overflow-y-auto scroll-smooth border-y bg-white dark:bg-gray-800">
      <ul className="flex flex-row justify-between tablet:justify-start gap-2 font-medium">
        {sections.map((section: { name: string, url: string | null }, i) => (
          <Link key={i} href={`/marketplace/${section.url}`}
            // className={`laptop:w-full ${pathname.startsWith("/marketplace") ? "border-b-2 border-black laptop:bg-gray-100 laptop:border-b-0 laptop:rounded-md" : ""}`}>
            className={`w-full ${pathname === `/marketplace/${section.url}` ? "bg-[#fbfc0e] font-bold" : "font-semibold"}`}>
            <li className="min-w-max hover:bg-gray-100 rounded-md p-2">{section.name}</li>
          </Link>
        ))}
      </ul>
    </div>
    // </aside>
  )
}
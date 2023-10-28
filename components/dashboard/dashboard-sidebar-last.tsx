"use client"

import { DashboardSections } from "@/data/static/marketplace";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

export default function DashboardSidebar() {
  const pathname = usePathname()
  // const [active, setActive] = useState("")

  // useEffect(() => (
  //   setActive(pathname)
  // ), [pathname])

  return (
    <div className="relative w-full">
    <ul className="flex flex-row justify-between px-2 items-center laptop:flex-col laptop:fixed laptop:mt-14 
    tablet:justify-start tablet:gap-4 h-full laptop:p-4 overflow-x-auto border-b laptop:border-b-0">
      {DashboardSections.map((s, i) => (
        <Link key={i} href={`${s.url}`} className={`laptop:w-full
          ${pathname.startsWith(s.url) ? "border-b-2 border-black laptop:bg-gray-100 laptop:border-b-0 laptop:rounded-md" : ""}
        `}>
          <li className="min-w-max hover:bg-gray-100 rounded-md p-2 font-semibold">{s.title}</li>
        </Link>
      ))}
    </ul>
    </div>  )
}

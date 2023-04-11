import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-[#18191a]">
      <div className="container flex h-20 items-center gap-6 sm:justify-between sm:space-x-0">
        <Link href="/" className="items-center md:flex">
          <Icons.logo className="h-14 w-14" />
        </Link>
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center gap-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

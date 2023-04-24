import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-[#353d50]">
      <div className="container flex h-20 items-center justify-between gap-6 sm:space-x-0">
        <Link href="/" className="h-full items-center md:flex" aria-label="msrnow.com-logo">
          <Icons.logo className="h-full w-[80%]" name="msrnow-logo" />
        </Link>
        <MainNav items={siteConfig.mainNav} />
        <div className="h-full border border-y-0 border-gray-200 dark:border-slate-500">
          <div className="flex h-full flex-1 items-center justify-end">
            <nav className="flex h-full items-center gap-2 overflow-hidden">
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

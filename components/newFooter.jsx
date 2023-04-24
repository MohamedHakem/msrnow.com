import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "./icons"

export const Footer = () => {
  return (
    <footer
      aria-label="Site Footer"
      className="bg-gray-100 dark:bg-[#353d50] dark:text-white"
    >
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <Link href="/" rel="noreferrer" target="_blank" className="h-24 w-24">
            <span className="sr-only">Msrnow.com</span>
            <Icons.logo />
          </Link>
        </div>
        <p className="leading-relaxe mx-auto mt-6 max-w-md text-center text-3xl font-extrabold">
          مصر الان
        </p>
        <p className="mx-auto mt-6 max-w-md text-center text-xl leading-relaxed">
          البوابة العربية للأخبار، مصدرك الأول للأخبار باللغة العربية
        </p>
        <nav aria-label="Footer Nav" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {siteConfig.mainNav.map((l, i) => (
              <li key={i}>
                <Link href={l.href}>{l.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer Nav" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {siteConfig.legalNav.map((l, i) => (
              <li key={i}>
                <Link href={l.href}>{l.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-12 hidden justify-center gap-6 dark:flex md:gap-8">
          {siteConfig.socialNav.map((s, i) => {
            const IconComponent = Icons[s.component]
            return (
              <li key={i}>
                <Link href={s.href} rel="noreferrer" target="_blank">
                  <span className="sr-only">{s.title}</span>
                  <IconComponent />
                </Link>
              </li>
            )
          })}
        </ul>
        <ul className="mt-12 flex justify-center gap-6 dark:hidden md:gap-8">
          {siteConfig.darkSocialNav.map((s, i) => {
            const IconComponent = Icons[s.component]
            return (
              <li key={i}>
                <Link href={s.href} rel="noreferrer" target="_blank">
                  <span className="sr-only">{s.title}</span>
                  <IconComponent />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </footer>
  )
}

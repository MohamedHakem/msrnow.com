import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "./icons"

export const Footer = () => {
  return (
    <footer aria-label="Site Footer" class="bg-gray-100">
      <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="flex justify-center text-teal-600">
          <Link href="/" rel="noreferrer" target="_blank" className="h-24 w-24">
            <span class="sr-only">Msrnow.com</span>
            <Icons.logo />
          </Link>
        </div>
        <p class="mx-auto mt-6 max-w-md text-center text-3xl font-extrabold leading-relaxed text-gray-500">
          مصر الان
        </p>
        <p class="mx-auto mt-6 max-w-md text-center text-xl leading-relaxed text-gray-500">
          البوابة العربية للأخبار، مصدرك الأول للأخبار باللغة العربية
        </p>
        <nav aria-label="Footer Nav" class="mt-12">
          <ul class="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {siteConfig.mainNav.map((l, i) => (
              <li key={i}>
                <Link href={l.href}>{l.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer Nav" class="mt-12">
          <ul class="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {siteConfig.legalNav.map((l, i) => (
              <li key={i}>
                <Link href={l.href}>{l.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul class="mt-12 flex justify-center gap-6 md:gap-8">
          {siteConfig.socialNav.map((s, i) => {
            const IconComponent = Icons[s.title]
            return (
              <li key={i}>
                <Link
                  href="https://www.facebook.com/msrnowcom"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  <span class="sr-only">Facebook</span>
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

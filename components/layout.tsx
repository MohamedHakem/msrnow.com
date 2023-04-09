import { Toaster } from "react-hot-toast"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col justify-between">
      <div dir="ltr">
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      <SiteHeader />
      <main className="mb-auto">{children}</main>
      <SiteFooter />
    </div>
  )
}

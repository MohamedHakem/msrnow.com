import { Toaster } from "react-hot-toast"

import { SiteFooter } from "@/components/site-footer"
import { Footer } from "@/components/newFooter"
import { SiteHeader } from "@/components/site-header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative z-10 flex h-screen flex-col justify-between">
      <div dir="ltr">
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <SiteHeader />
      <main className="mb-auto">{children}</main>
      {/* <SiteFooter /> */}
      <Footer />
      {/* <div className="min-w-screen homeBg fixed inset-0 z-0 flex w-full flex-col justify-center"></div> */}
      {/* <div
        style={{
          background:
            "linear-gradient(319deg, rgb(255 51 98 / 8%) 10%, rgb(255 235 0 / 0%) 50%), linear-gradient(20deg, rgb(255 200 0 / 13%) 5%, rgb(255 212 0 / 0%) 40%)",
          position: "fixed",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          zIndex: "0",
        }}
      ></div> */}
    </div>
  )
}

import type { AppProps } from "next/app"
import { Almarai as FontSans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "next-themes"

import "@/styles/globals.css"
import Head from "next/head"
import Script from "next/script"
import LogRocket from "logrocket"

const isProduction = process.env.NODE_ENV === "production"
isProduction && LogRocket.init("dadbiq/msrnow")

const fontSans = FontSans({
  subsets: ["arabic"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "700", "800"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          مصر الان - البوابة العربية للأخبار، مصدرك الأول للأخبار باللغة
          العربية
        </title>
        <meta
          name="description"
          content="مصر الان - البوابة العربية للأخبار - مصدرك الأول للأخبار باللغة العربية"
        />
      </Head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5845793699253001"
        crossOrigin="anonymous"
      ></Script>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </>
  )
}

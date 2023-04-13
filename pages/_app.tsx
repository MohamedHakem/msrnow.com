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
          مصر الان - البوابة العربية للأخبار، مصدرك الأول للأخبار باللغة العربية
        </title>
        <meta
          name="description"
          content="مصر الان - البوابة العربية للأخبار - مصدرك الأول للأخبار باللغة العربية"
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/favicon-test.jpg"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#ff0000"
        ></link>
        <meta name="msapplication-TileColor" content="#ffffff"></meta>
        <meta
          name="msapplication-TileImage"
          content="/mstile-144x144.png"
        ></meta>
        <meta name="theme-color" content="#ffffff"></meta>
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
        <div className="homeBg fixed inset-0 z-0"></div>
        <Analytics />
      </ThemeProvider>
    </>
  )
}

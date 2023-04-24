// import type { AppProps } from "next/app"
import { Almarai as FontSans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "next-themes"

import * as gtag from "../lib/gtag"
import "@/styles/globals.css"
import { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import Script from "next/script"

// import LogRocket from "logrocket"

// const isProduction = process.env.NODE_ENV === "production"

// add the LogRocket guys
// isProduction && LogRocket.init("dadbiq/msrnow") // it's  +800 kb in size, fck it

// handle the font
const fontSans = FontSans({
  subsets: ["arabic"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "700", "800"],
})

export default function App({ Component, pageProps }) {
  // handle google googletagmanager (gtag) (GSC)
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>
          مصر الان - البوابة العربية للأخبار، مصدرك الأول للأخبار باللغة العربية
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <link rel="preload" href="https://www.msrnow.com"></link>
        <link rel="preload" href="https://vitals.vercel-insights.com"></link>
        <link rel="preload" href="https://www.googletagmanager.com"></link>
        <link rel="preload" href="https://imagecdn.app"></link>
        <link rel="preload" href="https://lh3.googleusercontent.com"></link>
        {/* uncomment the below line when you configure on monetag.com */}
        {/* <meta name="monetag" content="4f6fe42797ed2adccda6311fe6247141"></meta> */}
      </Head>

      {/* <Script src="/sw.js" /> */}

      {/* for the msrnowpushnotifads */}
      {/* <Script
        data-cfasync="false"
        type="text/javascript"
        src="/msrnowpushnotifads.js"
      />
      <Script
        src="//rauvoaty.net/ntfc.php?p=5882666"
        data-cfasync="false"
        async
        onError={_cmqvi()}
        onLoad={_bhggfgrb()}
      /> */}

      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
        }}
      />

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        defer
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />

      {/* <!-- Google Adsense: signup for msrnow.com, the below is for testing and you should remove it --> */}
      {/* <Script
        defer
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5845793699253001"
        crossOrigin="anonymous"
      /> */}

      {/* Add global font to the root */}
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>

      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Component {...pageProps} />
        <div className="homeBg fixed inset-0 z-0"></div>
        <Analytics />
      </ThemeProvider>
    </>
  )
}

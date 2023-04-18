import { Head, Html, Main, NextScript } from "next/document"
import Script from "next/script"

export default function Document() {
  return (
    <Html lang="ar">
      <Head />
      <body
        dir="rtl"
        // className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-[#111010] dark:text-slate-50" bg-[#f6f8fc]
        className="relative min-h-screen bg-[#fff] font-sans text-slate-900 antialiased dark:bg-[#1F283D] dark:text-slate-50"
      >
        <Main />
        <NextScript />
        {/* script for MsrnowMultitag */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5882660,document.body||document.documentElement)`,
          }}
        />
      </body>
    </Html>
  )
}

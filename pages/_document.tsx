import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="ar">
      <Head />
      <body
        dir="rtl"
        // className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-[#111010] dark:text-slate-50"
        className="relative min-h-screen bg-[#f6f8fc] font-sans text-slate-900 antialiased dark:bg-[#1F283D] dark:text-slate-50"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

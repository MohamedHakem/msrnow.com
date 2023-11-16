"use client"

import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Banner() {
  const session = useSession();
  return (
    // <div dir="rtl" className="relative isolate flex items-center justify-center gap-x-2 overflow-hidden bg-[#4f46e5] px-3 py-[6px] sm:px-3.5">
    // <div dir="rtl" className="relative isolate flex items-center justify-center gap-x-2 overflow-hidden bg-[#de6600] py-[2px]">
    <div dir="rtl" className="relative isolate flex items-center justify-center gap-x-2 overflow-hidden bg-[#2563eb] py-[2px] pt-1">
      {/* <div className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
        <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"></div>
      </div>
      <div className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
        <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"></div>
      </div> */}
      <div className="flex flex-wrap items-center gap-y-2">
        <p className="text-sm leading-6 text-white font-medium">
          {/* ابدأ البيع معنا وليك متجر الكتروني مجاني! */}
          عندك منتج عايز تبيعه؟
        </p>
        <Link href={session.status === 'authenticated' ? "/dashboard/products" : "/login"}
          className="flex flex-row gap-1 px-4 py-[2px] text-sm font-bold text-white  
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
          ابدأ البيع مجانا
          <ArrowLeft color={"#fff"} className="font-bold" size={20} />
          {/* <span aria-hidden="true">&rarr;</span> */}
        </Link>
      </div>
      {/* <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          <svg className="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div> */}
    </div>
  )
}
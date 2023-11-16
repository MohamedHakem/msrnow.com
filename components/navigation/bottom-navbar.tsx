"use client"

import { Share2 } from "lucide-react";
import { usePathname } from 'next/navigation'
import toast from "react-hot-toast";

export const BottomNavbar = () => {
  const pathname = usePathname()

  return (
    // <div className="flex flex-row justify-between gap-2 items-center border-t p-1 h-8">
    // <div className="absolute bottom-0 bg-white z-50 w-full flex flex-row justify-between gap-2 items-center border-t p-1 h-8">
    // <div className="bg-white z-50 w-full flex flex-row justify-between gap-2 items-center border-t p-1 h-8">
    // <div className="absolute bottom-0 bg-white z-50 w-full border-t p-1 h-8 text-center">
    // <div className="absolute bottom-0 flex bg-white z-50 w-full border-t p-1 h-10 text-center justify-center items-center">
    <div className="sticky bottom-0 flex bg-white z-50 w-full border-t p-1 h-10 text-center justify-center items-center pb-3 shadow-md">
      <p className="flex flex-row gap-1 text-black items-center pt-1">
        شكرا لزيارتك
        <span className="flex flex-row gap-1 border rounded-md px-2 py-[2px] items-center hover:bg-gray-100 active:scale-90 transition-all duration-50 ease-in-out animate-fadeIn cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(`https://www.msrnow.com/${pathname}`)
            toast.success('تم نسخ الرابط')
          }}
          title="نسخ الرابط"
        >
          شارك
          <Share2 size={18} strokeWidth={1} />
        </span>
        الموقع مجاني!
      </p>

    </div>
  );
};

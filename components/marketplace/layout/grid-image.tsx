"use client"

import Image from "next/image";
import { ReactEventHandler } from "react";

export default function GridImage({ alt, src, priority }: { alt: string, src: string, priority: boolean }) {
  const handleImageLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    console.log("inside handleImageLoad");
    e.currentTarget.style.opacity = '1';
  };

  return (
    <div>
      <Image
        unoptimized width={364} height={364} alt={alt} priority={priority}
        src={`https://wsrv.nl/?url=${src}&default=${src}&l=9&af=''&il=''&n=-1&w=364&h=364&output=webp`}
        sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="absolute max-h-[364px] inset-0 h-full w-full object-fill rounded-lg border opacity-0 
        bg-gradient-to-r from-gray-300 to-gray-400 animate-fadeIn"
        onLoad={handleImageLoad}
      />
    </div>
  )
}
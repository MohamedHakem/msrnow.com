"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createUrl } from '@/lib/marketplace/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SetStateAction, useEffect, useState } from 'react';

export default function MarketplaceFilter({ sizes, colors }: { sizes: string[], colors: string[] }) {

  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort')
  // console.log("🚀 ~ file: marketplace-filter.tsx:17 ~ sort:", sort)
  const [size, setSize] = useState(searchParams.get('size'))
  const [color, setColor] = useState(searchParams.get('color'))

  // let href: string;
  let href: string = createUrl(
    pathname,
    new URLSearchParams({
      ...(size && { size }),
      ...(color && { color }),
      ...(sort && { sort }),
    }))

  useEffect(() => {
    // console.log("🚀 ~ file: marketplace-filter.tsx:29 ~ href:", href)
    router.push(href)
  }, [href, router, size])

  const handleSize = (e: SetStateAction<string | null>) => {
    console.log("size e: ", e)
    setSize(e)
  }

  const handleColor = (e: SetStateAction<string | null>) => {
    console.log("color e: ", e)
    setColor(e)
  }

  return (
    <div className="flex flex-row laptop:flex-col gap-2 w-full">
      <Select dir="rtl" value={searchParams.get('size') || ""} onValueChange={handleSize}>
        <SelectTrigger className="line-clamp-1 w-1/2 laptop:w-[140px] truncate">
          <SelectValue placeholder="المقاس" />
        </SelectTrigger>
        <SelectContent>
          {sizes.map((size, i) => (
            <SelectItem key={i} value={size} className="cursor-pointer">{size}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select dir="rtl" value={searchParams.get('color') || ""} onValueChange={handleColor}>
        <SelectTrigger className="line-clamp-1 w-1/2 laptop:w-[140px] truncate">
          <SelectValue placeholder="اللون" />
        </SelectTrigger>
        <SelectContent>
          {colors.map((color, i) => (
            <SelectItem key={i} value={color} className="cursor-pointer">{color}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
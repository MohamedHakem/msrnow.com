'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createUrl } from '@/lib/marketplace/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from "@/components/ui/label"

export function ColorSizeSelector({ sizes, colors }: {
  sizes?: { name: string }[]; colors?: { name: string }[]
}) {
  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const image = searchParams.get('image')
  const [size, setSize] = useState(searchParams.get('size') || "")
  const [color, setColor] = useState(searchParams.get('color') || "")
  let href: string = createUrl(
    pathname,
    new URLSearchParams({
      ...(image && { image }),
      ...(size && { size }),
      ...(color && { color }),
    }))

  useEffect(() => {
    // console.log("🚀 ~ file: marketplace-filter.tsx:29 ~ href:", href)
    // console.log("first render size: ", size);
    router.push(href)
  }, [href, router, size, color])

  const handleSelected = (type: string, e: string) => {
    console.log("choose a size, e: ", e)
    if (type === "size") setSize(e)
    if (type === "color") setColor(e)
  }

  if (!sizes && !colors) return null
  return (
    <>
      {sizes && (
        <div className="flex items-center gap-2">
          <h2 className="-mt-2">اختر المقاس:</h2>
          <RadioGroup dir='rtl' onValueChange={e => handleSelected("size", e)} defaultValue={"false"} className="p-2 pr-0">
            <div className="[&:has([data-state=checked])>div]:border-primary flex flex-row gap-2">
              {sizes.map((shoeSize, i) => (
                <div key={i}>
                  <RadioGroupItem value={shoeSize.name} className="sr-only" id={shoeSize.name} />
                  <Label htmlFor={shoeSize.name}>
                    <div className="items-center p-1 hover:border-accent cursor-pointer">
                      <div className={`space-y-2 bg-[#ecedef] px-3 py-1 rounded-full ${size === shoeSize.name ? "border-2 border-blue-600" : ""}`}>
                        <span className="block w-full text-center text-base font-semibold">
                          {shoeSize.name}
                        </span>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div >
      )}
      {colors && (
        <div className="flex items-center gap-2">
          <h2 className="-mt-2">اختر اللون:</h2>
          <RadioGroup dir='rtl' onValueChange={e => handleSelected("color", e)} defaultValue={"false"} className="p-2 pr-0">
            <div className="[&:has([data-state=checked])>div]:border-primary flex flex-row gap-2">
              {colors.map((itemColor, i) => (
                <div key={i}>
                  <RadioGroupItem value={itemColor.name} className="sr-only" id={itemColor.name} />
                  <Label htmlFor={itemColor.name}>
                    <div className="items-center p-1 hover:border-accent cursor-pointer">
                      <div className={`space-y-2 bg-[#ecedef] px-3 py-1 rounded-full ${color === itemColor.name ? "border-2 border-blue-600" : ""}`}>
                        <span className="block w-full text-center text-base font-semibold">
                          {itemColor.name}
                        </span>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}
    </>
  )
}

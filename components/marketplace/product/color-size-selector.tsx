'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { createUrl } from '@/lib/marketplace/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from "@/components/ui/label"
import { Circle } from 'lucide-react';

export function ColorSizeSelector({ sizes, colors }: {
  sizes?: { name: string }[]; colors?: { name: string, value: string }[]
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
    // router.push(href)
    router.replace(href, { scroll: false })
  }, [href, router, size, color])

  const handleSelected = (type: string, e: string) => {
    console.log(`choose a ${type === "size" ? "size" : "color"}: `, e)
    // router.replace(optionUrl, { scroll: false });
    if (type === "size") setSize(e)
    if (type === "color") setColor(e)
  }

  if (!sizes && !colors) return null
  return (
    <div className="flex flex-col gap-2 py-6">

      {sizes && (<div>
        <div className="flex items-center justify-between"><h3 className="text-sm font-medium text-gray-900">المقاس</h3></div>
        <RadioGroup dir='rtl' onValueChange={e => handleSelected("size", e)} defaultValue={"false"} className="p-2 pr-0 transition-all duration-300 ease-in-out">
          <legend className="sr-only">اختر مقاس</legend>
          <div className="grid grid-cols-5 justify-between gap-3">
            {sizes.map((shoeSize, i) => (
              <Fragment key={i}>
                <RadioGroupItem value={shoeSize.name} className="sr-only" id={shoeSize.name} />
                <Label htmlFor={shoeSize.name} className={`group relative min-w-[60px] flex items-center justify-center rounded-md
                py-3 px-3 laptop:px-0 w-auto text-sm font-medium uppercase hover:bg-gray-50 flex-1 sm:py-3 max-w-[70px]
                focus:outline-none cursor-pointer ${size === shoeSize.name ? "border-2 border-blue-600" : "border"}`}>
                  <span className="block text-center text-base font-semibold">{shoeSize.name}</span>
                </Label>
              </Fragment>
            ))}
          </div>
        </RadioGroup>
      </div>
      )}

      {colors && (
        <div className="flex flex-col gap-2">
          {/* <h2>اللون</h2> */}
          <div className="flex items-center justify-between"><h3 className="text-sm font-medium text-gray-900">اللون</h3></div>
          <RadioGroup dir='rtl' onValueChange={e => handleSelected("color", e)} defaultValue={"false"} className="pr-0">
            <legend className="sr-only">اختر لون</legend>
            {/* <div className="[&:has([data-state=checked])>div]:border-primary flex flex-row gap-2"> */}
            <div className="flex flex-row gap-2">
              {colors.map((itemColor, i) => (
                <Fragment key={i}>
                  <RadioGroupItem value={itemColor.name} className="sr-only" id={itemColor.name} />
                  <Label htmlFor={itemColor.name} className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5">
                    <div className={`items-center ${color === itemColor.name ? "p-[2x]" : ""} rounded-full cursor-pointer 
                    ${color === itemColor.name ? "border-2 border-blue-600" : "border"}`}>
                      <Circle size={38} color={color === itemColor.value ? "#2563eb" : ""} fill={itemColor.value} />
                    </div>
                  </Label>
                </Fragment>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}
    </div>
  )
}

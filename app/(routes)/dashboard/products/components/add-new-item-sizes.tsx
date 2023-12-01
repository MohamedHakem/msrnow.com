"use client"

import * as React from "react"
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
// import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  // CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Palette, PencilRuler } from "lucide-react"

// interface DataTableFacetedFilterProps<TData, TValue> {
interface AddNewItemSizesOrColorProps {
  // column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

// export function AddNewItemSizes<TData, TValue>({
export function AddNewItemSizesOrColor({
  title,
  options,
}: AddNewItemSizesOrColorProps) {
  // const shoeSizes = [
  //   "مقاس 40",
  //   "مقاس 41",
  //   "مقاس 42",
  //   "مقاس 43",
  // ]
  const shoeSizes = [
    "1",
    "2",
    "3",
    "4",
  ]

  // const facets = shoeSizes
  // const selectedValues = new Set(shoeSizes as string[])
  // const [selected, setSelected] = React.useState([""] as string[])
  // const selectedValues = new Set(selected)
  const [selectedValues, setSelectedValues] = React.useState([""])
  // const selectedValues: string[] = []

  React.useEffect(() => {
    setSelectedValues([])
  }, [])

  // React.useEffect(() => {
  // }, [selectedValues])

  console.log("selectedValues: ", selectedValues)

  return (
    <Popover>
      <PopoverTrigger asChild className="w-full">
        <Button variant="outline" size="sm" className="h-10 border-dashed">
          <PlusCircledIcon className="ml-2 h-4 w-4" />
          <span className="ml-2">{title}</span>
          {title === "الألوان" ? <Palette /> : <PencilRuler />}
          {selectedValues?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal laptop:hidden"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden gap-1 laptop:flex">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.length} حدود
                  </Badge>
                ) : (
                  // .filter((option) => selectedValues.has(option.value))
                  options.map((option) => (
                    <Badge
                      variant="secondary"
                      key={option.value}
                      className="rounded-sm px-1 font-normal"
                    >
                      {option.label}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command dir="rtl">
          <CommandInput placeholder={title} className="flex flex-row gap-2" />
          <CommandList>
            <CommandEmpty>لا يوجد نتائج.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        console.log("selectedValues.filter(v => v !== option.value): ",
                          selectedValues.filter(v => v !== option.value)
                        )
                        setSelectedValues(selectedValues.filter(v => v !== option.value))
                      } else {
                        console.log("option.value: ", option.value);
                        console.log("[...selectedValues, option.value]: ",
                          [...selectedValues, option.value]
                        )
                        setSelectedValues([...selectedValues, option.value])
                      }
                      // const filterValues = Array.from(selectedValues)
                      // column?.setFilterValue(
                      //   filterValues.length ? filterValues : undefined
                      // )
                    }}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "ml-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {/* {option.icon && (
                      <option.icon className="ml-2 h-4 w-4 text-muted-foreground" />
                    )} */}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
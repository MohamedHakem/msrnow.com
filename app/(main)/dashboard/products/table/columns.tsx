"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { Copy, PenSquare, Trash2 } from "lucide-react"
// import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DataTableColumnHeader } from "@/app/(main)/dashboard/products/table/data-table-column-header"
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
// import { ProductType } from "@/types"
import { dataTableProductType } from "@/types"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// *********
// match or translate the english from db to the arabic keys here or anywhere else (data-table.tsx the products array) 
// ********

// export type Product = {
//   رمز: string
//   العنوان: string
//   السعر: number
//   الكمية: number
//   الفئة: "أحذية" | "هواتف" | "عقارات" | "لابتوب"
//   الاوردرات: number
//   التقييم: number
//   الشحن: boolean
//   الحالة: "معروض" | "مؤرشف",
//   slug: string
// }

export const columns: ColumnDef<dataTableProductType>[] = [
  {
    accessorKey: "رمز",
    header: "كود",
  },
  {
    accessorKey: "العنوان",
    header: "العنوان",
    cell: ({ row }) => {
      const product = row.original
      return (
        <Link href={`/marketplace/product/${product.رابط}`}
          className="underline-offset-[6px] underline text-[#00E] font-semibold max-w-[500px] truncate">
          {product.العنوان}
        </Link>
      )
    }
  },
  {
    accessorKey: "السعر",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="السعر" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("السعر"))
      return <div className="text-right font-medium">{price.toFixed(2)} جنية</div>
    },
  },
  {
    accessorKey: "الكمية",
    header: "الكمية",
    cell: ({ row }) => {
      const stockQuantity: ReactNode = row.getValue("الكمية")
      return <div className="text-right font-medium max-w-[70px] truncate"><div>{stockQuantity} قطعة</div></div>
    },
  },
  {
    accessorKey: "الفئة",
    header: "الفئة",
    cell: ({ row }) => {
      const product_category: ReactNode = row.getValue("الفئة")
      return <div className="text-right font-medium w-fit"><div className="border rounded-md p-2">{product_category}</div></div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "الاوردرات",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الاوردرات" />
    ),
  },
  {
    accessorKey: "التقييم",
    header: "التقييم",
    cell: ({ row }) => {
      const rating: ReactNode = row.getValue("التقييم")
      // console.log("rating: ", rating)
      return (
        <div className="text-right font-medium w-fit">
          <div className="">{rating ? parseFloat(rating.toString()).toFixed(1) : "لا يوجد"}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "الحالة",
    header: "الحالة",
    cell: ({ row }) => {
      const published_status: ReactNode = row.getValue("الحالة")
      return (
        <div className="text-right font-medium w-fit">
          {published_status === true ? (
            <div className="flex gap-1 items-center font-semibold text-green-500 bg-green-100 rounded-md py-1 px-2">
              <CheckCircledIcon />
              <span>معروض</span>
            </div>
          ) : (
            <div className="flex gap-1 items-center font-semibold rounded-md py-1 px-2">
              <CrossCircledIcon />
              <span>مؤرشف</span>
            </div>
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex flex-row gap-2">
          <Button variant={"outline"} title="تعديل" className="p-2 hover:border-black">
            <Link href={`/dashboard/products/${product.رمز}`}>
              <PenSquare strokeWidth={1} size={22} color={"#000"} />
            </Link>
          </Button>
          <Button variant={"outline"} onClick={() => navigator.clipboard.writeText(product.رابط)} title="نسخ الرابط"
            className="p-2  hover:border-black">
            <Copy strokeWidth={1} size={22} color={"#000"} />
          </Button>
          <Button variant={"outline"} title="حذف"
            className="p-2 stroke-[#8e8e8e] hover:border-red-500 hover:text-red-700">
            <Trash2 strokeWidth={1} size={22} />
          </Button>
        </div>
      )
    },
  },
]

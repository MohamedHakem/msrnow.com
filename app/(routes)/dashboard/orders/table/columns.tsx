"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ReactNode } from "react"
import Link from "next/link"

import { AlertTriangle, PackageCheck, PackageSearch, Truck } from "lucide-react"
import { DataTableColumnHeader } from "@/app/(routes)/dashboard/products/table/data-table-column-header"
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { dataTableOrderType } from "@/types"
import { OrderStatus } from "@prisma/client"

export const columns: ColumnDef<dataTableOrderType>[] = [
  {
    accessorKey: "رمز",
    header: "كود",
  },
  {
    accessorKey: "المنتج",
    header: "المنتج",
    cell: ({ row }) => {
      const orderItem = row.original
      return (
        // <Link href={`/dashboard/orders/${orderItem.رمز}`}
        <Link href={`/marketplace/product/${orderItem.رابط}`}
          className="underline-offset-[6px] underline text-[#00E] font-semibold max-w-[500px] truncate">
          {orderItem.المنتج}
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
    accessorKey: "المقاس",
    header: "المقاس",
  },
  {
    accessorKey: "اللون",
    header: "اللون",
  },
  {
    accessorKey: "العميل",
    header: "العميل",
  },
  {
    accessorKey: "الهاتف",
    header: "الهاتف",
  },
  {
    accessorKey: "العنوان",
    header: "العنوان",
  },
  {
    accessorKey: "الحالة",
    header: "الحالة",
    cell: ({ row }) => {
      const status: ReactNode = row.getValue("الحالة")
      return (
        <div className="text-right font-semibold w-fit">
          {/* <div className={`flex gap-1 items-center font-semibold ${status === OrderStatus.COMPLETED ? "text-green-500" : "text-orange-500 bg-orange-100 rounded-md py-1 px-2"}`}> */}
          {(() => {
            switch (status) {
              case OrderStatus.COMPLETED:
                return <div className="flex gap-1 items-center text-green-500"><CheckCircledIcon />تم التسليم والدفع</div>
              case OrderStatus.PENDING:
                return <div className="flex gap-1 items-center text-orange-500 bg-orange-100 rounded-md py-1 px-2"><AlertTriangle />العميل في انتظار ردك</div>
              case OrderStatus.PROCESSING:
                return <div className="flex gap-1"><PackageSearch />جاري التحضير</div>
              case OrderStatus.SHIPPED:
                return <div className="flex gap-1"><Truck />تم الشحن وفي انتظار إستلام العميل </div>
              case OrderStatus.DELIVERED:
                return <div className="flex gap-1"><PackageCheck />تم التسليم - حدد (أكتمل)</div>
              case OrderStatus.CANCELLED:
                return <div className="flex gap-1"><CrossCircledIcon />تم الإلغاء</div>
              default:
                return <div className="flex gap-1 items-center text-orange-500 bg-orange-100 rounded-md py-1 px-2"><CrossCircledIcon />مرتجع</div>
            }
          })()}
          {/* </div> */}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const orderItem = row.original
  //     return (
  //       <div className="flex flex-row gap-2">
  //         <Button variant={"outline"} title="تعديل" className="p-2 hover:border-black">
  //           <Link href={`/dashboard/orders/${orderItem.رمز}`}>
  //             <PenSquare strokeWidth={1} size={22} color={"#000"} />
  //           </Link>
  //         </Button>
  //       </div>
  //     )
  //   },
  // },
]



{/* {status === OrderStatus.COMPLETED ? (
              <>
                <CheckCircledIcon />
                <span>تم التسليم والدفع</span>
              </>
            ) : ( */}
{/* <CrossCircledIcon /> */ }
{/* {status === OrderStatus.PENDING ? <div className="flex gap-1"><AlertTriangle /> العميل في انتظارك</div> :
                  status === OrderStatus.PROCESSING ? <span>جاري التحضير</span> :
                    status === OrderStatus.SHIPPED ? <span>تم الشحن وفي انتظار إستلام العميل :
                      status === OrderStatus.DELIVERED ? <span></span>تم التسليم - حدد (أكتمل)</span> :
                      status === OrderStatus.CANCELLED ? <span>تم الإلغاء</span> :
                        <span>مرتجع</span>} */}
{/* )} */ }

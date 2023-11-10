"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table, flexRender } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          // className="ml-auto hidden h-8 lg:flex"
          className="ml-auto h-8"
        >
          <MixerHorizontalIcon className="ml-2 h-4 w-4" />
          عرض
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] text-right">
        <DropdownMenuLabel className="text-right">اختر الأعمدة</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column, i) => {
            return (
              <DropdownMenuCheckboxItem
                dir="rtl"
                key={column.id}
                className="capitalize cursor-pointer hover:bg-primary"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {/* {table.getHeaderGroups().map(headerGroup => { <>{console.log("headers: ", headerGroup)}</> })} */}
                {/* {table.getHeaderGroups().map(headerGroup => console.log(headerGroup.headers[i].column.columnDef.header)) as React.ReactNode} */}
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu >
  )
}



// {column.id}
{/* {column._getFacetedRowModel()} */ }
{/* {table.getHeaderGroups().map(headerGroup => headerGroup.headers[0].column.columnDef.header)} */ }
{/* {table.getHeaderGroups().map(headerGroup => headerGroup.headers.map((header, i) => header.column.columnDef.header))} */ }

{/* header.getContext() */ }




/////




// headerGroup.headers[i].column.columnDef.header || column.id}</>
{/* flexRender(
header.column.columnDef.header,
header.getContext()
) */}




////


// <>{flexRender(
//   headerGroup.headers[i].column.columnDef.header,
//   headerGroup.headers[i].getContext()
// )}
// </>

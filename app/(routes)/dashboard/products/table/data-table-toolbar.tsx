"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/app/(routes)/dashboard/products/table/data-table-view-options"

// import { priorities, statuses } from "../data/data" 
import { الفئة, الحالة } from "@/app/(routes)/dashboard/products/table/filter-data"
import { DataTableFacetedFilter } from "@/app/(routes)/dashboard/products/table/data-table-faceted-filter"
import { Search } from "lucide-react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-1">
        <div className="flex gap-1 border border-input rounded-md text-muted-foreground items-center">
            <Search className="pr-2" />
          <Input
            placeholder="بحث..."
            className="h-8 w-[35px] tablet:w-[150px] laptop:w-[250px] border-0 mr-1 pr-0"
            value={(table.getColumn("العنوان")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("العنوان")?.setFilterValue(event.target.value)
            }
          />
        </div>
        {table.getColumn("الحالة") && (
          <DataTableFacetedFilter
            column={table.getColumn("الحالة")}
            title="الحالة" // status 
            options={الحالة}
          />
        )}
        {table.getColumn("الفئة") && (
          <DataTableFacetedFilter
            column={table.getColumn("الفئة")}
            title="الفئة" // product_category
            options={الفئة}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            إلغاء الكل
            <Cross2Icon className="mr-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
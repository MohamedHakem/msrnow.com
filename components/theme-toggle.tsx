import * as React from "react"
import { useTheme } from "next-themes"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="mt-[2px] h-full w-[70px] border-slate-200 text-slate-500 transition-all duration-300 dark:border-slate-600"
        >
          <Icons.sun
            className="h-[28px] w-[28px] rotate-0 scale-100 transition-all hover:text-slate-900 
          dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100"
          />
          <Icons.moon
            className="absolute h-[28px] w-[28px] rotate-90 scale-0 transition-all hover:text-slate-900 
          dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:cursor-pointer"
        >
          <Icons.sun className="ml-2 h-6 w-6" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:cursor-pointer"
        >
          <Icons.moon className="ml-2 h-6 w-6" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="hover:cursor-pointer"
        >
          <Icons.laptop className="ml-2 h-6 w-6" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

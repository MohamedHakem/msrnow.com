"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AddNewButton() {
  const pathname = usePathname()
  const [newUrl, setNewUrl] = useState('/dashboard')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // console.log("[AddNewButton] inside useEffect");
    // console.log("[AddNewButton] pathname: ", pathname);
    if (pathname.startsWith('/dashboard') && pathname.endsWith('/new')) {
      // console.log("[AddNewButton] inside if")
      setVisible(false)
    } else {
      if (pathname === '/dashboard') { setVisible(false) } else {
        setVisible(true)
      }
    }
    setNewUrl(`${pathname}/new`)
  }, [pathname])

  if (visible) {
    return (
      <Link href={newUrl} className="w-fit h-auto mt-2">
        <Button>
          <div className="flex flex-row gap-2 items-center justify-center">
            <Plus />
            <span className="text-lg font-semibold">جديد</span>
          </div>
        </Button>
      </Link>
    );
  } else {
    return;
  }
}
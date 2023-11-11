'use client';

import { usePathname } from 'next/navigation';

export default function HeaderSiteSectionName() {
  const pathname = usePathname();

return <p className="w-fit h-fit text-3xl font-bold pl-2 animate-fadeIn">
    {pathname.startsWith('/marketplace') || pathname === '/' ? "المتجر" : pathname.startsWith('/dashboard') ? "حسابك" : "الأخبار"}
  </p>
}

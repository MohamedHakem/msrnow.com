'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import msrnowLogo from '@/public/images/msrnow-logo-no-borders.png'

export default function HeaderSiteSectionName() {
  const pathname = usePathname();
  const MarketplaceHome = pathname.startsWith('/marketplace') || pathname === '/' ? '/marketplace' : false
  const NewsHome = pathname.startsWith('/news') ? '/news' : false
  const DashboardHome = pathname.startsWith('/dashboard') ? '/dashboard' : false
  const currentHome = MarketplaceHome || NewsHome || DashboardHome

  return (
    <div className="flex items-center gap-x-2 md:gap-x-4 w-auto animate-fadeIn h-full z-10">
      <div className="flex h-full md:px-2 m-auto">
        <Link href={currentHome ? currentHome : '/'} className="flex flex-row m-auto justify-center items-center">
          <div className="animate-fadeIn">
            <Image priority width={60} height={52} src={msrnowLogo} alt="msrnow logo" className="w-[55px] h-[45px] pl-2" />
          </div>
          <p className="w-fit h-fit text-3xl font-bold pl-2 animate-fadeIn">
            الأخبار
          </p>
{/*             {MarketplaceHome ? "المتجر" : NewsHome ? "الأخبار" : DashboardHome ? "حسابك" : "المتجر"} always show news, marketplace removed. */} 
        </Link>
      </div>
    </div>
  )
}

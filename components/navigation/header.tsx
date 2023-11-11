import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

import { MobileNav } from '@/components/navigation/mobile-nav';
import HeaderAccount from '@/components/navigation/account-dropdown';
import Cart from '@/components/marketplace/cart';
import OpenCart from '@/components/marketplace/cart/open-cart';
import { MarketplaceNavItems } from '@/data/static/marketplace';
import msrnowLogo from '@/public/images/msrnow-logo-no-borders.png'
import HeaderSiteSectionName from '@/components/navigation/site-section';

export const Header = () => {
  return (
    <nav className="flex flex-row z-90 items-stretch h-14 laptop:h-16 border-b w-full relative">
      <header className="flex flex-row px-2 md:px-4 w-full z-50">
        <div className="flex flex-row items-center w-full m-auto justify-between animate-fadeIn transition-all duration-50 ease-in-out">
          <div className="flex items-center gap-x-2 md:gap-x-4 w-auto animate-fadeIn h-full z-10">
            <div className="flex h-full md:px-2 m-auto">
              <Link href="/" className="flex flex-row m-auto justify-center items-center">
                <div className="animate-fadeIn">
                  <Image
                    priority
                    width={60}
                    height={52}
                    src={msrnowLogo}
                    alt="msrnow logo"
                    // className="w-[55px] h-[45px] md:w-[60px] md:h-[52px] pl-2"
                    className="w-[55px] h-[45px] pl-2"
                  />
                </div>
                <HeaderSiteSectionName />
              </Link>
            </div>
          </div>

          <div className="hidden laptop:flex flex-auto animate-fadeIn h-14 laptop:h-16 absolute w-[100dvw]">
            <div className="laptop:flex flex-row justify-center m-auto">
              {MarketplaceNavItems.map((s) => (
                <Link key={s.title} href={`/${s.url}`}
                  className="text-lg font-bold px-4 py-2 rounded-md hover:bg-gray-50 hover:text-red-500 active:scale-90 transition-all duration-50 ease-in-out animate-fadeIn">
                  <span className="animate-fadeIn">{s.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex w-auto animate-fadeIn h-full z-10 gap-3">
            <div className="w-full m-auto">
              <Suspense fallback={<div className="w-4 h-4 border rounded-md"></div>}>
                <HeaderAccount size={40} />
              </Suspense>
            </div>
            <div className="w-fit m-auto">
              <div className="flex gap-3">
                <Suspense fallback={<OpenCart />}>
                  <Cart />
                </Suspense>
                <MobileNav />
              </div>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
};

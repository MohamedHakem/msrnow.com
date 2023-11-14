import Link from 'next/link';
// import Image from 'next/image';
import { Suspense } from 'react';

import { MobileNav } from '@/components/navigation/mobile-nav';
import HeaderAccount from '@/components/navigation/account-dropdown';
import Cart from '@/components/marketplace/cart';
import OpenCart from '@/components/marketplace/cart/open-cart';
import { MarketplaceNavItems } from '@/data/static/marketplace';
// import msrnowLogo from '@/public/images/msrnow-logo-no-borders.png'
import HeaderSiteSectionName from '@/components/navigation/site-section';
import Banner from './announcement';
import { db } from '@/lib/db';
import MarketplaceSectionsNavbar from './marketplace-sections-navbar';

export const Header = async () => {
  const sectionsNames = await db.productCategory.findMany({ select: { name: true, url: true } })

  return (
    <nav className="fixed flex flex-col items-stretch h-fit border-b w-full bg-white z-50">
      <header className="flex flex-row px-2 md:px-4 w-full h-16">
        <div className="flex flex-row items-center w-full m-auto justify-between animate-fadeIn transition-all duration-50 ease-in-out">
          <HeaderSiteSectionName />

          <div className="hidden laptop:flex flex-auto animate-fadeIn h-16 absolute w-[100dvw]">
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
                <HeaderAccount size={34} />
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

      <Banner />
      <MarketplaceSectionsNavbar sectionsNames={sectionsNames} />
    </nav>
  );
};

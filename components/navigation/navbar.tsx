import HeaderAccount from '@/app/(main)/components/navigation/account-dropdown';
import { MobileNav } from '@/app/(main)/components/navigation/mobile-nav';
import Link from 'next/link';
// import MsrnowSVGLogo from '@/components/logo/msrnow-svg-logo';
import MsrnowSVGLogo from '@/components/logo/msrnow-new-svg-logo';
import Cart from '@/components/marketplace/cart';
import OpenCart from '@/components/marketplace/cart/open-cart';
import { MarketplaceNavItems } from '@/data/static/marketplace';
import { ShoppingCart } from 'lucide-react';
import { Suspense } from 'react';

export const Navbar = () => {
  return (
    <header className="flex flex-row px-2 md:px-4 w-full z-50">
      {/* <div className="flex flex-row items-center w-full max-w-screen-largePC m-auto justify-between animate-fadeIn transition-all duration-50 ease-in-out"> */}
      <div className="flex flex-row items-center w-full m-auto justify-between animate-fadeIn transition-all duration-50 ease-in-out">
        <div className="flex items-center gap-x-2 md:gap-x-4 w-auto animate-fadeIn h-13 laptop:h-14 z-10">
          <MobileNav />
          <div className="flex h-full md:px-2 m-auto">
            <Link href="/" className="flex flex-row m-auto justify-center items-center">
              <div className="animate-fadeIn">
                <MsrnowSVGLogo color={"black"} width={50} height={50} />
              </div>
              <p className="w-fit h-fit text-3xl font-bold pl-2 animate-fadeIn">مصر الان</p>
            </Link>
          </div>
        </div>
        <div className="hidden laptop:flex flex-auto animate-fadeIn h-13 laptop:h-14 absolute w-[100dvw]">
          <div className="laptop:flex flex-row justify-center m-auto">
            {MarketplaceNavItems.map((s) => (
              <Link key={s.title} href={`/${s.url}`}
                className="text-lg font-bold px-4 py-2 rounded-md hover:bg-gray-50 hover:text-red-500 active:scale-90 transition-all duration-50 ease-in-out animate-fadeIn">
                <span className="animate-fadeIn">{s.title}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-auto animate-fadeIn h-13 laptop:h-14 z-10 gap-4">
          <div className="w-full m-auto">
            <Suspense fallback={<div className="w-4 h-4 border rounded-md"></div>}>
              <HeaderAccount size={40} />
            </Suspense>
          </div>
          <div className="pl-2 md:pr-2 w-fit m-auto">
            {/* <Link href={"/marketplace/cart"}>
              <ShoppingCart />
            </Link> */}
            {/* <div className="flex justify-end md:w-1/3"> */}
            <div className="flex">
              <Suspense fallback={<OpenCart />}>
                <Cart />
              </Suspense>
            </div>
          </div>
          {/* <div className="flex justify-end md:w-1/3">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div> */}
        </div>
      </div>
    </header>
  );
};

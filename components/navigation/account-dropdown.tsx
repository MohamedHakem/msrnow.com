'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import LoadingDots from '@/components/news/loading-dots';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { LayoutDashboard, LogOut, User2, FolderEdit, ShoppingBasket, Store } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export default function HeaderAccount({ size }: { size: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  useEffect(() => {
    if (pathname === '/dashboard' && session.status === 'unauthenticated' ||
      pathname.startsWith('/dashboard') && session.status === 'unauthenticated') {
      toast.error('سجل دخول أولا ليمكنك الدخول الي لوحة التحكم');
      router.push('/login');
    }

    if (pathname === '/marketplace/checkout' && session.status === 'unauthenticated') {
      toast.error('سجل دخول أولا ليمكنك عمل الاوردر');
      router.push('/login');
    }
  }, [pathname, router, session.status])

  const userImage = session.data?.user?.image;

  return (
    <div className={`w-auto h-auto p-[1px] transition-all duration-300 ease-in-out animate-fadeIn`}>
      {session?.status === 'loading' || session?.status === 'unauthenticated' ? (
        <Link href={'/login'} className="animate-out transition-all duration-300 ease-in-out">
          <Button size={'sm'} >دخول</Button>
        </Link>
      ) : session?.status === 'authenticated' ? (
        <div className={`w-[${size}px] flex items-center md:order-2 text-xl font-semibold animate-fadeIn`}>
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'} className={`w-[${size}px] h-auto p-0 m-0 rounded-full`}>
                {userImage !== undefined && userImage !== null ? (
                  <Image
                    unoptimized
                    className="w-full h-full rounded-full"
                    // src={`https://imagecdn.app/v2/image/${userImage}?width=${size}&height=${size}`}
                    src={`https://wsrv.nl/?url=${userImage}&default=${userImage}&l=9&af=''&il=''&n=-1&w=${size}&h=${size}&output=webp`}
                    width={size || 40}
                    height={size || 40}
                    alt="user profile image"
                  />
                ) : (
                  <div className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                    <User2 strokeWidth="1px" className="w-8 h-8 rounded-full" />
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div dir="ltr" className="flex flex-col gap-2 px-6 py-2 border-b mb-2">
                <div>{session.data?.user.name}</div>
                <div>{session.data?.user.email}</div>
              </div>
              <Link href={'/dashboard/my-info'} className="flex flex-row gap-2 mb-1">
                <DropdownMenuItem className="flex flex-row gap-2 w-full">
                  {/* <LayoutDashboard strokeWidth="1px" /> */}
                  <FolderEdit strokeWidth="1px" />
                  <div>
                    بياناتي
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href={'/dashboard/purchases'} className="flex flex-row gap-2 mb-1">
                <DropdownMenuItem className="flex flex-row gap-2 w-full">
                  <ShoppingBasket strokeWidth="1px" />
                  <div>
                    مشترياتي
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href={'/dashboard/products'} className="flex flex-row gap-2 mb-1">
                <DropdownMenuItem className="flex flex-row gap-2 w-full">
                  <Store strokeWidth="1px" />
                  <div>
                    متجري
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="flex flex-row gap-2 w-full h-full">
                <div onClick={() => signOut({ redirect: true, callbackUrl: "/" })} className="flex flex-row gap-2 w-full h-full">
                  <LogOut strokeWidth="1px" />
                  خروج
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="w-16 h-10 border rounded-md flex justify-center">
          <LoadingDots className="bg-black dark:bg-white" />
        </div>
      )}
    </div>
  );
}

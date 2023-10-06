'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import LoadingDots from '../news/loading-dots';
import { assignRole } from '@/app/actions';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LayoutDashboard, LogOut, User2, UserCircle } from 'lucide-react';

export default function AccountDropdown() {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const userEmail = session.data?.user?.email;
  const userImage = session.data?.user?.image;

  if (session.status === 'unauthenticated' && pathname === '/dashboard') {
    router.push('/login');
  }

  const getRoles = useCallback(async () => {
    const response = await fetch(`/api/user/get-user/${userEmail}`);
    const data = await response.json();
    return data.roles;
  }, [userEmail]);

  useEffect(() => {
    if (session.status === 'authenticated' && userEmail) {
      getRoles().then((roles) => {
        console.log('[AccountDropdown] roles: ', roles);
        console.log('roles.length < 1: ', roles.length < 1);
        if (roles.length < 1) {
          assignRole(userEmail, 'reader');
          getRoles().then((roles) => {
            console.log('User updated roles: ', roles);
          });
          // console.log('assigned default role to user: ', userRoles);
          // const userRoles = assignRole(userEmail, 'reader');
        }
      });
    }
  }, [getRoles, session.status, userEmail]);

  return (
    <div>
      {session?.status === 'loading' ? (
        <div className="w-16 h-10 border rounded-md flex justify-center">
          <LoadingDots className="bg-black dark:bg-white" />
        </div>
      ) : session?.status === 'unauthenticated' ? (
        <Link href={'/login'}>
          <Button>دخول</Button>
        </Link>
      ) : session?.status === 'authenticated' ? (
        <div className="flex items-center md:order-2 text-xl font-semibold">
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'} className="w-10 h-10 p-0 m-0 rounded-full">
                {userImage !== undefined && userImage !== null ? (
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={userImage}
                    width={32}
                    height={32}
                    alt="user profile image"
                  />
                ) : (
                  <div className="flex mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                    <User2 strokeWidth="1px" className="w-8 h-8 rounded-full" />
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={'/dashboard'} className="flex flex-row gap-2">
                <DropdownMenuItem>
                  <LayoutDashboard strokeWidth="1px" />
                  <div>حسابي</div>
                </DropdownMenuItem>
              </Link>
              <Link href={'/profile'} className="flex flex-row gap-2">
                <DropdownMenuItem>
                  <UserCircle strokeWidth="1px" />
                  <div>الصفحة الشخصية</div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <div onClick={() => signOut({ redirect: false })} className="flex flex-row gap-2">
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

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
// import { useEffect } from 'react';
import LoadingDots from '../../../../components/news/loading-dots';
// import { assignRole } from '@/app/actions';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { LayoutDashboard, LogOut, User2, UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import toast from 'react-hot-toast';

export default function HeaderAccount() {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  // const userEmail = session.data?.user?.email;
  const userImage = session.data
    ? session.data.user
      ? session.data.user.image
        ? session.data.user.image
        : null
      : null
    : null;

  // type roles = {
  //   roles: {
  //     name: string;
  //   }[];
  // };

  // type roles = {
  //   name: string;
  // }[];

  // const getRoles = useCallback(async (email: string) => {
  //   const response = await fetch(`/api/user/get-user/${email}`);
  //   const data: roles = await response.json().then((roles) => roles.roles);
  //   return data;
  // }, []);

  // const assignRoles = useCallback(async (email: string) => {
  //   if (email) {
  //     const updatedUser = await assignRole(email, 'reader');
  //     console.log('🚀 ~ file: account-dropdown.tsx:39 ~ assignRoles ~ updatedUser:', updatedUser);
  //     return updatedUser;
  //   }
  // }, []);

  // useEffect(() => {
  //   if (session.status === 'authenticated' && userEmail) {
  //     getRoles().then((roles) => {
  //       console.log('[AccountDropdown] roles: ', roles);
  //       if (roles.length < 1) {
  //         assignRoles().then((updatedUser) => {
  //           if (updatedUser) {
  //             console.log('[AccountDropdown] updatedUser.roles: ', updatedUser.roles);
  //           }
  //         });
  //       }
  //     });
  //   }
  // }, [assignRoles, getRoles, session.status, userEmail]);

  // useEffect(() => {
  if (pathname === '/dashboard' && session.status === 'unauthenticated') {
    toast.error('سجل دخول أولا ليمكنك الدخول الي لوحة التحكم');
    router.push('/login');
  }

  // const fetchRolesAndUpdate = async () => {
  //   console.log('fetchRolesAndUpdate() ...');
  //   if (session.status === 'authenticated') {
  //     console.log('user authenticated');
  //     if (userEmail !== undefined && userEmail !== null) {
  //       console.log('userEmail exist, getRoles() ...');
  //       const roles = await getRoles(userEmail);
  //       console.log('[AccountDropdown] roles: ', roles);

  //       if (roles.length < 1) {
  //         console.log('roles are < 1');
  //         const updatedUser = await assignRoles(userEmail);
  //         if (updatedUser) {
  //           console.log('[AccountDropdown] updatedUser.roles: ', updatedUser.roles);
  //         }
  //       }
  //     }
  //   }
  // };

  // fetchRolesAndUpdate(); // I don't need to add the "reader" role, it has no value since everyone has it by default
  // forget it and act as if every user is a "reader" and only check for session, if authed then they're a reader.
  // }, [assignRoles, getRoles, session.status, userEmail, pathname, router]);
  // }, [session.status, pathname, router]);

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
                <DropdownMenuItem className="flex flex-row gap-2">
                  <LayoutDashboard strokeWidth="1px" />
                  <div>حسابي</div>
                </DropdownMenuItem>
              </Link>
              <Link href={'/profile'} className="flex flex-row gap-2">
                <DropdownMenuItem className="flex flex-row gap-2">
                  <UserCircle strokeWidth="1px" />
                  <div>الصفحة الشخصية</div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="flex flex-row gap-2">
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

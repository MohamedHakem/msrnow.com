import BackButton from '@/components/shared/back-button';
import { ReactNode } from 'react';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import ForwardButton from '@/components/shared/forward-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (session === null) {
    console.log("redirecting to /login")
    redirect('/login')
  }

  return (
    // <div className="flex flex-col flex-auto gap-2 h-full mt-[-55px]">
    <div className="flex flex-col flex-auto gap-2 h-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col laptop:flex-row gap-2 laptop:gap-0 min-h-[calc(100dvh-88px)] transition-all duration-200 ease-in-out">
          <div className="laptop:border-l min-w-[200px] laptop:max-w-[200px] z-10">
            <DashboardSidebar />
          </div>
          <div className="flex flex-col flex-auto gap-4 laptop:gap-4 h-full laptop:pl-4 animate-fadeIn">
            <div className="flex flex-row gap-1 px-4 laptop:pl-4">
              <BackButton />
              <ForwardButton />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

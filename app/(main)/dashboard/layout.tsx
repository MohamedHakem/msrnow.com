import BackButton from '@/components/shared/back-button';
// import Link from 'next/link';
import { ReactNode } from 'react';
// import { suggestedCreations } from '@/data/static/marketplace';
// import AddNewButton from '@/components/shared/add-new-button';
// import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
// import { Sidebar } from '../components/navigation/sidebar';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import ForwardButton from '@/components/shared/forward-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';
import { AuthForm } from '@/components/shared/AuthForm';
import GrayBG from '@/components/logo/gray-ish-bg';
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  // console.log("DashboardLayout ~ session:", session)
  if (session === null) {
    console.log("redirecting to /login")
    redirect('/login')
  }

  return (
    <div className="flex flex-col flex-auto gap-2 h-full m-auto">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col laptop:flex-row gap-2 laptop:gap-0 min-h-[calc(100dvh-88px)] transition-all duration-200 ease-in-out">
          <div className="laptop:border-l min-w-[200px] laptop:max-w-[200px] z-10">
            <DashboardSidebar />
          </div>
          <div className="flex flex-col flex-auto gap-4 laptop:gap-8 h-full laptop:pl-4 animate-fadeIn pt-12 laptop:pt-0">
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

import BackButton from '@/components/shared/back-button';
import Link from 'next/link';
import { ReactNode } from 'react';
import { suggestedCreations } from '@/data/static/marketplace';
import AddNewButton from '@/components/shared/add-new-button';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar-last';
import { Sidebar } from '../components/navigation/sidebar';
import NewDashboardSidebar from '@/components/dashboard/dashboard-sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-auto gap-2 h-full m-auto">
      {/* <div className="flex flex-col w-full h-[calc(100vh-88px)]"> */}
      <div className="flex flex-col w-full h-full">
        {/* <div className="w-[100dvw] laptop:w-full border-b p-2"> */}
        {/* uncomment the below section, add icons, make it smaller, playful & colors */}

        {/* <div className="w-[100dvw] border-b pt-2">
          <ul className="flex flex-row gap-4 px-4 pb-2 focus:pb-3 overflow-x-auto [1680px]:justify-center">
            {suggestedCreations.map((s, i) => (
              <Link key={i} href={`/${s.url}`}>
                <li className="min-w-max bg-gray-100 rounded-lg p-2 font-semibold items-center">{s.title}</li>
              </Link>
            ))}
          </ul>
        </div> */}

        {/* <div className="grid grid-cols-1 gap-2 laptop:grid-cols-[200px_1fr] laptop:gap-0"> */}
        <div className="flex flex-col laptop:flex-row gap-2 laptop:gap-0 min-h-[calc(100dvh-88px)] transition-all duration-200 ease-in-out">
          <div className="laptop:border-l min-w-[200px] laptop:max-w-[200px]">
            {/* <DashboardSidebar /> */}
            <NewDashboardSidebar />
            {/* <Sidebar /> */}
            {/* <ul className="flex flex-row laptop:flex-col gap-4 h-full p-2 laptop:p-4 items-center overflow-x-auto">
              {DashboardSections.map((s, i) => (
                <Link key={i} href={`/${s.url}`} className="laptop:w-full">
                  <li className="min-w-max hover:bg-gray-100 rounded-md p-2 font-semibold">{s.title}</li>
                </Link>
              ))}
            </ul> */}
          </div>
          <div className="flex flex-col flex-auto gap-4 laptop:gap-8 h-full laptop:pl-4 animate-fadeIn">
            <div className="flex flex-row justify-between px-4 laptop:pl-4">
              <BackButton />
              {/* <AddNewButton /> */}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

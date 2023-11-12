import '@/app/globals.css';
import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google'
import AuthContext from '@/providers/AuthContext';
import ToasterContext from '@/providers/ToasterContext';
import { ThemeProvider } from '@/providers/theme-provider';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { Cairo } from 'next/font/google';
import { Header } from '@/components/navigation/header';
import { BottomNavbar } from '@/components/navigation/bottom-navbar';

const font = Cairo({
  subsets: ['arabic'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Msrnow.com',
  description: 'Msrnow.com Top News of the day'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className={`${font.className}  bg-white dark:bg-[#000]`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthContext>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <ToasterContext />
            <div dir="rtl" className="flex flex-col overflow-hidden">
              <div className="flex flex-col overflow-hidden">
                <Header />
                {/* <main className="grid grid-cols-[1fr] w-full relative overflow-x-hidden overflow-y-auto h-[calc(100vh-88px)] mt-[56px]"> */}
                {/* <main className="grid grid-cols-[1fr] w-full relative overflow-x-hidden overflow-y-auto h-screen mt-[64px]"> */}
                <main className="grid grid-cols-[1fr] w-full relative overflow-x-hidden overflow-y-auto h-[calc(100vh-96px)] mt-[64px]">
                  <section className="flex flex-row flex-auto">
                    <div className="flex flex-col flex-auto gap-2 m-auto h-full animate-fadeIn">
                      {children}
                    </div>
                  </section>
                </main>
                <BottomNavbar />
              </div>
            </div>
            <GoogleTagManager gtmId="GTM-MCQZ8JPF" />
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}

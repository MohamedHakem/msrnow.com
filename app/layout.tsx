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
import Footer from '@/components/marketplace/layout/footer';

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
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
        <AuthContext>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <ToasterContext />
          <div dir="rtl" className="flex flex-col overflow-hidden">
            <div className="flex flex-col overflow-hidden h-screen">
              <Header />
              <main className="flex flex-col w-full relative overflow-x-hidden overflow-y-auto h-[100vh]">
                <section className="flex flex-row">
                  <div className="flex flex-col gap-2 m-auto animate-fadeIn w-full">
                    {children}
                  </div>
                </section>
                <Footer />
              </main>
            </div>
          </div>
          <GoogleTagManager gtmId="GTM-MCQZ8JPF" />
        </AuthContext>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}

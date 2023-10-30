import AuthContext from '@/providers/AuthContext';
import ToasterContext from '@/providers/ToasterContext';
import { ThemeProvider } from '@/providers/theme-provider';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from 'next';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';
import './globals.css';
import { Cairo } from 'next/font/google';
// import { Suspense } from 'react';
// import Analytics from './analytics';
import { GoogleTagManager } from '@next/third-parties/google'


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
      {/* <body className={`${font.className} bg-white dark:bg-[#000]`}> */}
      <body className={`${font.className}  bg-white dark:bg-[#000]`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthContext>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <ToasterContext />
            {/* <Suspense>
              <Analytics />
            </Suspense> */}
            {children}
            <GoogleTagManager gtmId="GTM-MCQZ8JPF" />
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}

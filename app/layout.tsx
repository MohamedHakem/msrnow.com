import './globals.css';
import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import AuthContext from '@/components/providers/AuthContext';
import ToasterContext from '@/components/providers/ToasterContext';

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
      <body className={`${font.className} bg-white dark:bg-[#000]`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthContext>
            <ToasterContext />
            {children}
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}

import Footer from '@/components/marketplace/layout/footer';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>
        {/* <div className="w-full"> */}
        {/* <div className="mx-8 max-w-2xl py-20 sm:mx-auto"> */}
        {/* <div className="max-w-2xl sm:mx-auto"> */}
        {/* <Suspense>{children}</Suspense> */}
        {children}
        {/* </div> */}
        {/* </div> */}
        {/* <Footer /> */}
      </Suspense>
    </>
  );
}

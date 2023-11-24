import { ReactNode, Suspense } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://www.msrnow.com';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "مصر الان"
  },
  robots: {
    follow: true,
    index: true
  }
};

export default async function MarketplaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full m-auto pt-0 laptop:pt-4">
      <div className="w-full max-w-screen-2xl m-auto">
        <Suspense>
          <div className="mx-auto flex flex-col gap-8 pb-4 text-black dark:text-white md:flex-row">
            <div className="order-last h-full w-full md:order-none">{children}</div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}


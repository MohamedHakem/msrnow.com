import { ReactNode, Suspense } from 'react';

const { SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

export default async function MarketplaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full m-auto pt-4 bg-neutral-50">
      <div className="w-full max-w-screen-2xl m-auto pt-4">
        <Suspense>
          <div className="mx-auto flex flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
            <div className="order-last h-full w-full md:order-none">{children}</div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
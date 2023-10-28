import Navbar from '@/components/marketplace/layout/navbar';
import FilterList from '@/components/marketplace/layout/search/filter';
import { sorting } from '@/lib/marketplace/constants';
import { ReactNode, Suspense } from 'react';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
// const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
// const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

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
  // ...(twitterCreator &&
  //   twitterSite && {
  //     twitter: {
  //       card: 'summary_large_image',
  //       creator: twitterCreator,
  //       site: twitterSite
  //     }
  //   })
};

export default async function MarketplaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full m-auto pt-4 bg-neutral-50">
    <div className="w-full max-w-6xl m-auto pt-4">
      {/* <Navbar /> */}
      <Suspense>
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
          {/* <div className="order-first w-full flex-none md:max-w-[125px]">
            <Collections />
          </div> */}
          {/* <div className="order-last min-h-screen w-full md:order-none">{children}</div> */}
          <div className="order-last h-full w-full md:order-none">{children}</div>
          {/* <main className="pt-4">{children}</main> */}
          {/* <div className="order-none flex-none md:order-last md:w-[125px]">
            <FilterList list={sorting} title="Sort by" />
          </div> */}
        </div>
      </Suspense>
    </div>
    </div>
  );
}


{/* <Suspense>
  <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
    <div className="order-first w-full flex-none md:max-w-[125px]">
      <Collections />
    </div>
    <div className="order-last min-h-screen w-full md:order-none">{children}</div>
    <div className="order-none flex-none md:order-last md:w-[125px]">
      <FilterList list={sorting} title="Sort by" />
    </div>
  </div>
</Suspense> */}
import { ReactNode, Suspense } from 'react';

// const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
//   ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
//   : 'http://localhost:3000';

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
    // <div className="w-full h-full m-auto pt-4 bg-neutral-50">
    <div className="w-full h-full m-auto pt-0 laptop:pt-4">
      <div className="w-full max-w-screen-2xl m-auto">
        <Suspense>
          {/* <div className="mx-auto flex flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row"> // remove px-4 from here, put it in a lower level */}
          <div className="mx-auto flex flex-col gap-8 pb-4 text-black dark:text-white md:flex-row"> 
            <div className="order-last h-full w-full md:order-none">{children}</div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}


// import Footer from '@/components/marketplace/layout/footer';
// import Collections from '@/components/marketplace/layout/search/collections';
// import FilterList from '@/components/marketplace/layout/search/filter';
// import { sorting } from '@/lib/marketplace/constants';
// import { Suspense } from 'react';

// export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <Suspense>
//       <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
//         <div className="order-first w-full flex-none md:max-w-[125px]">
//           <Collections />
//         </div>
//         <div className="order-last min-h-screen w-full md:order-none">{children}</div>
//         <div className="order-none flex-none md:order-last md:w-[125px]">
//           <FilterList list={sorting} title="Sort by" />
//         </div>
//       </div>
//       <Footer />
//     </Suspense>
//   );
// }




///////////////////////////////////////////////////
// export default function SearchLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <Suspense>
//       <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
//         <div className="order-first w-full flex-none md:max-w-[150px]">
//           <Collections />
//         </div>
//         <div className="order-last min-h-screen w-full md:order-none">{children}</div>
//         <div className="order-none flex-none md:order-last md:w-[150px]">
//           <FilterList list={sorting} title="Sort by" />
//         </div>
//       </div>
//       <Footer />
//     </Suspense>
//   );
// }
///////////////////////////////////////////////////



// // import Footer from '@/components/marketplace/layout/footer';
// import Collections from '@/components/marketplace/layout/search/collections';
// import FilterList from '@/components/marketplace/layout/search/filter';
// import { sorting } from '@/lib/marketplace/constants';
// import { Suspense } from 'react';

// export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <Suspense>
//       <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
//         <div className="order-first w-full flex-none md:max-w-[125px]">
//           <Collections />
//         </div>
//         <div className="order-last min-h-screen w-full md:order-none">{children}</div>
//         <div className="order-none flex-none md:order-last md:w-[125px]">
//           <FilterList list={sorting} title="Sort by" />
//         </div>
//       </div>
//     </Suspense>
//   );
// }
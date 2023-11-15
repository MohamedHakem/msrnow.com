import Link from 'next/link';

// import FooterMenu from '@/components/marketplace/layout/footer-menu';
import LogoSquare from '@/components/marketplace/logo-square';
// import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  // const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer dir="rtl" className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} كل الحقوق محفوظة.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-r border-neutral-400 md:inline-block" />
          <p>صنع في الارض</p>
          <hr className="mx-4 hidden h-4 w-[1px] border-r border-neutral-400 md:inline-block" />
          <a
            className="flex my-1 h-8 w-max flex-none items-center justify-center rounded-md border bg-[#2563eb] text-xs dark:border-neutral-700 text-white"
            aria-label="تحدث الي صفحة مصر الان"
            href="https://fb.com/msrnowcom"
            target={'_blank'}
          >
            <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
            <span className="px-3">كلمنا</span>
          </a>
          <p className="md:mr-auto">
            <a href="https://www.msrnow.com" className="text-black dark:text-white">
              مصر الآن
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import { MobileNav } from '@/components/navigation/mobile-nav';
import MsrnowSVGLogo from '@/components/logo/msrnow-svg-logo';

const sections = [
  { title: 'أخبار', url: '' },
  { title: 'رياضة', url: 'sports' },
  { title: 'فيديو', url: 'videos' },
  { title: 'أكلات', url: 'food' },
  { title: 'بيع واشتري ببلاش', url: 'marketplace' }
];

export const Navbar = () => {
  return (
    <header className="flex flex-row px-4 w-full z-50">
      <div className="flex flex-row items-center w-full max-w-6xl m-auto animate-fadeIn transition-all duration-50 ease-in-out">
        <div className="flex items-center gap-x-3 w-[36px] animate-fadeIn">
          <MobileNav />
        </div>
        <div className="hidden md:flex flex-auto flex-row justify-center m-auto animate-fadeIn">
          {sections.map((s) => (
            <Link
              key={s.title}
              href={`/${s.url}`}
              className="text-lg font-bold px-4 py-2 rounded-md hover:bg-gray-50 hover:text-red-500 active:scale-90 transition-all duration-50 ease-in-out animate-fadeIn"
            >
              <span className="animate-fadeIn">{s.title}</span>
            </Link>
          ))}
        </div>
        {/* <div className="flex w-[170px] h-[30px] laptop:h-[45px] m-auto animate-fadeIn"> */}
        <div className="flex w-auto h-[30px] laptop:h-[45px] m-auto animate-fadeIn">
          <Link href="/" className="mr-[-20px] md:mr-0">
            <MsrnowSVGLogo />
          </Link>
        </div>
      </div>
    </header>
  );
};

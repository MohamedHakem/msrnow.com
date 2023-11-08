import { Home, Menu, Newspaper, Store, TrendingUp } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from '@/app/(main)/components/navigation/sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

export const MobileNav = () => {
  // const items = ['الرئيسية', 'أخبار مصر', 'رياضة', 'أخبار محلية', 'فن ومشاهير', 'مال وأعمال', 'خارج الحدود', 'سياسة'];
  const items = [
    { title: 'الرئيسية', url: "/" },
    { title: 'بيع واشتري أي حاجة مجانا`', url: "/marketplace" },
    { title: 'الكورة', url: "/news/sports" },
    { title: 'أهم عناوين الأخبار', url: "/news/top-headlines" },
    { title: 'أخر الأخبار', url: "/news/latest" },
    { title: 'أخبار مصر', url: "/news/egypt" },
    { title: "أخبار العالم", url: "/news/world" },
    { title: 'أخبار سياسية', url: "/news/politics" },
    { title: 'مال وأعمال', url: "/news/finance" },
    { title: 'أخبار الفن', url: "/news/arts" },
    { title: 'أخبار الأفلام', url: "/news/movies-news" },
    { title: 'أخبار المشاهير', url: "/news/celebrities" },
    { title: 'أخبار الطاقة', url: "/news/energy-news" },
    { title: 'أخبار القاهرة', url: "/news/cairo" },
    // { title: 'أخبار محلية - الجيزة', url: "/news/giza" },
    // { title: 'أخبار محلية - الفيوم', url: "/news/faiyum" },
    // { title: 'أخبار محلية - بلبيس', url: "/news/belbes" },
  ];

  return (
    <Sheet >
      <SheetTrigger>
        <Menu size={30} color="#a9a9a9" className="block"></Menu>
      </SheetTrigger>
      <SheetContent className="w-full">
        <ScrollArea dir="rtl" className="w-4">
          <div className="space-y-4 py-4 justify-between">
            <div className="pl-3 py-2">
              <h2 className="mb-2 px-4 text-2xl font-semibold tracking-tight">أكتشف</h2>
              <div className="flex flex-col gap-1">
                {items.map((item, i) => (
                  <SheetClose key={i} asChild>
                    <Link href={`${item.url}`}>
                      <Button variant="ghost" className="w-full flex flex-row gap-1 text-lg justify-start">
                        {i === 0 ? <Home /> : i === 1 ? <Store /> : i === 2 ? null : <Newspaper />}
                        <span>{i === 2 ? `⚽ ${item.title}` : `${item.title}`}</span>
                      </Button>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

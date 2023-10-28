import { Home, Menu } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from '@/app/(main)/components/navigation/sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

export const MobileNav = () => {
  const items = ['الرئيسية', 'أخبار مصر', 'رياضة', 'أخبار محلية', 'فن ومشاهير', 'مال وأعمال', 'خارج الحدود', 'سياسة'];

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
                    <Link href="/">
                      <Button variant="ghost" className="w-full flex flex-row gap-1 text-lg justify-start">
                        <Home />
                        <span>{item}</span>
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

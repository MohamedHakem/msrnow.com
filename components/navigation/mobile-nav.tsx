import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from '@/components/navigation/sidebar';

export const MobileNav = () => {
  return (
      <Sheet>
        <SheetTrigger>
          <Menu size={30} color="#a9a9a9" className="block"></Menu>
        </SheetTrigger>
        <SheetContent className="w-full">
          <Sidebar />
        </SheetContent>
      </Sheet>
  );
};

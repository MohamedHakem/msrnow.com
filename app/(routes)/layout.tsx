import { BottomNavbar } from '@/components/navigation/bottom-navbar';
import { Header } from '@/components/navigation/header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return (
    <div dir="rtl" className="flex flex-col overflow-hidden">
      <div className="flex flex-col overflow-hidden">
        <Header />
        <main className="grid grid-cols-[1fr] w-full relative overflow-x-hidden overflow-y-auto h-[calc(100vh-88px)]">
          <section className="flex flex-row flex-auto">
            <div className="flex flex-col flex-auto gap-2 m-auto h-full animate-fadeIn">
              {children}
            </div>
          </section>
        </main>
        <BottomNavbar />
      </div>
    </div>
  );
}

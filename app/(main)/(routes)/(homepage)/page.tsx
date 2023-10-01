import AdSection from '@/components/ad-section';
import FeaturedArea from '@/components/homepage/featured-area';
import Section from '@/components/homepage/section';
import { db } from '@/lib/db';
// import PromoteSidebar from '@/components/promote-sidebar';

export default async function Page() {
  // imitate delay // await new Promise((resolve) => setTimeout(resolve, 5000));
  const sectionNames = await db.category.findMany({ select: { name: true, name_ar: true } });

  return (
    <div className="flex flex-col w-full max-w-6xl m-auto gap-4 pt-0 pb-10 md:py-12 laptop:pt-4 container:px-0 scroll-m-0">
      <div className="flex flex-col flex-auto gap-8 items-center">
        <FeaturedArea />
        <AdSection size={'large'} />
        {sectionNames.map((section, i) => (
          <Section key={i} categoryName={section.name} categoryNameAr={section.name_ar} />
        ))}
      </div>
    </div>
  );
}

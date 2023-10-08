import AdSection from '@/components/news/ad-section';
import FeaturedArea from '@/components/news/homepage/featured-area';
import Section from '@/components/news/homepage/section';
import { homepageSections } from '@/data/static/49-categories-for-homepage';

// export const runtime = 'edge';
// const dynamic = 'force-dynamic';
export const revalidate = 300

export default async function Page() {
  return (
    <div className="flex flex-col w-full max-w-6xl m-auto gap-4 pt-0 pb-10 md:py-12 laptop:pt-4 container:px-0 scroll-m-0">
      <div className="flex flex-col flex-auto gap-8 items-center">
        <FeaturedArea />
        <AdSection size={'large'} />
        {homepageSections.map((section, i) => (
          <Section
            key={i}
            categoryName={section.name}
            categoryNameAr={section.name_ar}
            parent_category_id={section.parent_category_id}
          />
        ))}
      </div>
    </div>
  );
}

// imitate delay // await new Promise((resolve) => setTimeout(resolve, 5000));
// const sectionNames = await db.category.findMany({
//   select: { name: true, name_ar: true, parent_category_id: true }
// });

import FeaturedArea from '@/components/homepage/featured-area';
import Section from '@/components/homepage/section';
// import PromoteSidebar from '@/components/promote-sidebar';

const sections = ['أخر الأخبار', 'رائج الان', 'أخبار مصر'];
export default async function Page() {
  // imitate delay
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div className="flex flex-col w-full max-w-6xl m-auto gap-4 pt-0 pb-10 md:py-12 laptop:pt-4 container:px-0 scroll-m-0">
      <div className="flex flex-col flex-auto gap-8 items-center">
        <FeaturedArea />
        <Section category={'ad-section'} />
        {sections.map((section, i) => (
          <div key={i}>
            <Section category={section} />
            <Section category={'ad-section'} />
          </div>
        ))}
      </div>
    </div>
  );
}


import FeaturedArea from '@/components/news/homepage/featured-area';
import Section from '@/components/news/homepage/section';
import { homepageSections } from '@/data/static/49-categories-for-homepage';
import { Suspense } from 'react';

export const revalidate = 300

export const metadata = {
  title: 'مصر الآن | الأخبار',
  description: 'مصر الآن | الأخبار',
  openGraph: {
    title: 'مصر الآن | الأخبار',
    description: 'مصر الآن | الأخبار',
    locale: "ar, EG",
    siteName: "مصر الآن",
    url: "https://www.msrnow.com",
    countryName: "ُمصر",
  },
};

export default async function Page() {
  const newsHomepageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Webpage",
    name: "أخبار مصر | موقع مصرالان",
    description: "أخبار مصر | موقع مصرالان",
    inLanguage: "ar",
    author: {
      "@type": "Organization",
      name: "مصرالان"
    },
    image: "https://www.msrnow.com/images/msrnow-waitin-logo.jpg",
    url: "https://www.msrnow.com"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(newsHomepageJsonLd)
        }}
      />
      <div className="flex flex-col w-full max-w-6xl m-auto gap-4 pt-0 pb-10 md:py-12 
                      laptop:pt-4 container:px-0 scroll-m-0 animate-fadeIn"
      >
        <div className="flex flex-col flex-auto gap-8 items-center">
          <FeaturedArea />
          {homepageSections.map((section, i) => (
            <Suspense key={i} fallback={<div>loading a section...</div>}>
              <Section
                categoryName={section.name}
                categoryNameAr={section.name_ar}
                parent_category_id={section.parent_category_id}
              />
            </Suspense>
          ))}
        </div>
      </div>
    </>
  );
}

// imitate delay // await new Promise((resolve) => setTimeout(resolve, 5000));
// const sectionNames = await db.category.findMany({
//   select: { name: true, name_ar: true, parent_category_id: true }
// });

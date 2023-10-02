/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import {
  getLatestArticles,
  getLatestCategoryArticles,
  getMostViewedArticles,
  getTopHeadlineArticles
} from '@/data/getArticles';
import { getLocalArabicFromTimestamp as getTimeAgo } from '@/utils/convertTimestampToCustomLocalArabicTime';
import NextImage from '../NextImage';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import AdSection from '../ad-section';
import getEnglishCategoryName from '@/utils/getEnglishCategoryName';

type newsType = {
  title: string;
  slug: string;
  google_thumb: string;
  article_google_url: string;
  article_source_url: string | null;
  likes: number | null;
  shares: number | null;
  short_slug: string;
  published_at: Date;
};

type topHeadlineType = {
  title: string;
  google_thumb: string;
  views: number | null;
  likes: number | null;
  short_slug: string;
  published_at: Date;
};

export default async function Section({
  categoryName,
  categoryNameAr,
  parent_category_id
}: {
  categoryName: string;
  categoryNameAr: string | undefined | null;
  parent_category_id: number | null;
}) {
  let news: newsType[] | topHeadlineType[] | null = null;
  // const categoryInEnglish = getEnglishCategoryName(category);
  // const categoryInEnglish = categoryName;

  // } else if (categoryName === 'رائج الان') { // this should be in a side box
  //   news = await getMostViewedArticles(6);
  // } else if (categoryName === 'أخر الأخبار') { // this should be in a side box
  //   news = await getLatestArticles(6);

  if (categoryName === 'top-headline') {
    return;
  } else {
    news = await getLatestCategoryArticles(categoryName, 6, !parent_category_id).then((res) => res[0].articles);
  }

  if (!news || news.length < 6) return null;

  return (
    <>
      <section className="flex flex-col w-full gap-4 px-4 container:px-0">
        <h2 className="w-full text-4xl font-bold">{categoryNameAr}</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-2">
          <div className="h-full pb-4 lg:col-span-2">
            <div className="w-full overflow-hidden rounded-lg">
              {/* <ul className="divide-y divide-gray-100"> */}
              <ul>
                {news.map((article, i) => (
                  <li key={i} className="flex flex-row py-2">
                    {/* <div className="w-1/2 md:w-1/3"> */}
                    {/* <div className="w-1/2 md:w-[280px] h-[168px]"> */}
                    <Link href={`/news/${article.short_slug}`} className="flex flex-row gap-3 md:gap-4 w-full">
                      <div className="w-1/2 tablet:min-w-[280px] tablet:max-w-[280px] h-fit border bg-gray-100 laptop:min-h-[168px] max-h-[168px] overflow-hidden">
                        <NextImage article={article} width={null} index={3} />
                        {/* <img src={article.google_thumb} className="h-full w-full rounded-lg object-cover" alt="" /> */}
                      </div>
                      <div className="flex-col w-1/2 tablet:w-auto">
                        <h4 className="text-sm md:text-lg laptop:text-xl font-bold text-gray-900 leading-5 hover:text-red-500">
                          {article.title}
                        </h4>
                        <div className="mt-1 text-xs text-gray-400">
                          {/* <span>Business</span> •  */}
                          <time>{getTimeAgo(article.published_at, false, true)}</time>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                {categoryName === 'egypt' ? (
                  <div className="p-2 border rounded-xl">
                    <ul className="flex flex-row gap-1 justify-between">
                      <li className="p-2 pl-0 border text-sm rounded-lg hover:bg-gray-50 active:scale-95 transition-all duration-200 ease-in-out">
                        <Link href={`/news/${categoryName}`} className="flex flex-row md:gap-4 w-full items-center">
                          <span className=""> أهم أخبار مصر</span>
                          <ChevronLeft size={20} className="h-auto" />
                        </Link>
                      </li>
                      <li className="p-2 pl-0 border text-sm rounded-lg hover:bg-gray-50 active:scale-95 transition-all duration-200 ease-in-out">
                        <Link href={`/news/${categoryName}`} className="flex flex-row md:gap-4 w-full items-center">
                          <span className=""> أخر أخبار مصر</span>
                          <ChevronLeft size={20} className="h-auto" />
                        </Link>
                      </li>
                      <li className="p-2 pl-0 border text-sm rounded-lg hover:bg-gray-50 active:scale-95 transition-all duration-200 ease-in-out">
                        <Link href={`/news/${categoryName}`} className="flex flex-row md:gap-4 w-full items-center">
                          <span className=""> الأعلي مشاهدة</span>
                          <ChevronLeft size={20} className="h-auto" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : null}
                <div className="">
                  <Link href={`/news/${categoryName}`}>
                    <div
                      className="flex flex-row justify-between items-center p-6 py-4 border rounded-xl text-xl hover:bg-gray-50 
                  active:scale-95 transition-all duration-200 ease-in-out"
                    >
                      شاهد المزيد من {categoryNameAr}
                      <ChevronLeft />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="h-32 md:h-40 laptop:h-80 sticky top-8 rounded-md bg-gray-50"></div>
        </div>
      </section>
      <AdSection size={'large'} />
    </>
  );
}

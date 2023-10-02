import Link from 'next/link';
import { getLatestCategoryArticles } from '@/data/getArticles';
import NextImage from '@/components/news/NextImage';
import { getLocalArabicFromTimestamp as getTimeAgo } from '@/utils/convertTimestampToCustomLocalArabicTime';
import AdSection from '@/components/news/ad-section';

export default async function EgyptNewsPage() {
  console.time('getLatestCategoryArticles');
  const news = await getLatestCategoryArticles('egypt', 30).then((res) => res[0].articles);
  console.timeEnd('getLatestCategoryArticles');
  console.log('inside EgyptNewsPage');
  if (!news) return null;

  return (
    <div className="flex flex-col gap-4 py-8 px-4">
      <h1 className="text-3xl font-bold animate-fadeIn">أخبار مصر</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-full pb-4 lg:col-span-2">
          <div className="w-full overflow-hidden rounded-lg">
            <ul>
              {news.map((article, i) => (
                <li key={i} className="flex flex-col py-2 animate-fadeIn">
                  <Link href={`/news/${article.short_slug}`} className="flex flex-row gap-3 md:gap-4 w-full">
                    <div className="w-1/2 md:w-[280px] h-fit animate-fadeIn">
                      <NextImage article={article} width={null} index={null} />
                    </div>
                    <div className="flex-col w-1/2 md:w-2/3">
                      <h4 className="text-sm md:text-lg laptop:text-xl font-bold text-gray-900 leading-5 hover:text-red-500 animate-fadeIn">
                        {article.title}
                      </h4>
                      <div className="mt-1 text-xs text-gray-400">
                        <time>{getTimeAgo(article.published_at, false, true)}</time>
                      </div>
                    </div>
                  </Link>
                  {i >= 4 && i % 6 === 0 ? <AdSection size={'medium'} /> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-32 md:h-40 laptop:h-80 sticky top-8 rounded-md bg-gray-50"></div>
      </div>
    </div>
  );
}

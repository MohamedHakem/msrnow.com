import Image from 'next/image';
import Link from 'next/link';
import { getTopHeadlineArticles } from '@/data/getArticles';
import NextImage from '@/components/news/NextImage';
import AdSection from '../ad-section';
import LocalDatetime from '@/components/shared/localedateTime';

export const revalidate = 300

export default async function FeaturedArea() {
  const articles = await getTopHeadlineArticles(9);

  if (articles.length === 0) {
    return null
  }

  const latestArticle = articles[0];
  // const width = 768;
  const width = 733;
  const height = 460;
  // const imgUrl = latestArticle.google_thumb.replace(/=s0-w\d+/, `=s0-w${1024}`).replace(/-h\d+/, `-h${614}`);
  const imgUrl = latestArticle.google_thumb.replace(/=s0-w\d+/, `=s0-w${width}`).replace(/-h\d+/, `-h${height}`);
  // const optimizedFeaturedImg = `https://imagecdn.app/v2/image/${imgUrl}?width=${width}&height=${height}`
  const optimizedFeaturedImg = `https://wsrv.nl/?url=${imgUrl}&default=${imgUrl}&l=9&af=''&il=''&n=-1&w=${width}&h=${height}&output=webp`

  return (
    <>
      <section dir="rtl" className="grid grid-cols-1 gap-4 laptop:grid-cols-3 laptop:gap-2 w-full h-auto">
        {/* <div className="grid laptop:col-span-2 gap-4 md:gap-6 laptop:gap-10 h-fit"> */}
        <div className="grid laptop:col-span-2 gap-4 md:gap-6 laptop:gap-10 h-fit max-w-[765px]">
          <div className="flex flex-col w-full">
            <Link href={`/news/${latestArticle.short_slug}`}>
              <figure className="relative overflow-hidden w-full h-fit laptop:h-auto">
                <Image
                  unoptimized
                  src={optimizedFeaturedImg}
                  alt={latestArticle.title}
                  width={1024}
                  height={614}
                  priority={true}
                  className={`min-w-full md:px-4 h-48 md:h-72 laptop:h-[460px] laptop:max-w-[765px]`}
                />
              </figure>
              <div>
                <p className="pt-2 pb-2 px-4 text-[22px] md:text-3xl laptop:text-3xl font-extrabold md:leading-[48px] hover:text-red-500">
                  {latestArticle.title}
                </p>
                <div className="pr-4">
                  <LocalDatetime date={latestArticle.published_at} showTimeAgo={true} />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4 mobilemd:px-4">
            {articles.slice(1, 3).map((a, i) => (
              <Link
                key={i}
                href={`/news/${a.short_slug}`}
                className="flex flex-col w-full mobilemd:flex-row md:w-1/2 md:flex-col gap-3 md:gap-0"
              >
                <div className="w-full mobilemd:w-1/2 md:w-full">
                  <NextImage article={a} width={width / 2} index={i} />
                </div>
                <div className="flex flex-col w-full mobilemd:w-1/2 md:w-full px-4 mobilemd:px-0">
                  <p className="md:pt-2 pb-0 text-[14px] md:text-[22px] font-bold hover:text-red-500">{a.title}</p>
                  <LocalDatetime date={a.published_at} showTimeAgo={true} />
                </div>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-2 md:gap-4 px-4 h-fit">
            {articles.slice(3, 6).map((a, i) => (
              <Link
                href={`/news/${a.short_slug}`}
                key={i}
                className="flex flex-row w-full tablet:flex-col gap-3 tablet:gap-0"
              >
                <div className="w-2/5 tablet:w-full overflow-hidden rounded-sm">
                  <NextImage article={a} width={width / 3} index={i} loading={"eager"} />
                </div>
                <div className="flex flex-col w-3/5 tablet:w-full">
                  <p className="flex items-center tablet:pt-2 text-[14px] line-clamp-3 tablet:text-xl font-bold hover:text-red-500">
                    {a.title}
                  </p>
                  <LocalDatetime date={a.published_at} showTimeAgo={true} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="p-4 laptop:col-span-1 container:pl-0 mt-2">
          <div className="flex flex-col gap-2 border-2 border-black p-4">
            <h2 className="text-3xl font-bold -mt-9 bg-white w-fit px-2 ">أهم العناوين</h2>
            <div className="grid grid-cols-1 laptop:divide-y-2 laptop:divide-gray-100 tablet:grid-cols-2 laptop:grid-cols-1 gap-2 tablet:gap-4 tablet:min-w-[180px] desktop:min-w-[220px]">
              {articles.slice(6).map((a, i) => (
                <Link
                  href={`/news/${a.short_slug}`}
                  key={i}
                  className="flex flex-row w-full tablet:flex-col pt-4 gap-3 tablet:gap-0"
                >
                  <div className="w-2/5 tablet:w-full overflow-hidden rounded-sm">
                    <NextImage article={a} width={width / 2} index={i} loading={"eager"} />
                  </div>
                  <div className="w-3/5 tablet:w-full">
                    <p className="flex items-center tablet:pt-2 text-[14px] line-clamp-3 tablet:text-xl font-bold hover:text-red-500">
                      {a.title.toString()}
                    </p>
                    <LocalDatetime date={a.published_at} showTimeAgo={true} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <AdSection size={'large'} />
    </>
  );
}

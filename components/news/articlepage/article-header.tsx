import { Suspense } from 'react';
import ViewCounter from '@/components/news/view-counter';
import Image from 'next/image';
import { singleArticleType } from '@/types';
import { getLocalArabicFromTimestamp as getTimeAgo } from '@/utils/convertTimestampToCustomLocalArabicTime';
import LocalDatetime from '@/components/shared/localedateTime';


export default async function ArticleHeader({ article }: { article: singleArticleType }) {
  const width = 650;
  const height = 390;
  const imgUrl = article.google_thumb.replace(/=s0-w\d+/, `=s0-w${width}`).replace(/-h\d+/, `-h${height}`);
  const optimizedImgUrl = `https://imagecdn.app/v2/image/${imgUrl}?width=${width}&height=${height}`

  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      {console.time('ArticleHeader') as React.ReactNode}

      <Suspense fallback={<div className="w-full h-24 bg-gray-100 animate-pulse"></div>}>
        <h1 className="text-3xl font-bold leading-[48px] animate-fadeIn">{article.title}</h1>
      </Suspense>
      <div className="flex justify-between">
        <LocalDatetime date={article.published_at} />
        <Suspense fallback={<div className="w-14 h-5 bg-gray-100 animate-pulse"></div>}>
          <ViewCounter slug={article.slug} />
        </Suspense>

      </div>
      <Suspense fallback={<div className="h-[390px] w-full bg-gray-100 animate-pulse"></div>}>
        <Image
          unoptimized
          // src={imgUrl}
          src={optimizedImgUrl}
          width={width}
          height={height}
          alt={article.title}
          className="animate-fadeIn"
          priority={true}
        />
      </Suspense>
      {console.timeEnd('ArticleHeader') as React.ReactNode}
    </div>
  );
}

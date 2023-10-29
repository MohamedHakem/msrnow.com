import getArticle from '@/data/getArticle';
import { Suspense } from 'react';
// import SingleArticleSkeleton from '@/components/skeletons/single-article-skeleton';
import RelatedTimeline from '@/components/news/articlepage/related-timeline';
import ArticleSettingSidebar from '@/components/news/articlepage/article-settings-sidebar';
import ArticleHeader from '@/components/news/articlepage/article-header';
import IncrementViewCounter from '@/components/news/increment-view-counter';
import ArticleBody from '@/components/news/articlepage/article-body';
import { notFound } from 'next/navigation';

export const revalidate = 'force-cache';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  console.log('[ArticlePage] slug:', decodeURIComponent(slug));

  let article = await getArticle(decodeURIComponent(params.slug));
  if (article === null) {
    console.log('[ArticlePage] article === null is true');
    // return <SingleArticleSkeleton />;
    return notFound()
  }

  // console.log("article.published_at: ", article.published_at)

  const articleCanonicalURL = `https://www.msrnow.com/news/${article.slug}`
  // console.log("🚀 articleCanonicalURL:", articleCanonicalURL)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleCanonicalURL
    },
    headline: article.title,
    description: article.description,
    image: article.google_thumb,
    datePublished: article.published_at,
    dateModified: article.published_at,
    publisher:
    {
      "@type": "Organization",
      name: article.source.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd)
        }}
      />
      <div className="flex flex-col w-full max-w-6xl m-auto desktop:flex-row rounded-md gap-4 py-10 px-4 container:px-0 scroll-m-0">
        {console.time('Article Page') as React.ReactNode}
        <div
          dir="rtl"
          className="flex flex-col flex-auto laptop:flex-row w-full items-center transition-all duration-200 ease-in-out"
        >
          <IncrementViewCounter slug={article.slug} />
          <div className="flex flex-col laptop:flex-row justify-between flex-auto">
            <div className="flex flex-col laptop:w-2/3 desktop:flex-auto max-w-[650px] gap-4">
              <ArticleHeader article={article} />
              <ArticleSettingSidebar />
              <div className="flex flex-col gap-2 w-full h-auto rounded-md py-4 mx-auto">
                <Suspense
                  fallback={
                    <div className="w-full h-[500px] p-4 mx-auto bg-gray-200 animate-pulse border flex flex-row justify-center items-center text-2xl text-gray-800">
                      جاري التحقق من الخبر
                    </div>
                  }
                >
                  <ArticleBody article={article} />
                </Suspense>
              </div>
            </div>
            <div className="flex flex-col w-[calc(100dvh - 34px)] laptop:w-1/3 laptop:h-[1200px]">
              <Suspense fallback={<div className="w-full h-screen p-4 mx-auto bg-gray-200 animate-pulse"></div>}>
                <RelatedTimeline
                  related_coverage_url={article.related_coverage_url}
                  related_coverage_article={article.related_coverage_article}
                  related_coverage_tweets={article.related_coverage_tweets}
                  short_slug={article.short_slug}
                  categoryId={article.categoryId}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {console.timeEnd('Article Page') as React.ReactNode}
      </div>
    </>
  );
}

// imitate delay // await new Promise((resolve) => setTimeout(resolve, 50000));

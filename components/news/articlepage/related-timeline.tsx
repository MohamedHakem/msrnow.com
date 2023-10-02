import ScrapeRelatedArticles from '@/utils/scrapeRelatedNews';
import Timeline from '@/components/news/timeline';
import { relatedArticleType } from '@/types';
import { getRelatedArticles } from '@/data/getArticles';

export default async function RelatedTimeline({
  related_coverage_url,
  related_coverage_article,
  related_coverage_tweets,
  short_slug,
  categoryId
}: {
  related_coverage_url: string | null;
  related_coverage_article: string | null;
  related_coverage_tweets: string | null;
  short_slug: string;
  categoryId: number;
}) {
  // imitate delay
  // await new Promise((resolve) => setTimeout(resolve, 13000));

  console.log("RelatedTimeline rendered!");

  let relatedArticles: relatedArticleType[] = [];
  let relatedTweets: string[] | null = [];

  // const Is_fetch_related_tweets = process.env.is_fetch_related_tweets === 'false' ? false : true;
  const Is_fetch_related_tweets = false;
  console.log('🚀 ~ file: related-timeline.tsx:25 ~ Is_fetch_related_tweets:', Is_fetch_related_tweets);

  related_coverage_article === null
    ? console.log('related_coverage_article is null. Exiting RelatedTimeline')
    : related_coverage_article === ''
    ? console.log("related_coverage_article is '' ")
    : null;

  // SCRAPE IF you don't have the related_coverage_article and you have related_coverage_url

  // if related_coverage_article is null or empty (there are no related articles in the db for this article)
  if (related_coverage_article == '' || related_coverage_article == null) {
    // scrape them, if possible
    if (related_coverage_url) {
      console.log('related_coverage_url exist, but related_coverage_article is empty, ScrapeRelatedArticles...');
      console.log('[START] ScrapeRelatedArticles...');
      console.time('[TIME] ScrapeRelatedArticles');
      relatedArticles = await ScrapeRelatedArticles(related_coverage_url, short_slug, categoryId);
      console.timeEnd('[TIME] ScrapeRelatedArticles');
      console.log('relatedArticles[0]: ', relatedArticles[0]);
      console.log('[FINISH] ScrapeRelatedArticles');
      relatedTweets = Is_fetch_related_tweets
        ? relatedArticles[0].related_coverage_tweets
          ? relatedArticles[0].related_coverage_tweets.split(',')
          : null
        : null;
    } else {
      // they can't be scraped
      return null;
    }
  } else {
    // related_coverage_article exists (there are related articles in the db for this article), get them from db
    console.log('[START] getRelatedArticles from db...');
    console.time('[TIME] getRelatedArticles from db');
    const relatedArticleFromDb = await getRelatedArticles(related_coverage_article.split(','));
    console.timeEnd('[TIME] getRelatedArticles from db');
    console.log('[FINISH] getRelatedArticles from db...');
    // if db returned them successfully
    if (relatedArticleFromDb) {
      relatedArticles = relatedArticleFromDb.filter(
        (a) => relatedArticleFromDb[0].published_at.getMonth() === a.published_at.getMonth()
      );
      relatedTweets = Is_fetch_related_tweets
        ? relatedArticles[0].related_coverage_tweets
          ? relatedArticles[0].related_coverage_tweets.split(',')
          : related_coverage_tweets
          ? related_coverage_tweets.split(',')
          : null
        : null;
      console.log('[Result] relatedArticles:', relatedArticles.length, ' relatedTweets: ', relatedTweets?.length || 0);
    } else {
      return null;
    }
  }

  if (relatedArticles.length > 0) {
    return <Timeline relatedTweets={relatedTweets} relatedArticles={relatedArticles} />;
  } else {
    return null;
  }
}

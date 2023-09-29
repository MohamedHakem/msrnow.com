import ArticleRendererSSR from '@/components/article-renderer-ssr';
import { singleArticleType } from '@/types';
import ScrapeArticleContent from '@/utils/scrapeArticleContent';

export default async function ArticleBody({ article }: { article: singleArticleType }) {
  // imitate delay
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  // if article_source_url is empty/null/less-than-5-chars, go SCRAPE it and scrape the content
  if (article.article_source_url ? article.article_source_url.length < 5 : true) {
    console.log('[ArticlePage] article_source_url is empty, scrape it, content, keywords, description');
    const updatedArticle = await ScrapeArticleContent(article);
    article = updatedArticle ? updatedArticle : article;
  }

  return article.content ? (
    <ArticleRendererSSR html={article.content} />
  ) : (
    <iframe
      className="bg-gray-100 w-full h-[500px] border animate-fadeIn"
      src={article.article_source_url ? article.article_source_url : ''}
      width={'100%'}
      height={'500px'}
    />
  );
}

/* {article.content ? (
  <ArticleRendererSSR html={article.content} />
) : (
  <iframe
    className="bg-gray-100 w-full h-[500px]"
    src={article.article_source_url ? article.article_source_url : ''}
    width={'100%'}
    height={'500px'}
  />
)} */

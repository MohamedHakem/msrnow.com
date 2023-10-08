export type newArticlesType = {
  scraped_from: string;
  title: string;
  google_thumb: string | undefined;
  article_google_url: string;
  slug: string;
  published_at: string | undefined;
  sourceId: number;
  categoryId: number;
  short_slug: string;
}[];

export type singleArticleType = {
  title: string;
  slug: string;
  content: string | null;
  google_thumb: string;
  article_google_url: string;
  article_source_url: string | null;
  related_coverage_url: string | null;
  related_coverage_article: string | null;
  related_coverage_tweets: string | null;
  likes: number | null;
  shares: number | null;
  short_slug: string;
  published_at: Date;
  keywords: string | null;
  description: string | null;
  sourceId: number;
  categoryId: number;
};

export type relatedArticleType = {
  scraped_from: string;
  title: string;
  google_thumb: string;
  article_google_url: string;
  short_slug: string;
  slug: string;
  related_coverage_url: string | null;
  related_coverage_article: string | null;
  related_coverage_tweets: string | null;
  published_at: Date | number;
  categoryId: number;
  sourceId: number;
  likes: number | null;
  shares: number | null;
  article_source_url: string | null;
};

export type tweetsArrayType = {
  id: string;
  published_at: number;
};

export type timelineArrayType = relatedArticleType | tweetsArrayType;

export type sourceType = {
  id: number;
  name: string;
  url: string | null;
  scrapable: number | null;
  content_selector: string | null;
};

export type newsType = {
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

export type featuredArticleType = {
  title: string;
  google_thumb: string;
  views: number | null;
  likes: number | null;
  short_slug: string;
  published_at: Date;
};

export type currentCategory = {
  id: number;
  name: string;
  google_news_url: string;
  source: { id: number; name: string; url: null; scrapable: number; content_selector: string | null }[];
};

export type Category = {
  id: number;
  name: string;
  google_news_url: string;
};

export type articleType = {
  scraped_from: string;
  title: string;
  google_thumb: string | undefined;
  article_google_url: string;
  related_coverage_url: string;
  slug: string;
  published_at: string | undefined;
  sourceId: string | number;
  categoryId: number;
  short_slug: string;
  top_headline: boolean;
};

export type topHeadlineType = {
  title: string;
  google_thumb: string;
  views: number | null;
  likes: number | null;
  short_slug: string;
  published_at: Date;
};

export type updatedArticleType = {
  article_source_url: string;
  keywords: string | null | undefined;
  description: string | null | undefined;
  content: string | null | undefined;
};

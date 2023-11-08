import { NextRequest } from 'next/server';
import { getArticle } from '@/data/getArticle';

export const runtime = 'nodejs';
// export const fetchCache = 'force-no-store';

export async function GET(request: NextRequest, params: { params: { slug: string } }) {
  console.time('[Time] Scrape Article GET Route');

  const { slug } = params.params;
  if (!slug) {
    return new Response('slug is empty.', { status: 404 });
  }

  console.time('article');
  const article = await getArticle(decodeURIComponent(slug));
  console.log('GET ~ article:', article);
  console.timeEnd('article');

  if (!article) {
    return new Response('Article not found in db.', { status: 404 });
  }

  console.timeEnd('[Time] Scrape Article GET Route');
  return Response.json({ article });
}

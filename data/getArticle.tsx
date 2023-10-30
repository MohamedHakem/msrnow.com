import { db } from '@/lib/db';
import { cache } from 'react';

export const revalidate = 86400; // 1 day cache

// export default async function getArticle(slug: string) {
export const getArticle = cache(async (slug: string) => {
  slug = decodeURIComponent(slug);
  try {
    const article = await db.article.findUnique({
      where: {
        ...(slug.length < 5 ? { short_slug: slug } : { slug: slug })
      },
      include: { source: { select: { name: true } } }
    });

    return article;
  } catch (error) {
    console.log(`[getArticle] [Error] slug: ${slug}, error: ${error}`);
    return null;
  }
})

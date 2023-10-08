import { db } from '@/lib/db';
import { updatedArticleType } from '@/types';

export default async function UpdateArticle(data: updatedArticleType, slug: string): Promise<Boolean> {
  console.log('data: ', data);
  try {
    const updatedArticleRes = await db.article.update({
      where: {
        slug: slug
      },
      data: data
    });
    console.log('[updatedArticle()] updatedArticleRes: ', updatedArticleRes);
    return true;
  } catch (error: any) {
    console.log('FAILED updating article, prisma error code: ', error.code, '\n', 'full error', error);
    return false;
  }
}

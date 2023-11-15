import { db } from '@/lib/db';

export default async function getProduct(slug: string) {
  slug = decodeURIComponent(slug);
  try {
    const product = await db.product.findUnique({
      where: { ...(slug.length < 5 ? { id: parseInt(slug) } : { slug: slug }) },
      include: {
        images: {
          select: { url: true }
        },
        ProductSizes: {
          select: { name: true }
        },
        ProductColors: {
          select: { name: true, value: true }
        },
        reviews: { select: { review_text: true } },
        user: { 
          include: {
            Product: {
              select: {
                id: true
              }
            }
          }
        }
      }
    })
    return product
  } catch (e) {
    console.log("[getProduct] error: ", e)
    return null
  }
}


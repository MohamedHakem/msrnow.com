import { db } from '@/lib/db';
// import { marketplaceProductType } from '@/types';

// export default async function getProduct(id: number) {
export default async function getProduct(slug: string) {
  // console.log("[getProduct] id: ", id)
  slug = decodeURIComponent(slug);

  try {
    const product = await db.product.findUnique({
      where: { slug: slug },
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
        user: { select: { name: true, image: true, phone_number: true } }
      }
    })
    return product
  } catch (e) {
    console.log("[getProduct] error: ", e)
    return null
  }
}


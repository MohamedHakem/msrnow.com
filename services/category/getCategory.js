import prisma from "@/lib/prisma"

export default async function getCategory(id) {
  try {
    if (!id) {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          google_news_url: true,
          source: true,
        },
      })
      if (!categories) {
        return { success: false, categories }
      }
      return { success: true, categories }
    }
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    })

    if (!category) {
      return { success: false }
    }
    return { success: true, category }
  } catch (error) {
    console.log(`Error getting category {${id}}`)
  }
}

import prisma from "@/lib/prisma"

export default async function getCategory(by, id, name) {
  try {
    if (by === "homepage") {
      // get all categories ids
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
      })
      if (!categories) {
        return { success: false, categories }
      }
      return { success: true, categories }
    }
    if (!id && !name) {
      // get all categories
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
    if (by === "name") {
      // get category by name
      const category = await prisma.category.findFirst({
        where: {
          name: name,
        },
      })

      if (!category) {
        return { success: false }
      }
      return { success: true, category }
    }
    if (by === "id") {
      // get category by id
      const category = await prisma.category.findUnique({
        where: {
          id: id,
        },
      })

      if (!category) {
        return { success: false }
      }
      return { success: true, category }
    }
  } catch (error) {
    console.log(`Error getting category {${id}}, error: ${error}`)
  }
}

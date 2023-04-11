import getCategory from "@/services/category/getCategory"

import prisma from "@/lib/prisma"

export default async function getCategoryArticles(category, num) {
  try {
    const categories = await getCategory("homepage", "", "").then(
      (c) => c.categories
    )

    const res = await prisma.Article.findMany({
      where: {
        categoryId: categories
          .filter((c) => c.name === category)
          .map((c) => c.id)[0],
      },
      select: {
        title: true,
        slug: true,
        published_at: true,
        google_thumb: true,
        source: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        published_at: "desc",
      },
      take: num,
    })

    return res
  } catch (error) {
    console.log(
      `error occured while fetching getCategoryArticles, category [${category}], num [${num}], error: ${error}`
    )
    return `error occured while fetching getCategoryArticles, category [${category}], num [${num}], error: ${error}`
  }
}

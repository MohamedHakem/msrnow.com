import prisma from "@/lib/prisma"

export default async function getArticle(by, data) {
  let article
  try {
    if (by === "share_count") {
      console.log("[getArticle] share_count")
      // get article share counter(s) by short_slug
      article = await prisma.article.findFirst({
        where: {
          short_slug: data,
        },
        select: {
          shares: true,
          fb_shares: true,
          tw_shares: true,
          ig_shares: true,
          ln_shares: true,
        },
      })
    }
    if (by === "short_to_slug") {
      console.log("[getArticle] short_to_slug")
      // get article data by short_slug
      article = await prisma.article.findFirst({
        where: {
          short_slug: data,
        },
        select: {
          title: true,
          slug: true,
          description: true,
          google_thumb: true,
          published_at: true,
        },
      })
    }
    if (by === "short_to_data") {
      console.log("second if")
      // get article slug by short_slug
      article = await prisma.article.findUnique({
        where: {
          short_slug: data,
        },
      })
    }
    if (by === "slug_to_data") {
      console.log("third if")
      // get article data by slug
      article = await prisma.article.findUnique({
        where: {
          slug: data,
        },
      })
    }
    if (by === "id_to_data") {
      console.log("forth if")
      // get article data by id
      article = await prisma.article.findUnique({
        where: {
          id: data,
        },
      })
    }

    if (!article) {
      return { success: false, res: "Article not found", article }
    }
    return { article }
  } catch (error) {
    console.log(
      `Error getting article {${data}}, error: ${error}, Article not found`
    )
  }
}

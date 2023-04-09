import prisma from "@/lib/prisma"

// slug,
// article_source_url,
// description,
// keywords,
// content,
// isShared,
// short_slug,
// shares
export default async function updateArticle(where, data) {
  // console.log("whereKey, whereValue: ", whereKey, whereValue)
  // console.log("where: ", where)
  // console.log("data: ", data)

  try {
    const article = await prisma.article.update({
      where: where,
      data: data,
    })

    if (!article) {
      return { success: false }
    }
    return { article, success: true }
  } catch (error) {
    console.log(`Error updating article [${where}], full error: ${error}`)
  }
}

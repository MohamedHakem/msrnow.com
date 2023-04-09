import prisma from "@/lib/prisma"

export default async function addArticle(
  slug,
  article_source_url,
  description,
  keywords,
  content
) {
  try {
    const article = await prisma.article.add({
      where: {
        id: id,
      },
      data: {
        article_source_url,
        description: description ? description : null,
        keywords: keywords ? keywords : null,
        content: content ? content : null,
      },
    })

    if (!article) {
      return { success: false }
    }
    return { article, success: true }
  } catch (error) {
    console.log(`Error updating article [${slug}], full error: ${error}`)
  }
}

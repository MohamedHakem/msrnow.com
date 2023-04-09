import prisma from "@/lib/prisma"

export default async function deleteArticle(id, slug) {
  try {
    const article = await prisma.article.delete({
      where: {
        id: id,
      },
    })

    if (!article) {
      return { success: false }
    }
    return { article, success: true }
  } catch (error) {
    console.log(
      `Error deleting article {slug: ${slug}, id: ${id}}, full error: ${error}`
    )
  }
}

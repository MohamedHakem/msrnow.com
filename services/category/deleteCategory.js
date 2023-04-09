import prisma from "@/lib/prisma"

export default async function deleteCategory(id, name) {
  try {
    const category = await prisma.category.delete({
      where: {
        id: id,
      },
    })

    if (!category) {
      return { success: false }
    }
    return { category, success: true }
  } catch (error) {
    console.log(
      `Error deleting category {name: ${name}, id: ${id}}, full error: ${error}`
    )
  }
}

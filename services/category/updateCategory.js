import prisma from "@/lib/prisma"

export default async function updateCategory(id, name) {
  try {
    const category = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    })

    if (!category) {
      return { success: false }
    }
    return { category, success: true }
  } catch (error) {
    console.log(`Error updating category [${slug}], full error: ${error}`)
  }
}

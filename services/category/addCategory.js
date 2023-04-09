import prisma from "@/lib/prisma"

export default async function addCategory(id, name) {
  try {
    const category = await prisma.category.add({
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
    console.log(`Error adding category [${slug}], full error: ${error}`)
  }
}

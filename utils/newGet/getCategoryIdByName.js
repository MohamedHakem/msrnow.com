import prisma from "@/lib/prisma"

async function getCategoryIdByName(categoryName) {
  const category = await prisma.category.findFirst({
    where: {
      name: {
        equals: categoryName,
      },
    },
  })

  if (!category) {
    throw new Error(`Category with name "${categoryName}" not found`)
  }

  console.log("category fetched from db successfully: ", category)
  return category
}

export default getCategoryIdByName

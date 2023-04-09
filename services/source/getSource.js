import prisma from "@/lib/prisma"

export default async function getSource(id) {
  try {
    if (!id) {
      const sources = await prisma.source.findMany({
        select: {
          id: true,
          name: true,
          scrapable: true,
        },
      })
      if (!sources) {
        return { success: false, sources }
      }
      return { success: true, sources }
    }
    const source = await prisma.source.findUnique({
      where: {
        id: id,
      },
      select: {
        scrapable: true,
        content_selector: true,
        name: true,
      },
    })

    if (!source) {
      return { success: false }
    }
    return { success: true, source }
  } catch (error) {
    console.log(`Error getting source {${id}}, ${error}`)
  }
}

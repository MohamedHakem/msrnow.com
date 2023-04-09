import prisma from "@/lib/prisma"

export default async function updateSource(id, name, url, scrapable) {
  try {
    const source = await prisma.source.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        url: url,
        scrapable: scrapable,
      },
    })

    if (!source) {
      return { success: false }
    }
    return { source, success: true }
  } catch (error) {
    console.log(`Error updating source [${slug}], full error: ${error}`)
  }
}

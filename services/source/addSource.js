import prisma from "@/lib/prisma"

export default async function addSource(id, name, url, scrapable) {
  try {
    const source = await prisma.source.add({
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
    console.log(`Error adding source [${slug}], full error: ${error}`)
  }
}

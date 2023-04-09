import prisma from "@/lib/prisma"

export default async function deleteSource(id, name) {
  try {
    const source = await prisma.source.delete({
      where: {
        id: id,
      },
    })

    if (!source) {
      return { success: false }
    }
    return { source, success: true }
  } catch (error) {
    console.log(
      `Error deleting source {name: ${name}, id: ${id}}, full error: ${error}`
    )
  }
}

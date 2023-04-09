import prisma from "@/lib/prisma"

async function addSource(sourceName) {
  const source = await prisma.source.create({
    data: { name: sourceName },
  })

  if (!source) {
    throw new Error(`Source with name {"${sourceName}"} not found`)
  }

  console.log(`Source {${sourceName}} added to db successfully.`)
  return source
}

export default addSource

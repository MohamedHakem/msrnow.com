import prisma from "@/lib/prisma"

async function getSourceIdByName(sourceName) {
  console.log("getSourceIdByName, sourceName: ", sourceName)
  const source = await prisma.source.findUnique({
    where: {
      name: sourceName,
    },
  })
  console.log("getSourceIdByName, source: ", source)
  if (!source) {
    // throw new Error(`Source with name {"${sourceName}"} not found`)
    console.log(`Source with name {"${sourceName}"} not found`)
  }

  console.log(`fetched Source {${sourceName}} successfully`)
  return source
}

export default getSourceIdByName

import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      let sources = await prisma.source.findMany({
        // select: {
        //   articles: true,
        // },
      })
      res.status(200).json({
        message: sources ? "Sources Fetched successfully" : "Sources Not found",
        success: sources ? true : false,
        data: { sources },
      })
      break
    case "POST":
      let { name } = req.body
      console.log("name: ", name)
      console.log("req.query.name: ", req.query.name)
      const sourceRes = await prisma.source.create({
        data: { name: name || req.query.name },
      })
      console.log("sourceRes: ", sourceRes)
      res.status(200).json({
        message: "Source Created successfully",
        success: true,
        data: { source: sourceRes },
      })
      break

    default:
      break
  }

  return
  // return res.status(405).json({ message: "Method not allowed", success: false })
}

import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createArticle(req, res)
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false })
  }
}

async function createArticle(req, res) {
  const body = req.body
  try {
    const newEntry = await prisma.article.create({
      data: {
        title: req.query.title,
        slug: req.query.slug,
      },
    })
    return res.status(200).json(newEntry, { success: true })
  } catch (error) {
    console.error("Request error", error)
    res.status(500).json({ error: "Error creating article", success: false })
  }
}

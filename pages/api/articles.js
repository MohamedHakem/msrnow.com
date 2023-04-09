import prisma from "../../lib/prisma"

export default async function handler(req, res) {
  if (req.method === "GET") {
    return await getArticles(req, res)
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false })
  }
}

async function getArticles(req, res) {
  try {
    const articles = await prisma.article.findMany({})
    return res.status(200).json(articles, { success: true })
  } catch (error) {
    console.error("Request error", error)
    res.status(500).json({ error: "Error getting articles", success: false })
  }
}

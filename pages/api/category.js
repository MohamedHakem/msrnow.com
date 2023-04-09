import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createCategory(req, res)
  }
  if (req.method === "GET") {
    return await getCategories(req, res)
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false })
  }
}

async function createCategory(req, res) {
  const body = req.body
  try {
    const newEntry = await prisma.category.create({
      data: {
        name: req.query.name,
      },
    })
    return res.status(200).json(newEntry, { success: true })
  } catch (error) {
    console.error("Request error", error)
    res.status(500).json({ error: "Error creating article", success: false })
  }
}

async function getCategories(req, res) {
  try {
    const categories = await prisma.category.findMany({})
    return res.status(200).json(categories, { success: true })
  } catch (error) {
    console.error("Request error", error)
    res.status(500).json({ error: "Error getting categories ", success: false })
  }
}

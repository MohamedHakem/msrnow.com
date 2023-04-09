import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  const { where, data } = req.body

  if (req.method === "POST") {
    console.log("data: ", data)
    const updateRes = await prisma.article.update({
      where: where,
      data: data,
    })
    if (!updateRes) {
      return res
        .status(500)
        .json({ success: false, error: "Error updating articles", updateRes })
    }
    return res.status(200).json({ success: true, updateRes })
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false })
  }
}

// async function createArticle(req, res) {
//   const body = req.body
//   try {
//     const newEntry = await updateArticle(body)
//     return res.status(200).json(newEntry, { success: true })
//   } catch (error) {
//     console.error("Request error", error)
//     res.status(500).json({ error: "Error creating article", success: false })
//   }
// }

async function updateArticle(body) {
  // const body = req.body
  console.log("body: ", body)
  console.log("body: ", { [body.whereKey]: body.whereValue })
  // whereKey, whereValue, data
  // try {
  //   const article = await prisma.article.update({
  //     where: {
  //       [body.whereKey]: body.whereValue,
  //     },
  //     data: { ...body.data },
  //   })

  //   if (!article) {
  //     return { success: false }
  //   }
  //   return { article, success: true }
  // } catch (error) {
  //   console.log(`Error updating article [${where}], full error: ${error}`)
  // }
}

import generateShortSlug from "@/utils/generateShortSlug"

import prisma from "../../lib/prisma"

export default async function handler(req, res) {
  // const newArticles = [
  //   { name: "1" },
  //   { name: "2" },
  //   { name: "1" },
  //   { name: "2" },
  //   { name: "1" },
  //   { name: "2" },
  //   { name: "1" },
  //   { name: "2" },
  //   { name: "1" },
  //   { name: "2" },
  //   { name: "1" },
  //   { name: "2" },
  //   { name: "1" },
  //   { name: "2" },
  //   { name: "1" },
  //   { name: "2" },
  //   { name: "1" },
  //   { name: "2" },
  //   { name: "1" },
  //   { name: "2" },
  //   { name: "1" },
  //   { name: "2" },
  // ]

  const newArticles = await prisma.article.findMany({
    orderBy: { published_at: "desc" },
    take: 10,
  })
  console.log("newArticles: ", newArticles)

  // const sluggedArticles = addShortSlug(newArticles, "short_slug")

  // console.log("addShortSlug: ", sluggedArticles)

  return res.status(200).json({ success: true, newArticles })
}

const addShortSlug = (arr, key) =>
  arr.map((obj) => ({ ...obj, key: generateShortSlug(1) }))

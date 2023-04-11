import generateShortSlug from "@/utils/generateShortSlug"

import prisma from "@/lib/prisma"

// add the shortSlug to all newArticles array here, and save with prisma,
// if error, add new shortslugs and repeat until it goes through

async function addArticlesToDB(newArticles, category) {
  // const addShortSlug = (arr, key) =>
  //   arr.map((obj) => ({ ...obj, [key]: generateShortSlug(1) }))

  const addShortSlug = async (arr, key) =>
    arr.map((obj) => {
      obj[key] = generateShortSlug(1)[0]
    })

  let savedArticles
  let counter = 0

  addShortSlug(newArticles, "short_slug")
  let sluggedArticles = newArticles
  // console.log("newArticles[0]: ", newArticles[0])

  while (true) {
    counter++
    try {
      savedArticles = await prisma.article.createMany({
        data: sluggedArticles,
        skipDuplicates: true,
      })
      break
    } catch (error) {
      if (error.code === "P2002") {
        console.log(
          "P2002 error: some slugs already exist, trying again with new slugs..."
        )
        console.log("full error: ", error)
        sluggedArticles = addShortSlug(newArticles, "short_slug")
      } else {
        // console.log("counter: ", counter)
        console.log(
          "Error while saving article(s) to db: \n",
          "prisma error code: ",
          error.code,
          "\n",
          error
        )
        return
      }
    }
  }

  console.log("counter: ", counter)
  console.log("savedArticles: ", savedArticles)

  console.log(
    `added ${savedArticles.count} articles to DB, out of ${newArticles.length} scraped articles - under ${category} category`
  )
}

export default addArticlesToDB

// async function addArticlesToDB(newArticles, category) {
//   const addShortSlug = (arr, key) =>
//     arr.map((obj) => ({ ...obj, [key]: generateShortSlug(1) }))

//   const sluggedArticles = addShortSlug(newArticles, "short_slug")

//   try {
//     const savedArticles = await prisma.article.createMany({
//       data: sluggedArticles,
//       skipDuplicates: true,
//     })

//     console.log("savedArticles: ", savedArticles)

//     console.log(
//       `added ${savedArticles.count} articles to DB, out of ${newArticles.length} scraped articles - under ${category} category`
//     )
//   } catch (error) {
//     console.log(
//       "Error while saving article(s) to db: \n",
//       "prisma error code: ",
//       error.code,
//       "\n",
//       error.code === "P2002"
//         ? "some of the articles already exist, use skipDuplicates to ignore any duplicates"
//         : error,
//       " \n full error: \n canceled for now...development"
//     )
//   }
// }

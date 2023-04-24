import { Key } from "react"
// import Head from "next/head"
import { getLastDateOnGithub } from "@/utils/newGet/getLastDateOnGithub"
import addArticlesToDB from "@/utils/newSave/addArticlesToDB"
import { updateLastDateOnGithub } from "@/utils/newSave/updateLastDateOnGithub"
import { scrapeLatestNews } from "@/utils/newScrape/scrapeLatestNews"
import { formatArrayDatetimeSince } from "@/utils/old/formatArrayDatetimeSince"
import { getBase64 } from "@/utils/old/imagePlaceholderBase64.js"

import prisma from "@/lib/prisma"
import Cardx360 from "@/components/cards/cardx360"
import { Layout } from "@/components/layout"
import { FeaturedCard } from "@/components/old/index"

export default function IndexPage({ formattedData, category }) {
  return (
    <Layout>
      <section className="container grid items-center gap-6 px-4 pt-6 pb-8 md:py-10">
        <div dir="rtl" className="m-auto w-full items-center justify-center">
          <div className="mt-10 mb-12 md:mx-2">
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-2 xl:grid-cols-2">
              {formattedData.map(
                (article: { title: string; short_slug: Key }, i: number) =>
                  i < 4 ? (
                    <FeaturedCard
                      key={article.short_slug}
                      article={article}
                      getBase64={getBase64}
                      category={category}
                    />
                  ) : null
              )}
            </ul>
          </div>
          <div className="mb-10 mt-4 md:mx-2">
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4 xl:grid-cols-4">
              {formattedData.map(
                (
                  article: { title: string; slug: Key; topBorder: boolean },
                  i: number
                ) =>
                  i >= 4 ? (
                    <Cardx360
                      key={article.slug}
                      article={article}
                      getBase64={getBase64}
                      category={category}
                      topBorder={i < 39}
                    />
                  ) : null
              )}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  console.log("========== SCRAPING =========")
  // specify category
  const category = "egypt"

  // get last date
  const lastDate = await getLastDateOnGithub(category)

  // scrape
  const { newLastDate, articles } = await scrapeLatestNews(lastDate, category)

  // update the last-date AND save scraped articles, if scraped > 0 articles
  if (articles.length > 0) {
    console.log(`[getStaticProps] scraped ${articles.length} articles`)
    updateLastDateOnGithub(newLastDate, category) // go for prod, no need, using separate files for dev and prod

    await addArticlesToDB(articles, category)
  }

  console.log("========== FETCHING FROM DB =========")
  const data = await prisma.Article.findMany({
    select: {
      title: true,
      slug: true,
      published_at: true,
      google_thumb: true,
      source: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      published_at: "desc",
    },
    take: 40,
  })

  // Convert the `createdAt`, `updatedAt`, and `published_at` fields of each item to a JSON-serializable format
  let formattedData = data.map(
    (item: {
      createdAt: { toISOString: () => any }
      updatedAt: { toISOString: () => any }
      published_at: { toISOString: () => any }
    }) => ({
      ...item,
      // createdAt: item.createdAt.toISOString(),
      // updatedAt: item.updatedAt.toISOString(),
      published_at: item.published_at.toISOString(),
    })
  )

  // turn the datetime into "2 hours ago" in Arabic as timeAgo property on each article's object
  formatArrayDatetimeSince(formattedData)

  console.log("formattedData.length: ", formattedData.length)

  // sort the articleArray to take the most recent num of it
  formattedData.sort(
    (
      a: { published_at: string | Date },
      b: { published_at: string | Date }
    ) => {
      return (
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      )
    }
  )

  console.log("formattedData[0]: ", formattedData[0].slug)
  return {
    props: { category, formattedData },
    revalidate: 1800,
  }
}

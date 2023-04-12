import { Fragment, Key } from "react"
import Head from "next/head"
import Link from "next/link"
// import getCategory from "@/services/category/getCategory"
import getCategoryArticles from "@/services/homepage/getArticles"
import { getLastDateOnGithub } from "@/utils/newGet/getLastDateOnGithub"
import addArticlesToDB from "@/utils/newSave/addArticlesToDB"
import { updateLastDateOnGithub } from "@/utils/newSave/updateLastDateOnGithub"
import { scrapeLatestNews } from "@/utils/newScrape/scrapeLatestNews"
import { formatArrayDatetimeSince } from "@/utils/old/formatArrayDatetimeSince"
import { getBase64 } from "@/utils/old/imagePlaceholderBase64.js"

// import prisma from "@/lib/prisma"
import Cardx360 from "@/components/cards/cardx360"
import { Layout } from "@/components/layout"

// import { FeaturedCard } from "@/components/old/index"

// export default function IndexPage({ formattedData, category }) {
export default function IndexPage({ data, category }) {
  const categories = [
    { name: "أخبار مصر", slug: "/news/egypt", objName: "Egypt" },
    { name: "الرياضة", slug: "/sports", objName: "Sports" },
    { name: "فن ومشاهير", slug: "/news/arts", objName: "Arts" },
    { name: "مال وأعمال", slug: "/finance", objName: "Finance" },
    { name: "خارج الحدود", slug: "/news/world", objName: "World" },
    { name: "أخبار سياسية", slug: "/news/politics", objName: "Politics" },
    { name: "أخبار محلية", slug: "/news/local", objName: "Local" },
  ]

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 px-[10px] pt-6 pb-8 md:py-10 lg:px-4">
        <div dir="rtl" className="m-auto w-full items-center justify-center">
          {categories.map((category, index) => (
            <div key={index} className="mb-10 mt-4 md:mx-2">
              {/* `{console.log("category.objName", category.objName)}` */}
              <div
              // className={`bg-${
              //   category.objName === "Finance" ? "[#1B54E5]" : "red"
              // }`}
              >
                <h2
                  className={`my-8 mx-auto w-full border-4 p-4 text-center text-3xl font-semibold underline underline-offset-[10px] md:my-8 md:mx-0 md:w-fit md:border-0`}
                >
                  <Link href={`${category.slug}`}>{category.name}</Link>
                </h2>
              </div>
              <div className="w-full rounded-3xl py-[14px] px-1 dark:border-neutral-800 md:border lg:px-8 lg:pt-12">
                <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4 xl:grid-cols-4">
                  {data[`${category.objName}Articles`].map(
                    (article: { title: string; slug: Key }) => (
                      <Fragment key={article.slug}>
                        <Cardx360
                          article={article}
                          getBase64={getBase64}
                          category={category}
                        />
                        <div className="border-t-2 pt-3 md:hidden"></div>
                      </Fragment>
                    )
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

// spread, map, filter the 3 are performance killers, avoid them
export async function getStaticProps() {
  console.log("========== SCRAPING =========")
  // specify category
  const category = "egypt"

  console.time("Homepage server")
  console.time("scraping")
  // get last date
  const lastDate = await getLastDateOnGithub(category)

  // scrape
  const { newLastDate, articles } = await scrapeLatestNews(lastDate, category)

  // update the last-date AND save scraped articles
  if (articles.length > 0) {
    console.log(`[getStaticProps] scraped ${articles.length} articles`)
    updateLastDateOnGithub(newLastDate, category)

    await addArticlesToDB(articles, category)
  }
  console.timeEnd("scraping")

  console.log("========== FETCHING FROM DB =========")

  console.time("Fetching for homepage")
  const categories = [
    "Egypt",
    "Politics",
    "Arts",
    "World",
    "Local",
    "Sports",
    "Finance",
  ]

  const data = {
    EgyptArticles: [],
    PoliticsArticles: [],
    ArtsArticles: [],
    WorldArticles: [],
    LocalArticles: [],
    SportsArticles: [],
    FinanceArticles: [],
  }

  for (const category of categories) {
    const articles = await getCategoryArticles(category.toLowerCase(), 8)

    for (const article of articles) {
      article.published_at = new Date(article.published_at).toISOString()
    }

    formatArrayDatetimeSince(articles)
    data[`${category}Articles`] = articles
  }

  console.timeEnd("Fetching for homepage")
  console.timeEnd("Homepage server")
  console.log("done fetching")

  return {
    props: { category, data },
    revalidate: 1800,
  }
}

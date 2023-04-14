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
import { Icons } from "@/components/icons"
import { Layout } from "@/components/layout"

// import { FeaturedCard } from "@/components/old/index"

// export default function IndexPage({ formattedData, category }) {
// export default function IndexPage({ data, category }) {
export default function IndexPage({ data }) {
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
      <section className="container grid items-center gap-6 px-0 pt-6 pb-8 md:px-[10px] md:py-10 lg:px-4">
        <div dir="rtl" className="m-auto w-full items-center justify-center">
          {categories.map((category, index) => (
            <div key={index} className="mb-10 mt-4 md:mx-2">
              <div className="w-full rounded-3xl bg-white px-1 dark:border-neutral-800 dark:bg-[#353d50] md:border-0 md:py-[14px] lg:p-4">
                <div className="w-full border-gray-300 dark:border-slate-500 md:mb-6 md:border-b">
                  <h2
                    className={`mx-auto w-full p-4 text-center text-2xl font-medium text-[#1867dc] 
                    underline-offset-[10px] dark:text-white md:m-0 md:my-8 md:w-fit md:pt-0 md:pr-1`}
                  >
                    <Link
                      href={`${category.slug}`}
                      className="flex flex-row gap-0 transition-all duration-150 ease-in-out hover:gap-4"
                      title={`اضغط للمزيد من ${category.name}`}
                    >
                      {category.name}
                      <Icons.leftArrow className="mt-1 mr-[-2px] h-7 w-7 text-lg" />
                    </Link>
                  </h2>
                </div>
                <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-4">
                  {data[`${category.objName}Articles`].map(
                    (article: { title: string; slug: Key }, index) => (
                      <Fragment key={article.slug}>
                        <Cardx360
                          article={article}
                          getBase64={getBase64}
                          category={category}
                        />
                        {index < 7 ? (
                          <div className="mx-2 mt-1 border-t-2 border-slate-200 pt-3 dark:border-slate-600 md:hidden"></div>
                        ) : (
                          <div className="my-2"></div>
                        )}
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
  console.log("done fetching")

  return {
    props: { data },
    revalidate: 1800,
  }
  // props: { category, data },
}

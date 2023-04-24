import { Key } from "react"
import Link from "next/link"
import getCategoryArticles from "@/services/homepage/getArticles"
import { formatArrayDatetimeSince } from "@/utils/old/formatArrayDatetimeSince"
import { getBase64 } from "@/utils/old/imagePlaceholderBase64.js"

import Cardx360 from "@/components/cards/cardx360"
import { Icons } from "@/components/icons"
import { Layout } from "@/components/layout"

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
      <section className="container grid items-center gap-6 px-0 pt-6 pb-8 md:px-[10px] md:py-10 lg:px-4">
        <div dir="rtl" className="m-auto w-full items-center justify-center">
          {categories.map((category, index) => (
            <div key={index} className="mb-10 mt-4 md:mx-2">
              <div className="w-full rounded-3xl bg-white px-1 dark:border-neutral-800 dark:bg-[#353d50] md:border-0 md:py-[14px] lg:p-4">
                <div className="w-full border-gray-300 dark:border-slate-500 md:mb-6 md:border-b">
                  <h2
                    className={`mx-auto w-full p-4 text-center text-2xl font-medium text-[#1867dc] 
                    underline-offset-[10px] dark:text-white md:m-0 md:w-fit md:pt-0 md:pr-1`}
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
                    (article: { title: string; slug: Key, topBorder: boolean }, index) => (
                      <Cardx360
                        key={index}
                        article={article}
                        getBase64={getBase64}
                        category={category}
                        topBorder={index < 7}
                      />
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
  const isProduction = process.env.NODE_ENV === "production"
  const baseUrl = isProduction
    ? "https://www.msrnow.com"
    : "http://localhost:3000"

  // trigger a scrape for all category pages
  await fetch(`${baseUrl}/api/trigger-categories-auto-scraper`)

  console.time("[Performance] FETCHING FROM DB: homepage")
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

  console.timeEnd("[Performance] FETCHING FROM DB: homepage")

  return {
    props: { data },
    revalidate: 1800,
  }
  // props: { category, data },
}

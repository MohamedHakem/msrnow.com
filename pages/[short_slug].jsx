import { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { editThumb } from "@/utils/old/editThumb"

import getArticle from "../services/article/getArticle"

export default function ShortUrlPage({ data, newSlug }) {
  const router = useRouter()
  useEffect(() => {
    if (data && newSlug) {
      router.replace(`/news/${newSlug}`)
    }
  }, [data, newSlug, router])

  if (data && newSlug) {
    const desc = data.article.description
      ? data.article.description
      : data.article.title

    let editThumbRes
    if (data) {
      editThumbRes = editThumb(data.article, 900)
      data.article = editThumbRes.obj
    }

    return (
      <>
        <Head>
          <title>{`${data.article.title} - MsrNow.com`}</title>
          <link
            rel="canonical"
            href={`https://news-4.vercel.app/news/${data.article.slug}`}
          ></link>
          <meta name="description" content={desc} />
          <meta name="og:title" content={data.article.title}></meta>
          <meta property="og:description" content={desc}></meta>
          <meta property="og:locale" content="ar_AR"></meta>
          <meta property="og:site_name" content={"MsrNow"}></meta>
          <meta
            name="og:updated_time"
            content={data.article.published_at}
          ></meta>
          <meta
            name="og:url"
            content={`https://msrnow.com/news/${data.article.slug}`}
          ></meta>
          <meta property="og:image" content={data.article?.google_thumb}></meta>
          <meta property="og:image:width" content={"700"}></meta>
          <meta property="og:image:height" content={420}></meta>
          <meta property="og:image:alt" content={data.article.title}></meta>
          <meta property="og:type" content="article"></meta>
          <meta name="twitter:title" content={data.article.title}></meta>
          <meta
            name="twitter:description"
            content={data.article.description}
          ></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta name="twitter:domain" content="msrnow.com"></meta>
          <meta
            name="twitter:url"
            content={`https://msrnow.com/news/${data.article.short_slug}`}
          ></meta>
          <meta name="twitter:image" content={data.article.google_thumb}></meta>
          <meta name="twitter:image:alt" content={data.article.title}></meta>
          <meta property="article:content_tier" content="free"></meta>
          <meta
            property="article:publisher"
            content="https://www.facebook.com/msrnowcom/"
          ></meta>
          <meta
            property="article:published_time"
            content={data.article.published_at}
          ></meta>
          <meta
            property="article:modified_time"
            content={data.article.published_at}
          ></meta>
        </Head>
      </>
    )
  }
}

export async function getStaticProps({ params }) {
  const { short_slug } = params
  console.log("short_slug: ", short_slug)
  const isSlug = short_slug != "favicon.ico"
  let articleData, newSlug
  if (isSlug) {
    articleData = await getArticle("short_to_slug", short_slug)
    newSlug = encodeURIComponent(`${articleData.article.slug}`)

    // Convert the `createdAt`, `updatedAt`, and `published_at` fields of each item to a JSON-serializable format
    articleData.article.published_at =
      articleData.article.published_at.toISOString()
  }

  return {
    props: {
      data: isSlug ? articleData : "",
      newSlug: isSlug ? newSlug : "",
    },
    revalidate: 60 * 60 * 24 * 30, // revalidate the page every 24 hours * 7 = 7 days (every week)
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}

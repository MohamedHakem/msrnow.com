import { useState } from "react"
import Head from "next/head"
import logo from "@/public/android-chrome-192x192.png"
import { scrapeArticle } from "@/utils/newScrape/scrapeArticle.js"
import { editThumb } from "@/utils/old/editThumb"
import { getBase64 } from "@/utils/old/imagePlaceholderBase64.js"
import { slugifyDate } from "@/utils/old/slugifyDate"

import { Layout } from "@/components/layout"
import { NewsArticle } from "../../components/newsArticle"

const ArticlePage = ({ articleData }) => {
  // console.log("articleData: ", articleData ? true : false)
  const imgWidth = 811
  let editThumbRes, newWidth, newHeight
  let updatedArticle
  if (articleData) {
    editThumbRes = editThumb(articleData, imgWidth)
    updatedArticle = editThumbRes.obj
    newWidth = editThumbRes.newWidth
    newHeight = editThumbRes.newHeight
  }
  const [imgSrc, set_imgSrc] = useState(updatedArticle?.google_thumb)

  const sections = {
    egypt: "أخبار مصر",
    sports: "أخبار رياضية",
    business: "تجارة وأعمال",
    politics: "سياسة",
    health: "صحة",
    arts: "فن ومشاهير",
    local: "أخبار محلية مصرية",
    tech: "تقنية وتكنولوجيا",
    world: "أخبار العالم",
  }

  const slugifiedDate = slugifyDate(articleData.published_at)

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    articleSection: sections[articleData.category],
    headline: articleData.title,
    datePublished: articleData.published_at,
    dateModified: articleData.published_at,
    mainEntityOfPage: `https://msrnow.com/news/${articleData.category}/${slugifiedDate}/${articleData.titleSlug}`,
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "Msr Now - مصر الآن",
      alternateName: "Msr Now",
      url: "https://msrnow.com",
      sameAs: [
        "https://twitter.com/msrnow",
        "https://www.youtube.com/msrnow",
        "https://www.facebook.com/msrnow",
        "https://www.instagram.com/msrnow",
      ],
      logo: {
        "@type": "ImageObject",
        width: 192,
        height: 192,
        url: logo,
      },
      parentOrganization: { "@type": "Organization", name: "MsrNow" },
    },
    description: articleData.description || articleData.title,
    author: {
      "@type": "NewsMediaOrganization",
      name: "Msr Now - مصر الآن",
      alternateName: "Msr Now",
      url: "https://msrnow.com",
      sameAs: [
        "https://twitter.com/msrnow",
        "https://www.youtube.com/msrnow",
        "https://www.facebook.com/msrnow",
        "https://www.instagram.com/msrnow",
      ],
      logo: {
        "@type": "ImageObject",
        width: 192,
        height: 192,
        url: logo,
      },
      parentOrganization: { "@type": "Organization", name: "MsrNow" },
    },
    image: {
      "@type": "ImageObject",
      representativeOfPage: true,
      url: updatedArticle?.thumb,
      width: editThumbRes.newWidth,
      height: editThumbRes.newHeight,
    },
  }

  const desc = articleData.description
    ? articleData.description
    : articleData.title

  return (
    <Layout>
      <Head>
        <title>{`${articleData.title} - MsrNow.com`}</title>
        <link
          rel="canonical"
          href={`https://msrnow.com/news/${articleData.slug}`}
        ></link>
        <meta name="description" content={desc} />
        <meta name="keywords" content={articleData?.keywords}></meta>
        <meta name="twitter:title" content={articleData.title}></meta>
        <meta name="twitter:description" content={desc}></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:domain" content="msrnow.com"></meta>
        <meta
          name="twitter:url"
          content={`https://msrnow.com/news/${articleData.short_slug}`}
        ></meta>
        <meta
          name="twitter:image"
          content={updatedArticle?.google_thumb}
        ></meta>
        <meta name="twitter:image:alt" content={articleData.title}></meta>
        <meta name="og:title" content={articleData.title}></meta>
        <meta property="og:description" content={desc}></meta>
        <meta property="og:locale" content="ar_AR"></meta>
        <meta property="og:site_name" content="كل أخبارك"></meta>
        <meta name="og:updated_time" content={articleData.published_at}></meta>
        <meta
          name="og:url"
          content={`https://msrnow.com/news/${articleData.slug}`}
        ></meta>
        <meta property="og:image" content={updatedArticle?.google_thumb}></meta>
        <meta property="og:image:width" content={editThumbRes.newWidth}></meta>
        <meta
          property="og:image:height"
          content={editThumbRes.newHeight}
        ></meta>
        <meta property="og:image:alt" content={articleData.title}></meta>
        <meta property="og:type" content="article"></meta>
        <meta property="article:content_tier" content="free"></meta>
        <meta
          property="article:publisher"
          content="https://www.facebook.com/msrnowcom/"
        ></meta>
        <meta
          property="article:published_time"
          content={articleData.published_at}
        ></meta>
        <meta
          property="article:modified_time"
          content={articleData.published_at}
        ></meta>
        {/* <meta
          property="article:section"
          content={sections[articleData.category]}
        ></meta> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <NewsArticle
        articleData={updatedArticle}
        imgSrc={imgSrc}
        imgSize={{ newWidth, newHeight }}
        set_imgSrc={set_imgSrc}
        getBase64={getBase64}
      />
    </Layout>
  )
}
export default ArticlePage

export async function getStaticProps({ params }) {
  const articleData = await scrapeArticle(params)

  // Convert the `createdAt`, `updatedAt`, and `published_at` fields of each item to a JSON-serializable format
  const formattedData = {
    ...articleData.article,
    createdAt: articleData.article.createdAt.toISOString(),
    updatedAt: articleData.article.updatedAt.toISOString(),
    published_at: articleData.article.published_at.toISOString(),
  }

  return {
    props: { articleData: formattedData },
    revalidate: 1800,
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}

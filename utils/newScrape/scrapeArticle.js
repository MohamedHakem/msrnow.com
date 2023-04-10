import getArticle from "@/services/article/getArticle"
import updateArticle from "@/services/article/updateArticle"

// import { sourcesById } from "@/lib/sources"
import getSource from "../../services/source/getSource"

const axios = require("axios")
const cheerio = require("cheerio")

// slug ==get==> article
// article ==get==> article_google_url
// article_google_url ==get==> article_source_url
// article_source_url ==get==> content and description
// content, description, and article_source_url ==update==> article
// make a new field called google_scraped with tineInt 0 or 1 to say if it was scraped from google or not
// that would be better than having 2 sources for each article, google news and the publisher
// and it would be better than having google as a source on its own, since it's not a publisher anyway

async function scrapeArticle(params) {
  console.log("===== [scrapeArticle is running] =====")

  const slug = params.slug
  const article = await getArticle("slug_to_data", slug)
  // console.log("article: ", article)
  const source = await getSource(article.article.sourceId)
  const content_selector = source.source.content_selector
  const isScrapable = source.source.scrapable
  const articleGoogleUrlRes = await axios.get(
    article.article.article_google_url
  )
  const article_source_url = cheerio
    .load(articleGoogleUrlRes.data)("div.m2L3rb > a")
    .attr("href")

  let updatedArticle
  let data
  const where = {
    slug: slug,
  }

  if (isScrapable) {
    const articlePage = await axios.get(article_source_url)
    const $article = cheerio.load(articlePage.data)
    const description = $article('meta[name="description"]')
      .attr("content")
      .trim()

    let content
    let keywords
    content = $article(`${content_selector}`).html().trim()
    keywords =
      $article('meta[name="keywords"]')?.attr("content")?.trim() ||
      $article('meta[name="news_keywords"]')?.attr("content")?.trim()

    data = {
      article_source_url,
      description,
      keywords,
      content,
    }

    // updateArticle from services
    updatedArticle = await updateArticle(where, data)
  } else {
    console.log("not scrapable")
    // console.log("where: ", where)
    data = {
      article_source_url: article_source_url,
    }
    updatedArticle = await updateArticle(where, data)
  }

  return updatedArticle
}

export { scrapeArticle }

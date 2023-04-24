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
  const source = await getSource(article.article.sourceId)
  const content_selector = source.source.content_selector
  // this content_selector, in particular the :not() is not working anymore
  // #body-text > *:not(.advertisement-wrapper):not(.feed-card.ar)
  // console.log("content_selector: ", content_selector)
  console.log(`article.article.title: ${article.article.title}`)

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
    const $article = cheerio.load(articlePage.data, { xmlMode: true })
    const description = $article('meta[name="description"]')
      .attr("content")
      .trim()
    let content
    let keywords

    if (source.source.name === "العربية") {
      content = $article("#body-text")
        .html()
        .replace($article("#body-text").find(".feed-card"), "")
        .replace($article("#body-text").find(".ad25"), "")
        .replace($article("#body-text").find(".hide-in-mobile"), "")
        .trim()
    } else {
      content = $article(`${content_selector}`).html().trim()
    }

    // clean the content
    content = content.replace("&nbsp;", " ")

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

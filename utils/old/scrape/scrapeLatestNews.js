import { addArticlesToDB } from "../../newSave/addArticlesToDB"
import { sanitizeTitle } from "../sanitizeTitle"

// import { addArticlesToGitHub } from "../saveArticle/addArticlesToGithub"

const axios = require("axios")
const cheerio = require("cheerio")

async function scrapeLatestNews(date, category) {
  console.log(`scraping ${category} is working...`)
  const categories = {
    egypt: process.env.googleNewsEgyptLatestUrl,
    sports: process.env.googleNewsSportsUrl,
    business: process.env.googleNewsBusinessUrl,
    politics: process.env.googleNewsPoliticsUrl,
    health: process.env.googleNewsHealthUrl,
    arts: process.env.googleNewsArtsUrl,
    local: process.env.googleNewsLocalUrl,
    tech: process.env.googleNewsTechUrl,
    world: process.env.googleNewsWorldUrl,
  }

  const urlToScrape = categories[category]

  const limitDate = new Date(date)
  const response = await axios.get(urlToScrape)
  const $ = cheerio.load(response.data)
  console.log("title: ", $("title").text())
  const source = "https://news.google.com/"
  let newMostRecentArticleDate = limitDate
  const articles = await Promise.all(
    $("article.IBr9hb, article.IFHyqb.DeXSAc")
      .filter((i, article) => {
        const hasImage = $(article).find("img.Quavad").length > 0
        const articleDatetime = new Date(
          $(article).find("time.hvbAAd").attr("datetime")
        )
        const isRecent = articleDatetime > limitDate
        if (articleDatetime > newMostRecentArticleDate) {
          newMostRecentArticleDate = articleDatetime
        }
        return hasImage && isRecent
      })
      .map(async (i, article) => {
        const articleObj = {
          category: category,
          scraped_from: source,
          title: $(article).find("h4").text().trim(),
          google_thumb: $(article).find("img.Quavad").attr("src"),
          article_google_url: `${source}${$(article).find("a").attr("href")}`,
          source_website: $(article).find("span.vr1PYe").text().trim(),
          published_at: $(article).find("time.hvbAAd").attr("datetime"),
          slug: sanitizeTitle($(article).find("h4").text().trim()),
        }

        return articleObj
      })
      .get()
  )

  console.log("articles.length: ", articles.length)

  const newScrapedArticlesCount = articles.length
  if (newScrapedArticlesCount > 0) {
    // await addArticlesToGitHub(articles, category)
    await addArticlesToDB(articles, category)
  }

  return { newScrapedArticlesCount, newMostRecentArticleDate, articles }
}

export { scrapeLatestNews }

import getCategory from "../../services/category/getCategory"
import { sanitizeTitle } from "../old/sanitizeTitle"

const axios = require("axios")
const cheerio = require("cheerio")

async function scrapeLatestNews(date, category) {
  console.log(`scraping ${category} is working...`)

  const categories = await getCategory().then((s) => s.categories)
  const categoryUrl = categories.filter((c) => c.name === category)[0]
    .google_news_url
  const categoryId = categories.filter((c) => c.name === category)[0].id
  const sources = categories.filter((c) => c.name === category)[0].source

  const isVerifiedSource = (source) =>
    sources.find((s) => s.name === source) ? true : false

  const urlToScrape = categoryUrl
  const limitDate = new Date(date)
  const response = await axios.get(urlToScrape)
  const $ = cheerio.load(response.data)
  const source = "https://news.google.com/"
  let newLastDate = limitDate
  const articles = await Promise.all(
    $("article.IBr9hb, article.IFHyqb.DeXSAc")
      .filter((i, article) => {
        const hasImage = $(article).find("img.Quavad").length > 0
        if (hasImage) {
          const articleDatetime = new Date(
            $(article).find("time.hvbAAd").attr("datetime")
          )
          const isRecent = articleDatetime > limitDate
          if (articleDatetime > newLastDate) {
            newLastDate = articleDatetime
          }
          if (isRecent) {
            const verifiedSource = isVerifiedSource(
              $(article).find("span.vr1PYe").text().trim()
            )
            if (verifiedSource) {
              return true
              // return hasImage && isRecent && verifiedSource
            }
            return verifiedSource
          }
          return isRecent
        }
        return hasImage
      })
      .map(async (i, article) => {
        const sourceId = sources.filter(
          (s) => s.name === $(article).find("span.vr1PYe").text().trim()
        )[0].id
        const title = $(article).find("h4").text().trim()
        const articleObj = {
          scraped_from: source,
          title: title.replace(/\b\w+\.(com|net|org|co|uk)\b/gi, ""),
          google_thumb: $(article).find("img.Quavad").attr("src"),
          article_google_url: `${source}${$(article).find("a").attr("href")}`,
          slug: sanitizeTitle($(article).find("h4").text().trim()),
          published_at: $(article).find("time.hvbAAd").attr("datetime"),
          sourceId: sourceId,
          categoryId: categoryId,
        }
        return articleObj
      })
      .get()
  )

  console.log("[scrapeLatestNews] articles.length: ", articles.length)
  return { newLastDate, articles }
}

export { scrapeLatestNews }

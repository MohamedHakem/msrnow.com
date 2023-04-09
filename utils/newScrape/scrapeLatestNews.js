// import getCategoryIdByName from "../newGet/getCategoryIdByName"
// import getSourceIdByName from "../newGet/getSourceIdByName"
// import { addArticlesToDB } from "../newSave/addArticlesToDB"
// import addSource from "../newSave/addSource"

import getCategory from "../../services/category/getCategory"
// import getSource from "../../services/source/getSource"
import { sanitizeTitle } from "../old/sanitizeTitle"

const axios = require("axios")
const cheerio = require("cheerio")

async function scrapeLatestNews(date, category) {
  console.log(`scraping ${category} is working...`)
  // const categoriesUrls = {
  //   egypt: process.env.googleNewsEgyptLatestUrl,
  //   sports: process.env.googleNewsSportsUrl,
  //   business: process.env.googleNewsBusinessUrl,
  //   politics: process.env.googleNewsPoliticsUrl,
  //   health: process.env.googleNewsHealthUrl,
  //   arts: process.env.googleNewsArtsUrl,
  //   local: process.env.googleNewsLocalUrl,
  //   tech: process.env.googleNewsTechUrl,
  //   world: process.env.googleNewsWorldUrl,
  // }

  const categories = await getCategory().then((s) => s.categories)
  // console.log("categories: ", categories)
  const categoryUrl = categories.filter((c) => c.name === category)[0]
    .google_news_url
  const categoryId = categories.filter((c) => c.name === category)[0].id
  const sources = categories.filter((c) => c.name === category)[0].source
  const currentSource = (source) => {
    return sources.find((s) => s.name === source)
  }
  const isVerifiedSource = (source) =>
    sources.find((s) => s.name === source) ? true : false

  const urlToScrape = categoryUrl //categoriesUrls[category]
  const limitDate = new Date(date)
  const response = await axios.get(urlToScrape)
  const $ = cheerio.load(response.data)
  const source = "https://news.google.com/"
  let newLastDate = limitDate
  const articles = await Promise.all(
    $("article.IBr9hb, article.IFHyqb.DeXSAc")
      .filter((i, article) => {
        const hasImage = $(article).find("img.Quavad").length > 0
        const verifiedSource = isVerifiedSource(
          $(article).find("span.vr1PYe").text().trim()
        )
        const articleDatetime = new Date(
          $(article).find("time.hvbAAd").attr("datetime")
        )
        const isRecent = articleDatetime > limitDate
        if (articleDatetime > newLastDate) {
          newLastDate = articleDatetime
        }
        // console.log(
        //   `hasImage: ${hasImage}, isRecent: ${isRecent}, currentSource: ${
        //     currentSource($(article).find("span.vr1PYe").text().trim())?.name
        //   }, isVerified: ${verifiedSource}, | Overall:, ${
        //     hasImage && isRecent && verifiedSource
        //   }`
        // )
        return hasImage && isRecent && verifiedSource
      })
      .map(async (i, article) => {
        const sourceId = sources.filter(
          (s) => s.name === $(article).find("span.vr1PYe").text().trim()
        )[0].id
        const articleObj = {
          scraped_from: source,
          title: $(article).find("h4").text().trim(),
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

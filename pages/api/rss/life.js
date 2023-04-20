import prisma from "@/lib/prisma"

// import scrapeRss from "../../utils/rss/scrapeRss"

export default async function handler(req, res) {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/xml")

  console.log("Request to /api/rss/news")

  // Instructing the Vercel edge to cache the file (for 1 hour) // for 5 min
  // res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=360")

  // for now, all article to fb, later, filter with main-category (grouped-similar categories, in /api/rss-category-name) for each fb page
  const data = await prisma.Article.findMany({
    where: {
      categoryId: 7,
    },
    select: {
      title: true,
      short_slug: true,
      published_at: true,
      google_thumb: true,
    },
    orderBy: {
      published_at: "desc",
    },
    take: 30,
  })

  // generate rss feed
  let xml = `<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:mi="http://schemas.ingestion.microsoft.com/common/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
    <channel>
      <title>كل اخبارك</title>
      <link>https://www.msrnow.com/</link>
      <description>كل اخبارك - البوابة العربية للأخبار - مصدرك الأول للأخبار باللغة العربية</description>
      <language>ar-eg</language>
      <lastBuildDate>${new Date()}</lastBuildDate>
      <copyright>كل أخبارك</copyright>`

  const formatDate = (date) => {
    const input_datetime_utc = new Date(date)

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Africa/Cairo",
    }
    const cairo_datetime_str = input_datetime_utc.toLocaleString(
      "en-US",
      options
    )
    return cairo_datetime_str
  }

  data.forEach((item) => {
    xml += `
    <item>
    <title>${item.title}</title>
    <link>https://www.msrnow.com/${item.short_slug}</link>
    <guid isPermaLink="false">${item.short_slug}</guid>
    <pubDate>${formatDate(item.published_at)}</pubDate>
    <content:encoded><![CDATA[ <img 
      src="${item.google_thumb}" /> ]]>
      </content:encoded>
    <image>
    <url>${item.google_thumb.replace("&", "&amp;")}</url>
    </image>
    <media:content url="${item.google_thumb.replace(
      "&",
      "&amp;"
    )}" type="image/jpeg" medium="image"> </media:content>
      </item>`
  })

  xml += `
    </channel>
    </rss>`

  res.end(xml)
}

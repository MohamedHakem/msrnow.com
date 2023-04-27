import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  // Query the database to get a list of all dates
  const dates = await getDates()

  // get uniqueDates, but filtering the dates
  const uniqueDates = await getUniqueDates(dates)

  // Map the dates to a list of sitemap index urls/files
  const sitemaps = await getSitemaps(uniqueDates)

  const sitemapIndex = getSitemapIndex(sitemaps)

  // Set cache headers to whatever time remaining to midnight
  const maxAge = Math.floor(
    (new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    ) -
      new Date()) /
      1000
  )

  res.setHeader("Cache-Control", `public, max-age=${maxAge}`)

  // Set response content type to XML
  res.setHeader("Content-Type", "application/xml")

  // Send sitemap index XML
  res.send(sitemapIndex)
}

async function getDates() {
  const dates = await prisma.article.findMany({
    select: {
      createdAt: true,
    },
    distinct: ["createdAt"],
    orderBy: {
      createdAt: "asc",
    },
  })

  return dates
}

async function getUniqueDates(dates) {
  let lastDate = null
  const uniqueDates = await dates.filter((date) => {
    const currentDate = date.createdAt.toISOString().substring(0, 10)
    if (lastDate === currentDate) {
      return false
    } else {
      lastDate = currentDate
      return true
    }
  })

  return uniqueDates
}

async function getSitemaps(uniqueDates) {
  // console.log("uniqueDates[0] Before: ", uniqueDates[0])
  uniqueDates.reverse()
  // console.log("uniqueDates[0] After: ", uniqueDates[0])
  return uniqueDates.map((date) => {
    const year = new Date(date.createdAt).getFullYear()
    const month = new Date(date.createdAt).getMonth()
    const day = new Date(date.createdAt).getDate()
    const lastmod = new Date(
      Date.UTC(year, month, day, 23, 59, 0)
    ).toISOString()

    return {
      loc: `https://www.msrnow.com/sitemap/${year}/${month + 1}/${day}`,
      lastmod: lastmod,
    }
  })
}

function getSitemapIndex(sitemaps) {
  return `<?xml version="1.0" encoding="UTF-8"?> 
  <sitemapindex  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">
  ${sitemaps
    .map(
      (s) =>
        "<sitemap>\n" +
        "<loc>" +
        s.loc +
        "</loc>\n" +
        "<lastmod>" +
        s.lastmod +
        "</lastmod>\n" +
        "</sitemap>"
    )
    .join("\n")}
  </sitemapindex>`
}

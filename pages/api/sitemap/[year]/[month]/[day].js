import validateSitemapDate from "@/utils/validateSitemapDate"

import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  console.log("[date].js HIT")
  const { year, month, day } = req.query

  if (!validateSitemapDate(req.query)) {
    return res.status(400).json({
      message:
        "Date is wrong, please try again with a valid date like https://www.msrnow.com/sitemap/2023/4/27",
    })
  }

  const sitemap = await getSitemap({ year, month, day })

  if (!sitemap) {
    return res.status(404).end()
  }

  // Set cache headers, for 5 mins
  res.setHeader("Cache-Control", "public, max-age=300")

  // Set response content type to XML
  res.setHeader("Content-Type", "application/xml")

  // Send sitemap XML
  res.send(sitemap)
}

async function getSitemap({ year, month, day }) {
  const dateFrom = new Date(year, month - 1, day)
  const dateUpTo = new Date(dateFrom.getTime() + 86400000).toISOString()

  const articles = await prisma.article.findMany({
    where: {
      published_at: {
        lt: new Date(dateUpTo),
        gte: new Date(dateFrom.toISOString()),
      },
    },
    orderBy: {
      published_at: "desc",
    },
    select: {
      title: true,
      slug: true,
      published_at: true,
      google_thumb: true,
    },
  })

  if (!articles.length) {
    return null
  }

  const urls = articles.map((a) => ({
    loc: `https://www.msrnow.com/news/${a.slug}`,
    lastmod: a.published_at.toISOString(),
    changefreq: "Always",
    priority: "0.6",
    imageLoc: `https://imagecdn.app/v2/image/${a.google_thumb}?width=700&amp;height=350`,
    imageTitle: escapeXML(a.title),
    imageCaption: escapeXML(a.title),
  }))

  return getSitemapXML(urls)
}

function getSitemapXML(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${urls
        .map(
          (u) =>
            "<url xmlns:image='http://www.google.com/schemas/sitemap-image/1.1'>\n" +
            "<loc>" +
            u.loc +
            "</loc>\n" +
            "<lastmod>" +
            u.lastmod +
            "</lastmod>\n" +
            "<changefreq>" +
            u.changefreq +
            "</changefreq>\n" +
            "<priority>" +
            u.priority +
            "</priority>\n" +
            "<image:image>\n" +
            "<image:loc>" +
            u.imageLoc +
            "</image:loc>\n" +
            "<image:title>" +
            u.imageTitle +
            "</image:title>\n" +
            "<image:caption>" +
            u.imageCaption +
            "</image:caption>\n" +
            "</image:image>\n" +
            "</url>"
        )
        .join("\n")}
    </urlset>`
}

function escapeXML(str) {
  return str.replace(
    /[<>&'"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      }[c])
  )
}

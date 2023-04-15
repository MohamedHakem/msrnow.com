export default async function handler(req, res) {
  const isProduction = process.env.NODE_ENV === "production"
  const baseUrl = isProduction
    ? "https://www.msrnow.com"
    : "http://localhost:3000"

  if (req.method === "GET") {
    // trigger a scrape for all category pages
    console.time("TRIGGERING CATEGORIES AUTO SCRA*PER, took: ")
    // console.log(
    //   `await fetch("${baseUrl}/sports"): `,
    //   await fetch(`${baseUrl}/sports`).then((t) => t.statusText) // check the statusText if it's "OK"
    // )
    await fetch(`${baseUrl}/sports`)
    await fetch(`${baseUrl}/finance`)
    await fetch(`${baseUrl}/news/arts`)
    await fetch(`${baseUrl}/news/egypt`)
    await fetch(`${baseUrl}/news/world`)
    await fetch(`${baseUrl}/news/local`)
    await fetch(`${baseUrl}/news/politics`)

    console.timeEnd("TRIGGERING CATEGORIES AUTO SCRA*PER, took: ")

    return res.status(200).json({
      message: "triggered all categories auto-scraper-to-db",
      success: true,
    })
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false })
  }
}

import { Octokit } from "@octokit/core"

const octokit = new Octokit({
  auth: `${process.env.GITHUB_ACCESS_TOKEN}`,
})

async function getLatestEgyptNewsFromGithub(num, category) {
  const today = new Date()
  let articles = []
  let fetchedArticlesCount = 0

  while (fetchedArticlesCount < num) {
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, "0")
    const day = today.getDate().toString().padStart(2, "0")
    const path = `content/news/google/${category}/${year}-${month}/${year}-${month}-${day}-${category}-news-articles.json`
    console.log(
      `Fetched ${articles.length} article so far, accessing articles from: `,
      year,
      month,
      day
    )

    try {
      const {
        data: { content },
      } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: "MohamedHakem",
        repo: "news-website-content",
        path,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })

      const articlesArray = JSON.parse(
        Buffer.from(content, "base64").toString("utf-8")
      )["egypt-news-articles"]

      const remainingArticlesCount = num - fetchedArticlesCount

      // sort the articleArray to take the most recent num of it
      articlesArray.sort((a, b) => new Date(b.datetime) - new Date(a.datetime))

      if (articlesArray.length >= remainingArticlesCount) {
        articles.push(...articlesArray.slice(0, remainingArticlesCount))
        fetchedArticlesCount = num
      } else {
        articles.push(...articlesArray)
        fetchedArticlesCount += articlesArray.length
        today.setDate(today.getDate() - 1) // move to the previous day
      }
    } catch (err) {
      if (err.status === 404) {
        // file not found, move to the previous day
        today.setDate(today.getDate() - 1)
      } else {
        console.error(
          "Error occurred while fetching articles:",
          err,
          "err.message: ",
          err.message
        )
        return
      }
    }

    // if we reached the start of the year, move to the previous year and December
    if (
      today.getFullYear() < year ||
      (today.getFullYear() === year && today.getMonth() < 1)
    ) {
      if (today.getMonth() === 0) {
        today.setFullYear(today.getFullYear() - 1)
        today.setMonth(11)
      } else {
        today.setMonth(today.getMonth() - 1)
      }
    }
  }

  console.log(`Fetched ${articles.length} recent ${category} articles.`)
  // articles.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  return articles
}

export { getLatestEgyptNewsFromGithub }

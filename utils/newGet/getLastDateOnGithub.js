import { Octokit } from "@octokit/core"

async function getLastDateOnGithub(category) {
  const octokit = new Octokit({
    auth: `${process.env.GITHUB_ACCESS_TOKEN}`,
  })

  const isProduction = process.env.NODE_ENV === "production"

  // const egPath = `content/news/google/${category}/${category}-last-date.json`
  // const sportsPath = `content/news/google/${category}/${category}-last-date.json`

  // const path = category == "egypt" ? egPath : sportsPath
  const path = `content/news/google/${category}/${category}-last-date-${
    isProduction ? "db" : "db-dev"
  }.json`

  console.log("path: ", path)

  try {
    const res = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "MohamedHakem",
        repo: "news-website-content",
        path: path,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    )

    const content = res.data.content
    const decodedContent = Buffer.from(content, "base64").toString("utf-8")
    const lastDate = JSON.parse(decodedContent)
    console.log(`${category} News Last Date From GitHub: ${lastDate.lastDate}`)
    return lastDate.lastDate
  } catch (err) {
    console.error(err)
  }
}

export { getLastDateOnGithub }

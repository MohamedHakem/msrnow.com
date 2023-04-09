import { Octokit } from "@octokit/core"

async function updateLastDateOnGithub(dateToSave, category) {
  const octokit = new Octokit({
    auth: `${process.env.GITHUB_ACCESS_TOKEN}`,
  })

  const isProduction = process.env.NODE_ENV === "production"

  // const egPath = `content/news/google/${category}/${category}-last-date.json`;
  // const sportsPath = `content/news/google/${category}/${category}-last-date.json`;

  // const path = category == 'egypt' ? egPath : sportsPath;
  const path = `content/news/google/${category}/${category}-last-date-${
    isProduction ? "db" : "db-dev"
  }.json`

  try {
    // Retrieve file contents from repo
    const { data } = await octokit.request(
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

    // Decode file contents from base64 and parse as JSON
    const fileContents = JSON.parse(
      Buffer.from(data.content, "base64").toString()
    )

    // Update lastDate value
    fileContents.lastDate = new Date(dateToSave).toISOString()

    // Encode updated file contents as base64
    const updatedContent = Buffer.from(
      JSON.stringify(fileContents, null, 2)
    ).toString("base64")

    // Save updated file contents to repo
    await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner: "MohamedHakem",
      repo: "news-website-content",
      path: path,
      message: `Update lastDate on ${path}`,
      content: updatedContent,
      sha: data.sha,
      committer: {
        name: "Mohamed Hakem",
        email: "mohamedhakem959628@gmail.com",
      },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })

    console.log(`Updated lastDate of ${dateToSave} to ${path}`)
  } catch (err) {
    console.error("err on updating date to egypt-last-date.json: ", err)
  }
}

export { updateLastDateOnGithub }

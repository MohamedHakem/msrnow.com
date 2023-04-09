import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: `${process.env.GITHUB_ACCESS_TOKEN}`
});

async function addArticlesToGitHub(newArticles, category) {
  console.log(`saving new ${category} articles to github...`);
  const date = new Date(newArticles[0].datetime);
  const filename = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}-${category}-news-articles.json`;
  const path = `content/news/google/${category}/${date.getFullYear()}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${filename}`;
  const message = `Development: Add ${newArticles.length} ${category} article(s)`;

  try {
    const {
      data: { content, sha }
    } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'MohamedHakem',
      repo: 'news-website-content',
      path,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    // file found
    const articlesArray = JSON.parse(
      Buffer.from(content, 'base64').toString('utf-8')
    )['egypt-news-articles'];
    // add new scraped articles to the file's array
    articlesArray.push(...newArticles);

    // clean the combined array, in case there's duplicates (based on the title)
    const unique = new Set();
    const articlesArrayCleaned = articlesArray.filter((obj) => {
      if (!unique.has(obj.title)) {
        unique.add(obj.title);
        return true;
      }
      return false;
    });

    const newContent = JSON.stringify(
      { 'egypt-news-articles': articlesArrayCleaned },
      null,
      2
    );
    const newContentEncoded = Buffer.from(newContent).toString('base64');

    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: 'MohamedHakem',
      repo: 'news-website-content',
      path,
      message,
      content: newContentEncoded,
      sha,
      committer: {
        name: 'Mohamed Hakem',
        email: 'mohamedhakem959628@gmail.com'
      },
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    // log successful update
    console.log(`${message}: File ${path} updated successfully.`);
  } catch (err) {
    if (err.status === 404) {
      // file not found, create it and add the newArticles to it
      const content = JSON.stringify(
        { 'egypt-news-articles': newArticles },
        null,
        2
      );
      const encodedContent = Buffer.from(content).toString('base64');

      await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'MohamedHakem',
        repo: 'news-website-content',
        path,
        message,
        content: encodedContent,
        committer: {
          name: 'Mohamed Hakem',
          email: 'mohamedhakem959628@gmail.com'
        },
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      console.log(`File ${path} created and ${message} successfully.`);
    } else {
      console.error(`err is not 404 on saving ${category}: `, err);
    }
  }
}

export { addArticlesToGitHub };

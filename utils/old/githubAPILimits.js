import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: `${process.env.GITHUB_ACCESS_TOKEN}`
});

const githubAPILimits = async () => {
  try {
    const rateLimit = await octokit.request('GET /rate_limit', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    return rateLimit;
  } catch (err) {
    console.log('err: ', err);
  }
};
export { githubAPILimits };

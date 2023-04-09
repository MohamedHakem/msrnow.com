const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

// import { sanitizeTitle } from '../sanitizeTitle';
// import { addArticlesToGitHub } from '../saveArticle/addArticlesToGithub';

async function scrapeMsrnow() {
  console.log('===== [scrapeMsrnow is running] =====');
  const site_url = 'https://msrnow.com';

  const allLinks = [];
  const visitedLinks = new Set();
  const linksToVisit = new Set([site_url]);

  while (linksToVisit.size > 0) {
    const currentLink = linksToVisit.values().next().value;
    linksToVisit.delete(currentLink);
    visitedLinks.add(currentLink);

    try {
      const response = await axios.get(currentLink);
      const $ = cheerio.load(response.data);

      const pageLinks = $('a')
        .map(function () {
          const href = $(this).attr('href');
          if (!href) {
            return;
          }

          const parsedUrl = url.parse(href);

          if (
            parsedUrl.host !== 'msrnow.com' &&
            parsedUrl.href.indexOf(site_url) !== 0
          ) {
            return;
          }

          const path = parsedUrl.path || '/';
          if (path.length >= 16) {
            allLinks.push(href);
            return;
          }

          const resolvedLink = url.resolve(currentLink, href);
          if (!visitedLinks.has(resolvedLink)) {
            visitedLinks.add(resolvedLink);
            linksToVisit.add(resolvedLink);
          }

          return resolvedLink;
        })
        .get()
        .filter((link) => link !== undefined);

      allLinks.push(...pageLinks);
    } catch (err) {
      console.error(`Error occurred while fetching ${currentLink}: ${err}`);
    }
  }

  return allLinks;
}

export { scrapeMsrnow };

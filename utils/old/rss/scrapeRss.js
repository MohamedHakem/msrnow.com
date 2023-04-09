const axios = require('axios');
const cheerio = require('cheerio');
import { editThumb } from '../editThumb';

// scrape msrnow.com and grap the first 5 articles that have "msrnow.com/news/egypt" in it,
// grap the title/link/img/datetime (later maybe use the "desc" for fb post caption)

export default async function scrapeRss(categories) {
  const baseUrl = 'https://www.msrnow.com/';
  const articles = [];

  for (const category of categories) {
    const url = `${baseUrl}${category}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $('li.news-item')
      .slice(0, 4)
      .each((i, element) => {
        const article = {};
        article.title = $(element).find('h2 span').text().trim();
        article.link = $(element).find('a').attr('href');
        article.img = editThumb(
          { thumb: $(element).find('img').attr('src') },
          900
        ).obj.thumb;
        article.datetime = $(element).find('time').attr('datetime');
        article.category = category;
        articles.push(article);
      });
  }

  // filter any duplicate news on categories
  const uniqueArticles = [
    ...new Map(articles.map((article) => [article.title, article])).values()
  ];

  // Sort articles by datetime in descending order
  uniqueArticles.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  return uniqueArticles;
}

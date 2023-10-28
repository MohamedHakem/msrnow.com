import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { year: string; month: string; day: string } }) {
  try {
    console.log('[date].js HIT');
    const { year, month, day } = params;

    const sitemap = await getSitemap({ year, month, day });

    if (!sitemap) {
      return new Response(
        `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
      <channel>
        <title>Msr NOW</title>
        <link>https://www.msrnow.com</link>
        <description>The News Platform for the Web</description>
      </channel>
      </rss>`,
        {
          status: 404,
          headers: {
            'Cache-Control': `public, max-age=${300}`,
            'Content-Type': 'application/xml'
          }
        }
      );
    }

    const routeResponse = new Response(sitemap, {
      headers: {
        'Cache-Control': `public, max-age=${300}`,
        'Content-Type': 'application/xml'
      }
    });

    return routeResponse;
  } catch (error: any) {
    console.log('[/api/[year]/[month]/[day]/] error: ', error);
    return new NextResponse('[/api/[year]/[month]/[day]/] Internal Error', { status: 500 });
  }
}

async function getSitemap({ year, month, day }: { year: string; month: string; day: string }) {
  const currentYear = parseInt(year);
  const currentMonth = parseInt(month);
  const currentDay = parseInt(day);

  const dateFrom = new Date(currentYear, currentMonth - 1, currentDay);
  const dateUpTo = new Date(dateFrom.getTime() + 86400000).toISOString();

  const articles = await db.article.findMany({
    where: {
      published_at: {
        lt: new Date(dateUpTo),
        gte: new Date(dateFrom.toISOString())
      }
    },
    orderBy: {
      published_at: 'desc'
    },
    select: {
      title: true,
      slug: true,
      published_at: true,
      google_thumb: true
    }
  });

  if (!articles.length) {
    return null;
  }

  const urls = articles.map((a) => ({
    loc: `https://www.msrnow.com/news/${a.slug}`,
    lastmod: a.published_at.toISOString(),
    changefreq: 'Always',
    priority: '0.6',
    imageLoc: `https://imagecdn.app/v2/image/${a.google_thumb}?width=700&amp;height=350`,
    imageTitle: escapeXML(a.title),
    imageCaption: escapeXML(a.title)
  }));

  return getSitemapXML(urls);
}
function getSitemapXML(
  urls: {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
    imageLoc: string;
    imageTitle: any;
    imageCaption: any;
  }[]
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${urls
        .map(
          (u) =>
            "<url xmlns:image='http://www.google.com/schemas/sitemap-image/1.1'>\n" +
            '<loc>' +
            u.loc +
            '</loc>\n' +
            '<lastmod>' +
            u.lastmod +
            '</lastmod>\n' +
            '<changefreq>' +
            u.changefreq +
            '</changefreq>\n' +
            '<priority>' +
            u.priority +
            '</priority>\n' +
            '<image:image>\n' +
            '<image:loc>' +
            u.imageLoc +
            '</image:loc>\n' +
            '<image:title>' +
            u.imageTitle +
            '</image:title>\n' +
            '<image:caption>' +
            u.imageCaption +
            '</image:caption>\n' +
            '</image:image>\n' +
            '</url>'
        )
        .join('\n')}
    </urlset>`;
}
function escapeXML(str: string): string {
  const xmlEntities: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;'
  };

  return str.replace(/[<>&'"]/g, (c) => xmlEntities[c]);
}

// function escapeXML(str: string) {
//   return str.replace(
//     /[<>&'"]/g,
//     (c) =>
//       ({
//         '<': '&lt;',
//         '>': '&gt;',
//         '&': '&amp;',
//         "'": '&apos;',
//         '"': '&quot;'
//       }[c])
//   );
// }

import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { year: string; month: string; day: string } }) {
  try {
    console.log('[/api/RSS] HIT');
    const rss = await getRSS();

    if (!rss) {
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

    const routeResponse = new Response(rss, {
      headers: {
        'Cache-Control': `public, max-age=${3600}`,
        'Content-Type': 'text/xml'
      }
    });

    return routeResponse;
  } catch (error: any) {
    console.log('[/api/RSS] error: ', error);
    return new NextResponse('[/api/RSS] Internal Error', { status: 500 });
  }
}

async function getRSS() {
  const articles = await db.article.findMany({
    orderBy: {
      published_at: 'desc'
    },
    select: {
      title: true,
      short_slug: true,
      published_at: true,
      google_thumb: true
    },
    take: 50
  });

  if (!articles.length) {
    return null;
  }

  let xml = `<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:mi="http://schemas.ingestion.microsoft.com/common/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
  <channel>
    <title>كل اخبارك</title>
    <link>https://www.msrnow.com/</link>
    <description>كل اخبارك - البوابة العربية للأخبار - مصدرك الأول للأخبار باللغة العربية</description>
    <language>ar-eg</language>
    <lastBuildDate>${new Date()}</lastBuildDate>
    <copyright>كل أخبارك</copyright>`;

  articles.forEach((item) => {
    xml += `
      <item>
      <title>${item.title}</title>
      <link>https://www.msrnow.com/${item.short_slug}</link>
      <guid isPermaLink="false">${item.short_slug}</guid>
      <pubDate>${formatDate(item.published_at)}</pubDate>
      <content:encoded><![CDATA[ <img 
        src="${item.google_thumb}" /> ]]>
        </content:encoded>
      <image>
      <url>${item.google_thumb.replace('&', '&amp;')}</url>
      </image>
      <media:content url="${item.google_thumb.replace('&', '&amp;')}" type="image/jpeg" medium="image"> </media:content>
        </item>`;
  });

  xml += `
  </channel>
  </rss>`;

  return xml;
}

const formatDate = (date: Date) => {
  const input_datetime_utc = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Africa/Cairo'
  };
  const cairo_datetime_str = input_datetime_utc.toLocaleString('en-US', options);
  return cairo_datetime_str;
};

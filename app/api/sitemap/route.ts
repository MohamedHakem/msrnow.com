import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  const response = new NextResponse();
  const headersList = headers();
  try {
    const dates = await getDates();
    const uniqueDates = await getUniqueDates(dates);
    const sitemaps = await getSitemaps(uniqueDates);
    const sitemapIndex = getSitemapIndex(sitemaps);
    const maxAge: number = Math.floor(
      (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).getTime() -
        new Date().getTime()) /
        1000
    );

    const routeResponse = new Response(sitemapIndex, {
      headers: {
        'Cache-Control': `public, max-age=${maxAge}`,
        'Content-Type': 'application/xml'
      }
    });

    return routeResponse;
  } catch (error: any) {
    console.log('[/api/register] REGISTRATION_ERROR: ', error);
    return new NextResponse('[/api/register] Internal Error', { status: 500 });
  }
}

async function getDates() {
  const dates = await db.article.findMany({
    select: {
      createdAt: true
    },
    distinct: ['createdAt'],
    orderBy: {
      createdAt: 'asc'
    }
  });
  return dates;
}
async function getUniqueDates(
  dates: {
    createdAt: Date;
  }[]
) {
  let lastDate: string | null = null;
  const uniqueDates = dates.filter((date) => {
    const currentDate = date.createdAt.toISOString().substring(0, 10);
    if (lastDate === currentDate) {
      return false;
    } else {
      lastDate = currentDate;
      return true;
    }
  });
  return uniqueDates;
}
async function getSitemaps(
  uniqueDates: {
    createdAt: Date;
  }[]
) {
  uniqueDates.reverse();
  return uniqueDates.map((date) => {
    const year = new Date(date.createdAt).getFullYear();
    const month = new Date(date.createdAt).getMonth();
    const day = new Date(date.createdAt).getDate();
    const lastmod = new Date(Date.UTC(year, month, day, 23, 59, 0)).toISOString();

    return {
      loc: `https://www.msrnow.com/sitemap/${year}/${month + 1}/${day}`,
      lastmod: lastmod
    };
  });
}
function getSitemapIndex(
  sitemaps: {
    loc: string;
    lastmod: string;
  }[]
) {
  return `<?xml version="1.0" encoding="UTF-8"?> 
  <sitemapindex  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">
  ${sitemaps
    .map((s) => '<sitemap>\n' + '<loc>' + s.loc + '</loc>\n' + '<lastmod>' + s.lastmod + '</lastmod>\n' + '</sitemap>')
    .join('\n')}
  </sitemapindex>`;
}

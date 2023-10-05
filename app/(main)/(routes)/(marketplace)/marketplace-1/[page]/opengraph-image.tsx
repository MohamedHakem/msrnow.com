import OpengraphImage from '@/components/marketplace/opengraph-image';
// import { getPage } from 'lib/shopify';

export const runtime = 'edge';

export default async function Image({ params }: { params: { page: string } }) {
  // const page = await getPage(params.page);
  // const title = page.seo?.title || page.title;
  const title = "this is the page title";

  return await OpengraphImage({ title });
}

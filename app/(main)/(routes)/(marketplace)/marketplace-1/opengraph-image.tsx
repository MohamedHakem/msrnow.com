import OpengraphImage from '@/components/marketplace/opengraph-image';

export const runtime = 'edge';

export default async function Image() {
  return await OpengraphImage();
}

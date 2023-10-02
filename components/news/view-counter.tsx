// call increment action in the article's single page, this is just a RSC views counter for display (check leerob's approach)
import getViewsBySlug from '@/data/getViews';
import { Eye } from 'lucide-react';
import { Suspense } from 'react';

export default async function ViewCounter({ slug }: { slug: string }) {
  // imitate delay
  //  await new Promise((resolve) => setTimeout(resolve, 5000));

  const views = await getViewsBySlug(slug);

  return typeof views === 'string' ? (
    <></>
  ) : (
    <span className="dark:text-neutral-400 flex flex-row gap-[2px] pl-0 rounded-md text-[#6b6b6b]/60 hover:text-[#6b6b6b] animate-fadeIn">
      <Suspense fallback={<div className="w-14 h-5 bg-gray-100 animate-pulse"></div>}>
        <Eye strokeWidth={1.25} size={20} className="h-auto" />
        <span className="text-sm">{views}</span>
      </Suspense>
    </span>
  );
}

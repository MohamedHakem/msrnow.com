'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from '@/components/marketplace/grid/tile';
import { createUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set('image', nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set('image', previousImageIndex.toString());
  // const previousUrl = createUrl(pathname, previousSearchParams);

  // const buttonClassName = 'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <div dir="ltr" className="flex flex-col laptop:flex-row gap-4 laptop:w-[60%] pb-1 laptop:pt-4">
      <div className="h-auto w-full laptop:w-[650px] flex-1 laptop:w-8/10 relative aspect-square max-h-full overflow-hidden">
        {images[imageIndex] && (
          <Image
            unoptimized
            className="h-auto w-[650px] object-cover"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={`https://imagecdn.app/v2/image/${images[imageIndex]?.src as string}?width=650&height=650`}
            priority={true}
          />
        )}
      </div>

      {images.length > 1 ? (
        <ul className="flex flex-row laptop:flex-col w-2/10 laptop:mb-0 gap-3 overflow-auto pb-1 laptop:pt-1 justify-center laptop:justify-start">
          {images.map((image, index) => {
            const imageSearchParams = new URLSearchParams(searchParams.toString());
            imageSearchParams.set('image', index.toString());

            return (
              <li key={image.src} className="h-20 w-20">
                <Link
                  aria-label="Enlarge product image"
                  href={createUrl(pathname, imageSearchParams)}
                  scroll={false}
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={`https://imagecdn.app/v2/image/${image.src}?width=80&height=80`}
                    width={80}
                    height={80}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

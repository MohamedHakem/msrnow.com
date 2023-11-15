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

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set('image', previousImageIndex.toString());

  const featuredImgWidth = 650

  return (
    <div dir="ltr" className="flex flex-col laptop:flex-row gap-2 laptop:w-[60%] pb-1 laptop:pt-4">
      <div className={`h-fit w-full laptop:w-[${featuredImgWidth}px] flex-1 laptop:w-8/10 relative aspect-square max-h-full overflow-hidden`}>
        {images[imageIndex] && (
          <Image
            unoptimized
            className={`h-fit w-[${featuredImgWidth}px] object-fill laptop:rounded-lg`}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={`https://wsrv.nl/?url=${images[imageIndex]?.src as string}?default=${images[imageIndex]?.src as string}&l=9&af=''&il=''&n=-1&w=${featuredImgWidth}&h=${featuredImgWidth}&output=webp`}
            priority={true}
          />
        )}
      </div>

      {images.length > 1 ? (
        <ul className="flex flex-row laptop:flex-col w-2/10 laptop:mb-0 gap-3 overflow-y-auto scroll-smooth pb-1 laptop:pt-1 justify-end px-4 laptop:px-0">
          {images.map((image, index) => {
            const imageSearchParams = new URLSearchParams(searchParams.toString());
            imageSearchParams.set('image', index.toString());

            return (
              <li key={image.src} className="h-20 w-20 min-w-[80px] border rounded-md">
                <Link
                  aria-label="Enlarge product image"
                  href={createUrl(pathname, imageSearchParams)}
                  scroll={false}
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={`https://wsrv.nl/?url=${image.src}?default=${image.src}&l=9&af=''&il=''&n=-1&w=${80}&h=${80}&output=webp`}
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

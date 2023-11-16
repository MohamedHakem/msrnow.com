'use client';

// import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from '@/components/marketplace/grid/tile';
import { createUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

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
    <div dir="ltr" className="flex flex-col laptop:flex-row gap-2 w-full laptop:w-[60%] pb-1 laptop:pt-4">
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
        <div className="absolute w-[52px] h-[52px] laptop:w-14 laptop:h-14 top-[12px] left-4 flex justify-center items-center border border-blue-100 rounded-full bg-white shadow-sm
        hover:bg-gray-100 active:scale-90 transition-all duration-50 ease-in-out animate-fadeIn cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(`https://www.msrnow.com/${pathname}`)
            toast.success('تم نسخ الرابط')
          }}>
          <Share2 strokeWidth={2} className="-ml-1" size={28} />
        </div>
      </div>

      {images.length > 1 ? (
        <ScrollArea dir="rtl" className="w-full whitespace-nowrap scroll-smooth">
          <ul className={`flex flex-row laptop:flex-col w-2/10 laptop:mb-0 gap-3 overflow-x-auto scroll-smooth pb-1 laptop:pt-1 laptop:justify-start px-4 laptop:px-0 
            ${images.length < 4 ? "justify-center" : ""}`}
          >
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : null}
    </div>
  );
}

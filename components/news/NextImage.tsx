'use client';

import { featuredArticleType, newsType } from '@/types';
/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
// import { headers } from 'next/headers';
import { useState } from 'react';

import msrnowCoverImage from '@/public/images/msrnow-waiting-logo-optimized.jpg';
import Image from 'next/image';

export default function NextImage({
  article,
  width,
  index,
  loading
}: {
  article: featuredArticleType | newsType;
  width: number | undefined | null;
  index: number | undefined | null;
  loading?: "eager" | "lazy" | undefined;
}) {
  const [backup, setBackup] = useState(false);

  if (width) {
    const imgWidth = Math.floor(width)
    const height = Math.floor(width * (3 / 5));
    const imgUrl = article.google_thumb.replace(/=s0-w\d+/, `=s0-w${imgWidth}`).replace(/-h\d+/, `-h${height}`);
    // const optimizeImgUrl = `https://imagecdn.app/v2/image/${imgUrl}?width=${imgWidth}&height=${height}`
    // const src2x = article.google_thumb.replace(/=s0-w\d+/, `=s0-w${width * 2}`).replace(/-h\d+/, `-h${height * 2}`);
    const optimizedImgUrl = `https://wsrv.nl/?url=${imgUrl}&default=${imgUrl}&l=9&af=''&il=''&n=-1&w=${imgWidth}&h=${height}&output=webp`
    const src2x = optimizedImgUrl.replace(/=s0-w\d+/, `=s0-w${width * 2}`).replace(/-h\d+/, `-h${height * 2}`);
    const srcset = `${optimizedImgUrl} 1x, ${src2x} 2x`;

    // const newOptimized = `https://wsrv.nl/?url=${article.google_thumb}&default=${article.google_thumb}&l=9&af=''&il=''&n=-1&w=${imgWidth}&h=${height}&output=webp`
    // console.log("🚀 ~ file: NextImage.tsx:55 ~ newOptimized:", newOptimized)

    return (
      <img
        // src={imgUrl}
        src={optimizedImgUrl}
        alt={article.title}
        width={width}
        height={height}
        srcSet={srcset}
        fetchPriority={index ? (index < 2 ? 'high' : 'low') : 'auto'}
        className="min-w-full min-h-full bg-gray-100"
      />
    );
  } else {
    const imgWidth = 280;
    const height = Math.floor(imgWidth * (3 / 5));
    const imgUrl = article.google_thumb.replace(/=s0-w\d+/, `=s0-w${imgWidth}`).replace(/-h\d+/, `-h${height}`);
    // const optimizeImgUrl = `https://imagecdn.app/v2/image/${imgUrl}?width=${width}&height=${height}`
    // const src2x = article.google_thumb.replace(/=s0-w\d+/, `=s0-w${width * 2}`).replace(/-h\d+/, `-h${height * 2}`);
    const optimizedImgUrl = `https://wsrv.nl/?url=${imgUrl}&default=${imgUrl}&l=9&af=''&il=''&n=-1&w=${imgWidth}&h=${height}&output=webp`
    const src2x = optimizedImgUrl.replace(/=s0-w\d+/, `=s0-w${imgWidth * 2}`).replace(/-h\d+/, `-h${height * 2}`);
    const srcset = `${optimizedImgUrl} 1x, ${src2x} 2x`;

    const handleImage = () => {
      setBackup(true);
    };

    if (backup) {
      return (
        <div className="bg-gray-100 animate-pulse w-full h-auto">
          <Image
            unoptimized
            src={msrnowCoverImage}
            alt={article.title}
            className="h-auto w-full object-cover text-transparent"
          />
        </div>
      );
    } else {
      return (
        <img
          className="h-auto w-full object-cover bg-gray-100 text-transparent"
          srcSet={srcset}
          alt={article.title}
          src={optimizedImgUrl}
          loading={loading || "lazy"}
          onError={handleImage}
        />
      );
    }
  }
}

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

// import { sourcesById } from "@/lib/sources"
// import smallFallbackImage from "../../public/assets/images/smallFallbackImage.svg"
// import { isWorkingImage } from "../../utils/old/checkIfImageExists"
import { editThumb } from "../../utils/old/editThumb"
import { slugifyDate } from "../../utils/old/slugifyDate"

// const checkImage = async (imgUrl, unOptimizedImg) => {
//   // check and return a working version, optimized/unoptimized/fallback
//   const isOptimizedWorking = await isWorkingImage(imgUrl);

//   if (isOptimizedWorking.status) {
//     // console.log('isOptimizedWorking.url: ', isOptimizedWorking.url);
//     // set_imgSrc(isOptimizedWorking.url);
//     return isOptimizedWorking.url;
//   } else {
//     const isUnOptimizedWorking = await isWorkingImage(unOptimizedImg);
//     if (isUnOptimizedWorking.status) {
//       console.log('unOptimizedImg found');
//       const sizedUrl = editThumb(
//         { thumb: isUnOptimizedWorking.url },
//         280,
//         false,
//         true
//       ).obj.thumb;
//       // console.log('isUnOptimizedWorking: ', sizedUrl);
//       // console.log('imgSrc before: ', imgSrc);
//       // set_imgSrc('bl7');
//       return sizedUrl;
//       // console.log('imgSrc after: ', imgSrc);
//     } else {
//       console.log('set_imgSrc to smallFallbackImage');
//       // set_imgSrc(smallFallbackImage);
//       return smallFallbackImage;
//     }
//   }

//   // console.log('isOptimizedWorking: ', isOptimizedWorking);
//   // console.log('isUnOptimizedWorking: ', isUnOptimizedWorking);

//   // return isOptimizedWorking.status
//   //   ? isOptimizedWorking.url
//   //   : isUnOptimizedWorking.status
//   //   ? isUnOptimizedWorking.url
//   //   : smallFallbackImage;
//   return;
// };

export default function ArticleCard({ article, getBase64, category }) {
  // const slugifiedDate = slugifyDate(article.datetime)
  // const unOptimizedImg = article.google_thumb
  const editThumbRes = editThumb(article, 280, false, false)
  const updatedArticle = editThumbRes.obj
  // const source = sourcesById[category][updatedArticle.sourceId]

  const [imgSrc, set_imgSrc] = useState(updatedArticle.google_thumb)

  return (
    <li
      key={updatedArticle.titleSlug}
      className="news-item mb-2 rounded-lg border bg-white"
    >
      <Link href={`/news/${updatedArticle.slug}`} className="overflow-hidden">
        <Image
          unoptimized
          className="relative z-0 h-[280px] w-full rounded-t-xl object-cover lg:h-[135px]"
          src={imgSrc}
          alt={updatedArticle.title}
          width={244}
          height={135}
          placeholder={"blur"}
          blurDataURL={getBase64()}
          onError={() => set_imgSrc(updatedArticle.google_thumb.slice(30, -21))}
          sizes="(max-width: 768px) 100vw,
          (max-width: 1024px) 50vw,
          33vw"
        />
        <div className="my-2 text-right">
          <div className="pr-2">
            <h3 className="mb-2 text-base font-medium">
              <Balancer>{updatedArticle.title}</Balancer>
            </h3>
            <time
              dateTime={updatedArticle.datetime}
              className="text-sm font-medium opacity-70"
            >
              {updatedArticle.timeAgo}
            </time>
            <span className="hidden">{updatedArticle.source.name}</span>
          </div>
        </div>
      </Link>
    </li>
  )
}

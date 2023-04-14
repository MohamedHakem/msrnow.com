import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import smallFallbackImage from "@/public/assets/images/smallFallbackImage.svg"

// import Balancer from "react-wrap-balancer"

import { editThumb } from "../../utils/old/editThumb"

export default function Cardx360({ article, getBase64, category }) {
  const editThumbRes = editThumb(article, 300, false, false)
  const updatedArticle = editThumbRes.obj

  const [imgSrc, set_imgSrc] = useState(updatedArticle.google_thumb)
  // const handleImageError = () => {
  //   console.log("handleImageError called")
  // }

  return (
    <li className="news-item mb-0  rounded-lg bg-transparent md:mb-3">
      <Link href={`/news/${updatedArticle.slug}`} className="overflow-hidden">
        <Image
          unoptimized
          className="relative z-0 mx-auto box-content h-[180px] w-[368px] rounded-xl object-cover md:w-[300px] lg:h-[200px] lg:w-[322px]" // h-[280px] w-full
          src={imgSrc}
          alt={updatedArticle.title}
          width={360}
          height={180}
          placeholder={"blur"}
          blurDataURL={getBase64()}
          onLoadingComplete={(result) => {
            if (result.naturalWidth === 0) {
              set_imgSrc(updatedArticle.google_thumb.slice(30, -21))
            }
          }}
          onError={() => set_imgSrc(smallFallbackImage)}
          sizes="(max-width: 768px) 100vw,
          (max-width: 1024px) 50vw,
          33vw"
        />
        <div className="my-2 text-right">
          <div className="pr-0 text-black dark:text-white">
            <h3 className="mb-0 mr-[8px] pl-[1px] text-lg font-semibold md:text-[16px]">
              {/* {updatedArticle.title} */}
              {updatedArticle.title.replace(
                /\b\w+\.(com|net|org|co|uk)\b/gi,
                ""
              )}
            </h3>
            <time
              dateTime={updatedArticle.published_at}
              className="float-right mx-2 mt-[2px] text-xs font-medium opacity-100"
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

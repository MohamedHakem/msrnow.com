import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

// import Balancer from "react-wrap-balancer"

import { editThumb } from "../../utils/old/editThumb"

export default function Cardx360({ article, getBase64, category }) {
  const editThumbRes = editThumb(article, 700, false, false)
  const updatedArticle = editThumbRes.obj

  const [imgSrc, set_imgSrc] = useState(updatedArticle.google_thumb)
  // const handleImageError = () => {
  //   console.log("handleImageError called")
  // }

  return (
    <li
      key={updatedArticle.titleSlug}
      className="news-item mb-3 box-content rounded-lg bg-white"
    >
      <Link href={`/news/${updatedArticle.slug}`} className="overflow-hidden">
        <Image
          unoptimized
          className="relative z-0 box-content h-[180px] w-[360px] rounded-xl object-cover lg:h-[200px] lg:w-[322px]" // h-[280px] w-full
          src={imgSrc}
          alt={updatedArticle.title}
          width={360}
          height={180}
          placeholder={"blur"}
          blurDataURL={getBase64()}
          onError={() => set_imgSrc(updatedArticle.google_thumb.slice(30, -21))}
          sizes="(max-width: 768px) 100vw,
          (max-width: 1024px) 50vw,
          33vw"
        />
        <div className="my-2 text-right">
          <div className="pr-0">
            <h3 className="mb-0 pl-[1px] text-lg font-semibold md:text-[17px]">
              {updatedArticle.title}
            </h3>
            <time
              dateTime={updatedArticle.datetime}
              className="ml-2 text-sm font-medium opacity-80"
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

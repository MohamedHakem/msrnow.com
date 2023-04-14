import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import fallbackImage from "@/public/assets/images/fallbackImage.svg"
import { editThumb } from "@/utils/old/editThumb"
import Balancer from "react-wrap-balancer"

export default function FeaturedCard({ article, getBase64, category }) {
  const editThumbRes = editThumb(article, 1200)
  const updatedArticle = editThumbRes.obj
  const [imgSrc, set_imgSrc] = useState(updatedArticle.google_thumb)

  return (
    <li className="news-item" key={updatedArticle.short_slug}>
      <Link href={`/news/${updatedArticle.slug}`}>
        <div className="relative h-[330px] overflow-hidden rounded-lg border border-neutral-200 shadow-md dark:border-neutral-700 lg:h-[450px]">
          <div className="absolute bottom-0 z-10 h-3/5 w-full overflow-hidden bg-gradient-to-t from-black via-slate-900 to-transparent opacity-60"></div>
          {/* vercel limit on optimized source images using Image component, add unoptimized to opt-out */}
          <Image
            src={imgSrc}
            alt={updatedArticle.title}
            placeholder={"blur"}
            blurDataURL={getBase64()}
            onLoadingComplete={(result) => {
              if (result.naturalWidth === 0) {
                set_imgSrc(fallbackImage)
              }
            }}
            onError={() => set_imgSrc(fallbackImage)}
            priority
            sizes="(max-width: 768px) 100vw,
          (max-width: 1024px) 50vw,
          33vw"
            className="h-72 w-full object-cover object-center md:h-auto"
            fill="True"
            unoptimized
          />

          <div className="absolute inset-x-0 bottom-0 z-10 h-20 w-full backdrop-blur-sm"></div>
          <div className="absolute bottom-0 right-0 z-20 w-full py-2 pr-4 pl-1">
            <div className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-t from-black via-black to-transparent opacity-80"></div>
            <h2 className="mb-6 text-2xl font-bold leading-tight text-white backdrop-brightness-100 sm:text-2xl">
              <Balancer>{updatedArticle.title}</Balancer>
            </h2>
            <div className="absolute left-1 bottom-[4px] z-30 flex flex-row items-center">
              <time
                className="mr-1 text-sm font-medium text-white sm:text-base"
                dateTime={updatedArticle.published_at}
              >
                {updatedArticle.timeAgo}
              </time>
              <span className="status online mx-2 flex h-3 w-3 rounded-full bg-green-400 ring-1">
                <span className="status online flex h-3 w-4 animate-ping rounded-full bg-green-300 ring-1 transition ease-in-out"></span>
              </span>
              <span className="hidden">{updatedArticle.source.name}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

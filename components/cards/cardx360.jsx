import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import smallFallbackImage from "@/public/assets/images/smallFallbackImage.svg"

// import Balancer from "react-wrap-balancer"

import { editThumb } from "../../utils/old/editThumb"

export default function Cardx360({ article, getBase64, category, topBorder }) {
  const editThumbRes = editThumb(article, 300, false, false)
  const updatedArticle = editThumbRes.obj
  const [imgSrc, set_imgSrc] = useState(updatedArticle.google_thumb)

  const imgHandle = () => {
    console.log("[imgHandle] optimized img failed, fetching original img...")
    const googleImgUrl = updatedArticle.google_thumb.slice(30, -21)
    console.log("[imgHandle] googleImgUrl: ", googleImgUrl) // log the URL to check if it is correct
    fetch(`${googleImgUrl}`)
      .then((res) => {
        console.log("[imgHandle] fetch response: ", res) // log the response to check if it is successful
        if (res.ok) {
          console.log("[imgHandle]: original img being set...")
          set_imgSrc(googleImgUrl)
        } else {
          console.log(
            "[imgHandle]: original is not available, setting the fallback: ",
            googleImgUrl
          )
          set_imgSrc(smallFallbackImage)
        }
      })
      .catch((err) => {
        console.log("img err: ", err)
        set_imgSrc(smallFallbackImage)
      })
  }

  return (
    <li className="news-item mb-0  rounded-lg bg-transparent md:mb-3">
      <Link href={`/news/${updatedArticle.slug}`} className="overflow-hidden">
        <Image
          unoptimized
          className="relative z-0 mx-auto box-content h-[180px] w-[368px] rounded-xl object-cover md:w-[300px] lg:h-[200px] lg:w-[322px]" // h-[280px] w-full
          src={imgSrc}
          // src={imgSrc || imgSrc.src}
          // src={`${imgSrc}ss&format=jpg`}
          // src={
          //   // `https://imagecdn.app/v2/image/https://lh3.googleusercontent.com/proxy/gAGUZB7esxGttI=s0-w300-h180-dcrUGM1RwJ?width=300&height=180` ||
          //   smallFallbackImage
          // }
          alt={updatedArticle.title}
          width={360}
          height={180}
          placeholder={"blur"}
          blurDataURL={getBase64()}
          // onLoadingComplete={(result) => {
          //   if (result.naturalWidth === 0) {
          //     set_imgSrc(updatedArticle.google_thumb.slice(30, -21))
          //   }
          // }}
          // onError={() => set_imgSrc(smallFallbackImage)}
          onError={() => imgHandle()}
          // onError={() => console.log("onError")}
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
      {topBorder ? (
        <div className="mx-2 mt-7 border-t-2 border-slate-200 pt-3 dark:border-slate-600 md:hidden"></div>
      ) : (
        <div className="my-2"></div>
      )}
    </li>
  )
}

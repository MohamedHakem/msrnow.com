import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import smallFallbackImage from "@/public/assets/images/smallFallbackImage.svg"
import Balancer from "react-wrap-balancer"

import { editThumb } from "../../utils/old/editThumb"
import Canvas from "../canvas"

export default function Cardx360Animated({ article, getBase64, category }) {
  let staticArticle = {
    title: "لا إجماع على عودة سوريا إلى الجامعة العربية بعد اجتماع جدة	",
    slug: "لا-إجماع-على-عودة-سوريا-إلى-الجامعة-العربية-بعد-اجتماع-جدة	",
    published_at: "2023-04-15 18:07:28",
    google_thumb:
      "https://lh3.googleusercontent.com/proxy/L6YD57V_RjEBKFWCCFQ5WW4kjP4Php5dsTihgef8Pn3ZTJa3KAu7E7T8MGGm_IxH6ztWJ1o5wWEVjaM1TRQHTIapozzloE4eoivsAFMhUIkEWSd3b-7C8eVt9ZZ5C35M8u3k6fjM6EpFPMs0xlSqxTPgb6nR-kvy1DbwgTHzNLqVdsEfYeEdOkOaQ5oQHS4ydlcNqiQA4xTDAK961Rff2cLoNSezxO57bNc=s0-w280-h168-dcAeKEJE0E	",
  }

  const editThumbRes = editThumb(staticArticle, 480, false, false)
  const updatedArticle = editThumbRes.obj

  const [imgSrc, set_imgSrc] = useState(updatedArticle.google_thumb)
  // const handleImageError = () => {
  //   console.log("handleImageError called")
  // }

  const [showCutOut, setShowCutOut] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    setShowCutOut(true)
    setShowText(true)
  }, [])

  return (
    <div className="news-item mx-auto mb-0 w-[480px] rounded-lg bg-transparent md:mb-3">
      <Link href={`/news/${updatedArticle.slug}`} className="overflow-hidden">
        <div className="z-10 my-2 text-right">
          <div className="relative pr-0 text-black dark:text-white">
            <h3
              className={`
            ${
              showCutOut
                ? "top-[-13px] right-[0px]"
                : "top-[-45px] right-[-202px]"
            }
            
            absolute top-[-13px] z-10 -mt-4 mb-[-33px] w-[85%] text-lg font-semibold text-[#f6f8fc] transition-all duration-1000 ease-in-out hover:mt-0  md:text-[24px]`}
            >
              <Canvas
                text={updatedArticle.title.replace(
                  /\b\w+\.(com|net|org|co|uk)\b/gi,
                  ""
                )}
                font="Arial"
                fontSize={20}
                width={280}
              />
            </h3>
            <h3
              className={`
            ${showText ? "top-[-13px] opacity-100" : "top-[-45px] opacity-0"}
            
            absolute z-10 -mt-4 mb-[-33px] w-[55%] text-lg font-semibold transition-all duration-1000 delay-1000 ease-in-out hover:mt-0  md:text-[24px]`}
            >
              <Canvas
                text={updatedArticle.title.replace(
                  /\b\w+\.(com|net|org|co|uk)\b/gi,
                  ""
                )}
                font="Arial"
                fontSize={20}
                width={240}
              />
            </h3>
            <time
              dateTime={updatedArticle.published_at}
              className="float-right mx-2 mt-[2px] text-xs font-medium opacity-100"
            >
              {updatedArticle.timeAgo}
            </time>
          </div>
        </div>

        <Image
          unoptimized
          className="relative z-0 mx-auto box-content h-[180px] w-[368px] rounded-xl object-cover md:w-[300px] lg:h-[288px] lg:w-[480px]" // h-[280px] w-full
          src={imgSrc}
          alt={updatedArticle.title}
          width={480}
          height={288}
          // placeholder={"blur"}
          // blurDataURL={getBase64()}
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
      </Link>
    </div>
  )
}

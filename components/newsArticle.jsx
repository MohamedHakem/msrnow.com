import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import fallbackImage from "@/public/assets/images/fallbackImage.svg"

// import Link from "next/link"

// import { Twitter, TwitterIcon } from "lucide-react"
// import Balancer from "react-wrap-balancer"

import { Icons } from "@/components/icons"
import ArticleSocial from "./social/articleSocial"
import { VerticalShare } from "./stickyVerticalShare"

const ArticleRenderer = dynamic(
  () => import("@/components/old/ArticleRenderer"),
  {
    ssr: false,
  }
)

export const NewsArticle = ({
  articleData,
  imgSrc,
  imgSize,
  set_imgSrc,
  getBase64,
}) => {
  const [textSize, setTextSize] = useState(0)

  useEffect(() => {
    if (textSize === 0) {
      setTextSize(0)
    } else {
      setTextSize(textSize)
    }
  }, [textSize])

  const date = new Date(articleData.published_at)
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    // timeZoneName: "short",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: "ar-EG",
  }
  const formattedDate = new Date(date).toLocaleString("ar-EG", options)
  const imgHandle = () => {
    console.log("[imgHandle] optimized img failed, fetching original img...")
    const googleImgUrl = articleData.google_thumb.slice(30, -21)
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
          set_imgSrc(fallbackImage)
        }
      })
      .catch((err) => {
        console.log("img err: ", err)
        set_imgSrc(fallbackImage)
      })
  }

  return (
    <div
      dir="rtl"
      className={`text-${
        textSize === 0
          ? "base"
          : textSize === 1
          ? "lg"
          : textSize === 2
          ? `xl`
          : `${textSize - 1}xl`
      } 
      container m-auto my-10 font-bold`}
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-12">
        <div className="hidden h-full w-full border-0 border-dashed border-[neutral-800] p-[16px] md:rounded-r-3xl lg:col-span-1 lg:flex lg:flex-col lg:gap-8">
          <div className="sticky top-24 flex flex-col gap-0">
            <div className=" mx-auto my-4 h-fit w-[70%] overflow-hidden rounded-2xl">
              <div className="relative mx-auto flex h-fit w-full flex-col justify-around gap-0 text-center">
                <button
                  onClick={() =>
                    setTextSize(textSize === 3 ? 3 : parseInt(textSize) + 1)
                  }
                  className="h-12 w-full justify-center rounded-t-2xl border bg-white text-center text-3xl text-black
                transition-all duration-200 ease-in-out hover:bg-gray-200 active:scale-[.8] dark:border-slate-600 dark:bg-[#353d50] dark:text-white dark:hover:bg-gray-600"
                >
                  <span className="">
                    <Icons.plus className="m-auto my-1 h-6 w-6" />
                  </span>
                </button>
                <button
                  onClick={() =>
                    setTextSize(textSize === 0 ? 0 : parseInt(textSize) - 1)
                  }
                  className="h-12 w-full justify-center rounded-b-2xl border bg-white text-center text-3xl text-black transition-all
                duration-200 ease-in-out hover:bg-gray-200 active:scale-[.8] dark:border-slate-600 dark:bg-[#353d50] dark:text-white dark:hover:bg-gray-600"
                >
                  <Icons.minus className="m-auto my-1 h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="mx-auto w-[55px] overflow-hidden rounded-2xl border-[#f7f7f9] bg-[#f7f7f9] dark:bg-[#353d50]">
              <VerticalShare articleData={articleData} />
            </div>
          </div>
        </div>
        <div className="col-span-12 box-border h-full w-full lg:col-span-8 lg:border-[0px] lg:border-dashed lg:p-8 dark:lg:border-[0px] dark:lg:border-neutral-800">
          <div className="bg-transparent">
            <h1
              className="m-auto mb-12 max-w-fit text-center text-[24px] font-black leading-[45px] text-black
             dark:text-white md:text-[34px] lg:m-0 lg:text-right lg:text-[28px]"
            >
              {articleData.title}
            </h1>
            <div className="my-2 flex h-8 w-full text-sm">
              <span
                className="flex-end float-left w-full"
                dateTime={articleData.published_at}
              >
                {formattedDate}
              </span>
            </div>
          </div>
          <Image
            unoptimized
            priority
            className="relative z-0 my-8 h-[487px] w-full object-cover"
            src={imgSrc}
            alt={articleData.title}
            width={imgSize.newWidth}
            height={imgSize.newHeight}
            placeholder={"blur"}
            blurDataURL={getBase64()}
            sizes="(max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            33vw"
            // onError={() => set_imgSrc(fallbackImage)}
            onError={() => imgHandle()}
          />
          <ArticleSocial />
          <>
            {!articleData.content ? (
              <div className="w-full overflow-hidden">
                <div className="relative w-full lg:w-[1025px]">
                  <iframe
                    src={articleData.article_source_url}
                    className="h-[500px] w-full border-[1px]"
                  />
                </div>
              </div>
            ) : (
              <ArticleRenderer html={articleData.content} />
            )}
          </>
          <div className="float-left mt-16 mb-8 text-xl underline underline-offset-8">
            <Link href={`${articleData.article_source_url}`} target={"_blank"}>
              اقرأ في المصدر
            </Link>
          </div>
        </div>
        {/* <div className="col-span-12 h-full w-full border-[4px] border-r-0 border-dashed p-4 dark:border-[6px] dark:border-neutral-800 md:rounded-l-[48px] lg:col-span-4"></div> */}
        <div className="col-span-12 h-full w-full border-[0px] border-r-0 border-dashed p-4 dark:border-[0px] dark:border-neutral-800 md:rounded-l-[48px] lg:col-span-4"></div>
      </div>
    </div>
  )
}

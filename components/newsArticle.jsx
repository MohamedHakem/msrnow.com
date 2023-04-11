import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

// import Link from "next/link"

// import { Twitter, TwitterIcon } from "lucide-react"
// import Balancer from "react-wrap-balancer"

// import { Icons } from "@/components/icons"
import { VerticalShare } from "./stickyVerticalShare"

const ArticleRenderer = dynamic(
  () => import("@/components/old/ArticleRenderer"),
  {
    ssr: false,
  }
)

export const NewsArticle = ({ articleData, imgSrc, set_imgSrc, getBase64 }) => {
  console.log(
    "articleData.article_source_url: ",
    articleData.article_source_url
  )

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

  return (
    <div
      dir="rtl"
      className="container m-auto my-10 text-base font-bold leading-7"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-12">
        <div className="hidden h-full w-[90%] border-0 border-dashed border-neutral-800 p-[16px] md:rounded-r-3xl lg:col-span-1 lg:block">
          <VerticalShare articleData={articleData} />
        </div>
        <div className="col-span-12 h-full w-full lg:col-span-7 lg:border-[4px] lg:border-dashed lg:p-8 dark:lg:border-[6px] dark:lg:border-neutral-800">
          <div className="bg-transparent">
            <h1
              className="m-auto mb-12 max-w-fit text-center text-[24px] font-black leading-[45px] text-black
             dark:text-white md:text-[34px] lg:m-0 lg:text-right lg:text-[28px]"
            >
              {articleData.title}
            </h1>
            <div className="my-4 flex h-8 w-full">
              <span className="flex-end float-left w-full">
                {formattedDate}
              </span>
            </div>
          </div>
          <Image
            unoptimized
            priority
            className="relative z-0 my-8 w-full object-cover"
            src={imgSrc}
            alt={articleData.title}
            width={896}
            height={538}
            placeholder={"blur"}
            blurDataURL={getBase64()}
            onLoadingComplete={(result) => {
              if (result.naturalWidth === 0) {
                set_imgSrc(fallbackImage)
              }
            }}
          />
          <>
            {!articleData.content ? (
              <div className="w-full overflow-hidden md:w-[680px]">
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
        <div className="col-span-12 h-full w-full border-[4px] border-r-0 border-dashed p-4 dark:border-[6px] dark:border-neutral-800 md:rounded-l-[48px] lg:col-span-4"></div>
      </div>
    </div>
  )
}

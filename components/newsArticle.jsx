import dynamic from "next/dynamic"
import Image from "next/image"

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
  // console.log("articleData: ", articleData)

  return (
    // <div className="flex h-screen flex-col justify-between">
    <div
      dir="rtl"
      className="container m-auto my-10 text-base font-bold leading-7"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-12">
        <div className="hidden h-full w-full rounded-r-xl border border-l-0 p-[16px] lg:col-span-1 lg:block">
          <VerticalShare articleData={articleData} />
        </div>
        <div className="col-span-12 h-full w-full lg:col-span-7 lg:border lg:p-8">
          <div className="bg-white">
            <h1 className="m-auto mb-12 max-w-fit text-center text-[24px] font-black leading-[45px] text-black md:text-[34px] lg:m-0 lg:text-right lg:text-[28px]">
              {/* <Balancer>{articleData.title}</Balancer> */}
              {articleData.title}
            </h1>
          </div>
          <Image
            unoptimized
            priority
            className="relative z-0 my-8 w-full object-cover" //rounded-3xl
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
          {!articleData.content ? (
            <div className="w-full overflow-hidden md:w-[680px]">
              {/* <h1 className="m-auto max-w-[760px] p-10 text-center text-2xl text-white md:text-[26px]">
                {articleData.title}
              </h1> */}
              <div className="relative w-full lg:w-[1025px]">
                <iframe
                  src={articleData.article_source_url}
                  className="h-[500px] w-full border border-gray-400"
                />
              </div>
            </div>
          ) : (
            <ArticleRenderer
              html={articleData.content}
              // origin={sourcesById[categoriesById][articleData.sourceId]}
            />
          )}
          {/* </div> */}
        </div>
        <div className="col-span-12 h-full w-full rounded-l-xl border border-r-0 p-4 lg:col-span-4"></div>
      </div>
    </div>
  )
}

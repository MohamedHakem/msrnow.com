import { useEffect, useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"

import { Icons } from "@/components/icons"

export function VerticalShare({ articleData }) {
  const [shares, setShares] = useState(articleData.shares)
  const [fb_shares, setFbShares] = useState(articleData.fb_shares)
  const [tw_shares, setTwShares] = useState(articleData.tw_shares)
  const [wa_shares, setWaShares] = useState(articleData.wa_shares)
  const [ln_shares, setLnShares] = useState(articleData.ln_shares)

  useEffect(() => {
    setShares(articleData.shares)
  }, [articleData.shares])

  const platforms = ["fb_shares", "tw_shares", "wa_shares", "ln_shares"]

  const handleShare = async (platform, count) => {
    platform = platforms.filter((p) => p === platform)[0]
    if (platform === "fb_shares") setFbShares(fb_shares + 1)
    if (platform === "tw_shares") setTwShares(tw_shares + 1)
    if (platform === "wa_shares") setWaShares(wa_shares + 1)
    if (platform === "ln_shares") setLnShares(ln_shares + 1)
    setShares(shares + 1)

    const sharesRes = await fetch("/api/article/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        where: {
          slug: articleData.slug,
        },
        data: {
          [platform]: count,
          shares: shares + 1,
        },
      }),
    })
    if (sharesRes.ok) {
      return true
    }
    return false
  }

  const toaster = (platform, count) => {
    toast.promise(handleShare(platform, count), {
      loading: "جاري حفظ مشاركتك...",
      success: (
        <b className="text-lg">
          ✨ شكرا لمشاركتك المقالة <span className="ml-2 text-xl">🎉 🥳</span>
        </b>
      ),
      error: <b>حصل خطأ، حاول مرة اخري.</b>,
    })
  }

  return (
    <div
      dir="rtl"
      className="sticky top-72 w-full border-x bg-white dark:border-slate-700 dark:bg-slate-700/60"
    >
      <ul className="flex flex-col">
        <li className="m-auto flex w-full flex-col py-2 text-gray-500 dark:text-slate-300">
          <span className="text-center text-3xl font-bold">
            {articleData.shares}
          </span>
          <span className="mb-2 text-center text-xs xl:mr-0 xl:text-[13px]">
            مشاركة
          </span>
        </li>
        <li className="h-[58px] w-[55px] border-t hover:bg-gray-200/80 dark:border-slate-900 dark:hover:bg-gray-600">
          <button
            className="contents"
            onClick={() => toaster("fb_shares", fb_shares + 1)}
          >
            <Link
              className="h-[68px]"
              target={"_blank"}
              rel="noopener noreferrer"
              title="Share on Facebook"
              href={`https://www.facebook.com/sharer/sharer.php?u=https://www.msrnow.com/${articleData.short_slug}`}
            >
              <Icons.facebook className="py-3 px-[18px]" />
            </Link>
          </button>
        </li>

        <li className="h-[58px] w-[55px] border-t hover:bg-gray-200/80 dark:border-slate-900 dark:hover:bg-gray-600">
          <button
            className="contents"
            onClick={() => toaster("wa_shares", wa_shares + 1)}
          >
            <Link
              target={"_blank"}
              rel="noopener noreferrer"
              title="Share on Facebook"
              href={`https://api.whatsapp.com/send?text=https://www.msrnow.com/${articleData.short_slug} ${articleData.title}`}
            >
              <Icons.whatsapp className="h-[58px] w-full py-3 px-[8px]" />
            </Link>
          </button>
        </li>
        <li className="w-[55px] border-t hover:bg-gray-200/80 dark:border-slate-900 dark:hover:bg-gray-600">
          <button
            className="contents"
            onClick={() => toaster("tw_shares", tw_shares + 1)}
          >
            <Link
              target={"_blank"}
              rel="noopener nofollow noreferrer"
              title="Share on Twitter"
              href={`https://twitter.com/intent/tweet?via=msrnowcom&text=${articleData.title}&url=https://www.msrnow.com/${articleData.short_slug}`}
            >
              <Icons.twitter className="p-3" />
            </Link>
          </button>
        </li>

        <li className="h-[58px] w-[55px] border-t hover:bg-gray-200/80 dark:border-slate-900 dark:hover:bg-gray-600">
          <button
            className="contents"
            onClick={() => toaster("ln_shares", ln_shares + 1)}
          >
            <Link
              target={"_blank"}
              rel="noopener nofollow noreferrer"
              title="Share on Twitter"
              // href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.msrnow.com/${articleData.short_slug}&via=@msrnowcom&text=${title}`}
              href={`https://www.linkedin.com/shareArticle?mini=true&url=https://www.msrnow.com/${articleData.short_slug}&title=${articleData.title}`}
            >
              <Icons.linkedin className="h-[58px] w-full p-3 px-[12px]" />
            </Link>
          </button>
        </li>
      </ul>
    </div>
  )
}

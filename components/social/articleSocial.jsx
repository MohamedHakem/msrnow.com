import { Icons } from "@/components/icons"

export default function ArticleSocial() {
  return (
    <div className="news-item mb-6 box-content rounded-lg border bg-white">
      <div className="">
        <div className="p-2">
          <div class="m-auto flex h-fit w-fit flex-col justify-around gap-4 text-center md:flex-row md:gap-16">
            <a
              className="my-auto flex h-fit w-fit flex-row gap-x-2"
              title="تابع صفحتنا على فيسبوك"
              href="https://www.facebook.com/msrnowcom"
              target="_blank"
            >
              <div className="my-auto h-12 w-12 rounded-xl bg-[#3b5998]">
                <Icons.whiteFacebook className="m-auto h-full w-6 p-1 text-white" />
              </div>
              <p className="m-auto mr-1 h-fit w-[80px] text-right text-lg">
                تابع صفحتنا على فيسبوك
              </p>
            </a>

            <a
              className="my-auto flex h-fit w-fit flex-row gap-x-2"
              title="تابع صفحتنا على تويتر"
              href="https://www.twitter.com/msrnowcom"
              target="_blank"
            >
              <div className="my-auto h-12 w-12 rounded-xl bg-[#1c9be9]">
                <Icons.whiteTwitter className="m-auto h-full w-9 p-1 text-white" />
              </div>
              <p className="m-auto mr-1 h-fit w-[80px] text-right text-lg">
                تابع صفحتنا على تويتر
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

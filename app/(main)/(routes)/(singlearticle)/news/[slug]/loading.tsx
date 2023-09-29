// import SingleArticleSkeleton from '@/components/skeletons/single-article-skeleton';
// import { Suspense } from 'react';

export default function Loading() {
  console.log('loading file...');

  return (
    <div className="flex flex-col desktop:flex-row rounded-md gap-4 py-10 px-4 container:px-0 scroll-m-0 h-full">
      <div
        dir="rtl"
        className="flex flex-col flex-auto laptop:flex-row w-full items-center
      transition-all duration-200 ease-in-out"
      >
        {/* <div>
          <p className="w-10 h-4 bg-gray-100 animate-pulse"></p>
        </div> */}
        <div className="flex flex-col laptop:flex-row justify-between flex-auto w-full">
          <div className="flex flex-col w-full laptop:w-2/3 m-auto laptop:m-0 desktop:flex-auto md:w-[650px] max-w-[650px] gap-4 relative">
            <div className="w-full h-36 tablet:h-24 bg-gray-100 animate-pulse"></div>
            <div className="w-14 h-5 bg-gray-100 animate-pulse"></div>
            <div className="h-[200px] mobilelg:h-[300px] tablet:h-[390px] w-full bg-gray-100 animate-pulse"></div>
            <div className="h-36 w-full bg-gray-100 animate-pulse"></div>
            {/* <ArticleSettingSidebar /> */}
            {/* <div className="flex flex-col gap-2 w-full h-[500px] rounded-md p-4 mx-auto bg-gray-500 animate-pulse">
              article body loading...
            </div> */}
            <div className="w-full h-[500px] p-4 mx-auto bg-gray-200 animate-pulse border flex flex-row justify-center items-center text-2xl text-gray-800">
              جاري التحقق من الخبر
            </div>
          </div>
          <div className="flex flex-col laptop:w-1/3">
            <div className="w-full h-96 laptop:h-screen p-4 mt-4 laptop:mt-0 mx-auto bg-gray-100 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className="w-full h-screen">
//   {/* <p>LOADING FILE</p> */}
//   <SingleArticleSkeleton />
// </div>

import { Skeleton } from '@/components/ui/skeleton';

export default async function TimelineSkeleton() {
  return (
    <>
      {[1, 2, 3].map((item, index) => (
        <div key={index} className={`relative flex items-center justify-between desktop:w-96 group is-active`}>
          <div className="relative w-full flex flex-col gap-4">
            {/* <div className={`flex flex-row items-center gap-[10px] -mr-[4px]`}> */}
            <div className={`flex flex-row items-center gap-[10px] px-4`}>
              {index === 0 ? null : <Skeleton className="h-4 w-[100px]" />}
              {/* <div className="flex items-center space-x-4 laptop:space-x-reverse">
                <div className={`flex items-center justify-center w-3 h-3 laptop:order-1 animate-pulse`}></div>
              </div> */}
              {/* <div className="text-slate-500">
                <span className="text-slate-900 font-bold">
                </span>
              </div> */}
            </div>
            <div className={`tablet:w-fit laptop:w-full justify-start flex flex-row px-4 pb-0`}>
              <div className="w-0 text-transparent">.</div>
              <div className="flex flex-col">
                <Skeleton className="h-56 w-[300px]" />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* <div
        className="rounded-xl"
        style={{
          height: '150px',
          width: '100%',
          background: 'linear-gradient(to top, #787878, transparent)',
          position: 'absolute',
          bottom: '0px'
        }}
      ></div> */}
    </>
  );
}

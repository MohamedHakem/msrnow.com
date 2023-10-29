export default function Loading() {
  return (
    <div className="flex flex-col w-full max-w-6xl m-auto gap-4 py-8 px-4">
      <h1 className="text-3xl font-bold w-36 h-12 bg-gray-100 animate-pulse"></h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-full pb-4 lg:col-span-2">
          <div className="w-full overflow-hidden rounded-lg">
            <ul>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((article, i) => (
                <li key={i} className="flex flex-col py-2">
                  <div className="flex flex-row gap-3 md:gap-4 w-full bg-gray-100 animate-pulse">
                    <div className="w-1/2 md:w-[280px] h-40 bg-gray-100 animate-pulse"></div>
                    <div className="flex-col w-1/2 md:w-2/3">
                      <h4 className="text-sm md:text-lg laptop:text-xl font-bold text-gray-900 leading-5 w-[460px] h-16 bg-gray-100 animate-pulse"></h4>
                      <div className="mt-1 text-xs text-gray-400 w-14 h-6 bg-gray-100 animate-pulse"></div>
                    </div>
                  </div>
                  {i >= 4 && i % 6 === 0 ? <div className="w-[700px] h-[200px] bg-gray-100 animate-pulse"></div> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-32 md:h-40 laptop:h-80 sticky top-8 rounded-md bg-gray-50"></div>
      </div>
    </div>
  );
}


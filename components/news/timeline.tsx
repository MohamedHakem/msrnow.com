import { relatedArticleType, timelineArrayType, tweetsArrayType } from '@/types';
// import { Tweet } from 'react-tweet';
import Datetime from '@/components/news/datetime';
import TimelineCard from '@/components/news/timeline-card';
import TimelineSkeleton from '@/components/skeletons/timeline-skeleton';
import { Suspense } from 'react';

function isTweetsArray(item: timelineArrayType): item is tweetsArrayType {
  return 'id' in item && 'published_at' in item;
}

export default function Timeline({
  relatedTweets,
  relatedArticles
}: {
  relatedTweets: string[] | null;
  relatedArticles: relatedArticleType[];
}) {
  let sortedArray;
  if (relatedTweets !== null) {
    const tweetsArray: tweetsArrayType[] = relatedTweets.map((t) => {
      const id = t.split('/')[0];
      const published_at = Number(t.split('/')[1]);
      return { id, published_at };
    });

    const combinedArray: timelineArrayType[] = [
      ...tweetsArray,
      ...relatedArticles.map((article) => ({
        ...article,
        published_at: Date.parse(`${article.published_at}`)
      }))
    ];

    sortedArray = combinedArray.sort((a, b) =>
      typeof a.published_at == 'number' && typeof b.published_at == 'number' ? b.published_at - a.published_at : 0
    );
  } else {
    // Convert ISO date strings to timestamps
    relatedArticles.forEach((article) => {
      article.published_at = new Date(`${article.published_at}`);
    });

    // Sort the relatedArticles array by date in ascending order
    relatedArticles.sort((a, b) =>
      typeof a.published_at !== 'number' && typeof b.published_at !== 'number'
        ? b.published_at.getTime() - a.published_at.getTime()
        : 0
    );
  }

  const events = sortedArray ? sortedArray : relatedArticles;
  // console.log('events: ', events);

  return (
    <div className="flex flex-col mt-4 laptop:max-w-md border rounded-xl animate-fadeIn">
      <div className="w-full flex h-auto justify-center items-center py-6">
        <h3 className="text-2xl font-bold animate-fadeIn">تغطية شاملة للخبر</h3>
      </div>
      <div className="w-full m-auto relative flex flex-col h-[600px] laptop:h-[200vh] shadow-inner overflow-y-auto gap-4">
        <Suspense fallback={<TimelineSkeleton />}>
          <TimelineList events={events} />
        </Suspense>
      </div>
    </div>
  );
}

const TimelineList = async ({ events }: { events: timelineArrayType[] }) => {
  // imitate delay
  // await new Promise((resolve) => setTimeout(resolve, 30000));

  return (
    <div
      dir="rtl"
      className="space-y-8 mr-3 laptop:ml-3 py-10 border-t relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full 
        before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-300 before:to-slate-200 before:animate-blink"
    >
      {events.map((item, index) => (
        <div key={index} className="relative flex items-center justify-between group is-active animate-fadeIn">
          <div className="relative w-full">
            <div className={`flex flex-row items-center gap-[10px] -mr-[4px]`}>
              <div className="flex items-center space-x-4 laptop:space-x-reverse">
                <div
                  className={`flex items-center justify-center w-3 h-3 rounded-full laptop:order-1 animate-pulse ${
                    isTweetsArray(item) ? 'bg-sky-500' : 'bg-emerald-500'
                  }`}
                ></div>
              </div>
              <div className="text-slate-500">
                <span className="text-slate-900 font-bold">
                  <Datetime published_at={item.published_at} weekday={true} isTimeAgo={true} />
                </span>
              </div>
            </div>
            <div className={`tablet:w-fit laptop:w-full justify-start flex flex-row px-4 pb-0`}>
              <div className="w-0 text-transparent">.</div>
              <div className="flex flex-col">
                <TimelineCard item={item} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* <div
    className="rounded-xl"
    style={{
      height: '60px',
      width: '100%',
      background: 'linear-gradient(to top, #adadad, transparent)',
      position: 'absolute',
      bottom: '0px'
    }}
  ></div> 
*/

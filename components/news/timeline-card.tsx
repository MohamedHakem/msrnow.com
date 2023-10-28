import { timelineArrayType, tweetsArrayType } from '@/types';
// import { Tweet } from 'react-tweet';
import TimelineNewsCard from '@/components/news/cards/timeline-news-card';

function isTweetsArray(item: timelineArrayType): item is tweetsArrayType {
  return 'id' in item && 'published_at' in item;
}

export default async function TimelineCard({ item }: { item: timelineArrayType }) {
  if (isTweetsArray(item)) {
    console.log('tweet item.id: ', item.id);
    return (
      <div>
        {/* <Tweet id={`${item.id}`} fallback={<></>} /> */}
      </div>
    );
  } else {
    return (
      <div className="tablet:w-full max-w-xs border p-0 rounded-lg mt-4">
        <TimelineNewsCard article={item} />
      </div>
    );
  }
}
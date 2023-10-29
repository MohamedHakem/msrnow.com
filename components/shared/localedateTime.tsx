"use client"

import { getLocalArabicFromTimestamp as getTimeAgo } from '@/utils/convertTimestampToCustomLocalArabicTime';
import { useEffect, useState } from 'react';

export default function LocalDatetime({ date, showTimeAgo }: { date: Date, showTimeAgo?: boolean }) {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null
  }

  // console.log("[LocalDatetime] date.toLocaleTimeString(): ", date.toLocaleTimeString())
  return (
    <div>
      <span
        className="pl-4 text-[12px] md:text-xs text-gray-400 font-semibold mt-1"
        title={date.toLocaleString("ar-EG", {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          numberingSystem: 'latn',
          hour12: true,
          weekday: "short"
        })}
      >
        {showTimeAgo ?
          getTimeAgo(date, false, true)
          : date.toLocaleString("ar-EG", {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            numberingSystem: 'latn',
            hour12: true,
            weekday: "short"
          }).replace(/،/g, ' · ')
        }
      </span>
    </div>
  )
}
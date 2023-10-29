"use client"

import { getLocalArabicFromTimestamp as getTimeAgo } from '@/utils/convertTimestampToCustomLocalArabicTime';

export default function LocalDatetime({ date, showTimeAgo }: { date: Date, showTimeAgo?: boolean }) {
  console.log("[LocalDatetime] date.toLocaleTimeString(): ", date.toLocaleTimeString())
  return (
    <div>
      <span
        className="px-4 text-[12px] md:text-xs text-gray-400 font-semibold mt-1"
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
          })
        }
      </span>
    </div>
  )
}
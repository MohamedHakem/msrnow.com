import { format } from 'date-fns'
// import { locale as arEgyptLocale } from 'date-fns/locale/ar-EG';
import locale from "date-fns/locale/ar-EG"

function getLocalArabicFromTimestamp(published_at: number | Date, weekday: boolean, isTimeAgo: boolean) {
  const options: Intl.DateTimeFormatOptions & {
    locale: string;
  } = {
    weekday: weekday ? "short" : undefined,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    numberingSystem: 'latn',
    hour12: true,
    locale: "ar-EG"
  };

  if (isTimeAgo) {
    const date = typeof published_at == 'number' ? published_at : new Date(published_at).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - date;
    const minutesDifference = Math.floor(timeDifference / (60 * 1000));
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const weeksDifference = Math.floor(daysDifference / 7);
    let timeAgo;
    if (minutesDifference < 60) {
      timeAgo =
        minutesDifference === 1
          ? 'قبل دقيقة'
          : minutesDifference === 2
            ? 'قبل دقيقتين'
            : minutesDifference > 2 && minutesDifference < 11
              ? `قبل ${minutesDifference} دقائق`
              : `قبل ${minutesDifference} دقيقة`;
    } else if (hoursDifference < 24) {
      timeAgo =
        hoursDifference === 1
          ? 'قبل ساعة'
          : hoursDifference === 2
            ? 'قبل ساعتين'
            : hoursDifference > 2 && hoursDifference < 11
              ? `قبل ${hoursDifference} ساعات`
              : `قبل ${hoursDifference} ساعة`;
    } else if (daysDifference < 7) {
      timeAgo =
        daysDifference === 1
          ? 'قبل يوم'
          : daysDifference === 2
            ? 'قبل يومين'
            : daysDifference > 2 && daysDifference < 11
              ? `قبل ${daysDifference} أيام`
              : `قبل ${daysDifference} يوم`;
    } else {
      timeAgo =
        weeksDifference === 1
          ? 'قبل اسبوع'
          : weeksDifference === 2
            ? 'قبل اسبوعين'
            : weeksDifference > 2 && weeksDifference < 11
              ? `قبل ${weeksDifference} أسابيع`
              : `قبل ${weeksDifference} اسبوع`;
    }
    return timeAgo;
  }

  console.log("🚀 published_at: ", published_at)
  const date = new Date(published_at);
  console.log("🚀 date: ", date)
  const currentTimeWithWeekday = date.toLocaleString('ar-EG', options)
  console.log("🚀 currentTimeWithWeekday: ", currentTimeWithWeekday)
  // return currentTimeWithWeekday.replace(/،/g, ' · ');

  const customOptions: Intl.DateTimeFormatOptions & { locale: string; } = {
    weekday: "short",
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    numberingSystem: 'latn',
    hour12: true,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: "ar-EG"
  }

  console.log("Intl.DateTimeFormat().resolvedOptions().timeZone: ", Intl.DateTimeFormat().resolvedOptions().timeZone);
  const customDate = new Date(published_at);
  console.log("🚀 customDate: ", customDate)
  const customCurrentTimeWithWeekday = new Date(customDate).toLocaleString('ar-EG', customOptions)
  console.log("🚀 customCurrentTimeWithWeekday: ", customCurrentTimeWithWeekday)

  const publishedAt = new Date(published_at);
  // const datefnsCurrentTimeWithWeekday = format(publishedAt, 'EEEE, dd/MM/yyyy, HH:mm', {
  //   timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  // } as FormatOptionsWithTimeZone);

  const datefnsCurrentTimeWithWeekday = format(publishedAt, 'EEEE, dd/MM/yyyy, HH:mm', { locale: locale });
  console.log("datefnsCurrentTimeWithWeekday: ", datefnsCurrentTimeWithWeekday);

  return datefnsCurrentTimeWithWeekday.replace(/،/g, ' · ');
}

export { getLocalArabicFromTimestamp };
export default getLocalArabicFromTimestamp;

function getLocalArabicFromTimestamp(published_at: number | Date, weekday: boolean, isTimeAgo: boolean) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: weekday ? "short" : undefined,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    numberingSystem: 'latn',
    hour12: true
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

  const date = new Date(published_at);
  const currentTimeWithWeekday = date.toLocaleString('ar-EG', options)
  return currentTimeWithWeekday.replace(/،/g, ' · ');
}

export { getLocalArabicFromTimestamp };
export default getLocalArabicFromTimestamp;

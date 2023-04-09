const formatArrayDatetimeSince = (articlesArrayToFormatDatetime) => {
  let count = 0
  return articlesArrayToFormatDatetime.forEach((article) => {
    // console.log(
    //   "article.published_at: ",
    //   article.published_at,
    //   " count: ",
    //   count++
    // )
    const publishedAt = new Date(article.published_at)
    const currentTime = new Date()
    const timeDiff = Math.abs(currentTime - publishedAt)

    const diffInMinutes = Math.round(timeDiff / (1000 * 60))
    const diffInHours = Math.round(timeDiff / (1000 * 60 * 60))
    const diffInDays = Math.round(timeDiff / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 60) {
      article.timeAgo = `قبل ${diffInMinutes} ${
        diffInMinutes > 2 ? (diffInMinutes > 10 ? "دقيقة" : "دقائق") : "دقيقة"
      }`
    } else if (diffInHours < 24) {
      article.timeAgo = `قبل ${
        diffInHours === 1
          ? "ساعة"
          : diffInHours === 2
          ? "ساعتين"
          : diffInHours > 2 && diffInHours < 10
          ? `${diffInHours} ساعات`
          : `${diffInHours} ساعة`
      }`
    } else {
      article.timeAgo = `قبل ${
        diffInDays > 1
          ? diffInDays > 10
            ? `${diffInDays} يوم`
            : diffInDays == 2
            ? `يومين`
            : `${diffInDays} أيام`
          : "يوم"
      }`
    }
  })
}

export { formatArrayDatetimeSince }

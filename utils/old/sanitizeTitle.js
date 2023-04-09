const sanitizeTitle = (title) => {
  // Remove domain names from the title
  const noDomainTitle = title.replace(/\b\w+\.(com|net|org|co|uk)\b/gi, "")

  // Replace illegal characters with hyphens
  const sanitizedTitle = noDomainTitle.replace(/[/\\?%*:|"<>،]/g, "-")

  // Replace spaces with hyphens
  const slugifiedTitle = sanitizedTitle.replace(/\s+/g, "-")

  // Remove trailing periods
  const cleanedTitle = slugifiedTitle.replace(/\.+$/g, "")

  // Remove starting/trailing hyphens or '-'
  const trimmedTitle = cleanedTitle.replace(/^-+|-+$/g, "")

  // Keep only one hyphen or '-' if there are two or more next to each other
  // const finalTitle = trimmedTitle.replace(/-{2,}/g, '-');
  const hyphenedTitle = trimmedTitle.replace(/-{2,}/g, "-")

  // Remove any "?" char
  const withoutQuestionMark = hyphenedTitle.replace(/\?/g, "")

  // Remove any ".."
  const withoutTwoDots = withoutQuestionMark.replace(/\.{2,}/g, "")

  // Remove any "«" or "»"
  const finalTitle = withoutTwoDots.replace(/[«»]/g, "")

  return finalTitle
}

export { sanitizeTitle }

// const sanitizeTitle = (title) => {
//   // Remove domain names from the title
//   const noDomainTitle = title.replace(/\b\w+\.(com|net|org|co|uk)\b/gi, "")

//   // Replace illegal characters with hyphens
//   const sanitizedTitle = noDomainTitle.replace(/[/\\?%*:|"<>]/g, "-")

//   // Replace spaces with hyphens
//   const slugifiedTitle = sanitizedTitle.replace(/\s+/g, "-")

//   // Remove trailing periods
//   const cleanedTitle = slugifiedTitle.replace(/\.+$/g, "")

//   // Remove starting/trailing hyphens or '-'
//   const trimmedTitle = cleanedTitle.replace(/^-+|-+$/g, "")

//   // Remove dots from anywhere in the string
//   const noDotTitle = trimmedTitle.replace(/\./g, "")

//   // Keep only one hyphen or '-' if there are two or more next to each other
//   const finalTitle = noDotTitle.replace(/-{2,}/g, "-")

//   return finalTitle
// }

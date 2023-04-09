function slugifyDate(inputDate) {
  const dateObj = new Date(inputDate);
  let year = dateObj.getFullYear().toString().substr(-2);
  let month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  let day = dateObj.getDate().toString().padStart(2, '0');

  // Check if hour is 22 or more
  if (dateObj.getHours() >= 22) {
    // Add 1 day to the date
    const nextDay = new Date(dateObj);
    nextDay.setDate(dateObj.getDate() + 1);
    year = nextDay.getFullYear().toString().substr(-2);
    month = (nextDay.getMonth() + 1).toString().padStart(2, '0');
    day = nextDay.getDate().toString().padStart(2, '0');
  }

  return `${year}${month}${day}`;
}

export { slugifyDate };

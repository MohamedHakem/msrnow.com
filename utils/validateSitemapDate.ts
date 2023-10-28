export default function validateSitemapDate({ year, month, day }: { year: string; month: string; day: string }) {
  const yearInt = parseInt(year);
  const monthInt = parseInt(month);
  const dayInt = parseInt(day);

  if (isNaN(yearInt) || yearInt < 0 || yearInt > 9999) {
    return false;
  }

  if (isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
    return false;
  }

  const maxDay = new Date(yearInt, monthInt, 0).getDate();
  if (isNaN(dayInt) || dayInt < 1 || dayInt > maxDay) {
    return false;
  }

  return true;
}

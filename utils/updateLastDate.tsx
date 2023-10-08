import { db } from '@/lib/db';
import { Category, currentCategory } from '@/types';

export default async function updateLastDate({
  newLastDate,
  currentCategory
}: {
  newLastDate: Date;
  currentCategory: currentCategory | Category;
}) {
  const res = await db.category.update({
    where: { id: currentCategory.id },
    data: { last_date: new Date(newLastDate).toISOString() }
  });

  if (res.last_date) {
    return res;
  }

  return false;
}

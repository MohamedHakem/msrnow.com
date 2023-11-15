import { db } from '@/lib/db';

export const revalidate = 5; // 5min cache

export async function getUser(userEmail: string) {
  const user = await db.user.findUnique({
    where: { email: userEmail },
    select: { name: true, phone_number: true, image: true }
  })
  
  return user;
}



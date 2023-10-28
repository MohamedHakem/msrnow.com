import { db } from '@/lib/db';

export async function getUserId(userEmail: string) {
  const userId = await db.user.findUnique({
    where: {
      email: userEmail
    },
    select: { id: true }
  })
  if(userId) {
    return userId.id
  } else {
    return null
  }
}
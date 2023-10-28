/* eslint-disable @next/next/no-img-element */

import { columns } from '@/app/(main)/dashboard/orders/table/columns';
import { DataTable } from '@/app/(main)/dashboard/orders/table/data-table';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';

export const revalidate = 1;

async function getClientsOrders(id: string) {
  return await db.orderItem.findMany({
    where: { product: { userId: id } },
    orderBy: { createdAt: 'desc' },
    include: {
      order: { include: { user: true } },
      product: true,
      size: { select: { name: true } },
      color: { select: { name: true } }
    },
  })
}
function replaceKeyNames(orders: any) {
  let ordersArr = [];
  for (let i = 0; i < orders.length; i++) {
    const obj = {
      رمز: orders[i].id,
      المنتج: orders[i].product.title,
      المقاس: orders[i]?.size?.name,
      اللون: orders[i]?.color?.name,
      رابط: orders[i].product.slug,
      الهاتف: orders[i].order.phone_number,
      العنوان: orders[i].order.shipping_address,
      العميل: orders[i].order.user.name,
      السعر: orders[i].at_price,
      الحالة: orders[i].status,
      التاريخ: orders[i].createdAt,
    }
    ordersArr.push(obj)
  }
  return ordersArr;
}

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null
  const myOrders = await getClientsOrders(session.user.id)
  console.log("myOrders: ", myOrders)
  const formattedOrders = myOrders.length > 0 ? replaceKeyNames(myOrders) : []

  return (
    <div className="w-full h-full flex flex-col gap-8 p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">طلبات عملائك</h1>
      </div>
      <div className="">
        {myOrders.length === 0 ? (<>لا يوجد طلبات حتي الان</>) : (
          <ul dir="rtl" className="grid grid-cols-1">
            <DataTable columns={columns} data={formattedOrders} />
          </ul>
        )}
      </div>
    </div>
  )
}

// "use client"

/* eslint-disable @next/next/no-img-element */

// import { columns } from '@/components/dashboard/table/columns';
// import { DataTable } from '@/components/dashboard/table/data-table';
// import AddNewButton from '@/components/shared/add-new-button';
// import { mockProducts } from '@/data/mock-products';
// import { dataTableProductType } from '@/types';
// import React from 'react';
// import { db } from '@/lib/db';
// import Link from 'next/link';

import { authOptions } from '@/app/api/auth/auth';
import { db } from '@/lib/db';
import { Order } from '@prisma/client';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
// import { useSession } from 'next-auth/react';
import { getLocalArabicFromTimestamp as getTimeAgo } from '@/utils/convertTimestampToCustomLocalArabicTime';

export const revalidate = 1;

async function getMyPurchases(id: string) {
  return await db.order.findMany({
    where: { userId: id },
    orderBy: { createdAt: 'desc' },
    include: {
      orderHistory: true,
      user: { select: { name: true } },
      orderItems: {
        select: {
          at_price: true,
          color: { select: { name: true } },
          size: { select: { name: true } },
          product: {
            select: {
              title: true,
              images: true,
              published_status: true,
              slug: true,
            }
          }
        }
      },
    }
  })
}

export default async function MyPurchasesPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null
  const myPurchases = await getMyPurchases(session.user.id)

  return (
    <div className="w-full h-full flex flex-col gap-8 p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">مشترياتك</h1>
      </div>
      <div className="max-w-2xl">
        <ul dir="rtl" className="grid grid-cols-1 gap-4">
          {myPurchases.map((p, i) => (
            <li key={i}>
              <div key={i} className="flex flex-col border rounded-lg gap-4">
                <div className="flex flex-col justify-between bg-neutral-100 p-2 rounded-lg">
                  <div className="flex flex-row justify-between">
                    <span>تم تقديم الطلب في:</span>
                    <span className="">{getTimeAgo(p.createdAt, true, false)}</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="flex gap-2">
                      الإجمالي:
                      <span>{p.total_Amount} جم</span>
                    </p>
                    <p className="flex gap-2">
                      الشحن الي:
                      <span>{p.user.name}</span>
                    </p>
                  </div>
                </div>
                <ul key={i} className="flex flex-col gap-2 p-2 pt-0">
                  {p.orderItems.map((item, i) => (
                    <Link key={i} href={`/marketplace/product/${item.product.slug}`} className="hover:bg-neutral-50">
                      <li>
                        <div className="flex flex-row gap-2">
                          {!item.product.images[0] ? (<></>) : (
                            <div className="relative h-32 w-32 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                              <Image
                                className="h-full w-full object-cover"
                                width={128}
                                height={128}
                                alt={item.product.images[0].alt || item.product.title}
                                src={item.product.images[0].url}
                              />
                            </div>
                          )}
                          <div className="flex flex-1 flex-col text-base gap-2 p-2">
                            <span className="leading-tight">{item.product.title}</span>
                            {item.size?.name || item.color?.name ? (
                              <div className="flex flex-row gap-2">
                                {item.size?.name ? (
                                  <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 border border-blue-600 rounded-full px-2 py-1">
                                    {item.size?.name}
                                  </p>) : null}
                                {item.color?.name ? (
                                  <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 border border-blue-600 rounded-full px-2 py-1">
                                    {item.color?.name}
                                  </p>) : null}
                              </div>
                            ) : null}
                            <span className="leading-tight">{item.at_price} جم</span>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// <ul className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
// <Link href={`/dashboard/products/${p.id}`} key={i} className="border p-2 rounded-lg">
// </Link>

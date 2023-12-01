/* eslint-disable @next/next/no-img-element */

import { columns } from '@/app/(routes)/dashboard/products/table/columns';
import { DataTable } from '@/app/(routes)/dashboard/products/table/data-table';
import { authOptions } from '@/app/api/auth/auth';
import AddNewButton from '@/components/shared/add-new-button';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

export const revalidate = 1;

async function getProducts(id: string) {
  return await db.product.findMany({
    where: { userId: id },
    orderBy: { createdAt: 'desc' },
    include: {
      orderItems: { select: { id: true } },
      images: { select: { url: true } },
      product_category: {
        select: {
          name: true
        }
      }
    }
  })
}

function replaceKeyNames(products: any) {
  let productsArr = [];
  for (let i = 0; i < products.length; i++) {
    let obj = {
      رمز: products[i].id,
      العنوان: products[i].title,
      رابط: products[i].slug,
      السعر: products[i].price,
      الكمية: products[i].stockQuantity,
      الفئة: products[i].product_category.name,
      الاوردرات: products[i].orderItems.length,
      التقييم: products[i].rating,
      الحالة: products[i].published_status,
    }
    productsArr.push(obj)
  }
  return productsArr;
}


export default async function ProductsPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null
  const myProducts = await getProducts(session.user.id)
  console.log("🚀 ~ file: page.tsx:53 ~ ProductsPage ~ session.user.id:", session.user.id)
  console.log("🚀 ~ file: page.tsx:52 ~ ProductsPage ~ myProducts[0]:", myProducts[0])
  const formattedProducts = myProducts.length > 0 ? replaceKeyNames(myProducts) : []

  return (
    <div className="w-full h-full flex flex-col gap-8 p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">كل منتجاتك</h1>
        <AddNewButton />
      </div>
      <div className="">
        <ul dir="rtl" className="grid grid-cols-1">
          <ul dir="rtl" className="grid grid-cols-1">
            <DataTable columns={columns} data={formattedProducts} />
          </ul>
        </ul>
      </div>
    </div>
  );
}

// "use client"

// /* eslint-disable @next/next/no-img-element */

// import { columns } from '@/app/(main)/dashboard/products/table/columns';
// import { DataTable } from '@/app/(main)/dashboard/products/table/data-table';
// import { authOptions } from '@/app/api/auth/auth';
// import AddNewButton from '@/components/shared/add-new-button';
// import { db } from '@/lib/db';
// import { dataTableProductType } from '@/types';
// import { getServerSession } from 'next-auth';
// import { useSession } from 'next-auth/react';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// // import { Payment, columns } from "./columns"
// // import { Product, columns } from '@/components/dashboard/table/columns';
// // import { mockProducts } from '@/data/mock-products';
// // import { dataTableProductType } from '@/types';
// // import { db } from '@/lib/db';
// // import Link from 'next/link';

// export const revalidate = 1;

// // async function getProducts(): Promise<Product[]> {
// // async function getProducts(id: string): Promise<dataTableProductType[]> {

// async function getProducts(id: string) {
//   return await db.product.findMany({
//     where: { userId: id },
//     orderBy: { createdAt: 'desc' },
//     include: {
//       orderItems: { select: { id: true } },
//       images: { select: { url: true } },
//       product_category: {
//         select: {
//           name: true
//         }
//       }
//     }
//   })
// }
// function replaceKeyNames(products: any) {
//   let productsArr = [];
//   for (let i = 0; i < products.length; i++) {
//     let obj = {
//       رمز: products[i].id,
//       العنوان: products[i].title,
//       رابط: products[i].slug,
//       السعر: products[i].price,
//       الكمية: products[i].stockQuantity,
//       الفئة: products[i].product_category.name,
//       الاوردرات: products[i].orderItems.length,
//       التقييم: products[i].rating,
//       الحالة: products[i].published_status,
//     }
//     productsArr.push(obj)
//   }
//   return productsArr;
// }

// // const session = await getServerSession(authOptions)
// export default function ProductsPage() {
//   const isAddProduct = useSearchParams().get('add')
//   console.log("isAddProduct: ", isAddProduct)
//   const session = useSession()
//   const [products, setProducts] = useState([{}])
//   const [formattedProducts, setFormattedProducts] = useState([{}])


//   useEffect(() => {
//     console.log("useEffect");
    
//     console.log("session.data: ", session.data);
//     if (session.data && session.data.user.id) {
//       (async () => {
//         console.log("if condition true")
//         const myProducts = await getProducts(session.data.user.id)
//         setProducts(myProducts)
//         const formattedProducts = myProducts.length > 0 ? replaceKeyNames(myProducts) : [{}]
//         setFormattedProducts(formattedProducts)
//       })()
//     }
//   }, [session.data])

//   // console.log("ProductsPage ~ formattedProducts[0]:", formattedProducts[0])

//   if (!session) return null

//   return (
//     <div className="w-full h-full flex flex-col gap-8 p-4">
//       <div className="flex flex-row justify-between">
//         <h1 className="text-3xl font-bold">كل منتجاتك</h1>
//         <AddNewButton />
//       </div>
//       <div className="">
//         <ul dir="rtl" className="grid grid-cols-1">
//           {products.length === 0 ? (<>لا يوجد طلبات حتي الان</>) : (
//             <ul dir="rtl" className="grid grid-cols-1">
//               <DataTable columns={columns} data={formattedProducts} />
//             </ul>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }


// {/* <ul className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6"> */ }
// {/* {products.map((p, i) => (
// <Link href={`/dashboard/products/${p.id}`} key={i} className="border p-2 rounded-lg">
//   <li className="flex flex-col gap-2">
//     <img src={p.images[0].url} alt="some alt text" />
//     <p className="text-xl font-semibold">{p.title}</p>
//   </li>
// </Link>
// ))} */}


// // const products = await db.product.findMany({
// //   select: { title: true, price: true, stockQuantity: true, id: true,
// //            orderItem: {_count: true }, product_category: {select: {name: true}} images: { select: { url: true }, } }
// // });
// // return mockProducts


// // select: {
// //   id: true,
// //   title: true,
// //   price: true,
// //   stockQuantity: true,
// //   product_category: true,
// //   published_status: true,
// //   slug: true
// // }
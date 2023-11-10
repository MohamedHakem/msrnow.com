/* eslint-disable @next/next/no-img-element */
import { db } from '@/lib/db';
import Link from 'next/link';

export const revalidate = 1;
export default async function ProductsEditPage() {
  // const products = await db.product.findMany({ include: { images: { select: { url: true } } } });
  const Articles = new Array(10)

  return (
    <div className="w-full h-full flex flex-col gap-8 p-4">
      <h1 className="text-3xl font-bold">كل مقالاتك</h1>
      <div className="">
        <ul className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
          {Articles.map((a, i) => (
            <Link href={`/dashboard/products/`} key={i} className="border p-2 rounded-lg">
              {/* <li className="flex flex-col gap-2">
                <img src={p.images[0].url} alt="some alt text" />
                <p className="text-xl font-semibold">{p.title}</p>
              </li> */}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { db } from "@/lib/db";
import UpdateItemForm from "../components/update-item-form";
import { notFound } from "next/navigation";

export default async function ProductItemEditPage({ params }: { params: { id: string } }) {
  console.log('[ProductItemEditPage] params: ', params);
  const productCategories = await db.productCategory.findMany({ select: { name: true, id: true } })
  // const productToUpdate = await db.product.findUnique({ where: { id: parseInt(params.id) }, include: { images: { select: { id: true, url: true } } } })
  const productToUpdate = await db.product.findUnique({
    where: { id: parseInt(params.id) },
     include: { images: { select: { url: true } }, ProductSizes: { select: { id: true, value: true } }, ProductColors: { select: { id: true, value: true } },
    }
  })
  console.log("🚀 productToUpdate:", productToUpdate)

  if(!productToUpdate) return notFound()
  return <div><UpdateItemForm productCategories={productCategories} product={productToUpdate} /></div>
}

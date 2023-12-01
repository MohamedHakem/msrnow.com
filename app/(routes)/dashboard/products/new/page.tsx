import AddNewItemForm from '@/app/(routes)/dashboard/products/components/add-new-item-form';
import { db } from '@/lib/db';

export default async function AddNewPage() {
  const productCategories = await db.productCategory.findMany({ select: { name: true, id: true } })
  return (
    <div className="flex flex-col gap-4 w-full tablet:w-[600px] max-w-screen-tablet mx-auto p-4 laptop:p-10 laptop:pt-0">
      <h1 className="text-4xl laptop:text-6xl font-bold text-center">هتبيع إيه انهاردة؟</h1>
      <AddNewItemForm itemKind={"product"} itemInAr={"منتج"} productCategories={productCategories} />
    </div>
  );
}

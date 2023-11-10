import AddNewItemForm from '@/app/(routes)/dashboard/products/new/add-new-item-form';

export default function AddNewPage() {
  return (
    <div className="flex flex-col gap-4 w-full tablet:w-[600px] max-w-screen-tablet mx-auto p-4 laptop:p-10 laptop:pt-0">
      <h1 className="text-4xl laptop:text-6xl font-bold text-center">هتبيع إيه انهاردة؟</h1>
      <AddNewItemForm itemKind={"product"} itemInAr={"منتج"} />
    </div>
  );
}

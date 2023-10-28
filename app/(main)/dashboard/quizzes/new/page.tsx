import AddNewItem from '@/app/(main)/dashboard/products/new/add-new-item-form';

export default function AddNewPage() {
  return (
    <div>
      <div>AddNew Page</div>
      <AddNewItem itemKind={"article"} itemInAr={"مقالة"} />
    </div>
  );
}

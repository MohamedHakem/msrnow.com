export default function SavedPage({ params }: { params: { section: string; slug: string } }) {
  console.log('[SavedPage] params: ', params);

  return (
    <div className="w-full h-full flex flex-col gap-8 p-4">
      <h1 className="text-3xl font-bold">كل محفوظاتك</h1>
      <div className="">
        <ul className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
          لا يوجد لديك محفوظات
        </ul>
      </div>
    </div>
  )
}

export default function ArticlesPage({ params }: { params: { section: string; slug: string } }) {
  console.log('[ArticlesPage] params: ', params);
  
  return (
    <div className="w-full h-full flex flex-col gap-8 p-4">
      <h1 className="text-3xl font-bold">كل مقالاتك</h1>
      <div className="">
        <ul className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
          لا يوجد لديك مقالات
        </ul>
      </div>
    </div>
  )
}

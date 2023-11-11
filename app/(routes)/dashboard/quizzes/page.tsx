export default function QuizzesPage({ params }: { params: { section: string; slug: string } }) {
  console.log('[QuizzesPage] params: ', params);

  return (
    <div className="w-full h-full flex flex-col gap-8 p-4">
      <h1 className="text-3xl font-bold">كل كويزاتك</h1>
      <div className="">
        <ul className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
          لا يوجد لديك كويزات
        </ul>
      </div>
    </div>
  )
}

export default async function madeInEgyptPage({ params }: { params: { kind: string } }) {
  const kinds = [
    'بدائل المياة',
    'بدائل النسكافية',
    'بدائل المنظفات',
    'بدائل منتجات التجميل',
    'بدائل جبن',
    'بدائل اللبن المعلب',
  ]

  const kind = decodeURIComponent(params.kind)

  return (
    <div className="w-full laptop:max-w-7xl py-4 flex justify-center items-center m-auto">
      <div className="w-full flex justify-center">
        <h1 className="text-3xl laptop:text-5xl font-bold">
          {kind}
        </h1>
      </div>
      <div>
      </div>
    </div>
  )
}
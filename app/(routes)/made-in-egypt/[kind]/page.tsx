export default async function madeInEgyptPage(params: { kind: string }) {
  const kinds = [
    'بدائل المياة',
    'بدائل النسكافية',
    'بدائل المنظفات',
    'بدائل منتجات التجميل',
    'بدائل جبن',
    'بدائل اللبن المعلب',
  ]

  console.log("params.kind: ", params.kind);
  return (
    <div className="w-full laptop:max-w-7xl py-4 m-auto">
      <div className="w-full flex justify-center">
        <h1 className="text-3xl laptop:text-5xl font-bold">
          {params.kind}
          {" "}
          بديل</h1>
      </div>
      <div>
        <ul>

        </ul>
      </div>
    </div>
  )
}
import Link from "next/link"

export default async function madeInEgyptPage() {
  const kinds = [
    'بدائل المياة',
    'بدائل النسكافية',
    'بدائل المنظفات',
    'بدائل منتجات التجميل',
    'بدائل جبن',
    'بدائل صلصة',
    'بدائل مربي',
    'بدائل حلاوة',
    'بدائل طحينة',
    'بدائل نوتيلا',
    'بدائل لبن مجفف',
    'بدائل اللبن المعلب',
    'بدائل الكورن فليكس',
    'بدائل الشامبو',
    'بدائل الشاور',
    'بدائل مزيل العرق',
    'بدائل معجون الاسنان',
    'بدائل غسول الفم',
    'بدائل الفوط الصحية',
    'بدائل البهارات',
    'بدائل مرق الدجاج',
    'بدائل الصوصات',
    'بدائل الأدوات المدرسية',
    'بدائل الشيبسي',
    'بدائل البيبسي',
    'بدائل الشيكولاتة',
    'بدائل الايس كريم',
    'بدائل مشروبات الشعير',
    'بدائل منتجات البيبي',
    'مجمدات',
    'سناكس',
    'منتجات المطبخ',
    'شركات مصرية',
    'لو واقف فمحل المنظفات',
    'شركات التوصيل المصرية',
    'أدوات صحية مصرية',
    'براندات الملابس',
    'بديل بريل',
    'بديل الشوزات والملابس الرياضية',
    'بدائل التونة',
  ]
  return (
    <div className="w-full laptop:max-w-7xl py-4 m-auto">
      <div className="w-full flex justify-center">
        <h1 className="text-3xl laptop:text-5xl font-bold">دليل المنتج المصري</h1>
      </div>
      <div>
        <ul className="p-4 flex flex-col gap-4 my-8">
          {kinds.map((kind, i) => (
            <li key={i} className="w-full">
              <Link href={`/${kind}`} className="w-full p-6 flex justify-center text-2xl font-semibold border rounded-lg hover:bg-gray-100 active:scale-95 duration-100 ease-in-out transition-all">
                {kind}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
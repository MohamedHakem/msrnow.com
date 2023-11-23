import Link from "next/link"
import { productsMadeInEgypt } from "@/data/static/products-made-in-egypt"
import Image from "next/image"
// import ISISHealth from '@/public/images/made-in-egypt-imgs/water/396231369_726143246215820_1088155993013934897_n.jpg'
// import ISISHealth from '@/public/images/made-in-egypt-imgs/water/396468867_725964209567057_1639665053392930854_n.jpg'


export default async function madeInEgyptPage() {
  // const kinds = [
  //   'بدائل المياة',
  //   'بدائل النسكافية',
  //   'بدائل المنظفات',
  //   'بدائل منتجات التجميل',
  //   'بدائل جبن',
  //   'بدائل صلصة',
  //   'بدائل مربي',
  //   'بدائل حلاوة',
  //   'بدائل طحينة',
  //   'بدائل نوتيلا',
  //   'بدائل لبن مجفف',
  //   'بدائل اللبن المعلب',
  //   'بدائل الكورن فليكس',
  //   'بدائل الشامبو',
  //   'بدائل الشاور',
  //   'بدائل مزيل العرق',
  //   'بدائل معجون الاسنان',
  //   'بدائل غسول الفم',
  //   'بدائل الفوط الصحية',
  //   'بدائل البهارات',
  //   'بدائل مرق الدجاج',
  //   'بدائل الصوصات',
  //   'بدائل الأدوات المدرسية',
  //   'بدائل الشيبسي',
  //   'بدائل البيبسي',
  //   'بدائل الشيكولاتة',
  //   'بدائل الايس كريم',
  //   'بدائل مشروبات الشعير',
  //   'بدائل منتجات البيبي',
  //   'مجمدات',
  //   'سناكس',
  //   'منتجات المطبخ',
  //   'شركات مصرية',
  //   'لو واقف فمحل المنظفات',
  //   'شركات التوصيل المصرية',
  //   'أدوات صحية مصرية',
  //   'براندات الملابس',
  //   'بديل بريل',
  //   'بديل الشوزات والملابس الرياضية',
  //   'بدائل التونة',
  // ]

  // const kinds = [
  //   { title: 'المياة', url: 'water', images: [ISISHealth] },
  //   // 'النسكافية',
  //   // 'المنظفات',
  //   // 'منتجات التجميل',
  //   // 'جبن',
  //   // 'صلصة',
  //   // 'مربي',
  //   // 'حلاوة',
  //   // 'طحينة',
  //   // 'نوتيلا',
  //   // 'لبن مجفف',
  //   // 'اللبن المعلب',
  //   // 'الكورن فليكس',
  //   // 'الشامبو',
  //   // 'الشاور',
  //   // 'مزيل العرق',
  //   // 'معجون الاسنان',
  //   // 'غسول الفم',
  //   // 'الفوط الصحية',
  //   // 'البهارات',
  //   // 'مرق الدجاج',
  //   // 'الصوصات',
  //   // 'الأدوات المدرسية',
  //   // 'الشيبسي',
  //   // 'البيبسي',
  //   // 'الشيكولاتة',
  //   // 'الايس كريم',
  //   // 'مشروبات الشعير',
  //   // 'منتجات البيبي',
  //   // 'مجمدات',
  //   // 'سناكس',
  //   // 'منتجات المطبخ',
  //   // 'شركات مصرية',
  //   // 'لو واقف فمحل المنظفات',
  //   // 'شركات التوصيل المصرية',
  //   // 'أدوات صحية مصرية',
  //   // 'براندات الملابس',
  //   // 'بديل بريل',
  //   // 'الشوزات والملابس الرياضية',
  //   // 'التونة',
  // ]

  return (
    <div className="w-full laptop:max-w-7xl py-4 m-auto">
      <div className="w-full flex justify-center">
        <h1 className="text-3xl laptop:text-5xl font-bold">دليل المنتج المصري</h1>
      </div>
      <div>
        <ul className="p-4 flex flex-col gap-4 my-8 justify-center">
          {productsMadeInEgypt.map((kind, i) => (
            <li key={i} className="w-full laptop:max-w-[360px]">
              <Link href={`/made-in-egypt/${kind.url}`} className="w-full laptop:max-w-[360px] p-6 flex flex-col gap-2 justify-center text-2xl font-semibold active:scale-95 duration-100 ease-in-out transition-all text-center">
                <Image unoptimized width={360} height={360} alt={"clean-water-products-made-in-egypt"}
                  src={`https://wsrv.nl/?url=${kind.thumb}&default=${kind.thumb}&l=9&af=''&il=''&n=-1&w=360&h=360&fit=cover&a=attention`}
                  className="relative h-full object-cover rounded-lg border animate-fadeIn"
                />
                {kind.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
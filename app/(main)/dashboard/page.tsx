// import BackButton from '@/components/back-button';
// import Link from 'next/link';

export default function DashboardPage() {
  // return an empty div for now, since the layout handles the dashboard top nav and side bar, this will be empty for now
  // eslint-disable-next-line react/no-unescaped-entities
  return <h1 className="text-xl font-bold">hello from dashboard page where I'll add some summarizied stats here</h1>;
}

// const sections = [
//   { title: 'منتجاتي', url: 'dashboard/products' },
//   { title: 'المحفوظات', url: 'saved' },
//   { title: 'إعجابات', url: 'likes' },
//   { title: 'مقالات', url: 'articles' },
//   { title: 'كويزات', url: 'quizzes' }
// ];
// const suggestedCreations = [
//   'بيع منتج',
//   'انشر مقال جديد',
//   'انشر كويز جديد',
//   'انشر وصفة شهية',
//   'أضف استطلاع رأي',
//   'أضف سؤال'
// ];

// const items = new Array(12);

// return (
//   <div className="flex flex-col w-full max-w-6xl gap-4 pb-4 laptop:py-6  h-[calc(100vh-100px)]">
//     <div className="w-[100dvw] laptop:w-full bg-gray-100">
//       <ul className="flex flex-row gap-4 p-2 items-center overflow-x-auto">
//         {/* <p>أضف: </p> */}
//         {suggestedCreations.map((s, i) => (
//           <li key={i} className="min-w-max bg-gray-200 rounded-md p-2">
//             {s}
//           </li>
//         ))}
//       </ul>
//     </div>
//     <div className="w-fit">
//       <BackButton />
//     </div>
//     <div className="grid grid-cols-1 gap-2 laptop:grid-cols-[200px_1fr] laptop:gap-0 h-full border">
//       <div className="h-full bg-gray-100 border-l">
//         <ul className="flex flex-row laptop:flex-col gap-4 h-full p-2 laptop:p-4 items-center overflow-x-auto">
//           {sections.map((s, i) => (
//             <Link key={i} href={`/${s.url}`} className="laptop:w-full">
//               <li className="min-w-max bg-gray-300 rounded-md p-2">{s.title}</li>
//             </Link>
//           ))}
//         </ul>
//       </div>
//       {/* show a list of items, when clicked, go to the details page */}
//       <div className="grid grid-cols-1 gap-4 laptop:grid-cols-3 laptop:gap-8 bg-gray-100 h-full px-4 laptop:px-0">
//         {/* <div className="h-full rounded-md bg-gray-100"> */}
//         <ul className="flex flex-col gap-4 h-full p-4 items-center overflow-y-auto">
//           <p className="w-full">مقالاتك: </p>
//           <li className="w-full bg-gray-300 rounded-md p-2">عنوان مقال 1</li>
//           <li className="w-full bg-gray-300 rounded-md p-2">عنوان مقال 1</li>
//           <li className="w-full bg-gray-300 rounded-md p-2">عنوان مقال 1</li>
//           <li className="w-full bg-gray-300 rounded-md p-2">عنوان مقال 1</li>
//           <li className="w-full bg-gray-300 rounded-md p-2">عنوان مقال 1</li>
//           <li className="w-full bg-gray-300 rounded-md p-2">عنوان مقال 1</li>
//         </ul>
//         {/* </div> */}
//       </div>
//     </div>
//   </div>
// );

// older

/* show a list of items, and the details of an item in one view */
/* <div className="grid grid-cols-1 gap-4 laptop:grid-cols-3 laptop:gap-8 bg-gray-100 h-full p-4 px-4 laptop:px-0">
  <div className="h-full rounded-md bg-gray-200">
    <ul className="flex flex-row laptop:flex-col gap-4 h-full p-4 items-center overflow-x-auto">
      <p className="w-full">مقالاتك: </p>
      <li className="w-full bg-gray-300 rounded-md p-2">عنوان مقال 1</li>
      <li className="w-full bg-gray-300 rounded-md p-2">عنوان مقال 1</li>
      <li className="w-full bg-gray-300 rounded-md p-2">عنوان مقال 1</li>
      <li className="w-full bg-gray-300 rounded-md p-2">عنوان مقال 1</li>
      <li className="w-full bg-gray-300 rounded-md p-2">عنوان مقال 1</li>
      <li className="w-full bg-gray-300 rounded-md p-2">عنوان مقال 1</li>
    </ul>
  </div>
  <div className="h-32 rounded-md bg-gray-200 laptop:col-span-2"></div>
</div> */

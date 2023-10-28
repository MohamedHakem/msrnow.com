// "use client"

// import * as yup from 'yup';
// // import toast from 'react-hot-toast';
// // import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { cn } from '@/lib/utils';
// import { useState } from 'react';
// // import { CheckIcon } from 'lucide-react';

// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { RadioGroup, RadioGroupItem } from './ui/radio-group';
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
// import { Textarea } from './ui/textarea';
// import { Button } from './ui/button';
// import { Input } from "./ui/input";
// import LoadingDots from './news/loading-dots';
// import { Checkbox } from './ui/checkbox';
// // import { db } from '@/lib/db';
// // import AddProduct from '@/utils/marketplace/addProduct';
// import toast from 'react-hot-toast';
// import { AddProduct, AddProductSlug } from '@/app/actions';
// import { useRouter } from 'next/navigation';
// import { sanitizeSlug } from '@/utils/sanitizeSlug';
// // import { sanitizeTitle } from '@/utils/sanitizeTitle';
// // import { Select } from './ui/select';
// import { FileUpload } from './shared/file-upload';


// export default function AddNewItem({ itemKind, itemInAr }: { itemKind: string, itemInAr: string }) {
//   const [isLoading, setLoading] = useState(false)
//   const [productImage, setProductImage] = useState("")
//   const productCategories = [{ label: "أحذية", value: 1 }]
//   const router = useRouter()

//   const formSchema = yup.object().shape({
//     title: yup.string().required('من فضلك تأكد من كتابة عنوان'),
//     description: yup.string().min(6).required('من فضلك تأكد ان الوصف أكثر من 10 أحرف'),
//     // when you add "exchange or donate options, make the price optional, so, for not it's required"
//     // price: yup.number().min(1),
//     price: yup.number().min(0).default(0).required('من فضلك تأكد من إضافة سعر او ضع صفر واختار مجاني (للتبرع)'),
//     // stockQuantity: yup.number().min(1).default(1).required('من فضلك تأكد ان الكمية رقم 1 او اكثر'),
//     stockQuantity: yup.number().min(1).default(1),
//     // product_category: yup.number().min(1).required('من فضلك اختار فئة مناسبة لما تبيعه'),
//     // product_category: yup.number().min(1).default(1),
//     productCategoryId: yup.number().min(1).default(1),
//     // published_status: yup.boolean().default(true).required('عايز تعرض للبيع حالا ولا تحفظه مؤقتا'),
//     published_status: yup.boolean().default(true),
//     // is_used: yup.boolean().default(false).required('من فضلك اختار حالة المنتج'),
//     is_used: yup.boolean().default(false),
//     is_exchangeable: yup.boolean().default(false),
//     free_shipping: yup.boolean().default(false),
//     // slug: yup.string().default("")
//   });
//   const form = useForm<yup.InferType<typeof formSchema>>({
//     resolver: yupResolver(formSchema),
//     defaultValues: {
//       title: '',
//       description: '',
//       is_used: false,
//       price: 1,
//       is_exchangeable: false,
//       stockQuantity: 1,
//       // product_category: 1,
//       productCategoryId: 1,
//       published_status: true,
//       free_shipping: false,
//       // slug: ""
//     }
//   });

//   async function callAddProduct(values: yup.InferType<typeof formSchema>) {
//     const addProductRes = await AddProduct(values)
//     // console.log("🚀 ~ file: add-new-item.tsx:71 ~ onSubmit ~ addProductRes:", addProductRes)
//     if (!!addProductRes) {
//       const newSlug = sanitizeSlug(addProductRes.title)
//       await AddProductSlug(`${newSlug}-${addProductRes.id}`, addProductRes.id)
//       toast.success("تم إضافة الإعلان بنجاح")
//       router.push('/dashboard/products')
//     } else {
//       toast.error("حدث خطأ. راجع بياناتك وحاول مرة أخري")
//     }
//   }

//   async function onSubmit(values: yup.InferType<typeof formSchema>) {
//     setLoading(true);
//     console.log("[onSubmit] values: ", values);
//     console.log("[onSubmit] productImage: ", productImage);
//     // await callAddProduct(values);

//     // create new product in the db, get it back, make another call adding the slug embedding the product id
//     // const newProduct = db.product.create({
//     //   data: values
//     // })
//     // const addProductRes = await AddProduct(values)
//     // console.log("🚀 ~ file: add-new-item.tsx:71 ~ onSubmit ~ addProductRes:", addProductRes)
//     // // console.log("newProduct: ", newProduct)
//     // toast.success("تم إضافة الإعلان بنجاح")
//     setLoading(false);
//   }

//   return (
//     <div className="py-4">
//       <div className="flex flex-col gap-4 w-full">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-xl font-semibold">عنوان</FormLabel>
//                   <FormControl>
//                     <Input
//                       autoFocus
//                       autoComplete={'true'.toString()}
//                       type="title"
//                       placeholder="ادخل عنوان جذاب"
//                       disabled={isLoading}
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormDescription>اسم أو عنوان بوصف جذاب ومختصر للي عايز تبيعه</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="productCategoryId"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="text-xl font-semibold">اختر الفئة</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild disabled={isLoading}>
//                       <FormControl>
//                         <Button
//                           variant="outline"
//                           role="combobox"
//                           className={cn(
//                             "w-[200px] justify-between",
//                             !field.value && "text-muted-foreground"
//                           )}
//                         >
//                           {field.value
//                             ? productCategories.find(
//                               (category) => category.value === field.value
//                             )?.label
//                             : "اختر فئة"}
//                           <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent dir='rtl' className="w-[200px] p-0">
//                       <Command>
//                         <CommandInput placeholder=" ابحث الاقسام...  " />
//                         <CommandEmpty>لا يوجد اقسام</CommandEmpty>
//                         <CommandGroup>
//                           {productCategories.map((category) => (
//                             <CommandItem
//                               value={category.label}
//                               key={category.value}
//                               onSelect={() => {
//                                 form.setValue("productCategoryId", category.value)
//                               }}
//                               className='cursor-pointer'
//                             >
//                               <CheckIcon
//                                 className={cn(
//                                   "ml-2 h-4 w-4",
//                                   category.value === field.value
//                                     ? "opacity-100"
//                                     : "opacity-0"
//                                 )}
//                               />
//                               {category.label}
//                             </CommandItem>
//                           ))}
//                         </CommandGroup>
//                       </Command>
//                     </PopoverContent>
//                   </Popover>
//                   <FormDescription>
//                     اختر فئة مناسبة للي عايز تبيعه علشان يتباع أسرع.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="is_used"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col gap-2">
//                   <FormLabel className="text-xl font-semibold">الحالة</FormLabel>
//                   <FormMessage />
//                   <RadioGroup
//                     dir='rtl'
//                     onValueChange={field.onChange}
//                     defaultValue={"false"}
//                     disabled={isLoading}
//                     className="grid max-w-md grid-cols-2 gap-8 pt-2"
//                   >
//                     <FormItem>
//                       <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
//                         <FormControl>
//                           <RadioGroupItem value="false" className="sr-only" />
//                         </FormControl>
//                         <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent cursor-pointer">
//                           <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
//                             <span className="block w-full text-center text-xl font-semibold">
//                               جديد
//                             </span>
//                           </div>
//                         </div>
//                       </FormLabel>
//                     </FormItem>
//                     <FormItem>
//                       <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
//                         <FormControl>
//                           <RadioGroupItem value="true" className="sr-only" />
//                         </FormControl>
//                         <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent cursor-pointer">
//                           <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
//                             <span className="block w-full text-center text-xl font-semibold">
//                               مستعمل
//                             </span>
//                           </div>
//                         </div>
//                       </FormLabel>
//                     </FormItem>
//                   </RadioGroup>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-xl font-semibold">الوصف</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       autoComplete={'true'.toString()}
//                       placeholder="أوصف التفاصيل الهامة للمشتري..."
//                       disabled={isLoading}
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormDescription>اكتب التفاصيل المهمة والشحن والتواصل</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-xl font-semibold">السعر</FormLabel>
//                   <FormControl>
//                     <Input
//                       // autoFocus
//                       autoComplete={'true'.toString()}
//                       type="number"
//                       placeholder=""
//                       disabled={isLoading}
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormDescription>جنية مصري</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="is_exchangeable"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row gap-2 !mt-4 items-center text-xl font-semibold">
//                   <FormControl>
//                     <Checkbox
//                       className="w-5 h-5"
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                       disabled={isLoading}
//                     />
//                   </FormControl>
//                   <FormLabel className="text-lg font-medium !mt-0">قابل للتبديل</FormLabel>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="is_exchangeable"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row gap-2 !mt-4 items-center text-xl font-semibold">
//                   <FormControl>
//                     <FileUpload endpoint={'productImageUploader'} onChange={(url) => {
//                       if (url) setProductImage(url)
//                     }} />

//                     {/* <Checkbox
//                       className="w-5 h-5"
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                       disabled={isLoading}
//                     /> */}
//                   </FormControl>
//                   <FormLabel className="text-lg font-medium !mt-0">قابل للتبديل</FormLabel>
//                 </FormItem>
//               )}
//             />

//             <Button className="w-full h-14 mt-4" type="submit" disabled={isLoading}>
//               {isLoading ? <LoadingDots className="bg-white dark:bg-black" /> : <span className="text-3xl pb-4">بيع</span>}
//             </Button>
//           </form>
//         </Form>
//       </div >
//     </div >
//   )
// }



// {/* the website is mostly for public, not professional sellers, 
//     so no need for stock quantity, or shipping options (handled in the desc), for now. 
// */}
// {/* <FormField
//   control={form.control}
//   name="stockQuantity"
//   render={({ field }) => (
//     <FormItem>
//       <FormLabel className="text-xl font-semibold">الكمية</FormLabel>
//       <FormControl>
//         <Input
//           autoComplete={'true'.toString()}
//           type="number"
//           placeholder=""
//           disabled={isLoading}
//           {...field}
//         />
//       </FormControl>
//       <FormDescription>اختار 1 لو قطعة واحدة</FormDescription>
//       <FormMessage />
//     </FormItem>
//   )}
// /> */}
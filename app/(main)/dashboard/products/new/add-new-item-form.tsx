/* eslint-disable @next/next/no-img-element */
"use client"

import * as yup from 'yup';
// import toast from 'react-hot-toast';
// import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
// import { CheckIcon } from 'lucide-react';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from '../../../../../components/ui/radio-group';
import { CaretSortIcon, CheckCircledIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { Textarea } from '../../../../../components/ui/textarea';
import { Button } from '../../../../../components/ui/button';
import { Input } from "../../../../../components/ui/input";
import LoadingDots from '../../../../../components/news/loading-dots';
import { Checkbox } from '../../../../../components/ui/checkbox';
// import { db } from '@/lib/db';
// import AddProduct from '@/utils/marketplace/addProduct';
import toast from 'react-hot-toast';
import { AddProduct, AddProductSlug } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { sanitizeSlug } from '@/utils/sanitizeSlug';
// import { sanitizeTitle } from '@/utils/sanitizeTitle';
// import { Select } from './ui/select';
// import { FileUpload } from '../../../../../components/shared/file-upload';
import { UploadDropzone } from '@/lib/uploadthing';
// import { DataTableFacetedFilter } from '@/app/(main)/dashboard/products/table/data-table-faceted-filter';
// import { AddNewItemSizesOrColor } from './add-new-item-sizes';
import { Separator } from '@/components/ui/separator';
import { Palette, PencilRuler } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AddNewItemForm({ itemKind, itemInAr }: { itemKind: string, itemInAr: string }) {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [productImages, setProductImages] = useState<string[]>([])
  const [selectedSizeValues, setSelectedSizeValues] = useState([""])
  const [selectedColorValues, setSelectedColorValues] = useState([""])
  const productCategories = [{ label: "أحذية", value: 1 }]
  const shoeSizes = [
    {
      label: "40",
      value: "1",
      icon: CheckCircledIcon
    },
    {
      label: "41",
      value: "2",
      icon: CheckCircledIcon
    },
    {
      label: "42",
      value: "3",
      icon: CheckCircledIcon
    },
    {
      label: "43",
      value: "4",
      icon: CheckCircledIcon
    },
    {
      label: "44",
      value: "5",
      icon: CheckCircledIcon
    },
    {
      label: "45",
      value: "6",
      icon: CheckCircledIcon
    },
    {
      label: "46",
      value: "7",
      icon: CheckCircledIcon
    },
    {
      label: "47",
      value: "8",
      icon: CheckCircledIcon
    },
    {
      label: "48",
      value: "9",
      icon: CheckCircledIcon
    },
    {
      label: "49",
      value: "10",
      icon: CheckCircledIcon
    },
    {
      label: "50",
      value: "11",
      icon: CheckCircledIcon
    },
    {
      label: "51",
      value: "12",
      icon: CheckCircledIcon
    },
    {
      label: "52",
      value: "13",
      icon: CheckCircledIcon
    },
    {
      label: "53",
      value: "14",
      icon: CheckCircledIcon
    },
  ]
  const colors = [
    {
      label: "أسود",
      value: "1",
      icon: CheckCircledIcon
    },
    {
      label: "رمادي",
      value: "2",
      icon: CheckCircledIcon
    },
    {
      label: "فضي",
      value: "3",
      icon: CheckCircledIcon
    },
    {
      label: "أبيض",
      value: "4",
      icon: CheckCircledIcon
    },
    {
      label: "أحمر",
      value: "5",
      icon: CheckCircledIcon
    },
    {
      label: "أخضر",
      value: "6",
      icon: CheckCircledIcon
    },
    {
      label: "لموني",
      value: "7",
      icon: CheckCircledIcon
    },
    {
      label: "برتقالي",
      value: "8",
      icon: CheckCircledIcon
    },
    {
      label: "أصفر",
      value: "9",
      icon: CheckCircledIcon
    },
    {
      label: "أزرق",
      value: "10",
      icon: CheckCircledIcon
    },
    {
      label: "بني",
      value: "11",
      icon: CheckCircledIcon
    },

  ]

  useEffect(() => {
    setSelectedSizeValues([])
    setSelectedColorValues([])
  }, [])

  const formSchema = yup.object().shape({
    title: yup.string().required('من فضلك تأكد من كتابة عنوان'),
    description: yup.string().min(6).required('من فضلك تأكد ان الوصف أكثر من 6 أحرف'),
    price: yup.number().min(0).default(0).required('من فضلك تأكد من إضافة سعر او ضع صفر واختار مجاني (للتبرع)'),
    shoeSizes: yup.array(yup.string().defined()),
    colors: yup.array(yup.string().defined()),
    stockQuantity: yup.number().min(1).default(1),
    productCategoryId: yup.number().min(1).default(1),
    published_status: yup.boolean().default(true),
    is_used: yup.boolean().default(false),
    is_exchangeable: yup.boolean().default(false),
    free_shipping: yup.boolean().default(false),
    product_images: yup.array(yup.string().defined()),
  });
  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      is_used: false,
      price: 1,
      is_exchangeable: false,
      stockQuantity: 1,
      productCategoryId: 1,
      published_status: true,
      free_shipping: false,
      product_images: undefined,
    }
  });

  async function callAddProduct(values: yup.InferType<typeof formSchema>) {
    // const addProductRes = await AddProduct(values, productImages)
    const addProductRes = await AddProduct(values, productImages, selectedSizeValues, selectedColorValues)
    // console.log("🚀 ~ file: add-new-item.tsx:71 ~ onSubmit ~ addProductRes:", addProductRes)

    if (!!addProductRes) {
      const newSlug = sanitizeSlug(addProductRes.title)
      await AddProductSlug(`${newSlug}-${addProductRes.id}`, addProductRes.id)
      router.refresh();
      router.push('/dashboard/products?add=success')
      toast.success("تم إضافة الإعلان بنجاح")
    } else {
      toast.error("حدث خطأ. راجع بياناتك وحاول مرة أخري")
    }
  }
  async function onSubmit(values: yup.InferType<typeof formSchema>) {
    setLoading(true);
    // const valuesWithImages = { ...values, images_to_upload: productImages }
    // console.log("[onSubmit] valuesWithImages: ", valuesWithImages);

    // console.log("[onSubmit] values: ", values);
    // console.log("[onSubmit] productImages: ", productImages);
    // console.log("[onSubmit] selectedSizeValues: ", selectedSizeValues);
    // console.log("[onSubmit] selectedColorValues: ", selectedColorValues);
    // console.log("[onSubmit] [...(product_images.map(img => ({ url: img })))]: ",
    //   [...(productImages.map(img => ({ url: img })))]
    // )

    if (!selectedSizeValues.length) toast.error("من فضلك اختر المقاسات المتاحة للمنتج")
    if (!selectedColorValues.length) toast.error("من فضلك اختر الألوان المتاحة للمنتج")
    if (!productImages.length) toast.error("من فضلك ضيف صور للمنتج")
    await callAddProduct(values)
    setLoading(false);
  }


  console.log("productImages: ", productImages)
  
  return (
    <div className="py-4">
      <div className="flex flex-col gap-4 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold">عنوان</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      autoComplete={'true'.toString()}
                      type="title"
                      placeholder="اسم أو عنوان بوصف جذاب ومختصر للي عايز تبيعه"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>اسم أو عنوان بوصف جذاب ومختصر للي عايز تبيعه</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productCategoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-xl font-semibold">الفئة</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild disabled={isLoading}>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                        >
                          {field.value
                            ? productCategories.find(
                              (category) => category.value === field.value
                            )?.label
                            : "اختر فئة"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent dir='rtl' className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder=" ابحث الاقسام...  " />
                        <CommandEmpty>لا يوجد اقسام</CommandEmpty>
                        <CommandGroup>
                          {productCategories.map((category) => (
                            <CommandItem
                              value={category.label}
                              key={category.value}
                              onSelect={() => {
                                form.setValue("productCategoryId", category.value)
                              }}
                              className='cursor-pointer'
                            >
                              <CheckIcon
                                className={cn(
                                  "ml-2 h-4 w-4",
                                  category.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">المقاسات والالوان</h2>
              <div className="flex flex-row gap-2">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="shoeSizes"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild className="w-full">
                              <FormControl>
                                <Button variant="outline" size="sm" className="h-10 border-dashed">
                                  <PlusCircledIcon className="ml-2 h-4 w-4" />
                                  <span className="ml-2">المقاسات</span>
                                  <PencilRuler />
                                  {selectedSizeValues?.length > 0 && (
                                    <>
                                      <Separator orientation="vertical" className="mx-2 h-4" />
                                      <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal laptop:hidden"
                                      >
                                        {selectedSizeValues.length}
                                      </Badge>
                                      <div className="hidden gap-1 laptop:flex">
                                        {selectedSizeValues.length > 2 ? (
                                          <Badge
                                            variant="secondary"
                                            className="rounded-sm px-1 font-normal"
                                          >
                                            {selectedSizeValues.length} مقاسات
                                          </Badge>
                                        ) : (
                                          shoeSizes
                                            .filter((size) => selectedSizeValues.includes(size.value))
                                            .map((size) => (
                                              <Badge
                                                variant="secondary"
                                                key={size.value}
                                                className="rounded-sm px-1 font-normal"
                                              >
                                                {size.label}
                                              </Badge>
                                            ))
                                        )}
                                      </div>
                                    </>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0" align="start">
                              <Command dir="rtl">
                                <CommandInput placeholder={"المقاسات"} className="flex flex-row gap-2" />
                                <CommandList>
                                  <CommandEmpty>لا يوجد نتائج.</CommandEmpty>
                                  <CommandGroup>
                                    {shoeSizes.map((size) => {
                                      const isSelected = selectedSizeValues.includes(size.value)
                                      return (
                                        <CommandItem
                                          key={size.value}
                                          onSelect={() => {
                                            if (isSelected) {
                                              console.log("selectedSizeValues.filter(v => v !== size.value): ",
                                                selectedSizeValues.filter(v => v !== size.value)
                                              )
                                              setSelectedSizeValues(selectedSizeValues.filter(v => v !== size.value))
                                            } else {
                                              setSelectedSizeValues([...selectedSizeValues, size.value])
                                            }
                                          }}
                                          className="cursor-pointer"
                                        >
                                          <div
                                            className={cn(
                                              "ml-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                              isSelected
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible"
                                            )}
                                          >
                                            <CheckIcon className={cn("h-4 w-4")} />
                                          </div>
                                          <span>{size.label}</span>
                                        </CommandItem>
                                      )
                                    })}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="colors"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild className="w-full">
                            <Button variant="outline" size="sm" className="h-10 border-dashed">
                              <PlusCircledIcon className="ml-2 h-4 w-4" />
                              <span className="ml-2">الألوان</span>
                              <Palette />
                              {selectedColorValues?.length > 0 && (
                                <>
                                  <Separator orientation="vertical" className="mx-2 h-4" />
                                  <Badge
                                    variant="secondary"
                                    className="rounded-sm px-1 font-normal laptop:hidden"
                                  >
                                    {selectedColorValues.length}
                                  </Badge>
                                  <div className="hidden gap-1 laptop:flex">
                                    {selectedColorValues.length > 2 ? (
                                      <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                      >
                                        {selectedColorValues.length} لون
                                      </Badge>
                                    ) : (
                                      colors
                                        .filter((size) => selectedColorValues.includes(size.value))
                                        .map((option) => (
                                          <Badge
                                            variant="secondary"
                                            key={option.value}
                                            className="rounded-sm px-1 font-normal"
                                          >
                                            {option.label}
                                          </Badge>
                                        ))
                                    )}
                                  </div>
                                </>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0" align="start">
                            <Command dir="rtl">
                              <CommandInput placeholder={"الألوان"} className="flex flex-row gap-2" />
                              <CommandList>
                                <CommandEmpty>لا يوجد نتائج.</CommandEmpty>
                                <CommandGroup>
                                  {colors.map((color) => {
                                    const isSelected = selectedColorValues.includes(color.value)
                                    return (
                                      <CommandItem
                                        key={color.value}
                                        onSelect={() => {
                                          if (isSelected) {
                                            console.log("selectedColorValues.filter(v => v !== color.value): ",
                                              selectedColorValues.filter(v => v !== color.value)
                                            )
                                            setSelectedColorValues(selectedColorValues.filter(v => v !== color.value))
                                          } else {
                                            setSelectedColorValues([...selectedColorValues, color.value])
                                          }
                                        }}
                                        className="cursor-pointer"
                                      >
                                        <div
                                          className={cn(
                                            "ml-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            isSelected
                                              ? "bg-primary text-primary-foreground"
                                              : "opacity-50 [&_svg]:invisible"
                                          )}
                                        >
                                          <CheckIcon className={cn("h-4 w-4")} />
                                        </div>
                                        <span>{color.label}</span>
                                      </CommandItem>
                                    )
                                  })}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold">الوصف</FormLabel>
                  <FormControl>
                    <Textarea
                      autoComplete={'true'.toString()}
                      placeholder="اكتب التفاصيل المهمة والشحن والتواصل"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>اكتب التفاصيل المهمة والشحن والتواصل</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_used"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-xl font-semibold">الحالة</FormLabel>
                  <FormMessage />
                  <RadioGroup
                    dir='rtl'
                    onValueChange={field.onChange}
                    defaultValue={"false"}
                    disabled={isLoading}
                    className="grid grid-cols-2 gap-4"
                  >
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value="false" className="sr-only" />
                        </FormControl>
                        <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent cursor-pointer">
                          <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                            <span className="block w-full text-center text-xl font-semibold">
                              جديد
                            </span>
                          </div>
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value="true" className="sr-only" />
                        </FormControl>
                        <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent cursor-pointer">
                          <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                            <span className="block w-full text-center text-xl font-semibold">
                              مستعمل
                            </span>
                          </div>
                        </div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-4 mt-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-xl font-semibold">السعر</FormLabel>
                    <FormControl>
                      <Input
                        // autoFocus
                        autoComplete={'true'.toString()}
                        type="number"
                        placeholder=""
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>جنية مصري</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_exchangeable"
                render={({ field }) => (
                  <FormItem className="flex flex-row w-1/2 gap-2 mt-2 items-center text-xl font-semibold">
                    <FormControl>
                      <Checkbox
                        className="w-6 h-6"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel className="text-lg font-medium !mt-0 cursor-pointer">قابل للتبديل</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="product_images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium !mt-0">إضافة صور</FormLabel>
                  <FormControl>
                    <>
                      <UploadDropzone className={`${isLoading ? "pointer-events-none cursor-not-allowed" : ""}`}
                        endpoint={'productImageUploader'}
                        onClientUploadComplete={(res) => {
                          const uploadedImages = res?.map(r => r.url)
                          if (uploadedImages && uploadedImages.length > 0) {
                            const newArr = [...productImages, ...uploadedImages]
                            setProductImages(newArr)
                            toast.success("تم إضافة الصور بنجاح")
                          }
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(`${error?.message}`)
                        }}
                        config={{ mode: "auto" }}
                      />
                      <div className="grid grid-cols-3 px-2 gap-2">
                        {productImages.length > 0 ? productImages.map((image, i) => (
                          <img
                            key={i}
                            src={image}
                            alt=""
                            width={"auto"}
                            height={"auto"}
                            className="w-full h-36 object-cover rounded-lg p-2 border" />
                        )) : null}
                      </div>
                    </>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="w-full h-14 mt-4" type="submit" disabled={isLoading}>
              {isLoading ? <LoadingDots className="bg-white dark:bg-black" /> : <span className="text-3xl pb-4">بيع</span>}
            </Button>
          </form>
        </Form>
      </div >
    </div >
  )
}



{/* the website is mostly for public, not professional sellers, 
    so no need for stock quantity, or shipping options (handled in the desc), for now. 
*/}
{/* <FormField
  control={form.control}
  name="stockQuantity"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-xl font-semibold">الكمية</FormLabel>
      <FormControl>
        <Input
          autoComplete={'true'.toString()}
          type="number"
          placeholder=""
          disabled={isLoading}
          {...field}
        />
      </FormControl>
      <FormDescription>اختار 1 لو قطعة واحدة</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/> */}
/* eslint-disable @next/next/no-img-element */
"use client"

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CaretSortIcon, CheckCircledIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import LoadingDots from '@/components/news/loading-dots';
import { Checkbox } from '@/components/ui/checkbox';
import toast from 'react-hot-toast';
import { AddProductSlug, deleteImage, updateProduct } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { sanitizeSlug } from '@/utils/sanitizeSlug';
import { UploadDropzone } from '@/lib/uploadthing';
import { Separator } from '@/components/ui/separator';
import { Palette, PencilRuler } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product } from '@prisma/client';
import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';

// type productImagesType = {
//   images: {
//     id: number;
//     url: string;
//   }[];
// }

export default function UpdateItemForm({ productCategories, product }: {
  productCategories: { name: string, id: number }[],
  product: Product &
  {
    images: {
      url: string
    }[]
  } & {
    ProductSizes: {
      id: number,
      value: string;
    }[]
  } & {
    ProductColors: {
      id: number,
      value: string;
    }[]
  }
}) {

  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [productImages, setProductImages] = useState<{ url: string; }[]>(product.images)
  const [selectedSizeValues, setSelectedSizeValues] = useState(product.ProductSizes || [""])
  const [selectedColorValues, setSelectedColorValues] = useState(product.ProductColors || [""])
  const [imageToDelete, setImageToDelete] = useState("")
  // console.log("selectedSizeValues: ", selectedSizeValues);

  const shoeSizes = [
    {
      id: 1,
      label: "40",
      value: "40",
      icon: CheckCircledIcon
    },
    {
      id: 2,
      label: "41",
      value: "41",
      icon: CheckCircledIcon
    },
    {
      id: 3,
      label: "42",
      value: "42",
      icon: CheckCircledIcon
    },
    {
      id: 4,
      label: "43",
      value: "43",
      icon: CheckCircledIcon
    },
    {
      id: 5,
      label: "44",
      value: "44",
      icon: CheckCircledIcon
    },
    {
      id: 6,
      label: "45",
      value: "45",
      icon: CheckCircledIcon
    },
    {
      id: 7,
      label: "46",
      value: "46",
      icon: CheckCircledIcon
    },
    {
      id: 8,
      label: "47",
      value: "47",
      icon: CheckCircledIcon
    },
    {

      id: 9,
      label: "48",
      value: "48",
      icon: CheckCircledIcon
    },
    {

      id: 10,
      label: "49",
      value: "49",
      icon: CheckCircledIcon
    },
    {
      id: 11,
      label: "50",
      value: "50",
      icon: CheckCircledIcon
    },
    {
      id: 12,
      label: "51",
      value: "51",
      icon: CheckCircledIcon
    },
    {
      id: 13,
      label: "52",
      value: "52",
      icon: CheckCircledIcon
    },
    {
      id: 14,
      label: "53",
      value: "53",
      icon: CheckCircledIcon
    },
  ]
  const colors = [
    {
      id: 1,
      label: "أسود",
      value: "#000",
      icon: CheckCircledIcon
    },
    {
      id: 2,
      label: "رمادي",
      value: "#808080",
      icon: CheckCircledIcon
    },
    {
      id: 3,
      label: "فضي",
      value: "#C0C0C0",
      icon: CheckCircledIcon
    },
    {
      id: 4,
      label: "أبيض",
      value: "#fff",
      icon: CheckCircledIcon
    },
    {
      id: 5,
      label: "أحمر",
      value: "#FF0000",
      icon: CheckCircledIcon
    },
    {
      id: 6,
      label: "أخضر",
      value: "#308000",
      icon: CheckCircledIcon
    },
    {
      id: 7,
      label: "لموني",
      value: "#00FF00",
      icon: CheckCircledIcon
    },
    {
      id: 8,
      label: "برتقالي",
      value: "#ffa500",
      icon: CheckCircledIcon
    },
    {
      id: 9,
      label: "أصفر",
      value: "#FFFF00",
      icon: CheckCircledIcon
    },
    {
      id: 10,
      label: "أزرق",
      value: "#00F",
      icon: CheckCircledIcon
    },
    {
      id: 11,
      label: "بني",
      value: "#964B00",
      icon: CheckCircledIcon
    },
    {
      id: 12,
      label: "جملي",
      value: "#8c5c20",
      icon: CheckCircledIcon
    },
  ]

  useEffect(() => {
    setSelectedSizeValues(product.ProductSizes || [])
    setSelectedColorValues(product.ProductColors || [])
  }, [product.ProductColors, product.ProductSizes])

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
    product_images: yup.array(),
  });
  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: product.title || "",
      description: product.description || "",
      is_used: product.is_used || false,
      price: product.price || 1,
      is_exchangeable: product.is_exchangeable || false,
      stockQuantity: product.stockQuantity || 1,
      productCategoryId: product.productCategoryId || 1,
      published_status: product.published_status || true,
      free_shipping: product.free_shipping || false,
      // product_images: product.images,
      product_images: undefined,
    }
  });

  async function callUpdateProduct(values: yup.InferType<typeof formSchema>) {
    console.log("values, productImages, selectedSizeValues, selectedColorValues: ", values, productImages, selectedSizeValues, selectedColorValues)
    const selectedSizeIds = selectedSizeValues.map(s => s.id)
    const selectedColorIds = selectedColorValues.map(c => c.id)
    // const addProductRes = await updateProduct(product.id, values, productImages, selectedSizeIds, selectedColorIds)
    const addProductRes = await updateProduct(product.id, values, selectedSizeIds, selectedColorIds)
    console.log("🚀 ~ file: update-item-form.tsx:234 ~ callUpdateProduct ~ addProductRes:", addProductRes)

    if (!!addProductRes) {
      const newSlug = sanitizeSlug(addProductRes.title)
      await AddProductSlug(`${newSlug}-${addProductRes.id}`, addProductRes.id)
      router.refresh();
      router.push('/dashboard/products?add=success')
      toast.success("تم تعديل الإعلان بنجاح")
    } else {
      toast.error("حدث خطأ. راجع بياناتك وحاول مرة أخري")
    }
  }

  async function onSubmit(values: yup.InferType<typeof formSchema>) {
    setLoading(true);

    console.log("[onSubmit] productImages: ", productImages)
    console.log("imageToDelete: ", imageToDelete)
    const deleteImgRes = await deleteImage(imageToDelete)
    console.log("deleteImgRes: ", deleteImgRes)
    if(deleteImgRes.success) {
      router.refresh();
      // router.push('/dashboard/products?add=success')
      toast.success("تم حذف الصورة بنجاح")
    }
    
    if (!selectedSizeValues.length) toast.error("من فضلك اختر المقاسات المتاحة للمنتج")
    if (!selectedColorValues.length) toast.error("من فضلك اختر الألوان المتاحة للمنتج")
    if (!productImages.length) toast.error("لم تضف أي صور للمنتج")
    // await callUpdateProduct(values)
    setLoading(false);
  }

  async function onImageDelete(url: string) {
    console.log("[onImageDelete] url: ", url);
    const res = await deleteImage(url)
    console.log("[onImageDelete] deleteImage res: ", res)

    return res
  }

  return (
    <div className="py-4 max-w-screen-tablet m-auto">
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
                              (category) => category.id === field.value
                            )?.name
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
                              value={category.name}
                              key={category.id}
                              onSelect={() => {
                                form.setValue("productCategoryId", category.id)
                              }}
                              className='cursor-pointer'
                            >
                              <CheckIcon
                                className={cn(
                                  "ml-2 h-4 w-4",
                                  category.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.name}
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
                                  {selectedSizeValues.length > 0 ? (
                                    <>
                                      <Separator orientation="vertical" className="mx-2 h-4" />
                                      <Badge variant="secondary" className="rounded-sm px-1 font-normal laptop:hidden">
                                        {selectedSizeValues.length}
                                      </Badge>
                                      <div className="hidden gap-1 laptop:flex">
                                        {selectedSizeValues.length > 2 ? (
                                          <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                            {selectedSizeValues.length} مقاسات
                                          </Badge>
                                        ) : (shoeSizes
                                          .filter((size) => {
                                            // const result = selectedSizeValues.includes({ value: size.value })
                                            const result = selectedSizeValues.filter(s => s.value === size.value)
                                            // console.log("[filter] shoeSizes current size: ", size)
                                            // console.log("[filter] selectedSizeValues: ", selectedSizeValues)
                                            // console.log("[filter] result: ", result)
                                            // console.log("[filter] result2: ", result2)
                                            return result.length > 0
                                          })
                                          .map((size, i) => {
                                            // console.log("[map] size: ", size, ' - i: ', i)
                                            return <Badge
                                              variant="secondary"
                                              key={size.value}
                                              className="rounded-sm px-1 font-normal"
                                            >
                                              {size.label}
                                            </Badge>
                                          })
                                        )}
                                      </div>
                                    </>) : null}
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
                                      const selected = selectedSizeValues.filter(s => s.value === size.value)
                                      const isSelected = selected.length
                                      return (
                                        <CommandItem
                                          key={size.value}
                                          onSelect={() => {
                                            if (isSelected) {
                                              console.log("selectedSizeValues.filter(v => v !== size.value): ",
                                                selectedSizeValues.filter(v => v.value !== size.value)
                                              )
                                              setSelectedSizeValues(selectedSizeValues.filter(v => v.value !== size.value))
                                            } else {
                                              setSelectedSizeValues([...selectedSizeValues, { id: size.id, value: size.value }])
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
                                        .filter((color) => {
                                          const result = selectedColorValues.filter(c => c.value === color.value)
                                          return result.length > 0
                                        })
                                        .map((color) => (
                                          <Badge
                                            variant="secondary"
                                            key={color.value}
                                            className="rounded-sm px-1 font-normal"
                                          >
                                            {color.label}
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
                                    const selected = selectedColorValues.filter(c => c.value === color.value)
                                    const isSelected = selected.length > 0
                                    return (
                                      <CommandItem
                                        key={color.value}
                                        onSelect={() => {
                                          if (isSelected) {
                                            console.log("selectedColorValues.filter(v => v !== color.value): ",
                                              selectedColorValues.filter(v => v.value !== color.value)
                                            )
                                            setSelectedColorValues(selectedColorValues.filter(v => v.value !== color.value))
                                          } else {
                                            setSelectedColorValues([...selectedColorValues, { id: color.id, value: color.value }])
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
                            const newImages: { url: string }[] = uploadedImages.map(url => { return { url: url } })
                            const newArr = [...productImages, ...newImages]
                            setProductImages(newArr)
                            toast.success("تم إضافة الصور بنجاح")
                          }
                        }}
                        // work with the image url (string) only, also add a featured_Image_Url to the product schema which holds the url of the choosen/best/1st img 
                        onUploadError={(error: Error) => {
                          toast.error(`${error?.message}`)
                        }}
                        config={{ mode: "auto" }}
                      />
                      <div className="grid grid-cols-3 px-2 gap-2">
                        {productImages.length > 0 ? productImages.map((image, i) => (
                          <div key={i} className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px]">
                              <button
                                aria-label="Remove product image"
                                onClick={async () => {
                                  // startTransition(async () => {
                                  //   cart.removeItem(item.id.toString());
                                  //   router.refresh();
                                  // });

                                  // await onImageDelete(image.url)
                                  console.log("[before] productImages: ", productImages)
                                  setImageToDelete(image.url)
                                  const newProductImage = productImages.filter(img => img.url != image.url)
                                  console.log("[after] newProductImage: ", newProductImage)
                                  setProductImages(newProductImage)
                                }}
                                className={clsx(
                                  'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
                                )}
                              >
                                <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
                              </button>
                            </div>
                            <img
                              // key={i}
                              // src={image}
                              // src={image}
                              src={`https://wsrv.nl/?url=${image.url}&default=${image.url}&l=9&af=''&il=''&n=-1&w=162&h=162&output=webp`}
                              alt=""
                              width={"auto"}
                              height={"auto"}
                              className="w-full h-36 object-cover rounded-lg p-2 border"
                            />
                          </div>
                        )) : null}
                      </div>
                    </>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="w-full h-14 mt-4" type="submit" disabled={isLoading}>
              {isLoading ? <LoadingDots className="bg-white dark:bg-black" /> : <span className="text-3xl">حفظ</span>}
            </Button>
          </form>
        </Form>
      </div >
    </div >
  )
}

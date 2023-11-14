"use client"

/* eslint-disable @next/next/no-img-element */
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import LoadingDots from '@/components/news/loading-dots';
import { Checkbox } from '@/components/ui/checkbox';
import toast from 'react-hot-toast';
import { AddOrder } from '@/app/actions';
import useCart from '@/hooks/use-cart';
// import { useSession } from 'next-auth/react';
import { OrderStatus } from '@prisma/client';
import { useRouter } from 'next/navigation';
// import confetti from 'canvas-confetti';
// const confetti = require('canvas-confetti');
import { User } from 'next-auth';

export default function CheckoutForm(user: User) {
  // const session = useSession()
  const router = useRouter()
  const items = useCart((state) => state.items);
  const cart = useCart();
  const [isLoading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false);
  // const [user, setUser] = useState(session?.data?.user ? session.data.user : null);
  const shippingCountries = [{ label: "مصر", value: 1 }]
  const shippingCities = [
    { label: "القاهرة", value: 1 },
    { label: "الجيزة	", value: 2 },
    { label: "الإسكندرية", value: 3 },
    { label: "الإسماعيلية", value: 4 },
    { label: "أسوان	", value: 5 },
    { label: "أسيوط	", value: 6 },
    { label: "الأقصر	", value: 7 },
    { label: "البحر الأحمر	", value: 8 },
    { label: "البحيرة	", value: 9 },
    { label: "بني سويف	", value: 10 },
    { label: "بورسعيد	", value: 11 },
    { label: "جنوب سيناء	", value: 12 },
    { label: "الدقهلية	", value: 13 },
    { label: "دمياط	", value: 14 },
    { label: "سوهاج	", value: 15 },
    { label: "السويس	", value: 16 },
    { label: "الشرقية	", value: 17 },
    { label: "شمال سيناء	", value: 18 },
    { label: "الغربية	", value: 19 },
    { label: "الفيوم	", value: 20 },
    { label: "القليوبية	", value: 21 },
    { label: "قنا	", value: 22 },
    { label: "كفر الشيخ	", value: 23 },
    { label: "مطروح	", value: 24 },
    { label: "المنوفية	", value: 25 },
    { label: "المنيا	", value: 26 },
    { label: "الوادي الجديد	", value: 27 }
  ]
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/login')
      toast.loading("سجل دخول أولا")
    }
  }, [router, user]);

  console.log("user: ", user.name);

  const formSchema = yup.object().shape({
    name: yup.string().required('من فضلك ادخل اسمك لسهولة التواصل وإستلام الاوردر'),
    // email: yup.string().required('ادخل بريد إلكتروني او رقم هاتف أساسي'),
    phone_number: yup.string().required('من فضلك تأكد من إدخال رقم هاتف إضافي'),
    shipping_country: yup.string().required('اختار دولة'),
    shipping_city: yup.string().required('اختار مدينة'),
    shipping_address: yup.string().required('أدخل عنوان مفصل، المدينة، الحي، رقم الشارع، المبني، الشقة أو أي علامات مميزة لمساعدة مندوب الشحن توصيل المنتج ليك فأسرع وقت'),
    shipping_notes: yup.string(),
    shipping_info_toSellers_consent: yup.boolean().required('يجب الموافقة علي إرسال بياناتك للبائع لإتمام عملية الشحن والبيع'),
    shipping_info_save_consent: yup.boolean(),
  });
  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      // email: "",
      phone_number: "",
      shipping_country: "",
      shipping_city: "",
      shipping_address: "",
      shipping_notes: "",
      shipping_info_save_consent: true,
    }
  });

  async function callAddOrder(values: yup.InferType<typeof formSchema>) {
    // console.log("values.shipping_info_toSellers_consent: ", values.shipping_info_toSellers_consent)
    // console.log("[callAddOrder] user: ", user)
    console.log("[callAddOrder] items: ", items)
    if (user && values.shipping_info_toSellers_consent) {
      const productsArr = items.map(item => { return { quantity: 1, productId: item.id, at_price: item.price, size: item.selectedSize, color: item.selectedColor } })
      const { name, ...valuesWithoutName } = Object.assign({}, values);
      let data = {
        ...valuesWithoutName,
        status: OrderStatus.PENDING,
        shipping_info_toSellers_consent: values.shipping_info_toSellers_consent,
      }

      const addOrderRes = await AddOrder(data, productsArr, values.name, user, totalPrice)
      console.log("[onSubmit] addOrderRes: ", addOrderRes)
      if (addOrderRes.status) {
        toast.success(addOrderRes.msg)
        cart.removeAll()
        // confetti({
        //   particleCount: 50,
        //   startVelocity: 10,
        //   spread: 180,
        //   gravity: 0.3,
        // });
        router.back()
      } else {
        toast.error(addOrderRes.msg)
      }
    } else {
      toast.error("يجب عليك تسجيل الدخول والموافقة علي إرسال بيانات الشحن للبائعين لإتمام الشحن")
    }
  }

  async function onSubmit(values: yup.InferType<typeof formSchema>) {
    setLoading(true);
    console.log("[onSubmit] values: ", values);
    await callAddOrder(values)
    setLoading(false);
    // save user shipping info to the User model / db
    // make an Order entry first, then an OrderItem for each product and connect it to the order (get the orderId), then make the OrderHistory entry 
    // 1- add an order to the Order model with: userId (add&get the user "name"), status as PENDING, 
    // 2- get the orderId, use it to add new record in the OrderHistory model with status PENDING
    // 3- add new record to the OrderItem model, with the orderId, productId, quantity (1 for now)
  }

  if (!isMounted) {
    return null;
  }
  return (
    <div className="py-4">
      {items.length === 0 ? (
        <div className="text-center">لا يوجد مشتريات في عربتك</div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">بيانات التواصل</h2>
                <div className="flex flex-col tablet:flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="tablet:w-1/2">
                        <FormControl>
                          <Input
                            autoFocus
                            autoComplete={'true'.toString()}
                            type="name"
                            placeholder="اسمك"
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
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem className="tablet:w-1/2">
                        <FormControl>
                          <Input
                            autoComplete={'true'.toString()}
                            type="tel"
                            placeholder="رقم الهاتف"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">عنوان الشحن</h2>
                <div className="flex flex-col tablet:flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="shipping_country"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild disabled={isLoading}>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn("w-full justify-between px-3", !field.value && "text-muted-foreground")}
                              >
                                {field.value
                                  ? shippingCountries.find(
                                    (country) => country.value.toString() === field.value
                                  )?.label
                                  : "دولتك"}
                                <CaretSortIcon className="mr-2 h-4 w-4 shrink-0 opacity-70" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent dir='rtl' className="w-full mobilesm:w-[calc(100dvw - 64px)] tablet:w-[calc(100dvw - 80px)] laptop:w-[520px] p-0">
                            <Command>
                              <CommandInput placeholder=" ابحث عن دولتك...  " />
                              <CommandEmpty>لا يوجد دولة بهذا الاسم</CommandEmpty>
                              <CommandGroup>
                                {shippingCountries.map((country) => (
                                  <CommandItem
                                    value={country.label}
                                    key={country.value}
                                    onSelect={() => {
                                      form.setValue("shipping_country", country.value.toString())
                                    }}
                                    className='cursor-pointer'
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "ml-2 h-4 w-4",
                                        country.value.toString() === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {country.label}
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
                  <FormField
                    control={form.control}
                    name="shipping_city"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild disabled={isLoading}>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn("w-full justify-between px-3", !field.value && "text-muted-foreground")}
                              >
                                {field.value
                                  ? shippingCities.find(
                                    (city) => city.value.toString() === field.value
                                  )?.label
                                  : "مدينتك"}
                                <CaretSortIcon className="mr-2 h-4 w-4 shrink-0 opacity-70" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent dir='rtl' className="w-full mobilesm:w-[calc(100dvw - 64px)] tablet:w-[calc(100dvw - 80px)] laptop:w-[520px] p-0">
                            <Command>
                              <CommandInput placeholder=" ابحث عن مدينتك...  " />
                              <CommandEmpty>لا يوجد مدينة بهذا الاسم</CommandEmpty>
                              <CommandGroup>
                                {shippingCities.map((city) => (
                                  <CommandItem
                                    value={city.label}
                                    key={city.value}
                                    onSelect={() => {
                                      form.setValue("shipping_city", city.value.toString())
                                    }}
                                    className='cursor-pointer'
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "ml-2 h-4 w-4",
                                        city.value.toString() === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {city.label}
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
                  <FormField
                    control={form.control}
                    name="shipping_address"
                    render={({ field }) => (
                      <FormItem className="flex-auto">
                        <FormControl>
                          <Input
                            autoComplete={'true'.toString()}
                            type="shipping_address"
                            placeholder="الحي، رقم الشارع، المبني، الشقة"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="shipping_notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          autoComplete={'true'.toString()}
                          placeholder="علامات مميزة للمنزل او ملحوظات للبائع او مندوب الشحن"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="shipping_info_save_consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row w-full gap-2 mt-2 items-center font-semibold">
                    <FormControl>
                      <Checkbox
                        className="w-5 h-5"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium !mt-0 cursor-pointer">احفظ بياناتي للمرة القادمة</FormLabel>
                  </FormItem>
                )}
              />

              <div className="my-2 h-1"></div>

              <FormField
                control={form.control}
                name="shipping_info_toSellers_consent"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1 mt-6 items-center font-semibold space-y-0">
                    <div className="flex w-full gap-2">
                      <FormControl>
                        <Checkbox
                          className="w-6 h-6"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel className="space-y-0 text-base font-medium cursor-pointer">ارسل بياناتي للبائع لإتمام عملية الشحن</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full h-14 mt-4" type="submit" disabled={isLoading}>
                {isLoading ? <LoadingDots className="bg-white dark:bg-black" /> : <span className="text-xl">تأكيد الطلب</span>}
              </Button>
            </form>
          </Form>
        </div >
      )}
    </div >
  )
}

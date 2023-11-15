/* eslint-disable @next/next/no-img-element */
"use client"

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { CaretSortIcon, CheckCircledIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
// import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import LoadingDots from '@/components/news/loading-dots';
// import { Checkbox } from '@/components/ui/checkbox';
import toast from 'react-hot-toast';
// import { AddProduct, AddProductSlug } from '@/app/actions';
import { useRouter } from 'next/navigation';
// import { sanitizeSlug } from '@/utils/sanitizeSlug';
import { UploadDropzone } from '@/lib/uploadthing';
import { updateUser } from '@/app/actions';
// import { Separator } from '@/components/ui/separator';
// import { Palette, PencilRuler } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { useSession } from 'next-auth/react';
// import { getUser } from '@/data/getUser';

export default function MyInfoForm({ itemKind, itemInAr, user }: {
  itemKind: string,
  itemInAr: string,
  user: { name: string | null, phone_number: string | null, image: string | null } | null
}) {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [name, setName] = useState(user ? user.name : "")
  const [phone, setPhone] = useState(user ? user.phone_number : "")
  const [image, setImage] = useState<string>(user && user.image ? user.image : "")
  // const [selectedSizeValues, setSelectedSizeValues] = useState([""])
  // const [selectedColorValues, setSelectedColorValues] = useState([""])

  // const session = useSession()

  // useEffect(() => {
  // console.log("inside useEffect");

  // const currentUser = async (userEmail: string) => {
  //   const user = await getUser(userEmail)
  //   console.log("user: ", user);
  //   if (user && user.name) {
  //     setName(user.name)
  //   }
  //   if (user && user.phone_number) {
  //     setPhone(user.phone_number)
  //   }
  // }

  // if (session.status === "authenticated" && session.data?.user.email) {
  //   console.log("status is authenticated");
  //   currentUser(session.data?.user.email)
  // }
  // }, [session.data?.user.email, session.data?.user.name, session.status])

  const formSchema = yup.object().shape({
    name: yup.string().required('من فضلك تأكد من كتابة اسمك').default(""),
    phone_number: yup.string().default(""),
    profile_image: yup.string().default("")
  });

  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: name || "",
      phone_number: phone || "",
      profile_image: image[0] || ""
    }
  });

  async function callUpdateUser(values: yup.InferType<typeof formSchema>) {
    const updatedUser = await updateUser({ ...values, profile_image: image })

    if (!!updatedUser) {
      router.refresh();
      router.push('/dashboard/my-info?updated=success')
      toast.success("تم حفظ بياناتك بنجاح")
    } else {
      toast.error("حدث خطأ. راجع بياناتك وحاول مرة أخري")
    }
  }

  async function onSubmit(values: yup.InferType<typeof formSchema>) {
    setLoading(true);
    console.log("values: ", values)
    if (!values.name) toast.error("من فضلك ضيف اسمك اللي هتظهر بيه علي الموقع")
    await callUpdateUser(values)
    setLoading(false);
  }

  useEffect(() => {
    console.log("user: ", user)
    console.log("current values: ", { name: name, phone: phone, image: image })
  }, [name, phone, image, user])

  return (
    <div className="py-4">
      <div className="flex flex-col gap-4 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold">الاسم</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      autoComplete={'true'.toString()}
                      type="name"
                      placeholder="اسمك كما تريده ان يظهر علي الموقع"
                      disabled={isLoading}
                      // value={name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div dir="rtl" className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">رقم الهاتف</h2>
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        autoComplete={'true'.toString()}
                        type="tel"
                        placeholder=""
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
              name="profile_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium !mt-0">صورة شخصية</FormLabel>
                  <FormControl>
                    <>
                      <UploadDropzone className={`${isLoading ? "pointer-events-none cursor-not-allowed" : ""}`}
                        endpoint={'profileImageUploader'}
                        onClientUploadComplete={(res) => {
                          console.log("res: ", res);
                          const uploadedImage = res && res.length > 0 ? res[0].url : ""
                          if (uploadedImage !== "") {
                            setImage(uploadedImage)
                            toast.success("تم إضافة الصورة بنجاح")
                          }
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(`${error?.message}`)
                        }}
                        config={{ mode: "auto" }}
                      />
                      <div className="grid grid-cols-2 px-2 gap-2">
                        {image !== "" ? (
                          <img
                            // src={image}
                            src={`https://wsrv.nl/?url=${image}&default=${image}&l=9&af=''&il=''&n=-1&w=96&h=96&output=webp`}
                            alt=""
                            width={96}
                            height={96}
                            className="w-24 h-24 object-cover rounded-lg p-2 border" />
                        ) : null}
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

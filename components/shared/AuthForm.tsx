'use client';

import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
import { yupResolver } from '@hookform/resolvers/yup';
// import * as z from 'zod';
import * as yup from 'yup';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AuthSocialButton from './AuthSocialButton';
import { BsGoogle } from 'react-icons/bs';
import Image from 'next/image';

export function ProfileForm() {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState('LOGIN');

  // const formSchema = z.object({
  //   email: z.string().email({
  //     // message: 'خطأ ببريدك الالكتورني. تأكد من بياناتك وحاول مرةأخري'
  //     message: 'wrong email'
  //   }),
  //   password: z.string().min(6, {
  //     // message: 'خطأ بكلمة السر. تأكد من بياناتك وحاول مرةأخري!'
  //     message: 'wrong password'
  //   })
  // });

  const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  });

  function validateEmailAndPassword(email: string, password: string): boolean {
    return !email.match(/^[\w-\.]+@[\w-\.]+\.[a-z]{2,3}$/) && password.length >= 6;
  }

  // 1. Define your form.
  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // 2. Define a submit handler.
  function onSubmit(values: yup.InferType<typeof formSchema>) {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', values)
        .then(() =>
          signIn('credentials', {
            ...values,
            redirect: false
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error('خطأ ببيانات تسجيل الدخول. تأكد من بياناتك وحاول مرة أخري');
          }

          if (callback?.ok) {
            router.push('/marketplace-1');
          }
        })
        .catch(() => toast.error('حدث خطأ! حاول مرة أخري 🙏'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...values,
        redirect: false
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('خطأ ببيانات تسجيل الدخول.\n هل قصدت التسجيل لأول مرة؟');
          }

          if (callback?.ok) {
            router.push('/marketplace-1');
          }
        })
        .finally(() => setIsLoading(false));
    }
    console.log(values);
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('خطأ ببيانات تسجيل الدخول. تأكد من بياناتك وحاول مرة أخري!');
        }

        if (callback?.ok) {
          router.push('/market-place-1');
        }
      })
      .finally(() => setIsLoading(false));
  };

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>بريد إلكتروني</FormLabel>
                <FormControl>
                  <Input autoComplete={'true'.toString()} type="email" placeholder="ادخل بريدك الالكتروني" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كلمة السر</FormLabel>
                <FormControl>
                  <Input autoComplete={'true'.toString()} type="password" placeholder="ادخل كلمة السر" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full text-base" type="submit">
            {variant === 'LOGIN' ? 'دخول' : 'تسجيل'}
          </Button>
        </form>
      </Form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">أو من خلال</span>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
        <div>
          <Image src={'/public/images/First-Time.jpg'}
            alt="first-time-اول-مرة-تدخل"
            width={200}
            height={100}
          />
        </div>
        <div className="flex gap-2">
          <div>{variant === 'LOGIN' ? 'أول مرة؟' : 'عندك حساب؟'}</div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === 'LOGIN' ? 'سجل حساب الان' : 'دخول'}
          </div>
        </div>
      </div>
    </div>
  );
}

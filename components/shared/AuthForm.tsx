'use client';

import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
import { yupResolver } from '@hookform/resolvers/yup';
// import * as z from 'zod';
import * as yup from 'yup';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AuthSocialButton from './AuthSocialButton';
import { FcGoogle } from 'react-icons/fc';
import LoadingDots from '../news/loading-dots';

export function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [variant, setVariant] = useState('LOGIN');

  useEffect(() => {
    if (session?.status === 'authenticated') {
      console.log('authenticated. redirecting to the marketplace');
      toast.success('تم تسجيل الدخول بنجاح');
      router.back();
    } else {
      // setTimeout(() => {}, 1000);
      setIsLoading(false);
    }
  }, [session?.status, router]);

  const formSchema = yup.object().shape({
    email: yup.string().email().required('من فضلك تأكد من كتابة ايميل سليم'),
    password: yup.string().min(6).required('من فضلك تأكد ان الباسورد أكثر من 6 أحرف')
  });

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
            router.push('/marketplace');
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
            router.push('/marketplace');
          }
        })
        .finally(() => setIsLoading(false));
    }
    // console.log(values); // LOL
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { callbackUrl: '/marketplace' })
      .then((callback) => {
        if (callback?.error) {
          toast.error('خطأ ببيانات تسجيل الدخول. تأكد من بياناتك وحاول مرة أخري!');
        }

        if (callback?.ok) {
          router.push('/marketplace');
        }
      })
      .finally(() => setIsLoading(false));
  };

  const toggleVariant = useCallback(() => {
    // console.log('loginParams: ', loginParams);
    // console.log('newParams: ', newParams);
    // newParams.set('email', email);
    // console.log('newParams: ', newParams);
    variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN');
    // router.push(createUrl('/login', newParams));
  }, [variant]);

  if (isLoading) {
    return <div className="w-full h-[400px] animate-blink bg-gray-200"></div>;
  } else {
    return (
      <div className={`w-full mx-4 ${isLoading ? 'opacity-50' : ''}`}>
        <div className="flex flex-col gap-4">
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-base font-semibold text-gray-500">أو من خلال</span>
            </div>
          </div> */}
          
          <div className="relative">
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-base font-semibold text-gray-500">سجل دخول عن طريق جوجل</span>
            </div>
          </div>

          <div className="flex gap-2">
            {isLoading ? (
              <div className="w-full rounded-md">
                <LoadingDots className="bg-black dark:bg-white" />
              </div>
            ) : (
              <AuthSocialButton icon={FcGoogle} onClick={() => socialAction('google')} disabled={isLoading} />
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border border-gray-300" />
              <div className="w-full" />
              <div className="w-full border border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-base font-semibold text-gray-500">أو</span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mt-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>بريد إلكتروني</FormLabel> */}
                  <FormControl>
                    <Input
                      autoFocus
                      autoComplete={'true'.toString()}
                      type="email"
                      placeholder="ادخل بريدك الالكتروني"
                      disabled={isLoading}
                      {...field}
                    // value={email}
                    // onChange={(event) => field.onChange(setEmail(event.target.value.toString()))}
                    // defaultValue={email}
                    // onChange={setEmail((event) => field.event.target.value)}
                    />
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
                  {/* <FormLabel>كلمة السر</FormLabel> */}
                  <FormControl>
                    <Input
                      autoComplete={'true'.toString()}
                      type="password"
                      placeholder="ادخل كلمة السر"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full text-base" type="submit" disabled={isLoading}>
              {isLoading ? <LoadingDots className="bg-white dark:bg-black" /> : variant === 'LOGIN' ? 'دخول' : 'تسجيل'}
            </Button>
          </form>
        </Form>

        <div className="flex flex-col gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div className="flex gap-2 justify-center items-center text-sm">
            <div>{variant === 'LOGIN' ? 'معندكش حساب؟' : 'عندك حساب؟'}</div>
            <div
              onClick={toggleVariant}
              className="underline underline-offset-8 text-sm font-semibold cursor-pointer"
            >
              {variant === 'LOGIN' ? 'سجل حساب الان' : 'دخول'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

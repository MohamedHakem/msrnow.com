// "use client";

// import { useEffect, useState } from 'react';
// import useCart from '@/hooks/use-cart';


import Container from '@/components/ui/container';
import Summary from './components/summary'
import CheckoutForm from '@/components/marketplace/checkout-form';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';
// import jwt from 'next-auth/jwt'


// import CartItem from './components/cart-item';

export const revalidate = 0;

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null
  const user = session.user

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-4 laptop:p-8 sm:px-6">
          <div className="flex flex-col-reverse laptop:flex-row laptop:mt-8 laptop:justify-start gap-x-32">
            <div dir="rtl" className="w-full laptop:w-3/5 animate-fadeIn">
              <Suspense fallback={<div className="bg-white">
                <div className="flex flex-col space-y-4">
                  <div className="bg-gray-200 rounded-lg h-8 animate-pulse"></div>
                  <div className="bg-gray-200 rounded-lg h-8 animate-pulse"></div>
                  <div className="bg-gray-200 rounded-lg h-8 animate-pulse"></div>
                  <div className="bg-gray-200 rounded-lg h-8 animate-pulse"></div>
                </div>
              </div>
              }>
                <CheckoutForm {...user} />
              </Suspense>
            </div>
            <div className="w-full laptop:w-2/5 animate-fadeIn">
              <Suspense fallback={<div className="bg-white">
                <div className="flex flex-col space-y-4">
                  <div className="bg-gray-200 rounded-lg h-8 animate-pulse"></div>
                  <div className="bg-gray-200 rounded-lg h-8 animate-pulse"></div>
                  <div className="bg-gray-200 rounded-lg h-8 animate-pulse"></div>
                  <div className="bg-gray-200 rounded-lg h-8 animate-pulse"></div>
                </div>
              </div>
              }>
                <Summary />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
};

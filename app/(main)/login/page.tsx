'use client';

import { ProfileForm } from '@/components/shared/AuthForm';

export default function LoginPage() {
  return (
    <div dir="rtl" className="-mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white sm:rounded-lg sm:px-10">
        <div
          className="min-w-full h-fit flex px-4 py-8 flex-col m-auto
          justify-center items-center tablet:shadow"
        >
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}

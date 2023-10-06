'use client';

import { ProfileForm } from '@/components/shared/AuthForm';

export default function LoginPage() {
  return (
    <div dir="rtl" className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div
          className="min-w-full h-fit flex flex-col m-auto
          justify-center items-center"
        >
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}

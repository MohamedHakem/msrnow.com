import GrayBG from '@/components/logo/gray-ish-bg';
import { AuthForm } from '@/components/shared/AuthForm';

export default function LoginPage() {
  return (
    <>
      <div className="absolute w-full h-full z-0"><GrayBG /></div>
      <div dir="rtl" className="sm:mx-auto sm:w-full sm:max-w-md z-10 m-auto mt-10">
        <div className="bg-white sm:rounded-lg sm:px-10 min-w-[340px]">
          <div className="min-w-full h-fit flex px-4 py-8 flex-col m-auto justify-center items-center">
            <AuthForm />
          </div>
        </div>
      </div>
    </>);
}

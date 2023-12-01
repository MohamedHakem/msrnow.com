import MyInfoForm from '@/app/(routes)/dashboard/my-info/components/my-info-form';
import { getUser } from '@/data/getUser';
import { getServerSession } from 'next-auth';

type userType = {
  name: string | null;
  phone_number: string | null;
  image: string | null;
} | null

export default async function myInfoPage() {
  const session = await getServerSession()
  let user: userType;
  if (!session?.user.email) return null

  user = await getUser(session?.user.email)
  return (
    <div className="flex flex-col gap-4 w-full tablet:w-[600px] max-w-screen-tablet mx-auto p-4 laptop:p-10 laptop:pt-0">
      <h1 className="text-4xl laptop:text-6xl font-bold text-center">بياناتي</h1>
      <MyInfoForm itemKind={"my-info"} itemInAr={"بياناتي"} user={user} />
    </div>
  );

  // } else {
  //   return (
  //     <div className="flex flex-col gap-4 w-full tablet:w-[600px] max-w-screen-tablet mx-auto p-4 laptop:p-10 laptop:pt-0">
  //       <h1 className="text-4xl laptop:text-6xl font-bold text-center">بياناتي</h1>
  //       <MyInfoForm itemKind={"my-info"} itemInAr={"بياناتي"} user={{ name: "", phone_number: "", image: "" }} />
  //     </div>
  //   );
  // }
}

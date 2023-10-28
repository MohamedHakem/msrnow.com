'use client';

// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="w-auto h-10 laptop:pt-2">
      {/* <Button variant={'outline'} onClick={() => router.back()} className="pl-4 pr-3"> */}
      <Button variant={'outline'} onClick={() => router.back()} className="py-2 px-3">
        <div className="flex flex-row gap-2 items-center justify-center">
          <ChevronRight size={20} className="h-auto" />
          {/* <span className="text-lg font-semibold -mt-1">رجوع</span> */}
        </div>
      </Button>
    </div>
  );
}

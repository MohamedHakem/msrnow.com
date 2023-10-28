'use client';

// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function ForwardButton() {
  const router = useRouter();

  return (
    <div className="w-auto h-10 laptop:pt-2">
      <Button variant={'outline'} onClick={() => router.forward()} className="py-2 px-3">
        <div className="flex flex-row gap-2 items-center justify-center">
          <ChevronLeft size={20} className="h-auto" />
        </div>
      </Button>
    </div>
  );
}

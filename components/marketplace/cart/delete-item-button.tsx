import { XMarkIcon } from '@heroicons/react/24/outline';
import LoadingDots from '@/components/marketplace/loading-dots';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { removeItem } from '@/components/marketplace/cart/actions';
import type { CartItem } from '@/lib/marketplace/types';
import { useTransition } from 'react';
import useCart from '@/hooks/use-cart';
import { marketplaceProductType } from '@/types';

export default function DeleteItemButton({ item }: { item: marketplaceProductType }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const cart = useCart()

  return (
    <button
      aria-label="Remove cart item"
      onClick={() => {
        startTransition(async () => {
          cart.removeItem(item.id.toString());
          router.refresh();
        });
      }}
      disabled={isPending}
      className={clsx(
        'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
        {
          'cursor-not-allowed px-0': isPending
        }
      )}
    >
      {isPending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      )}
    </button>
  );
}

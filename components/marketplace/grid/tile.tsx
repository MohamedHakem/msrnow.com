import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  src,
  width,
  height,
  label,
  alt,
}: {
  alt: string;
  src: string;
  width: number;
  height: number;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <>
      {src ? <Image unoptimized className="relative h-full w-full object-fill rounded-lg" alt={alt} src={src} width={width} height={height} /> : null}
      {label ? <Label title={label.title} amount={label.amount} currencyCode={"EGP"} /> : null}
    </>
  );
}

// <div className={clsx('group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
//   { relative: label, 'border-2 border-blue-600': active, 'border-neutral-200 dark:border-neutral-800': !active })}>

{/* {props.src ? <Image unoptimized className="relative h-full w-full object-contain hover:scale-105" alt={alt} {...props} /> : null} */ }
import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
}: {
  title: string;
  amount: string;
  currencyCode: string;
}) => {
  return (
    // <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 lg:px-20 lg:pb-[20%]">
    <div className="flex w-full">
      {/* <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white"> */}
      <div className="w-full flex items-center bg-white/70 pt-[2px] pb-2 px-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <h3 className="line-clamp-2 flex-grow pl-2 text-base">{title}</h3>
        <Price
          className="flex-none gap-1 rounded-full bg-blue-600 p-2 text-white"
          amount={amount}
          currencyCode={currencyCode}
        />
      </div>
    </div>
  );
};

export default Label;

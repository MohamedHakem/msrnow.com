import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'EGP',
  currencyCodeClassName
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {/* 
      {`${new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: "EGP",
        currencyDisplay: 'narrowSymbol'
      }).format(parseFloat(amount))}`} 
    */}

    {`${amount}`}
    <span className={clsx('mr-1 inline', currencyCodeClassName)}>
      {/* {`${currencyCode}`} */}
      {`ج.م`}
    </span>
    {/* <span>{`${amount}`}</span> */}
  </p>
);

export default Price;

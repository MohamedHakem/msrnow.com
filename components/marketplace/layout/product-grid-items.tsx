import Image from 'next/image';
import Link from 'next/link';
import Grid from '@/components/marketplace/grid';
import Label from '@/components/marketplace/label';


export default function ProductGridItems({ products }: { products: any[] }) {
  return (
    <>
      {products.map((product, i) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link className="h-full w-full" href={`/marketplace/product/${product.slug}`}>
            <Image
              unoptimized width={490} height={490} alt={product.title} priority={i < 3 ? true : false}
              src={`https://wsrv.nl/?url=${product.images[0]?.url}&default=${product.images[0]?.url}&l=9&af=''&il=''&n=-1&w=490&h=460&output=webp`}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="relative h-full w-full object-contain rounded-xl"
            />
            <Label title={product.title} amount={product.price} currencyCode={"EGP"} />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}


{/* <GridTileImage
  alt={product.title}
  label={{
    title: product.title,
    amount: product.price,
    currencyCode: "EGP"
  }}
  src={`https://imagecdn.app/v2/image/${product.images[0]?.url}?width=490&height=490`}
  fill
  priority={i < 3 ? true : false}
  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
/> */}

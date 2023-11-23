import { productsMadeInEgypt } from "@/data/static/products-made-in-egypt"
import Image from "next/image";
import { notFound } from "next/navigation"

export default async function madeInEgyptPage({ params }: { params: { kind: string } }) {

  const kind = decodeURIComponent(params.kind)
  const EgProduct = productsMadeInEgypt.find(p => p.url === kind)
  if (!EgProduct) return notFound();

  return (
    <div className="w-full laptop:max-w-screen-large py-4 flex justify-center items-center m-auto">
      <div className="w-full flex flex-col justify-center gap-4">
        <h1 className="text-4xl laptop:text-6xl font-bold text-center">{EgProduct.title}</h1>
        <div className="flex flex-col gap-8 p-2 justify-center m-auto">
          <ul className="flex flex-col laptop:flex-row gap-4">
            {EgProduct.images.against.map((img, i) => (
              <li className="max-w-[360px] h-auto laptop:flex-grow laptop:max-w-[360px] laptop:max-h-[700px] relative animate-fadeIn" key={i}>
                <Image unoptimized width={360} height={360} alt={"water-products"} 
                  src={`https://wsrv.nl/?url=${img}&default=${img}&l=9&af=''&il=''&n=-1&w=360&h=360&fit=cover&a=attention`}
                  className="relative h-full object-fill rounded-lg border animate-fadeIn"
                />
              </li>
            ))}
          </ul>

          <hr />

          <ul className="flex flex-col laptop:flex-row flex-wrap">
            {EgProduct.images.with.map((img, i) => (
              <li className="max-w-[360px] h-auto laptop:flex-grow laptop:w-1/4 laptop:max-w-[360px] laptop:max-h-[700px] relative animate-fadeIn p-2" key={i}>
                <Image unoptimized width={360} height={360} alt={"clean-water-products-made-in-egypt"}
                  src={`https://wsrv.nl/?url=${img}&default=${img}&l=9&af=''&il=''&n=-1&w=360&h=360&fit=cover&a=attention`}
                  className="relative h-full object-cover rounded-lg border animate-fadeIn"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}

{/* <li className="max-w-[364px] h-auto laptop:flex-grow laptop:max-w-[364px] laptop:max-h-[700px] relative animate-fadeIn">
              <Image unoptimized width={364} height={364} alt={""}
                src="https://wsrv.nl/?url=https://utfs.io/f/e6461f7e-a91d-477d-a3d6-c80f2ed57ec1-zhc71c.jpg&default=https://utfs.io/f/e6461f7e-a91d-477d-a3d6-c80f2ed57ec1-zhc71c.jpg&w=364&h=364&fit=cover&a=attention"
                className="relative h-full object-cover rounded-lg border animate-fadeIn"
              />
            </li> */}
{/* <li className="max-w-[364px] h-auto laptop:flex-grow laptop:max-w-[364px] laptop:max-h-[700px] relative animate-fadeIn">
              <Image unoptimized width={364} height={364} alt={""}
                src="https://wsrv.nl/?url=https://utfs.io/f/e6461f7e-a91d-477d-a3d6-c80f2ed57ec1-zhc71c.jpg&default=https://utfs.io/f/e6461f7e-a91d-477d-a3d6-c80f2ed57ec1-zhc71c.jpg&w=364&h=364&fit=cover&a=entropy"
                className="relative h-full object-cover rounded-lg border animate-fadeIn"
              />
            </li> */}
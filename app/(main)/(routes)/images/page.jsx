import Image from 'next/image';

export default async function testPage() {
  const imageUrl = (url, l, w, h, fit, a, output) =>
    `https://wsrv.nl/?${new URLSearchParams({
      url,
      default: url,
      l,
      af: '',
      il: '',
      n: -1,
      w,
      h,
      fit,
      a,
      output
    }).toString()}`;

  return (
    <div dir="ltr" className="flex flex-col laptop:flex-row gap-8 relative h-full p-12 justify-between border-4 m-4">
      {/* <div className="flex flex-col gap-4 object-contain max-w-3xl w-full h-full border-2 relative">
        <Image
          unoptimized
          src={imageUrl(
            'https://utfs.io/f/696a6d9b-9f21-467f-a5bf-a024536e5ddf-7a88mk.webp',
            9,
            '800',
            '600',
            'cover',
            // 'attention',
            'entropy',
            'JPEG'
          )}
          alt=""
          // fill
          width="800"
          height="600"
          loading='eager'
          className="object-cover w-full h-full p-2 border border-red-500"
        />
      </div>
      <div className="flex flex-col gap-4 object-contain max-w-3xl w-full h-full border-2 relative">
        <Image
          unoptimized
          src={imageUrl(
            'https://utfs.io/f/696a6d9b-9f21-467f-a5bf-a024536e5ddf-7a88mk.webp',
            9,
            '799',
            '600',
            'cover',
            // 'attention',
            'entropy',
            'TIFF'
          )}
          alt=""
          // fill
          width="800"
          height="600"
          loading='eager'
          className="object-cover w-full h-full p-1 border border-blue-500"
        />
      </div> */}
      <div className="flex flex-col gap-4 object-contain max-w-3xl w-full h-full border-2 relative">
        <Image
          unoptimized
          src={imageUrl(
            'https://utfs.io/f/696a6d9b-9f21-467f-a5bf-a024536e5ddf-7a88mk.webp',
            9,
            '800',
            '600',
            'cover',
            // 'attention',
            'entropy',
            'webp'
          )}
          alt=""
          // fill
          width="800"
          height="600"
          // loading="lazy"
          className="object-cover w-full h-full p-1 border border-red-500"
        />
      </div>
      <div className="flex flex-col gap-4 object-contain max-w-3xl w-full h-full border-2 relative">
        <Image
          unoptimized
          src={imageUrl(
            'https://imagecdn.app/v2/image/https://utfs.io/f/696a6d9b-9f21-467f-a5bf-a024536e5ddf-7a88mk.webp?width=800&height=800',
            9,
            '800',
            '800',
            'cover',
            // 'attention',
            'entropy',
            'webp'
          )}
          alt=""
          // fill
          width="800"
          height="600"
          // loading="lazy"
          className="object-cover w-full h-full p-1 border border-black"
        />
      </div>
      <div className="flex flex-col gap-4 max-w-3xl w-full h-full border-2 relative">
        <Image
          unoptimized
          src={'https://imagecdn.app/v2/image/https://utfs.io/f/696a6d9b-9f21-467f-a5bf-a024536e5ddf-7a88mk.webp?width=800&height=800'}
          alt=""
          // fill
          width="800"
          height="600"
          // loading="lazy"
          className="object-cover w-full h-full p-1 border border-yellow-500"
        />
      </div>
      {/* <div className="flex flex-col gap-4 object-contain max-w-3xl w-full h-full border-2 relative">
        <Image
          unoptimized
          src={'https://imagecdn.app/v2/image/https://wsrv.nl/?url=https://utfs.io/f/696a6d9b-9f21-467f-a5bf-a024536e5ddf-7a88mk.webp'}
          alt=""
          // fill
          width="800"
          height="600"
          loading="lazy"
          className="object-cover w-full h-full p-1 border border-yellow-500"
        />
      </div> */}
    </div>
  );
}

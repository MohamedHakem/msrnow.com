// import { db } from '@/lib/db';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { getServerSession } from 'next-auth';
// import { getToken, GetTokenParams } from 'next-auth/jwt';
// import { NextRequest } from 'next/server';
// // import { useSession } from 'next-auth/react';
// import { createUploadthing, type FileRouter } from 'uploadthing/next';
// const f = createUploadthing();
// // const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function
// // const auth = async ({ req }) => {
// //   const user = await getToken({ req });
// //   if (!user) throw new Error('Unauthorized');
// //   // return { section: 'marketplace', type: 'productImage', userId: user.id };
// //   return { userId: user.id };
// // };

// export const ourFileRouter = {
//   imageUploader: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
//     // .middleware(async ({ req }) => {
//     //   const apiReq = req as unknown as NextApiRequest;
//     //   const user = await auth(apiReq);
//     //   if (!user) throw new Error('Unauthorized');
//     //   return { userId: user.id };
//     // })
//     .middleware(async ({ req }) => {
//       return { userId: 1 };
//     })
//     .middleware(async ({ req }) => {
//       // This code runs on your server before upload
//       const user = await auth(req);

//       // If you throw, the user will not be able to upload
//       if (!user) throw new Error('Unauthorized');

//       // Whatever is returned here is accessible in onUploadComplete as `metadata`
//       return { userId: user.id };
//     })
//     .onUploadComplete(() => {})
// };

// export type OurFileRouter = typeof ourFileRouter;

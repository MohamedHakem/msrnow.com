import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
const f = createUploadthing();

export const ourFileRouter = {
  productImageUploader: f({ 
    image: { maxFileSize: '2MB', maxFileCount: 6 },
    pdf: { maxFileSize: '2MB', maxFileCount: 1 }  
  })
    .middleware(({ req }) => auth({ req }, 'marketplace', 'productImage'))
    .onUploadComplete(() => {}),
  profileImageUploader: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
    .middleware(({ req }) => auth({ req }, 'profile', 'profilePicture'))
    .onUploadComplete(() => {}),
  blogpostImageUploader: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
    .middleware(({ req }) => auth({ req }, 'blog', 'blogpostThumbnail'))
    .onUploadComplete(() => {}),
  // pdfUploader: f({ pdf: { maxFileSize: '2MB', maxFileCount: 1 } })
  //   .middleware(({ req }) => auth({ req }, 'marketplace', 'pdfUploader'))
  //   .onUploadComplete(() => {})
};

const auth = async (req: { req: NextRequest }, section: string, type: string) => {
  const token = await getToken(req);
  if (!token) throw new Error('Unauthorized');
  return { section: section, type: type, userId: token.id };
};

export type OurFileRouter = typeof ourFileRouter;

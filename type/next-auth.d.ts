import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      username: string;
      shipping_country: string;
      shipping_city: string;
      emailVerified: boolean;
      isBuyer: boolean;
      isQuizMaker: boolean;
      isRecipeMaker: boolean;
      isSeller: boolean;
      isWriter: boolean;
      shipping_info_save_consent: boolean;
      shipping_info_toSellers_consent: boolean;
    } & DefaultSession['user'];
  }
}

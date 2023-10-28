// import NextAuth from 'next-auth';
// import { JWT } from "next-auth/jwt"
import bcrypt from 'bcrypt';
import { AuthOptions, Session, DefaultUser, DefaultSession, Awaitable } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';
// const db = new PrismaClient(); // a new instance of PrismaClient that's no extended with accelerate
import { db } from '@/lib/db';
import { Role } from '@prisma/client';
import { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('authorize...');
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid Credentials');
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }
        return {
          ...user,
          id: user.id
        };
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   async session({ session, token, user }) {
  //     // const MsrnowSession: Session = {
  //     //   ...session,
  //     //   user: {
  //     //     ...session.user,
  //     //     id: token.id,
  //     //     name: token.name,
  //     //     username: token.username as string,
  //     //     role: token.role as Role,
  //     //     impersonatedByUID: token.impersonatedByUID as number,
  //     //     belongsToActiveTeam: token?.belongsToActiveTeam as boolean,
  //     //     org: token?.org,
  //     //     locale: token.locale
  //     //   }
  //     // };

  //     // if (user) {
  //     //   session.user = {};
  //     //   session.user.id = user.id;
  //     // }

  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id,
  //         name: token.name,
  //         username: token.username as string,
  //         role: token.role as Role
  //       }
  //     };
  //   }
  // }
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (typeof user !== 'undefined') {
        // user has just signed in so the user object is populated
        return user as unknown as JWT;
        // return user as unknown as Awaitable<T>;
        // return user;
      }
      return token;
    },
    async session({ session, token, user }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        // strip unnecessary properties
        if (
          c !== 'iat' &&
          c !== 'exp' &&
          c !== 'jti' &&
          c !== 'apiToken' &&
          c !== 'hashedPassword' &&
          c !== 'updatedAt' &&
          c !== 'phone_number' &&
          c !== 'shipping_address' &&
          c !== 'shipping_general_notes'
        ) {
          return { ...p, [c]: token[c] };
        } else {
          return p;
        }
      }, {});
      return { ...session, user: sanitizedToken, apiToken: token.apiToken };
    }
    // async jwt({ token, account, profile }) {
    //   // Persist the OAuth access_token and or the user id to the token right after signin
    //   if (token && account) {
    //     token.accessToken = account.access_token;
    //     token.id = token.id;
    //   }
    //   return token;
    // },
    // async session({ session, token, user }) {
    //   // Send properties to the client, like an access_token and user id from a provider.
    //   session.accessToken = token.accessToken
    //   session.user.id = token.id

    //   return session
    // }
  }
};

// callbacks: {
//   session({ session, user }) {
//     if (session.user) {
//       session.user.id = user.id;
//     }
//     return session;
//   }
// }
// callbacks: {
//   session: async ({ session, token }) => {
//     if (session?.user) {
//       session.user.id = token.sub;
//     }
//     return session;
//   },
//   jwt: async ({ user, token }) => {
//     if (user) {
//       token.uid = user.id;
//     }
//     return token;
//   }
// }
// callbacks: {
//   session: async ({ session }) => {
//     if (session?.user) {
//       session.user.id = user.id;
//       return session;
//     }
//   }
// }

// session: ({ session, token }) => ({
//   ...session,
//   user: {
//     ...session.user,
//     id: token.sub
//   }
// })

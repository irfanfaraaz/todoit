import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from './db/db';
import { sendVerificationRequest } from './email/sendLoginMail';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'TodoIT',
  }) as Adapter, // Add custom user model
  secret: process.env.AUTH_SECRET as string,

  pages: {
    error: '/login',
  },

  theme: {
    colorScheme: 'light',
    logo: '/favicon.ico',
    buttonText: '#ffffff',
    brandColor: '#000000',
  },
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    EmailProvider({
      sendVerificationRequest: sendVerificationRequest,
      server: {
        host: process.env.EMAIL_SERVER_HOST as string,
        port: process.env.EMAIL_SERVER_PORT as string,
        auth: {
          user: process.env.EMAIL_SERVER_USER as string,
          pass: process.env.EMAIL_SERVER_PASSWORD as string,
        },
      },
      from: `TodoIT <${process.env.EMAIL_FROM}>`,
    }),
  ],

  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        //@ts-ignore
        session.user.id = user.id;
      }
      return session;
    },
  },
};

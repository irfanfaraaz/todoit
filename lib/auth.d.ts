import mongoose from 'mongoose';
import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    image: string;
    joinedAt: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

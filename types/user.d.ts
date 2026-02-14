// types/user.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phone?: string | null;
      restaurantName?: string | null;
      role?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    phone?: string | null;
    restaurantName?: string | null;
    role?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    phone?: string | null;
    restaurantName?: string | null;
    role?: string | null;
  }
}
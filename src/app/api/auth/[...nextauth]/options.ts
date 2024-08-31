import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt:{
        secret: process.env.NEXTAUTH_SECRET as string,
    },
    pages: {
        signIn: '/login',
        newUser: '/signup',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            return true;
        },
        async redirect({url, baseUrl}) {
            if (url.startsWith(baseUrl)) return url;
            return baseUrl;
        },
        async session({session, user}) {
          return session;
        },
        async jwt({token, user, account, profile, isNewUser}) {
          return token;
        },
    },
}

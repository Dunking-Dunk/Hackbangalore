// @ts-nocheck

import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { db } from "./db";
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/sign-in'
    },
    adapter: PrismaAdapter(db),
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const user = await db.user.findFirst({
                    where: {
                        email: credentials?.email
                    }
                });

                if (!user || !user.id || !user.password) {
                    throw new Error("Invalid credentials");
                }

                const correctPassword = await bcrypt.compare(credentials.password, user.password);

                if (!correctPassword) {
                    throw new Error("Invalid credentials");
                }
                
                return {
                    ...user,
                    username: user.firstName,
                    role: user?.role
                };
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    username: user?.username,
                    id: user?.id,
                    role: user?.role
                }
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                    id: token?.id,
                    role: token?.role
                }

            }
        }

    },
    debug: process.env.NODE_ENV !== "production",
}
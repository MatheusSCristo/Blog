import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials?.email }
                })
                if (!existingUser) {
                    return null
                }
                const passwordMatch = await compare(credentials.password, existingUser.password)

                if (!passwordMatch) {
                    return null
                }
                
                return {
                    id: existingUser.id,
                    username: existingUser.username,
                    email: existingUser.email
                }
            }
        })
    ]
    , secret: process.env.NEXTAUTH_SECRET as string,
    callbacks:{
        session:async({session})=>{
            if(session.user?.email){
            const userWithId = await prisma.user.findUnique({
                where: { email: session.user.email }
            });
            if (userWithId && userWithId.id) {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        id: userWithId.id 
                    }
                };
            }}
    
            return session;
        }
    }
}
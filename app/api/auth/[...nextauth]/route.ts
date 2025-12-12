import { verifySuperAdmin } from "@/functions/server/auth/verify-super-admin";
import { verifyUsers } from "@/functions/server/auth/verify-users";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {

                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !password) {
                    return null;
                }

                const superAdmin = await verifySuperAdmin({ email, password });

                if (superAdmin) {
                    return superAdmin;
                }

                const userExist = await verifyUsers({ email, password });
                return userExist;
            }
        })
    ],
    pages: {
        signIn: "/auth/email-signin",
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
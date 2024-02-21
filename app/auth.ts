import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const url = 'http://localhost:8080';

const {
    signIn,
    handlers: { GET, POST },
    auth,
} = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: 'email' },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials.email || !credentials.password) {
                    return null;
                }
                try {
                    const response = await axios.post(`${url}/signin`, {
                        email: credentials.email,
                        password: credentials.password
                    });
                    const data = response.data;
                    if (response.status === 200 && data?.token && data?.user) {
                        return {
                            name: data.user.Name,
                            email: data.user.Email,
                            token: data.token,
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            },
        })
    ],
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                return {
                    ...token,
                    jwt: user.token,
                };
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.jwt = token.jwt;
            }
            return session;
        },
    },
});

export {
    signIn,
    GET,
    POST,
    auth,
};

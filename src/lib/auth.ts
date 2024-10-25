import NextAuth from "next-auth"
import { Session } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

const authConfig = {
    // OAuth providers configuration
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        })
    ],

    // Authorization callback
    callbacks: {
        authorized({ auth }: { auth: Session | null }) {
            return !!auth?.user // Require authenticated user
        }
    },

    // Custom pages config (using default signin page)
    pages: {
        signIn: ''
    }
}

// Export auth utilities and API handlers
export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig)
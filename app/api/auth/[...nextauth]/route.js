import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Auth options configuration
const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            console.log('Session callback:', session);
            return session;
        },
    },
};

// Handle the authentication routes in Next.js 13 App Router
const handler = NextAuth(authOptions);

// Handling GET and POST methods using the correct syntax for App Router API routes
export { handler as GET, handler as POST };

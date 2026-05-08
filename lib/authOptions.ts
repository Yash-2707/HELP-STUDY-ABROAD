import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from './dummyJsonApi'
import { LoginRequest } from '@/types/auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          const response = await login({
            username: credentials.username,
            password: credentials.password,
          } as LoginRequest)

          return {
            id: String(response.id),
            name: `${response.firstName} ${response.lastName}`,
            email: response.email,
            image: response.image,
            accessToken: response.token,
            user: response,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken
        token.user = (user as any).user
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.image = (token.user as any)?.image
        ;(session as any).accessToken = token.accessToken
        ;(session as any).user = token.user
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

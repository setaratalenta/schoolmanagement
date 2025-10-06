// Third-party Imports
import CredentialProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import type { NextAuthOptions } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'

const usePrismaAdapter = process.env.USE_PRISMA_ADAPTER === 'true'
const prisma = usePrismaAdapter ? new PrismaClient() : undefined

export const authOptions: NextAuthOptions = {
  // Enable adapter only when explicitly configured
  ...(usePrismaAdapter && prisma ? { adapter: PrismaAdapter(prisma) as Adapter } : {}),
  trustHost: true,
  // Ensure JWT has a valid secret; provide safe dev fallback
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'dev-secret-change-me',

  // Align NextAuth API path with Next.js basePath (e.g., "/en")
  // Derive the basePath from NEXTAUTH_URL when available; otherwise default
  basePath: (() => {
    const url = process.env.NEXTAUTH_URL || process.env.AUTH_URL
    if (!url) return '/api/auth'
    try {
      const u = new URL(url)
      const pathname = u.pathname.replace(/\/$/, '')
      return `${pathname}/api/auth`
    } catch {
      return '/api/auth'
    }
  })(),

  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    CredentialProvider({
      // ** The name to display on the sign in form (e.g. 'Sign in with...')
      // ** For more details on Credentials Provider, visit https://next-auth.js.org/providers/credentials
      name: 'Credentials',
      type: 'credentials',

      /*
       * As we are using our own Sign-in page, we do not need to change
       * username or password attributes manually in following credentials object.
       */
      credentials: {},
      async authorize(credentials) {
        /*
         * You need to provide your own logic here that takes the credentials submitted and returns either
         * an object representing a user or value that is false/null if the credentials are invalid.
         * For e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
         * You can also use the `req` object to obtain additional parameters (i.e., the request IP address)
         */
        const { email, password } = credentials as { email: string; password: string }

        try {
          // Build absolute URL to the Next.js login API
          const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
          const loginUrl = new URL('/api/login', baseUrl).toString()

          // Login API Call to match user credentials and receive user data
          const res = await fetch(loginUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          })

          const contentType = res.headers.get('content-type') || ''

          // Read body as text once; safely parse JSON if applicable
          const raw = await res.text()
          let data: any = null

          if (contentType.includes('application/json')) {
            try {
              data = raw ? JSON.parse(raw) : null
            } catch {
              data = null
            }
          } else {
            data = raw ? { message: [raw] } : null
          }

          if (res.status === 401) {
            throw new Error(JSON.stringify(data || { message: ['Unauthorized Access'] }))
          }

          if (res.status === 200) {
            // Return user data (ensure sensitive fields are removed at API level)
            return data || {}
          }

          // Non-200/401 responses
          throw new Error(JSON.stringify(data || { message: ['Unexpected response'] }))
        } catch (e: any) {
          throw new Error(e.message)
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })

    // ** ...add more providers here
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    /*
     * Choose how you want to save the user session.
     * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
     * If you use an `adapter` however, NextAuth default it to `database` instead.
     * You can still force a JWT session by explicitly defining `jwt`.
     * When using `database`, the session cookie will only contain a `sessionToken` value,
     * which is used to look up the session in the database.
     * If you use a custom credentials provider, user accounts will not be persisted in a database by NextAuth.js (even if one is configured).
     * The option to use JSON Web Tokens for session tokens must be enabled to use a custom credentials provider.
     */
    strategy: 'jwt',

    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  pages: {
    signIn: '/login'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user }) {
      if (user) {
        /*
         * For adding custom parameters to user in session, we first need to add those parameters
         * in token which then will be available in the `session()` callback
         */
        token.name = user.name
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
        session.user.name = token.name
      }

      return session
    }
  }
}

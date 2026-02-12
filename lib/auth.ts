// import { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { db } from "@/lib/db"
// import bcrypt from "bcryptjs"

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid credentials")
//         }

//         const user = await db.user.findUnique({
//           where: { email: credentials.email }
//         })

//         if (!user || !user.password) {
//           throw new Error("Invalid credentials")
//         }

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         )

//         if (!isPasswordValid) {
//           throw new Error("Invalid credentials")
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.role = (user as any).role
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         (session.user as any).id = token.id
//         (session.user as any).role = token.role
//       }
//       return session
//     }
//   },
//   session: {
//     strategy: "jwt"
//   },
//   pages: {
//     signIn: "/login"
//   },
//   secret: process.env.NEXTAUTH_SECRET
// }

// import { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { db } from "@/lib/db"
// import bcrypt from "bcryptjs"

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         const user = await db.user.findUnique({
//           where: { email: credentials.email }
//         })

//         if (!user || !user.password) {
//           return null
//         }

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         )

//         if (!isPasswordValid) {
//           return null
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.role = user.role
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string
//         session.user.role = token.role as string
//       }
//       return session
//     }
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   pages: {
//     signIn: "/login",
//     error: "/login",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === "development",
// }

// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import { db } from "@/lib/db"
// import bcrypt from "bcryptjs"

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         const user = await db.user.findUnique({
//           where: { email: credentials.email as string }
//         })

//         if (!user || !user.password) {
//           return null
//         }

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password as string,
//           user.password
//         )

//         if (!isPasswordValid) {
//           return null
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.role = (user as any).role
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         (session.user as any).id = token.id
//         (session.user as any).role = token.role
//       }
//       return session
//     }
//   },
//   pages: {
//     signIn: "/login"
//   },
//   secret: process.env.NEXTAUTH_SECRET
// })

// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import { db } from "@/lib/db"
// import bcrypt from "bcryptjs"

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         const user = await db.user.findUnique({
//           where: { email: credentials.email as string }
//         })

//         if (!user || !user.password) {
//           return null
//         }

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password as string,
//           user.password
//         )

//         if (!isPasswordValid) {
//           return null
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({ token, user, trigger }) {
//       if (user) {
//         token.userId = user.id
//         token.userRole = (user as any).role
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         (session.user as any).id = token.userId
//         (session.user as any).role = token.userRole
//       }
//       return session
//     }
//   },
//   pages: {
//     signIn: "/login"
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET
// })

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET
})

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

// import { auth } from "@/lib/auth"
// import Link from "next/link"

// export default async function HomePage() {
//   const session = await auth()

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation Bar */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-blue-600">NexusMart</h1>
//             </div>
            
//             <div className="flex items-center gap-4">
//               {session?.user ? (
//                 <>
//                   <span className="text-gray-700">
//                     Welcome, <span className="font-semibold">{session.user.name}</span>
//                   </span>
//                   <form action={async () => {
//                     "use server"
//                     const { signOut } = await import("@/lib/auth")
//                     await signOut()
//                   }}>
//                     <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
//                       Sign Out
//                     </button>
//                   </form>
//                 </>
//               ) : (
//                 <>
//                   <Link 
//                     href="/login"
//                     className="text-gray-700 hover:text-blue-600"
//                   >
//                     Sign In
//                   </Link>
//                   <Link 
//                     href="/register"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     Register
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Welcome to NexusMart
//           </h2>
//           <p className="text-xl text-gray-600 mb-8">
//             Your Modern E-Commerce Platform
//           </p>
          
//           {session?.user ? (
//             <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
//               <h3 className="text-lg font-semibold mb-4">Account Information</h3>
//               <div className="space-y-2 text-left">
//                 <p><span className="font-medium">Name:</span> {session.user.name}</p>
//                 <p><span className="font-medium">Email:</span> {session.user.email}</p>
//                 <p><span className="font-medium">Role:</span> {(session.user as any).role}</p>
//                 <p><span className="font-medium">User ID:</span> {(session.user as any).id}</p>
//               </div>
//             </div>
//           ) : (
//             <div className="flex gap-4 justify-center">
//               <Link 
//                 href="/register"
//                 className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
//               >
//                 Get Started
//               </Link>
//               <Link 
//                 href="/login"
//                 className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300"
//               >
//                 Sign In
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Feature Cards */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-2 text-gray-900">🛍️ Shop Products</h3>
//             <p className="text-gray-600">Browse thousands of products across categories</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-2 text-gray-900">🛒 Shopping Cart</h3>
//             <p className="text-gray-600">Easy checkout and secure payment processing</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-2 text-gray-900">📦 Order Tracking</h3>
//             <p className="text-gray-600">Track your orders in real-time</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useSession, signOut } from "next-auth/react"
// import Link from "next/link"

// export default function HomePage() {
//   const { data: session, status } = useSession()

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation Bar */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-blue-600">NexusMart</h1>
//             </div>
            
//             <div className="flex items-center gap-4">
//               {status === "loading" ? (
//                 <span className="text-gray-500">Loading...</span>
//               ) : session?.user ? (
//                 <>
//                   <span className="text-gray-700">
//                     Welcome, <span className="font-semibold">{session.user.name}</span>
//                   </span>
//                   <button 
//                     onClick={() => signOut({ callbackUrl: "/" })}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   >
//                     Sign Out
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link 
//                     href="/login"
//                     className="text-gray-700 hover:text-blue-600"
//                   >
//                     Sign In
//                   </Link>
//                   <Link 
//                     href="/register"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     Register
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Welcome to NexusMart
//           </h2>
//           <p className="text-xl text-gray-600 mb-8">
//             Your Modern E-Commerce Platform
//           </p>
          
//           {status === "loading" ? (
//             <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
//               <p className="text-gray-500">Loading session...</p>
//             </div>
//           ) : session?.user ? (
//             <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Account Information</h3>
//               <div className="space-y-2 text-left">
//                 <p className="text-gray-800"><span className="font-medium">Name:</span> {session.user.name}</p>
//                 <p className="text-gray-800"><span className="font-medium">Email:</span> {session.user.email}</p>
//                 <p className="text-gray-800"><span className="font-medium">Role:</span> {(session.user as any).role}</p>
//                 <p className="text-gray-800"><span className="font-medium">User ID:</span> {(session.user as any).id}</p>
//               </div>
//             </div>
//           ) : (
//             <div className="flex gap-4 justify-center">
//               <Link 
//                 href="/register"
//                 className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
//               >
//                 Get Started
//               </Link>
//               <Link 
//                 href="/login"
//                 className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300"
//               >
//                 Sign In
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Feature Cards */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-2 text-gray-900">🛍️ Shop Products</h3>
//             <p className="text-gray-600">Browse thousands of products across categories</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-2 text-gray-900">🛒 Shopping Cart</h3>
//             <p className="text-gray-600">Easy checkout and secure payment processing</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-2 text-gray-900">📦 Order Tracking</h3>
//             <p className="text-gray-600">Track your orders in real-time</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function HomePage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-blue-600">NexusMart</h1>
              <Link href="/shop" className="text-gray-700 hover:text-blue-600">
                Shop
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              {status === "loading" ? (
                <span className="text-gray-500">Loading...</span>
              ) : session?.user ? (
                <>
                  <Link href="/cart" className="text-gray-700 hover:text-blue-600">
                    🛒 Cart
                  </Link>
                  <span className="text-gray-700">
                    Welcome, <span className="font-semibold">{session.user.name}</span>
                  </span>
                  {(session.user as any).role === "ADMIN" && (
                    <Link 
                      href="/admin" 
                      className="bg-gray-900 text-white px-3 py-1 rounded text-sm"
                    >
                      Admin
                    </Link>
                  )}
                  <button 
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to NexusMart
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your Modern E-Commerce Platform
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <Link 
              href="/shop"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
            >
              Start Shopping
            </Link>
            {!session && (
              <Link 
                href="/register"
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300"
              >
                Create Account
              </Link>
            )}
          </div>

          {session?.user && (
            <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto mb-12">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Your Account</h3>
              <div className="space-y-2 text-left">
                <p className="text-gray-800"><span className="font-medium">Name:</span> {session.user.name}</p>
                <p className="text-gray-800"><span className="font-medium">Email:</span> {session.user.email}</p>
                <p className="text-gray-800"><span className="font-medium">Role:</span> {(session.user as any).role}</p>
              </div>
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">🛍️ Shop Products</h3>
            <p className="text-gray-600">Browse thousands of products across categories</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">🛒 Shopping Cart</h3>
            <p className="text-gray-600">Easy checkout and secure payment processing</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">📦 Order Tracking</h3>
            <p className="text-gray-600">Track your orders in real-time</p>
          </div>
        </div>
      </div>
    </div>
  )
}

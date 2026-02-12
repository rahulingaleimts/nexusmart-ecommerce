// "use client"

// import { useState } from "react"
// import { signIn } from "next-auth/react"
// import { useRouter, useSearchParams } from "next/navigation"
// import Link from "next/link"

// export default function LoginPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const registered = searchParams.get("registered")
  
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   })
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const result = await signIn("credentials", {
//         email: formData.email,
//         password: formData.password,
//         redirect: false
//       })

//       if (result?.error) {
//         setError("Invalid email or password")
//         setLoading(false)
//         return
//       }

//       router.push("/")
//       router.refresh()
//     } catch (err) {
//       setError("Something went wrong")
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
//         <div>
//           <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
//           <p className="mt-2 text-center text-gray-600">Sign in to your account</p>
//         </div>
        
//         {registered && (
//           <div className="bg-green-50 text-green-700 p-3 rounded text-sm">
//             Account created successfully! Please sign in.
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {error && (
//             <div className="bg-red-50 text-red-500 p-3 rounded text-sm">
//               {error}
//             </div>
//           )}
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               required
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               required
//               value={formData.password}
//               onChange={(e) => setFormData({...formData, password: e.target.value})}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link href="/register" className="text-blue-600 hover:text-blue-500">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import Link from "next/link"

// export default function LoginPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const registered = searchParams.get("registered")
  
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   })
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const res = await fetch("/api/auth/callback/credentials", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//           csrfToken: await fetch("/api/auth/csrf").then(r => r.json()).then(d => d.csrfToken)
//         })
//       })

//       if (res.ok) {
//         router.push("/")
//         router.refresh()
//       } else {
//         setError("Invalid email or password")
//         setLoading(false)
//       }
//     } catch (err) {
//       setError("Something went wrong")
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
//         <div>
//           <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
//           <p className="mt-2 text-center text-gray-600">Sign in to your account</p>
//         </div>
        
//         {registered && (
//           <div className="bg-green-50 text-green-700 p-3 rounded text-sm">
//             Account created successfully! Please sign in.
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {error && (
//             <div className="bg-red-50 text-red-500 p-3 rounded text-sm">
//               {error}
//             </div>
//           )}
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               required
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               required
//               value={formData.password}
//               onChange={(e) => setFormData({...formData, password: e.target.value})}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link href="/register" className="text-blue-600 hover:text-blue-500">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import Link from "next/link"

// export default function LoginPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const registered = searchParams.get("registered")
  
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   })
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const res = await fetch("/api/auth/callback/credentials", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//           csrfToken: await fetch("/api/auth/csrf").then(r => r.json()).then(d => d.csrfToken)
//         })
//       })

//       if (res.ok) {
//         router.push("/")
//         router.refresh()
//       } else {
//         setError("Invalid email or password")
//         setLoading(false)
//       }
//     } catch (err) {
//       setError("Something went wrong")
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
//         <div>
//           <h2 className="text-3xl font-bold text-center text-gray-900">Welcome Back</h2>
//           <p className="mt-2 text-center text-gray-600">Sign in to your account</p>
//         </div>
        
//         {registered && (
//           <div className="bg-green-50 text-green-700 p-3 rounded text-sm border border-green-200">
//             ✓ Account created successfully! Please sign in.
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {error && (
//             <div className="bg-red-50 text-red-500 p-3 rounded text-sm border border-red-200">
//               {error}
//             </div>
//           )}
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               required
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
//               placeholder="john@example.com"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               required
//               value={formData.password}
//               onChange={(e) => setFormData({...formData, password: e.target.value})}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState } from "react"
// import { signIn } from "next-auth/react"
// import { useRouter, useSearchParams } from "next/navigation"
// import Link from "next/link"

// export default function LoginPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const registered = searchParams.get("registered")
  
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   })
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const result = await signIn("credentials", {
//         email: formData.email,
//         password: formData.password,
//         redirect: false
//       })

//       if (result?.error) {
//         setError("Invalid email or password")
//         setLoading(false)
//         return
//       }

//       if (result?.ok) {
//         router.push("/")
//         router.refresh()
//       }
//     } catch (err) {
//       setError("Something went wrong")
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
//         <div>
//           <h2 className="text-3xl font-bold text-center text-gray-900">Welcome Back</h2>
//           <p className="mt-2 text-center text-gray-600">Sign in to your account</p>
//         </div>
        
//         {registered && (
//           <div className="bg-green-50 text-green-700 p-3 rounded text-sm border border-green-200">
//             ✓ Account created successfully! Please sign in.
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {error && (
//             <div className="bg-red-50 text-red-500 p-3 rounded text-sm border border-red-200">
//               {error}
//             </div>
//           )}
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               required
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
//               placeholder="john@example.com"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               required
//               value={formData.password}
//               onChange={(e) => setFormData({...formData, password: e.target.value})}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

import { Suspense } from "react"
import LoginForm from "./LoginForm"

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}


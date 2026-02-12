import { auth } from "@/lib/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navigation */}
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold">
                NexusMart Admin
              </Link>
              <div className="flex gap-4">
                <Link 
                  href="/admin" 
                  className="hover:text-blue-400 transition"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/admin/products" 
                  className="hover:text-blue-400 transition"
                >
                  Products
                </Link>
                <Link 
                  href="/admin/categories" 
                  className="hover:text-blue-400 transition"
                >
                  Categories
                </Link>
                <Link 
                  href="/admin/orders" 
                  className="hover:text-blue-400 transition"
                >
                  Orders
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{session.user?.name}</span>
              <Link 
                href="/" 
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                View Store
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

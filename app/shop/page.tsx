import { db } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import AddToCartButton from "./AddToCartButton"
import { auth } from "@/lib/auth"

export default async function ShopPage() {
  const session = await auth()
  const products = await db.product.findMany({
    where: { stock: { gt: 0 } },
    include: {
      category: {
        select: { name: true, slug: true }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  const categories = await db.category.findMany({
    orderBy: { name: "asc" }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                NexusMart
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-blue-600">
                Shop
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              {session?.user ? (
                <>
                  <Link href="/cart" className="text-gray-700 hover:text-blue-600">
                    🛒 Cart
                  </Link>
                  <Link href="/orders" className="text-gray-700 hover:text-blue-600">
                    Orders
                  </Link>
                  <span className="text-gray-600 text-sm">{session.user.name}</span>
                  {(session.user as any).role === "ADMIN" && (
                    <Link 
                      href="/admin" 
                      className="bg-gray-900 text-white px-3 py-1 rounded text-sm"
                    >
                      Admin
                    </Link>
                  )}
                </>
              ) : (
                <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <div className="flex gap-3 flex-wrap">
            <Link 
              href="/shop"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg border hover:border-blue-500"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Products</h2>
          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">No products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                  <Link href={`/shop/${product.slug}`}>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </Link>
                  <div className="p-4">
                    <Link href={`/shop/${product.slug}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-blue-600 mb-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
                    <p className="text-lg font-bold text-gray-900 mb-3">
                      ${product.price.toFixed(2)}
                    </p>
                    <AddToCartButton 
                      productId={product.id} 
                      isLoggedIn={!!session?.user}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

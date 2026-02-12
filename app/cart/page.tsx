import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import CartItemActions from "./CartItemActions"

export default async function CartPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const cartItems = await db.cartItem.findMany({
    where: { userId: (session.user as any).id },
    include: {
      product: {
        include: {
          category: true
        }
      }
    }
  })

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity)
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
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
              <Link href="/orders" className="text-gray-700 hover:text-blue-600">
                Orders
              </Link>
              <span className="text-gray-600">{session.user.name}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-xl text-gray-500 mb-6">Your cart is empty</p>
            <Link 
              href="/shop"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow p-4 flex gap-4">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    width={120}
                    height={120}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <Link 
                      href={`/shop/${item.product.slug}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.product.category.name}</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <CartItemActions 
                      itemId={item.id}
                      currentQuantity={item.quantity}
                      maxStock={item.product.stock}
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-center block font-semibold"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/shop"
                  className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 text-center block font-semibold mt-3"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

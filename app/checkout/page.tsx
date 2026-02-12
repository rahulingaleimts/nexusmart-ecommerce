"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCheckout = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/checkout", {
        method: "POST"
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Checkout failed")
        setLoading(false)
        return
      }

      // Redirect to success page
      router.push(`/orders?success=true&orderNumber=${data.orderNumber}`)
    } catch (err) {
      setError("Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              NexusMart
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6 mb-8">
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Payment Method</h2>
              <p className="text-gray-600">💳 Mock Payment (Demo Mode)</p>
              <p className="text-sm text-gray-500 mt-1">
                This is a demo. No real payment will be processed.
              </p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Shipping</h2>
              <p className="text-gray-600">🚚 Standard Shipping - Free</p>
              <p className="text-sm text-gray-500 mt-1">
                Estimated delivery: 3-5 business days
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
            <Link
              href="/cart"
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 text-center font-semibold"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

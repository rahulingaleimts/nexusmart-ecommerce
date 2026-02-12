"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddToCartButton({ 
  productId, 
  isLoggedIn 
}: { 
  productId: string
  isLoggedIn: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 })
      })

      if (res.ok) {
        alert("Added to cart!")
        router.refresh()
      } else {
        alert("Failed to add to cart")
      }
    } catch (error) {
      alert("Error adding to cart")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  )
}

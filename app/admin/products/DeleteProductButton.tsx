"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE"
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert("Failed to delete product")
      }
    } catch (error) {
      alert("Error deleting product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-800 disabled:text-gray-400"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DeleteCategoryButton({ 
  id, 
  hasProducts 
}: { 
  id: string
  hasProducts: boolean 
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (hasProducts) {
      alert("Cannot delete category with products. Delete products first.")
      return
    }

    if (!confirm("Are you sure you want to delete this category?")) {
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE"
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert("Failed to delete category")
      }
    } catch (error) {
      alert("Error deleting category")
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

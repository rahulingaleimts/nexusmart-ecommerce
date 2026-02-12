"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const statuses = [
  { value: "PENDING", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "PROCESSING", label: "Processing", color: "bg-blue-100 text-blue-800" },
  { value: "SHIPPED", label: "Shipped", color: "bg-purple-100 text-purple-800" },
  { value: "DELIVERED", label: "Delivered", color: "bg-green-100 text-green-800" },
  { value: "CANCELLED", label: "Cancelled", color: "bg-red-100 text-red-800" }
]

export default function OrderStatusUpdater({
  orderId,
  currentStatus
}: {
  orderId: string
  currentStatus: string
}) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)

  const handleUpdateStatus = async (newStatus: string) => {
    if (newStatus === status) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      })

      if (res.ok) {
        setStatus(newStatus)
        router.refresh()
        alert("Order status updated successfully!")
      } else {
        alert("Failed to update order status")
      }
    } catch (error) {
      alert("Error updating order status")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Current Status:</span>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          statuses.find(s => s.value === status)?.color
        }`}>
          {statuses.find(s => s.value === status)?.label}
        </span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Update Status:
        </label>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => handleUpdateStatus(s.value)}
              disabled={loading || s.value === status}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                s.value === status
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
              } disabled:opacity-50`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <p className="text-sm text-gray-600">Updating status...</p>
      )}
    </div>
  )
}

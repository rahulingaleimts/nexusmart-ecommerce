// "use client"

// import { useRouter } from "next/navigation"
// import { useState } from "react"

// export default function CartItemActions({ 
//   itemId, 
//   currentQuantity,
//   maxStock
// }: { 
//   itemId: string
//   currentQuantity: number
//   maxStock: number
// }) {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)

//   const updateQuantity = async (newQuantity: number) => {
//     if (newQuantity < 1 || newQuantity > maxStock) return
    
//     setLoading(true)
//     try {
//       const res = await fetch(`/api/cart/${itemId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ quantity: newQuantity })
//       })

//       if (res.ok) {
//         router.refresh()
//       }
//     } catch (error) {
//       alert("Error updating quantity")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const removeItem = async () => {
//     if (!confirm("Remove this item from cart?")) return

//     setLoading(true)
//     try {
//       const res = await fetch(`/api/cart/${itemId}`, {
//         method: "DELETE"
//       })

//       if (res.ok) {
//         router.refresh()
//       }
//     } catch (error) {
//       alert("Error removing item")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex items-center gap-4 mt-4">
//       <div className="flex items-center gap-2">
//         <button
//           onClick={() => updateQuantity(currentQuantity - 1)}
//           disabled={loading || currentQuantity <= 1}
//           className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
//         >
//           -
//         </button>
//         <span className="w-12 text-center font-semibold">{currentQuantity}</span>
//         <button
//           onClick={() => updateQuantity(currentQuantity + 1)}
//           disabled={loading || currentQuantity >= maxStock}
//           className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
//         >
//           +
//         </button>
//       </div>

//       <button
//         onClick={removeItem}
//         disabled={loading}
//         className="text-red-600 hover:text-red-800 text-sm disabled:text-gray-400"
//       >
//         Remove
//       </button>
//     </div>
//   )
// }

"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CartItemActions({ 
  itemId, 
  currentQuantity,
  maxStock
}: { 
  itemId: string
  currentQuantity: number
  maxStock: number
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > maxStock) return
    
    setLoading(true)
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity })
      })

      if (res.ok) {
        router.refresh()
      }
    } catch (error) {
      alert("Error updating quantity")
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async () => {
    if (!confirm("Remove this item from cart?")) return

    setLoading(true)
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE"
      })

      if (res.ok) {
        router.refresh()
      }
    } catch (error) {
      alert("Error removing item")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
        <button
          onClick={() => updateQuantity(currentQuantity - 1)}
          disabled={loading || currentQuantity <= 1}
          className="w-10 h-10 bg-white text-gray-800 font-bold text-lg rounded-l-lg hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 border-r border-gray-300"
        >
          −
        </button>
        <span className="w-12 text-center font-semibold text-gray-900">{currentQuantity}</span>
        <button
          onClick={() => updateQuantity(currentQuantity + 1)}
          disabled={loading || currentQuantity >= maxStock}
          className="w-10 h-10 bg-white text-gray-800 font-bold text-lg rounded-r-lg hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 border-l border-gray-300"
        >
          +
        </button>
      </div>

      <button
        onClick={removeItem}
        disabled={loading}
        className="text-red-600 hover:text-red-800 text-sm font-medium disabled:text-gray-400"
      >
        {loading ? "Removing..." : "Remove"}
      </button>
    </div>
  )
}

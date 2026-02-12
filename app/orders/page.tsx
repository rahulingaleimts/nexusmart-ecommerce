// import { auth } from "@/lib/auth"
// import { db } from "@/lib/db"
// import { redirect } from "next/navigation"
// import Link from "next/link"

// export default async function OrdersPage({
//   searchParams
// }: {
//   searchParams: { success?: string; orderNumber?: string }
// }) {
//   const session = await auth()
  
//   if (!session?.user) {
//     redirect("/login")
//   }

//   const orders = await db.order.findMany({
//     where: { userId: (session.user as any).id },
//     include: {
//       items: {
//         include: {
//           product: true
//         }
//       }
//     },
//     orderBy: { createdAt: "desc" }
//   })

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex items-center gap-8">
//               <Link href="/" className="text-2xl font-bold text-blue-600">
//                 NexusMart
//               </Link>
//               <Link href="/shop" className="text-gray-700 hover:text-blue-600">
//                 Shop
//               </Link>
//             </div>
//             <div className="flex items-center gap-4">
//               <Link href="/cart" className="text-gray-700 hover:text-blue-600">
//                 🛒 Cart
//               </Link>
//               <span className="text-gray-600">{session.user.name}</span>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Orders Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

//         {searchParams.success && (
//           <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
//             <p className="font-semibold">✅ Order placed successfully!</p>
//             <p className="text-sm mt-1">Order Number: {searchParams.orderNumber}</p>
//           </div>
//         )}

//         {orders.length === 0 ? (
//           <div className="bg-white rounded-lg shadow p-12 text-center">
//             <p className="text-xl text-gray-500 mb-6">No orders yet</p>
//             <Link 
//               href="/shop"
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
//             >
//               Start Shopping
//             </Link>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {orders.map((order) => (
//               <div key={order.id} className="bg-white rounded-lg shadow p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <p className="text-lg font-bold text-gray-900">{order.orderNumber}</p>
//                     <p className="text-sm text-gray-500">
//                       {new Date(order.createdAt).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
//                     <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
//                       order.status === "DELIVERED" ? "bg-green-100 text-green-800" :
//                       order.status === "SHIPPED" ? "bg-blue-100 text-blue-800" :
//                       order.status === "PROCESSING" ? "bg-yellow-100 text-yellow-800" :
//                       "bg-gray-100 text-gray-800"
//                     }`}>
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="border-t pt-4 space-y-3">
//                   {order.items.map((item) => (
//                     <div key={item.id} className="flex justify-between text-sm">
//                       <span className="text-gray-700">
//                         {item.product.name} × {item.quantity}
//                       </span>
//                       <span className="text-gray-900 font-medium">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"

async function OrdersList({ searchParams }: { searchParams: { success?: string; orderNumber?: string } }) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const orders = await db.order.findMany({
    where: { userId: (session.user as any).id },
    include: {
      items: {
        include: {
          product: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {searchParams.success && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
          <p className="font-semibold">✅ Order placed successfully!</p>
          <p className="text-sm mt-1">Order Number: {searchParams.orderNumber}</p>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-xl text-gray-500 mb-6">No orders yet</p>
          <Link 
            href="/shop"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-lg font-bold text-gray-900">{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                    order.status === "DELIVERED" ? "bg-green-100 text-green-800" :
                    order.status === "SHIPPED" ? "bg-blue-100 text-blue-800" :
                    order.status === "PROCESSING" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-gray-900 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default async function OrdersPage({
  searchParams
}: {
  searchParams: { success?: string; orderNumber?: string }
}) {
  const session = await auth()

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
              <Link href="/cart" className="text-gray-700 hover:text-blue-600">
                🛒 Cart
              </Link>
              {session?.user && (
                <span className="text-gray-600">{session.user.name}</span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Suspense fallback={<div className="text-center py-16">Loading orders...</div>}>
        <OrdersList searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

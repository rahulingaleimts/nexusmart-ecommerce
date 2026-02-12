// import { db } from "@/lib/db"
// import Link from "next/link"
// import { notFound } from "next/navigation"
// import OrderStatusUpdater from "./OrderStatusUpdater"

// export default async function AdminOrderDetailsPage({
//   params
// }: {
//   params: { id: string }
// }) {
//   const order = await db.order.findUnique({
//     where: { id: params.id },
//     include: {
//       user: {
//         select: {
//           id: true,
//           name: true,
//           email: true
//         }
//       },
//       items: {
//         include: {
//           product: true
//         }
//       },
//       shippingAddress: true
//     }
//   })

//   if (!order) {
//     notFound()
//   }

//   return (
//     <div className="max-w-5xl">
//       <div className="mb-6">
//         <Link href="/admin/orders" className="text-blue-600 hover:text-blue-800">
//           ← Back to Orders
//         </Link>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         {/* Header */}
//         <div className="px-6 py-4 border-b border-gray-200">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
//               <p className="text-gray-600 mt-1">Order #{order.orderNumber}</p>
//             </div>
//             <div className="text-right">
//               <p className="text-3xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 {new Date(order.createdAt).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric',
//                   hour: '2-digit',
//                   minute: '2-digit'
//                 })}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Customer Info */}
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-gray-600">Name</p>
//               <p className="text-gray-900 font-medium">{order.user.name}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Email</p>
//               <p className="text-gray-900 font-medium">{order.user.email}</p>
//             </div>
//           </div>
//         </div>

//         {/* Order Status */}
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-3">Order Status</h2>
//           <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
//         </div>

//         {/* Order Items */}
//         <div className="px-6 py-4">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
//           <div className="space-y-4">
//             {order.items.map((item) => (
//               <div key={item.id} className="flex justify-between items-center border-b pb-4">
//                 <div className="flex gap-4">
//                   <img
//                     src={item.product.imageUrl}
//                     alt={item.product.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div>
//                     <p className="font-medium text-gray-900">{item.product.name}</p>
//                     <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
//                     <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)} each</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-lg font-semibold text-gray-900">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 pt-4 border-t">
//             <div className="flex justify-between text-xl font-bold text-gray-900">
//               <span>Total</span>
//               <span>${order.total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { db } from "@/lib/db"
import Link from "next/link"
import { notFound } from "next/navigation"
import OrderStatusUpdater from "./OrderStatusUpdater"

export default async function AdminOrderDetailsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const order = await db.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      items: {
        include: {
          product: true
        }
      },
      shippingAddress: true
    }
  })

  if (!order) {
    notFound()
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <Link href="/admin/orders" className="text-blue-600 hover:text-blue-800">
          ← Back to Orders
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-600 mt-1">Order #{order.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-gray-900 font-medium">{order.user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-gray-900 font-medium">{order.user.email}</p>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Order Status</h2>
          <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
        </div>

        {/* Order Items */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div className="flex gap-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)} each</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

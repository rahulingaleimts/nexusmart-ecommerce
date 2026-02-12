import { db } from "@/lib/db"
import Link from "next/link"

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      },
      items: {
        include: {
          product: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "PENDING").length,
    processing: orders.filter(o => o.status === "PROCESSING").length,
    shipped: orders.filter(o => o.status === "SHIPPED").length,
    delivered: orders.filter(o => o.status === "DELIVERED").length,
    cancelled: orders.filter(o => o.status === "CANCELLED").length
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow border border-yellow-200">
          <p className="text-sm text-yellow-800">Pending</p>
          <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow border border-blue-200">
          <p className="text-sm text-blue-800">Processing</p>
          <p className="text-2xl font-bold text-blue-900">{stats.processing}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow border border-purple-200">
          <p className="text-sm text-purple-800">Shipped</p>
          <p className="text-2xl font-bold text-purple-900">{stats.shipped}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow border border-green-200">
          <p className="text-sm text-green-800">Delivered</p>
          <p className="text-2xl font-bold text-green-900">{stats.delivered}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow border border-red-200">
          <p className="text-sm text-red-800">Cancelled</p>
          <p className="text-2xl font-bold text-red-900">{stats.cancelled}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No orders yet
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-900">{order.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{order.user.name}</div>
                      <div className="text-gray-500">{order.user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {order.items.length} item(s)
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "DELIVERED" ? "bg-green-100 text-green-800" :
                      order.status === "SHIPPED" ? "bg-purple-100 text-purple-800" :
                      order.status === "PROCESSING" ? "bg-blue-100 text-blue-800" :
                      order.status === "CANCELLED" ? "bg-red-100 text-red-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

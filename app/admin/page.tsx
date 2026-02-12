import { db } from "@/lib/db"
import Link from "next/link"

export default async function AdminDashboard() {
  const [userCount, productCount, orderCount, categoryCount] = await Promise.all([
    db.user.count(),
    db.product.count(),
    db.order.count(),
    db.category.count()
  ])

  const recentOrders = await db.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true }
      }
    }
  })

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-3xl font-bold text-gray-900">{userCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-3xl font-bold text-gray-900">{productCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900">{orderCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Categories</p>
          <p className="text-3xl font-bold text-gray-900">{categoryCount}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="p-6">
          {recentOrders.length === 0 ? (
            <p className="text-gray-500">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium text-gray-900">{order.orderNumber}</p>
                    <p className="text-sm text-gray-600">{order.user.name} - {order.user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                    <span className={`text-sm px-2 py-1 rounded ${
                      order.status === "DELIVERED" ? "bg-green-100 text-green-800" :
                      order.status === "SHIPPED" ? "bg-blue-100 text-blue-800" :
                      order.status === "PROCESSING" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          href="/admin/products/new"
          className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 text-center"
        >
          <p className="text-xl font-semibold">Add New Product</p>
        </Link>
        <Link 
          href="/admin/categories/new"
          className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700 text-center"
        >
          <p className="text-xl font-semibold">Add New Category</p>
        </Link>
        <Link 
          href="/admin/orders"
          className="bg-purple-600 text-white p-6 rounded-lg shadow hover:bg-purple-700 text-center"
        >
          <p className="text-xl font-semibold">View All Orders</p>
        </Link>
      </div>
    </div>
  )
}

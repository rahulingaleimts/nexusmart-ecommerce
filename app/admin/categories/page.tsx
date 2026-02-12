import { db } from "@/lib/db"
import Link from "next/link"
import DeleteCategoryButton from "./DeleteCategoryButton"

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { products: true }
      }
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <Link 
          href="/admin/categories/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        {categories.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No categories yet. Create your first category!
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 text-gray-600">{category.slug}</td>
                  <td className="px-6 py-4 text-gray-600">{category._count.products}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </Link>
                      <DeleteCategoryButton 
                        id={category.id} 
                        hasProducts={category._count.products > 0}
                      />
                    </div>
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

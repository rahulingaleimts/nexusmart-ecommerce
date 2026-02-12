// import { auth } from "@/lib/auth"
// import { db } from "@/lib/db"
// import { NextResponse } from "next/server"

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await auth()
//     if (!session || (session.user as any).role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     await db.category.delete({
//       where: { id: params.id }
//     })

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
//   }
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await auth()
//     if (!session || (session.user as any).role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const body = await request.json()
//     const { name, description } = body

//     const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

//     const category = await db.category.update({
//       where: { id: params.id },
//       data: {
//         name,
//         slug,
//         description
//       }
//     })

//     return NextResponse.json(category)
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
//   }
// }

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const params = await props.params
    await db.category.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const params = await props.params
    const body = await request.json()
    const { name, description } = body

    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

    const category = await db.category.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

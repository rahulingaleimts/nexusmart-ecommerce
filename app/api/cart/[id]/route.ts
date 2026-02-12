import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const params = await props.params
    const body = await request.json()
    const { quantity } = body

    const cartItem = await db.cartItem.update({
      where: { 
        id: params.id,
        userId: (session.user as any).id
      },
      data: { quantity }
    })

    return NextResponse.json(cartItem)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const params = await props.params
    await db.cartItem.delete({
      where: { 
        id: params.id,
        userId: (session.user as any).id
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
  }
}

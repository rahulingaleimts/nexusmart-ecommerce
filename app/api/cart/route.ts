import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const cartItems = await db.cartItem.findMany({
      where: { userId: (session.user as any).id },
      include: {
        product: {
          include: {
            category: true
          }
        }
      }
    })

    return NextResponse.json(cartItems)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { productId, quantity } = body

    // Check if item already in cart
    const existingItem = await db.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: (session.user as any).id,
          productId
        }
      }
    })

    if (existingItem) {
      // Update quantity
      const updated = await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      })
      return NextResponse.json(updated)
    } else {
      // Create new cart item
      const cartItem = await db.cartItem.create({
        data: {
          userId: (session.user as any).id,
          productId,
          quantity
        }
      })
      return NextResponse.json(cartItem, { status: 201 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}

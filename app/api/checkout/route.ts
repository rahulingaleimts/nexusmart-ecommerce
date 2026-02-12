import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id

    // Get cart items
    const cartItems = await db.cartItem.findMany({
      where: { userId },
      include: { product: true }
    })

    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0)

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order with items in a transaction
    const order = await db.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          status: "PENDING",
          total
        }
      })

      // Create order items and update stock
      for (const cartItem of cartItems) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            price: cartItem.product.price
          }
        })

        // Reduce product stock
        await tx.product.update({
          where: { id: cartItem.productId },
          data: {
            stock: {
              decrement: cartItem.quantity
            }
          }
        })
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId }
      })

      return newOrder
    })

    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      orderNumber: order.orderNumber
    }, { status: 201 })

  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}

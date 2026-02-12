import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test database connection by counting users
    const userCount = await db.user.count()
    const productCount = await db.product.count()
    
    return NextResponse.json({
      success: true,
      message: 'Database connected successfully!',
      data: {
        users: userCount,
        products: productCount
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: String(error)
    }, { status: 500 })
  }
}

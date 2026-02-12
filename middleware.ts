// export { auth as middleware } from "@/lib/auth"

// export const config = {
//   matcher: ["/admin/:path*", "/profile/:path*", "/orders/:path*"]
// }

import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
  
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    
    const userRole = (req.auth?.user as any)?.role
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*"]
}

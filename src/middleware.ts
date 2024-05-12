import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = ['/dashboard', '/dashboard/loan', '/dashboard/loan/create', '/admin']
const publicRoutes = ['/sign-in', '/sign-up', '/']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  // 3. Decrypt the session from the cookie
  const token = await getToken({req})
 
  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
  }
 
//   // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    token &&
    (!req.nextUrl.pathname.startsWith('/dashboard') || !req.nextUrl.pathname.startsWith('/admin'))
  ) {
    if (token?.role === 'Admin') {
      return NextResponse.redirect(new URL('/admin', req.nextUrl))
    }else {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }
   
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('supabase-auth-token');
  const { pathname } = request.nextUrl;

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if already logged in and visiting login page
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard/employees', request.url));
  }

  // Handle root redirect
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard/employees', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
};

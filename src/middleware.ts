import { isAuthorized } from '@/config/globals';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token');

  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  } 
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|favicon.ico).*)"],
};
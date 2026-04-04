import { NextResponse } from 'next/server';

export function middleware(request) {
  // Proteger a rota /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const sessionCookie = request.cookies.get('cvmc_session');

    if (!sessionCookie) {
      // Se não possui cookie de sessão, redireciona para o login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

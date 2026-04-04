import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'cvmc-secret-fallback-change-in-production'
);

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const sessionCookie = request.cookies.get('cvmc_session');

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verifica e valida a assinatura do JWT — rejeita qualquer token forjado
      await jwtVerify(sessionCookie.value, JWT_SECRET);
    } catch {
      // Token inválido, expirado ou forjado → redireciona para login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('cvmc_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

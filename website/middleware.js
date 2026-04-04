import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'cvmc-secret-fallback-change-in-production';

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}

function verifyJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    // Verifica expiração
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;

    // Verifica assinatura via HMAC-SHA256
    const crypto = require('crypto');
    const signature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${parts[0]}.${parts[1]}`)
      .digest('base64url');

    if (signature !== parts[2]) return null;

    return payload;
  } catch {
    return null;
  }
}

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const sessionCookie = request.cookies.get('cvmc_session');

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = verifyJWT(sessionCookie.value);
    if (!payload) {
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

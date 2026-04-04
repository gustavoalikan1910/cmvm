import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'cvmc-secret-fallback-change-in-production';

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}

async function verifyJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    // Verifica expiração
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;

    // Verifica assinatura via Web Crypto API (compatível com Edge Runtime)
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    // O token assinado foi feito com node crypto createHmac, cuja saída base64url é a assinatura.
    // Para verificar com Web Crypto, precisamos decodificar a string base64url da assinatura
    // para um Uint8Array (ArrayBuffer).
    const signatureStr = parts[2].replace(/-/g, '+').replace(/_/g, '/');
    const signatureBytes = Uint8Array.from(atob(signatureStr), c => c.charCodeAt(0));
    const dataBytes = encoder.encode(`${parts[0]}.${parts[1]}`);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      dataBytes
    );

    if (!isValid) return null;

    return payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const sessionCookie = request.cookies.get('cvmc_session');

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyJWT(sessionCookie.value);
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

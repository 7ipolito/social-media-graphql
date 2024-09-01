// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getFormattedCookie } from './utils/cookies';

export async function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl.clone(); 

    const cookieValue = getFormattedCookie('qid');
    console.log(cookieValue)

    if (cookieValue === false) {
      if (url.pathname !== '/') {
        url.pathname = '/';
        return NextResponse.redirect(new URL('/?error=disconnected', request.url));
      }
    } else if (cookieValue) {
      if (url.pathname !== '/dashboard') {
        url.pathname = '/dashboard';
        return NextResponse.redirect(new URL('/?error=disconnected', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Erro ao consultar a sessão:', error);
    return NextResponse.redirect(new URL('/?error=disconnected', request.url));
  }
}

export const config = {
  matcher: ['/dashboard', '/'], // Ajuste conforme necessário
};
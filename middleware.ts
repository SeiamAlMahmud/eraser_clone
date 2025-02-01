import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { isAuthenticated } = getKindeServerSession(request);
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.redirect(
      new URL(
        `/api/auth/login?post_login_redirect_url=${encodeURIComponent(request.nextUrl.pathname)}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

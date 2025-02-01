import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await getKindeServerSession(); // সেশন অ্যাওয়েট করে ফেচ করা হচ্ছে
  const isAuthenticated = await session.isAuthenticated(); // ফাংশনকে অ্যাওয়েট করতে হবে
  console.log(isAuthenticated, 'seiam');
  if (!isAuthenticated) {
    // যদি ইউজার লগইন না থাকে, তাহলে লগইন পেজে রিডাইরেক্ট করবে
    return NextResponse.redirect(
      new URL('/api/auth/login?post_login_redirect_url=/dashboard', request.url)
    );
  }

  // ইউজার অথেনটিকেটেড থাকলে `/dashboard` পেজ লোড হতে দেবে
  return NextResponse.next();
}

// Middleware কেবলমাত্র `/dashboard` রুটের জন্য কাজ করবে
export const config = {
  matcher: ['/dashboard'],
};

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // إذا لم يبدأ المسار بـ /ar أو /en، أعد التوجيه إلى /ar
  if (!/^\/(ar|en)(\/|$)/.test(pathname)) {
    return NextResponse.redirect(new URL(`/ar${pathname}`, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};

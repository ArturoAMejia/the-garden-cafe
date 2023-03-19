import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwt = req.cookies.get("token")?.value;
  const rol = req.cookies.get("rol")?.value;

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!jwt) {
      return NextResponse.rewrite(new URL("/admin/auth/login", req.url));
    }
    if (rol === "Cliente" || !rol) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/checkout")) {
    if (jwt === undefined) {
      return NextResponse.rewrite(new URL("/auth/login", req.url));
    }
  }
  return NextResponse.next();
}

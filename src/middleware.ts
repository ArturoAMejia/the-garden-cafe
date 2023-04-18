import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Roles = 1 | 2 | 3 | 4 | 5 | 7;

export async function middleware(req: NextRequest) {
  const jwt = req.cookies.get("token")?.value;
  const rol = req.cookies.get("rol")?.value;

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log({ session });

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

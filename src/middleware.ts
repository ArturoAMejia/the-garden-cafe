import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.rewrite(new URL("/admin/auth", req.url));
    }

    const roles = session.user.roles;

    const rolesValidos = [1, 2, 3, 4, 5, 7];

    if (!rolesValidos.includes(session.user.id_rol)) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

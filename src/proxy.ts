import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Rotas que precisam de login
const protectedRoutes = ["/checkout", "/entrega", "/pedidos", "/conta", "/favoritos"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
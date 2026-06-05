import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("finance-app-token");
  if (!token) {
    return Response.redirect(new URL("/login", request.url));
  }
  console.log("token", token);
  return NextResponse.next();
}

export const config = {
  matcher: ["/overview", "/pots", "/budgets", "/transactions"],
};

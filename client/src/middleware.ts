import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("finance-app-token");
  // If no token is found, redirect to the login page
  if (!token) {
    return Response.redirect(new URL("/login", request.url));
  }
  console.log("token", token)
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/overview", "/pots", "/budgets", "/transactions"],
};

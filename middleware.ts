import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const { data: userRole } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user?.id)
    .single();

  if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
    if (userRole?.role !== "admin") {
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/dashboard/representative")) {
    if (userRole?.role !== "representante") {
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/dashboard/admin/:path*",
    "/dashboard/representative/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

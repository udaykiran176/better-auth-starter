import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const authPaths = ["/auth/signin", "/auth/signup", "/auth/forgot-password", "/auth/reset-password"];
const protectedPaths = ["/dashboard"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = getSessionCookie(request);

    // Redirect to login if not authenticated and trying to access protected routes
    if (!sessionCookie && protectedPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (sessionCookie && authPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Check for child profile on dashboard routes
    if (sessionCookie && pathname.startsWith("/dashboard")) {
        const selectedChild = request.cookies.get("selected-child")?.value;
        
        // If no child is selected, redirect to select-child page
        if (!selectedChild) {
            return NextResponse.redirect(new URL("/select-child", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/select-child",
        "/create-child",
        "/auth/:path*"
    ],
};
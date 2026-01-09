import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// Simple JWT decode without external dependencies (Edge compatible)
function decodeJWT(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

async function tryToRefreshToken(refreshToken, response) {
    try {
        console.log('Middleware: Refreshing token...');
        const res = await fetch(`${BACKEND_URL}/auth/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!res.ok) {
            console.log('Middleware: Token refresh failed');
            return false;
        }

        const data = await res.json();
        const accessToken = data.access;
        const decoded = decodeJWT(accessToken);

        if (!decoded) return false;

        // Set cookies on the response
        const expiresAccess = new Date(decoded.exp * 1000);
        response.cookies.set('accessToken', accessToken, { path: '/', httpOnly: true, expires: expiresAccess });
        response.cookies.set('email', decoded.email || '', { path: '/', httpOnly: false, expires: expiresAccess });
        response.cookies.set('username', decoded.username || '', { path: '/', httpOnly: false, expires: expiresAccess });
        response.cookies.set('is_staff', (decoded.is_staff || false).toString(), { path: '/', httpOnly: false, expires: expiresAccess });

        console.log('Middleware: Token refreshed successfully');
        return true;
    } catch (error) {
        console.error('Middleware: Refresh error', error.message);
        return false;
    }
}

export async function middleware(request) {
    const token = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const pathname = request.nextUrl.pathname;

    // Protected routes - require auth
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
        if (!token && !refreshToken) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        if (!token && refreshToken) {
            const response = NextResponse.next();
            const refreshed = await tryToRefreshToken(refreshToken, response);
            if (!refreshed) {
                // Clear cookies and redirect
                const redirectResponse = NextResponse.redirect(new URL('/', request.url));
                redirectResponse.cookies.delete('accessToken');
                redirectResponse.cookies.delete('refreshToken');
                redirectResponse.cookies.delete('email');
                redirectResponse.cookies.delete('username');
                redirectResponse.cookies.delete('is_staff');
                return redirectResponse;
            }
            return response;
        }
    }

    // Non-protected routes - try refresh if needed but don't block
    if (!token && refreshToken) {
        const response = NextResponse.next();
        await tryToRefreshToken(refreshToken, response);
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
    ],
};
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

function isAuthConfigured(): boolean {
    return URL !== '' && ANON !== '';
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
    if (!isAuthConfigured()) return NextResponse.next();

    let response = NextResponse.next({ request });
    const supabase = createServerClient(URL, ANON, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
                cookiesToSet.forEach(({ name, value, options }) => {
                    request.cookies.set(name, value);
                    response.cookies.set(name, value, options);
                });
            }
        }
    });

    const {
        data: { user }
    } = await supabase.auth.getUser();

    const isLogin = request.nextUrl.pathname === '/login';
    const isCallback = request.nextUrl.pathname.startsWith('/auth/callback');

    if (user === null && !isLogin && !isCallback) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/login';
        redirectUrl.searchParams.set('next', request.nextUrl.pathname + request.nextUrl.search);
        return NextResponse.redirect(redirectUrl);
    }

    if (user !== null && isLogin) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/';
        redirectUrl.search = '';
        return NextResponse.redirect(redirectUrl);
    }

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)']
};

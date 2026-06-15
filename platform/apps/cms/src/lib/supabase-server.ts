import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export function isServerSupabaseConfigured(): boolean {
    return URL !== '' && ANON !== '';
}

export async function createSupabaseServerClient(): Promise<SupabaseClient> {
    const cookieStore = await cookies();
    return createServerClient(URL, ANON, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                } catch {
                    void 0;
                }
            }
        }
    });
}

export async function getCurrentUserEmail(): Promise<string | null> {
    if (!isServerSupabaseConfigured()) return null;
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    return data.user?.email ?? null;
}

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

let client: SupabaseClient | null = null;

export function isBrowserSupabaseConfigured(): boolean {
    return URL !== '' && ANON !== '';
}

export function createSupabaseBrowserClient(): SupabaseClient {
    if (client === null) {
        client = createBrowserClient(URL, ANON);
    }
    return client;
}

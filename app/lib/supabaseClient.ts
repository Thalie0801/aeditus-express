import { createClient } from "@supabase/supabase-js";

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.supabaseUrl ??
  process.env.SUPABASE_URL;

const anon =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.supabaseKey ??
  process.env.SUPABASE_ANON_KEY;

if (!url || !anon) {
  throw new Error(
    "Supabase env missing. Set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (or supabaseUrl/supabaseKey)."
  );
}

export const supabase = createClient(url, anon);

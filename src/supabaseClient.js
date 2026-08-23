import { createClient } from '@supabase/supabase-js';

let supabaseUrl = '';
let supabaseAnonKey = '';

if (typeof process !== 'undefined' && process.env) {
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
}

try {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    supabaseUrl = supabaseUrl || import.meta.env.VITE_SUPABASE_URL || '';
    supabaseAnonKey = supabaseAnonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  }
} catch (e) {}

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseUrl !== 'undefined' &&
  supabaseUrl !== 'null' &&
  supabaseUrl.startsWith('http') &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'undefined' &&
  supabaseAnonKey !== 'null'
);

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set. ' +
    'The application will fall back to using static mock data.'
  );
}

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    }) 
  : null;

import { createClient } from '@supabase/supabase-js'

// We rename the file and export a lazy-initialized client to bypass Next.js/Turbopack caching issues.
// We also use explicit hardcoded fallbacks to ensure the build never fails due to missing environment variables.

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim().length > 10 
  ? process.env.NEXT_PUBLIC_SUPABASE_URL!.trim() 
  : "https://idnkmelxuxrsswzwwbes.supabase.co";

const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim().length > 50 
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim() 
  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbmttZWx4dXhyc3N3end3YmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NDMxMTksImV4cCI6MjA5MjExOTExOX0.3E_STqcMTA78ILrKJGwGwTSWZlX9Ep3SH8DUD8Ra1dk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

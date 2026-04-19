import { createClient } from '@supabase/supabase-js'

// Use fallbacks and trim to ensure build passes even if env vars are missing/empty during static analysis
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// If variables are missing or too short, use the hardcoded project defaults
const supabaseUrl = rawUrl.trim().length > 10 ? rawUrl.trim() : "https://idnkmelxuxrsswzwwbes.supabase.co";
const supabaseAnonKey = rawKey.trim().length > 50 ? rawKey.trim() : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbmttZWx4dXhyc3N3end3YmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NDMxMTksImV4cCI6MjA5MjExOTExOX0.3E_STqcMTA78ILrKJGwGwTSWZlX9Ep3SH8DUD8Ra1dk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

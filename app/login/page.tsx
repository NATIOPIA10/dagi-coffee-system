"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link href="/" className="font-headline text-3xl text-primary font-bold italic tracking-tight mb-4 inline-block">
            Coffee Corner
          </Link>
          <h1 className="text-2xl font-bold text-on-surface">Admin Portal</h1>
          <p className="text-on-surface-variant mt-2">Please sign in to manage your website</p>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/20 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-100 text-red-800 rounded-xl text-sm flex items-center gap-2 border border-red-200">
                <span className="material-symbols-outlined text-[20px]">error</span>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl px-5 py-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="admin@coffeecorner.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl px-5 py-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined">login</span>
              )}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-on-surface-variant text-sm">
          &copy; {new Date().getFullYear()} Coffee Corner Management System
        </p>
      </div>
    </div>
  );
}

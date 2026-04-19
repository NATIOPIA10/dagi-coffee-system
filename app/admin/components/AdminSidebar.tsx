"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface-container-low border-r border-outline-variant/20 flex flex-col">
      <div className="p-6 border-b border-outline-variant/20">
        <Link href="/" className="font-serif text-xl tracking-tighter text-amber-950 font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">local_cafe</span>
          Dagi Admin
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/admin' || pathname === '/admin/new' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">restaurant_menu</span>
          Menu Items
        </Link>
        <Link href="/admin/orders" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/admin/orders' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">receipt_long</span>
          Orders
        </Link>
        <Link href="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/admin/settings' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">tune</span>
          Website Settings
        </Link>
      </nav>
    </aside>
  );
}

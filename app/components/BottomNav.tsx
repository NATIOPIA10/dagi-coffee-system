"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const isMenu = pathname?.startsWith("/menu") || pathname === "/";
  const isFavorites = pathname === "/favorites";
  const isCart = pathname === "/cart";

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-3 pb-8 bg-stone-50/80 backdrop-blur-xl z-50 rounded-t-[2rem] shadow-[0_-8px_30px_rgb(0,0,0,0.04)] border-t border-stone-200/20">
      <Link 
        href="/menu"
        className={`flex flex-col items-center justify-center px-6 py-2 transition-all active:scale-95 ${
          isMenu ? "bg-amber-900/10 text-amber-900 rounded-2xl" : "text-stone-400 hover:text-amber-700"
        }`}
      >
        <span className="material-symbols-outlined mb-1" data-icon="restaurant_menu">restaurant_menu</span>
        <span className="text-[11px] font-bold tracking-tight">Menu</span>
      </Link>
      
      <Link 
        href="/favorites"
        className={`flex flex-col items-center justify-center px-6 py-2 transition-all active:scale-95 ${
          isFavorites ? "bg-amber-900/10 text-amber-900 rounded-2xl" : "text-stone-400 hover:text-amber-700"
        }`}
      >
        <span className="material-symbols-outlined mb-1" data-icon="favorite">favorite</span>
        <span className="text-[11px] font-bold tracking-tight">Favorites</span>
      </Link>
      
      <Link 
        href="/cart"
        className={`flex flex-col items-center justify-center px-6 py-2 transition-all active:scale-95 ${
          isCart ? "bg-amber-900/10 text-amber-900 rounded-2xl" : "text-stone-400 hover:text-amber-700"
        }`}
      >
        <div className="relative">
          <span className="material-symbols-outlined mb-1" data-icon="shopping_bag">shopping_bag</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-on-primary text-[8px] flex items-center justify-center rounded-full">2</span>
        </div>
        <span className="text-[11px] font-bold tracking-tight">Cart</span>
      </Link>
    </nav>
  );
}

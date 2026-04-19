import Link from "next/link";
import BottomNav from "../components/BottomNav";

export default function FavoritesPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 glass-header shadow-sm">
        <div className="flex items-center justify-between w-full px-6 py-4 max-w-xl mx-auto">
          <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-200/30 transition-all">
            <span className="material-symbols-outlined text-amber-900" data-icon="home">home</span>
          </Link>
          <h1 className="font-serif text-2xl tracking-tighter text-amber-950 font-bold">Favorites</h1>
          <div className="w-10 h-10"></div> {/* Spacer to center title */}
        </div>
      </header>
      
      <main className="max-w-xl mx-auto px-6 pt-8">
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="material-symbols-outlined text-stone-300 text-6xl mb-4">favorite_border</span>
          <h2 className="font-serif text-2xl text-primary mb-2">No favorites yet</h2>
          <p className="text-on-surface-variant text-sm mb-8 max-w-[250px] mx-auto">
            Tap the heart icon on any item to save it here for quick ordering.
          </p>
          <Link href="/menu" className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity">
            Browse Menu
          </Link>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}

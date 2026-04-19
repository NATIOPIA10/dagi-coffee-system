import Link from "next/link";
import MenuTabs from "../components/MenuTabs";
import BottomNav from "../components/BottomNav";
import ThemeToggle from "../components/ThemeToggle";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 glass-header shadow-sm">
        <div className="flex items-center justify-between w-full px-6 py-4 max-w-xl mx-auto">
          <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-200/30 transition-all">
            <span className="material-symbols-outlined text-amber-900" data-icon="home">home</span>
          </Link>
          <h1 className="font-serif text-2xl tracking-tighter text-amber-950 font-bold">Dagi Coffee</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-200/30 transition-all">
              <span className="material-symbols-outlined text-amber-900" data-icon="search">search</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-highest">
              <img alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfg143XubkedQdIedms2ziIFtsmLrjDjgktCzvYbhs_UhPGt1IBwG04l5AazeXju8bOSzRDX6CnehyeJKhgYKSjSoP1MRozTwDuLBsP-VhLb9HHPT-NgjPRdlBUzfYkJpYhDJ2Pz77paTOE8QRO5WQfN9cOKZW5_SiCxhvTB34sPS7iDBaP2mlGy9ZjWy65AkVVwFj69HueNZCdNfgqbY_iLowi0C-YiARoW00gBdCs9sYFba9SglfAFyTAljyd8D0uboV-aK2Jg" />
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-xl mx-auto px-6 pt-8">
        {/* Title & Search */}
        <div className="space-y-6">
          <div>
            <span className="font-sans text-sm tracking-widest uppercase text-stone-500 block mb-1">Premium Selection</span>
            <h2 className="font-serif italic text-4xl font-normal text-primary">Digital Menu</h2>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-stone-400" data-icon="search">search</span>
            </div>
            <input className="w-full bg-surface-container-low border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder-stone-400 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="Find your favorite roast..." type="text" />
          </div>
        </div>
        
        <MenuTabs />
        
        {children}
      </main>
      
      <BottomNav />
    </div>
  );
}

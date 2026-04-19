import Link from "next/link";
import BottomNav from "../components/BottomNav";

export default function CartPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 glass-header shadow-sm">
        <div className="flex items-center justify-between w-full px-6 py-4 max-w-xl mx-auto">
          <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-200/30 transition-all">
            <span className="material-symbols-outlined text-amber-900" data-icon="home">home</span>
          </Link>
          <h1 className="font-serif text-2xl tracking-tighter text-amber-950 font-bold">Your Cart</h1>
          <div className="w-10 h-10"></div> {/* Spacer to center title */}
        </div>
      </header>
      
      <main className="max-w-xl mx-auto px-6 pt-8">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-surface-container-highest flex items-center justify-center overflow-hidden flex-shrink-0">
                <span className="material-symbols-outlined text-stone-400">local_cafe</span>
              </div>
              <div>
                <h4 className="font-bold text-on-surface">Ethiopian Honey Latte</h4>
                <p className="text-xs text-on-surface-variant">Hot, Whole Milk</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="font-bold text-primary">65 Birr</span>
              <div className="flex items-center gap-3 bg-surface-container-low px-2 py-1 rounded-lg">
                <button className="text-stone-500"><span className="material-symbols-outlined text-sm">remove</span></button>
                <span className="text-sm font-bold">1</span>
                <button className="text-stone-500"><span className="material-symbols-outlined text-sm">add</span></button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-surface-container-highest flex items-center justify-center overflow-hidden flex-shrink-0">
                <span className="material-symbols-outlined text-stone-400">bakery_dining</span>
              </div>
              <div>
                <h4 className="font-bold text-on-surface">Butter Croissant</h4>
                <p className="text-xs text-on-surface-variant">Warmed</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="font-bold text-primary">55 Birr</span>
              <div className="flex items-center gap-3 bg-surface-container-low px-2 py-1 rounded-lg">
                <button className="text-stone-500"><span className="material-symbols-outlined text-sm">remove</span></button>
                <span className="text-sm font-bold">1</span>
                <button className="text-stone-500"><span className="material-symbols-outlined text-sm">add</span></button>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-2xl mt-8">
            <div className="flex justify-between mb-2">
              <span className="text-on-surface-variant">Subtotal</span>
              <span className="font-medium text-on-surface">120 Birr</span>
            </div>
            <div className="flex justify-between mb-4 pb-4 border-b border-outline-variant/20">
              <span className="text-on-surface-variant">Tax</span>
              <span className="font-medium text-on-surface">18 Birr</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-bold text-lg text-primary">Total</span>
              <span className="font-serif text-2xl text-primary font-bold">138 Birr</span>
            </div>
            
            <button className="w-full mt-6 bg-primary text-on-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95">
              Checkout
              <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </div>
          
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}

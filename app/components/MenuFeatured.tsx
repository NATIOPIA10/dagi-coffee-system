type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string | null;
  image_url: string | null;
  in_stock: boolean;
};

export default function MenuFeatured({ item }: { item: MenuItem }) {
  return (
    <section className="mt-10 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-0">
        {/* Image */}
        <div className="w-full h-72 rounded-3xl overflow-hidden shadow-lg z-0 bg-surface-container-highest flex items-center justify-center">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <span className="material-symbols-outlined text-stone-300 text-7xl">coffee</span>
          )}
        </div>

        {/* Card overlay */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-xl -mt-16 mx-4 z-10 relative border border-outline-variant/10">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-2xl text-primary font-bold">{item.name}</h3>
            <span className="font-bold text-lg text-primary flex-shrink-0 ml-2">{item.price} Birr</span>
          </div>
          {item.description && (
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{item.description}</p>
          )}
          {!item.in_stock ? (
            <div className="w-full bg-surface-container py-3 rounded-xl font-semibold text-center text-on-surface-variant">
              Currently Unavailable
            </div>
          ) : (
            <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all hover:opacity-90">
              <span className="material-symbols-outlined text-sm">add</span>
              Add to Order
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

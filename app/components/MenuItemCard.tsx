type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string | null;
  image_url: string | null;
  in_stock: boolean;
};

const CATEGORY_ICONS: Record<string, string> = {
  coffee: "coffee",
  teas: "emoji_food_beverage",
  pastries: "bakery_dining",
  specials: "star",
};

export default function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="flex items-center gap-4 bg-surface-container-low p-3 rounded-2xl hover:bg-surface-container-high transition-colors group cursor-pointer relative">
      {/* Image or icon placeholder */}
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-highest flex items-center justify-center">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <span className="material-symbols-outlined text-stone-400 text-3xl group-hover:scale-110 transition-transform">
            {CATEGORY_ICONS[item.category] ?? "fastfood"}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center gap-2">
          <h4 className="font-bold text-on-surface truncate">{item.name}</h4>
          <span className="font-bold text-primary flex-shrink-0">{item.price} Birr</span>
        </div>
        {item.description && (
          <p className="text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}
        {!item.in_stock && (
          <span className="inline-block mt-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
            Out of Stock
          </span>
        )}
      </div>
    </div>
  );
}

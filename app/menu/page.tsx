import { supabase } from "../../lib/supabase";
import MenuItemCard from "../components/MenuItemCard";
import MenuFeatured from "../components/MenuFeatured";

export const revalidate = 0;

export default async function CoffeePage() {
  const { data: items } = await supabase
    .from("menu_items")
    .select("*")
    .eq("category", "coffee")
    .order("name");

  if (!items || items.length === 0) {
    return (
      <section className="mt-10 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center py-16 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">coffee</span>
          <p className="font-medium">No coffee items yet. Add some from the admin panel.</p>
        </div>
      </section>
    );
  }

  const [featured, ...rest] = items;

  return (
    <>
      {featured && <MenuFeatured item={featured} />}
      {rest.length > 0 && (
        <section className="mt-12 mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h3 className="font-serif text-2xl text-primary mb-6">More Coffees</h3>
          <div className="grid gap-4">
            {rest.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

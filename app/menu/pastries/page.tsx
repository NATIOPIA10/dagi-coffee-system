import { supabase } from "../../../lib/supabase";
import MenuItemCard from "../../components/MenuItemCard";

export const revalidate = 0;

export default async function PastriesPage() {
  const { data: items } = await supabase
    .from("menu_items")
    .select("*")
    .eq("category", "pastries")
    .order("name");

  if (!items || items.length === 0) {
    return (
      <section className="mt-10 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h3 className="font-serif text-2xl text-primary mb-6">Fresh Pastries</h3>
        <div className="text-center py-16 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">bakery_dining</span>
          <p className="font-medium">No pastries yet. Add some from the admin panel.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="font-serif text-2xl text-primary mb-6">Fresh Pastries</h3>
      <div className="grid gap-4">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

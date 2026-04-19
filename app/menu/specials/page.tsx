import { supabase } from "../../../lib/supabase";
import MenuItemCard from "../../components/MenuItemCard";
import MenuFeatured from "../../components/MenuFeatured";

export const revalidate = 0;

export default async function SpecialsPage() {
  const { data: items } = await supabase
    .from("menu_items")
    .select("*")
    .eq("category", "specials")
    .order("name");

  if (!items || items.length === 0) {
    return (
      <>
        <section className="mt-10 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col gap-0">
            <div className="w-full h-72 rounded-3xl overflow-hidden shadow-lg z-0 bg-surface-container-highest flex items-center justify-center">
              <span className="material-symbols-outlined text-stone-300 text-7xl">star</span>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-xl -mt-16 mx-4 z-10 relative border border-outline-variant/10 text-center">
              <p className="text-on-surface-variant font-medium">No specials yet. Add some from the admin panel.</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  const [featured, ...rest] = items;

  return (
    <>
      {featured && <MenuFeatured item={featured} />}
      {rest.length > 0 && (
        <section className="mt-12 mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h3 className="font-serif text-2xl text-primary mb-6">More Specials</h3>
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

import { supabase } from "../../lib/supabase";
import Link from "next/link";
import MenuItemActions from "./components/MenuItemActions";

export const revalidate = 0; // Disable caching for the admin page

export default async function AdminMenuPage() {
  const { data: menuItems, error } = await supabase.from('menu_items').select('*').order('category');

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-primary font-bold">Menu Management</h1>
          <p className="text-on-surface-variant mt-2">Add, edit, or remove items from your digital menu.</p>
        </div>
        <Link href="/admin/new" className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">add</span>
          New Item
        </Link>
      </div>

      {error ? (
        <div className="bg-error-container text-on-error-container p-6 rounded-2xl">
          <h2 className="font-bold flex items-center gap-2 mb-2 text-xl">
            <span className="material-symbols-outlined text-error">warning</span>
            Database Not Configured
          </h2>
          <p className="mb-4">Please run the SQL setup script in your Supabase SQL Editor to create the <code>menu_items</code> table and seed the initial data.</p>
          <div className="bg-white/50 p-4 rounded-xl font-mono text-sm overflow-x-auto">
            {error.message}
          </div>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-sm border-b border-outline-variant/20">
                <th className="p-4 font-medium">Item Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems && menuItems.length > 0 ? (
                menuItems.map((item) => (
                  <tr key={item.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4 font-bold text-on-surface flex items-center gap-3">
                      {item.image_url && (
                        <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      {item.name}
                    </td>
                    <td className="p-4 text-on-surface-variant capitalize">{item.category}</td>
                    <td className="p-4 text-primary font-medium">{item.price} Birr</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-4">
                      <MenuItemActions item={item} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                    No menu items found. Add some items to your database!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

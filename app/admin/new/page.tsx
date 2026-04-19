"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";
import { revalidateMenuAfterAdd } from "../../actions/menu";

export default function NewMenuItemPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    let imageUrl = null;
    const imageFile = formData.get("image") as File;
    
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('menu_images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        setError("Error uploading image: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage.from('menu_images').getPublicUrl(fileName);
      imageUrl = data.publicUrl;
    }

    const itemData = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: parseFloat(formData.get("price") as string),
      description: formData.get("description") as string,
      image_url: imageUrl,
      in_stock: formData.get("in_stock") === "on",
    };

    const { error: dbError } = await supabase.from("menu_items").insert([itemData]);

    if (dbError) {
      setError(dbError.message);
      setLoading(false);
    } else {
      // Revalidate public pages so the new item appears immediately
      await revalidateMenuAfterAdd();
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin" className="text-on-surface-variant hover:text-primary flex items-center gap-2 mb-4 w-fit transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Back to Menu
        </Link>
        <h1 className="font-serif text-3xl text-primary font-bold">Add New Menu Item</h1>
        <p className="text-on-surface-variant mt-2">Fill out the details below to add a new product to your digital menu.</p>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 p-8">
        {error && (
          <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-error">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-on-surface">Item Name *</label>
              <input required type="text" id="name" name="name" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="e.g. Mocha Frappuccino" />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-bold text-on-surface">Category *</label>
              <select required id="category" name="category" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                <option value="coffee">Coffee</option>
                <option value="teas">Teas & Drinks</option>
                <option value="pastries">Pastries</option>
                <option value="specials">Specials</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-bold text-on-surface">Price (Birr) *</label>
              <input required type="number" step="0.01" min="0" id="price" name="price" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="e.g. 50.00" />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="block text-sm font-bold text-on-surface">Image Upload (Optional)</label>
              <input type="file" accept="image/*" id="image" name="image" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-bold text-on-surface">Description</label>
            <textarea id="description" name="description" rows={4} className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" placeholder="Describe the item..."></textarea>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="in_stock" name="in_stock" defaultChecked className="w-5 h-5 accent-primary rounded cursor-pointer" />
            <label htmlFor="in_stock" className="text-sm font-medium text-on-surface cursor-pointer">Item is currently in stock</label>
          </div>

          <div className="pt-4 flex justify-end gap-4 border-t border-outline-variant/20">
            <Link href="/admin" className="px-6 py-3 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors">
              Cancel
            </Link>
            <button disabled={loading} type="submit" className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2">
              {loading ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined">save</span>
              )}
              {loading ? "Saving..." : "Save Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

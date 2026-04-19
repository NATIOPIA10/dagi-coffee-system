"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { deleteMenuItemAction, updateMenuItemAction } from "../../actions/menu";
import { supabase } from "../../../lib/supabase";

type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string | null;
  image_url: string | null;
  in_stock: boolean;
};

export default function MenuItemActions({ item }: { item: MenuItem }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: item.name,
    category: item.category,
    price: item.price,
    description: item.description || "",
    in_stock: item.in_stock,
    image_url: item.image_url || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `item_${Date.now()}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("menu_images")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("menu_images").getPublicUrl(fileName);
      setForm((prev) => ({ ...prev, image_url: data.publicUrl }));
    } catch (err: unknown) {
      alert("Upload failed: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deleteMenuItemAction(item.id);
      router.refresh(); // refresh admin table view
    } catch (err: unknown) {
      alert("Error deleting: " + (err instanceof Error ? err.message : String(err)));
      setDeleting(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateMenuItemAction(item.id, {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        description: form.description,
        in_stock: form.in_stock,
        image_url: form.image_url,
      });
      setShowEditModal(false);
      router.refresh(); // refresh admin table view
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowEditModal(true)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 hover:bg-stone-200 hover:text-primary transition-colors"
          title="Edit item"
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 hover:bg-red-100 hover:text-red-600 transition-colors disabled:opacity-40"
          title="Delete item"
        >
          {deleting ? (
            <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined text-[20px]">delete</span>
          )}
        </button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/20 w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
              <h2 className="font-serif text-xl font-bold text-primary">Edit: {item.name}</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-100 text-red-800 rounded-xl text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-sm font-bold text-on-surface">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-on-surface">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="coffee">Coffee</option>
                    <option value="teas">Teas &amp; Drinks</option>
                    <option value="pastries">Pastries</option>
                    <option value="specials">Specials</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-on-surface">Price (Birr)</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-bold text-on-surface">Item Image</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/20 flex-shrink-0">
                      {form.image_url ? (
                        <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-on-surface-variant/40">
                          <span className="material-symbols-outlined text-3xl">image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="px-4 py-2 border border-outline-variant/30 rounded-xl text-sm font-bold hover:bg-surface-container-high transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">upload</span>
                        {uploading ? "Uploading..." : "Change Image"}
                      </button>
                      <p className="text-[10px] text-on-surface-variant mt-2">
                        Recommended: Square image, max 5MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-sm font-bold text-on-surface">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
                <div className="col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`in_stock_${item.id}`}
                    checked={form.in_stock}
                    onChange={(e) => setForm((f) => ({ ...f, in_stock: e.target.checked }))}
                    className="w-5 h-5 accent-primary rounded cursor-pointer"
                  />
                  <label htmlFor={`in_stock_${item.id}`} className="text-sm font-medium text-on-surface cursor-pointer">
                    Item is currently in stock
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-5 py-2.5 rounded-xl font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

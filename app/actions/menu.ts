"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../../lib/supabase";

export async function deleteMenuItemAction(id: number) {
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateMenuPaths();
}

export async function updateMenuItemAction(
  id: number,
  data: {
    name: string;
    category: string;
    price: number;
    description: string;
    in_stock: boolean;
    image_url?: string;
  }
) {
  const { error } = await supabase.from("menu_items").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateMenuPaths();
}

function revalidateMenuPaths() {
  revalidatePath("/");            // Homepage featured items
  revalidatePath("/menu");        // Coffee tab
  revalidatePath("/menu/teas");
  revalidatePath("/menu/pastries");
  revalidatePath("/menu/specials");
  revalidatePath("/admin");       // Admin table
}

export async function revalidateMenuAfterAdd() {
  revalidateMenuPaths();
}

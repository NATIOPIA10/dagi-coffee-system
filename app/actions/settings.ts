"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../../lib/supabaseClient";

type Settings = {
  store_name: string;
  phone_number: string;
  store_address: string;
  hours_weekday: string;
  hours_weekend: string;
  contact_email: string;
  hero_tagline: string;
  about_title: string;
  about_body_1: string;
  about_body_2: string;
  hero_image_url: string;
  about_image_1_url: string;
  about_image_2_url: string;
  about_image_3_url: string;
  map_image_url: string;
  visit_us_title: string;
};

export async function saveSettingsAction(settings: Settings) {
  const { error } = await supabase
    .from("store_settings")
    .upsert({ id: 1, ...settings });

  if (error) {
    throw new Error(error.message);
  }

  // Bust the Next.js cache for every page that reads store_settings
  revalidatePath("/");          // Homepage
  revalidatePath("/menu");      // Menu layout
  revalidatePath("/menu/teas");
  revalidatePath("/menu/pastries");
  revalidatePath("/menu/specials");
}

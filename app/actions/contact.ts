"use server";

import { supabase } from "../../lib/supabaseClient";

export async function sendContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill in all fields." };
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert([{ name, email, message, created_at: new Date().toISOString() }]);

  if (error) {
    console.error("Supabase error:", error);
    return { error: "Failed to send message. Please try again later." };
  }

  return { success: true };
}

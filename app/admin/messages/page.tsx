"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchMessages() {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      console.log("Fetched messages:", data);
      setMessages(data || []);
    }
    setLoading(false);
  }

  async function deleteMessage(id: number) {
    if (!confirm("Are you sure you want to delete this message?")) return;

    const { error: deleteError } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (deleteError) {
      alert("Error deleting message: " + deleteError.message);
    } else {
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined animate-spin text-primary text-5xl">progress_activity</span>
          <p className="text-on-surface-variant font-medium">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-primary font-bold">Contact Messages</h1>
          <p className="text-on-surface-variant mt-2">View and manage messages sent by customers through the website.</p>
        </div>
        <button 
          onClick={fetchMessages}
          className="p-2 text-primary hover:bg-primary/5 rounded-full transition-colors"
          title="Refresh"
        >
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </div>

      {error ? (
        <div className="bg-error-container text-on-error-container p-6 rounded-2xl">
          <h2 className="font-bold flex items-center gap-2 mb-2 text-xl">
            <span className="material-symbols-outlined text-error">warning</span>
            Error fetching messages
          </h2>
          <p className="mb-4">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages && messages.length > 0 ? (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-lg">{msg.name}</h3>
                      <p className="text-primary text-sm font-medium">{msg.email}</p>
                    </div>
                  </div>
                  <p className="text-on-surface-variant whitespace-pre-line leading-relaxed italic">
                    &quot;{msg.message}&quot;
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-on-surface-variant/60">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
                
                <div className="flex md:flex-col justify-end items-center gap-2">
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete Message"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                  <a 
                    href={`mailto:${msg.email}?subject=Re: Coffee Corner Inquiry`}
                    className="p-3 text-primary hover:bg-primary/5 rounded-xl transition-colors"
                    title="Reply via Email"
                  >
                    <span className="material-symbols-outlined">reply</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-surface-container-low p-12 rounded-2xl text-center border-2 border-dashed border-outline-variant/20">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">mail_outline</span>
              <h3 className="text-xl font-bold text-on-surface mb-1">No messages yet</h3>
              <p className="text-on-surface-variant">When customers contact you, their messages will appear here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

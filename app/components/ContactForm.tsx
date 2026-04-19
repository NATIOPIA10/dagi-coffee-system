"use client";

import { useState } from "react";
import { sendContactMessage } from "../actions/contact";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await sendContactMessage(formData);

    if (result.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
      (event.target as HTMLFormElement).reset();
    }
  }

  return (
    <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
      <h3 className="font-headline text-2xl text-primary mb-6">Send us a Message</h3>
      
      {status === "success" ? (
        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-6 rounded-xl text-center animate-fade-in-up">
          <span className="material-symbols-outlined text-4xl mb-2 block">check_circle</span>
          <p className="font-bold mb-1">Message Sent!</p>
          <p className="text-sm">We'll get back to you as soon as possible.</p>
          <button 
            onClick={() => setStatus("idle")}
            className="mt-4 text-sm underline font-medium"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-on-surface-variant mb-1 ml-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-on-surface-variant mb-1 ml-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-on-surface-variant mb-1 ml-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          
          {status === "error" && (
            <p className="text-red-600 text-sm ml-1">{errorMessage}</p>
          )}
          
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
          >
            {status === "sending" ? (
              <>
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <span className="material-symbols-outlined text-[20px]">send</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

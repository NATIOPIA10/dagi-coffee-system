"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-20 h-10 rounded-full bg-surface-container border border-outline-variant/30 flex items-center p-1 transition-colors hover:border-primary/50 group"
      aria-label="Toggle Theme"
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform ${
          theme === "dark" ? "translate-x-10 bg-primary shadow-lg" : "translate-x-0 bg-surface-container-lowest shadow-md"
        }`}
      >
        <span className={`material-symbols-outlined text-[20px] transition-all ${
          theme === "dark" ? "text-on-primary scale-110" : "text-primary"
        }`}>
          {theme === "dark" ? "dark_mode" : "light_mode"}
        </span>
      </div>
      
      {/* Visual indicators (Icons behind the toggle) */}
      <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
        <span className="material-symbols-outlined text-[16px]">light_mode</span>
        <span className="material-symbols-outlined text-[16px]">dark_mode</span>
      </div>
    </button>
  );
}

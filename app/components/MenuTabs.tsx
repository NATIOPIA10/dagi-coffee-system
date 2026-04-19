"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuTabs() {
  const pathname = usePathname();

  const tabs = [
    { name: "Coffee", path: "/menu" },
    { name: "Teas & Drinks", path: "/menu/teas" },
    { name: "Pastries", path: "/menu/pastries" },
    { name: "Specials", path: "/menu/specials" },
  ];

  return (
    <div className="mt-8 -mx-6 px-6 overflow-x-auto no-scrollbar">
      <div className="flex gap-8 border-b border-outline-variant/20 min-w-max">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.name}
              href={tab.path}
              className={`pb-4 transition-all ${
                isActive
                  ? "text-amber-900 font-bold border-b-2 border-primary"
                  : "text-stone-500 font-medium hover:text-primary"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

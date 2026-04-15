"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Clock3, ChartNoAxesCombined } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Home",
      href: "/",
      icon: House,
    },
    {
      name: "Timeline",
      href: "/timeline",
      icon: Clock3,
    },
    {
      name: "Stats",
      href: "/stats",
      icon: ChartNoAxesCombined,
    },
  ];

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="flex w-full items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        <Link
          href="/"
          className="text-[28px] font-extrabold tracking-tight text-slate-900"
        >
          Keen<span className="text-emerald-800">Keeper</span>
        </Link>

        <nav className="flex items-center gap-3 md:gap-4">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-900 text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
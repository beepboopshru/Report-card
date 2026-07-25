// src/components/AppShell.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AppShell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-[240px] flex-shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside className="relative w-[240px] z-50">
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 h-12 border-b border-line bg-surface sticky top-0 z-30">
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-1.5 rounded hover:bg-surface-muted"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-serif text-accent-deep">Classroom</span>
          <span className="w-7" />
        </div>

        <main className="max-w-[1080px] mx-auto px-5 md:px-8 pt-10 md:pt-14 pb-10 md:pb-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

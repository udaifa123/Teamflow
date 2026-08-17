"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    name: "Projects",
    href: "/projects",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
      </svg>
    ),
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    name: "Users",
    href: "/users",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    name: "Project Members",
    href: "/project-members",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    name: "Comments",
    href: "/comments",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={`${display.variable} ${body.variable} ${mono.variable} fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-black/[0.06] bg-white shadow-[2px_0_20px_rgba(19,23,42,0.04)]`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-black/[0.06] px-6">
        <div className="flex items-center gap-3">
          <IsoMark />
          <div>
            <h1
              className="text-[18px] font-semibold tracking-tight text-[#13172A]"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              TeamFlow
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#8B8D7A]">
              Project Management
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-4 py-6">
        <p
          className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8B8D7A]"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          Workspace
        </p>

        {menuItems.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-[#F7EFD8] to-[#EDE0B8] text-[#8A6A17] shadow-[0_2px_8px_rgba(201,162,39,0.15)]"
                  : "text-[#5B6270] hover:bg-[#F7F4EC]/80 hover:text-[#13172A]"
              }`}
            >
              <span
                className={`flex w-5 justify-center transition-colors ${
                  active ? "text-[#C9A227]" : "text-[#8B8D7A] group-hover:text-[#C9A227]"
                }`}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-black/[0.06] p-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#F7F4EC]/60 p-3 transition-all hover:bg-[#F7F4EC]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#E7C766] to-[#B5871F] text-[13px] font-bold text-[#241A05] shadow-[0_2px_8px_rgba(201,162,39,0.3)]">
            U
          </div>

          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-[#13172A]">
              Udaifa
            </p>
            <p className="truncate text-[11px] text-[#8B8D7A]">Admin</p>
          </div>

          <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border border-black/[0.06] text-[10px] text-[#8B8D7A] transition-colors hover:border-[#C9A227] hover:text-[#C9A227] cursor-pointer">
            ⚙
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ─── Components ──────────────────────────────────────── */

function IsoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" className="drop-shadow-[0_3px_6px_rgba(201,162,39,0.35)]">
      <defs>
        <linearGradient id="faceTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2DC96" />
          <stop offset="100%" stopColor="#D8B646" />
        </linearGradient>
        <linearGradient id="faceLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B5871F" />
          <stop offset="100%" stopColor="#8A6A17" />
        </linearGradient>
        <linearGradient id="faceRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B8DEF" />
          <stop offset="100%" stopColor="#3E63C2" />
        </linearGradient>
      </defs>
      <polygon points="16,2 29,9 16,16 3,9" fill="url(#faceTop)" />
      <polygon points="3,9 16,16 16,30 3,23" fill="url(#faceLeft)" />
      <polygon points="29,9 16,16 16,30 29,23" fill="url(#faceRight)" />
    </svg>
  );
}
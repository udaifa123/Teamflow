"use client";

import { useEffect, useState, FormEvent } from "react";
// import Link from "next/link";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { apiFetch } from "@/lib/api";

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

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at?: string;
};

const roles = ["admin", "manager", "member"];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => setIsScrolled(window.scrollY > 20);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // ==========================================
  // LOAD USERS
  // ==========================================

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");

      const data = await apiFetch("/users");
      setUsers(data);
    } catch (error) {
      console.error("Load users error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadUsers();
    };
    fetchData();
  }, []);

  // ==========================================
  // CLEAR FORM
  // ==========================================

  function clearForm() {
    setName("");
    setEmail("");
    setRole("member");
    setEditingId(null);
  }

  // ==========================================
  // CREATE / UPDATE USER
  // ==========================================

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !role) {
      setError("Name, email and role are required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const userData = {
        name: name.trim(),
        email: email.trim(),
        role,
      };

      if (editingId !== null) {
        await apiFetch(`/users/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(userData),
        });
      } else {
        await apiFetch("/users", {
          method: "POST",
          body: JSON.stringify(userData),
        });
      }

      clearForm();
      await loadUsers();
    } catch (error) {
      console.error("Save user error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save user"
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // START EDIT
  // ==========================================

  function handleEdit(user: User) {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ==========================================
  // DELETE USER
  // ==========================================

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      setError("");
      await apiFetch(`/users/${id}`, {
        method: "DELETE",
      });

      if (editingId === id) {
        clearForm();
      }

      await loadUsers();
    } catch (error) {
      console.error("Delete user error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete user"
      );
    }
  }

  // ==========================================
  // ROLE STYLE
  // ==========================================

  function getRoleStyle(role: string) {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-[#F5EDF5] text-[#7A2D7A] border-[#E5D5E5]";
      case "manager":
        return "bg-[#E8EFFE] text-[#3E63C2] border-[#C5D6F8]";
      default:
        return "bg-[#F7EFD8] text-[#8A6A17] border-[#EDE0B8]";
    }
  }

  // function getRoleInitial(role: string) {
  //   return role.charAt(0).toUpperCase();
  // }

  // ==========================================
  // UI
  // ==========================================

  return (
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-[#F7F4EC] text-[#13172A]`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* ── Nav ─────────────────────────────────────────── */}
      {/* <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-black/[0.06] bg-[#F7F4EC]/90 backdrop-blur-xl"
            : "border-b border-white/0 bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2.5">
              <IsoMark />
              <span
                className={`text-[16px] font-semibold tracking-tight transition-colors ${
                  isScrolled ? "text-[#13172A]" : "text-[#13172A]"
                }`}
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                TeamFlow
              </span>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              {["Dashboard", "Projects", "Tasks", "Team"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`text-[13.5px] font-medium transition-colors hover:text-[#C9A227] ${
                    item === "Team"
                      ? "text-[#C9A227]"
                      : "text-[#5B6270]"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full border border-black/10 p-2 text-[#5B6270] transition-colors hover:border-[#C9A227] hover:text-[#C9A227]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5B8DEF] text-[9px] font-bold text-white">
                3
              </span>
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#E7C766] to-[#B5871F] text-[12px] font-bold text-[#241A05] ring-2 ring-[#C9A227]/30">
              JD
            </div>
          </div>
        </div>
      </header> */}

      {/* ── Main Content ────────────────────────────────── */}
      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          {/* HEADER */}
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="h-[6px] w-[6px] rounded-full bg-gradient-to-br from-[#E7C766] to-[#8A6A17]" />
                <span
                  className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-[#8B8D7A]"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  People
                </span>
              </div>
              <h1
                className="mt-3 text-[2.2rem] font-medium leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Users
              </h1>
              <p className="mt-1 text-[15px] text-[#5B6270]">
                Manage TeamFlow users and their roles
              </p>
            </div>

            <span className="text-[14px] text-[#8B8D7A]">
              {users.length} user{users.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600 backdrop-blur-sm">
              <span>⚠️ {error}</span>
              <button
                onClick={() => setError("")}
                className="font-semibold text-red-500 hover:text-red-700 transition-colors"
              >
                ×
              </button>
            </div>
          )}

          {/* ── ADD / EDIT USER ───────────────────────────── */}
          <section className="mb-8 rounded-2xl border border-black/[0.07] bg-white p-8 shadow-[0_2px_10px_rgba(19,23,42,0.05)] transition-all hover:shadow-[0_20px_40px_-12px_rgba(201,162,39,0.15)]">
            <div className="mb-6">
              <h2
                className="text-[18px] font-semibold"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                {editingId !== null ? "Edit User" : "Add New User"}
              </h2>
              <p className="mt-1 text-[13px] text-[#5B6270]">
                {editingId !== null
                  ? "Update user information"
                  : "Create a new TeamFlow user"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-3">
                {/* NAME */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    Name <span className="text-[#C9A227]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    required
                    className="w-full rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    Email <span className="text-[#C9A227]">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                    className="w-full rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                  />
                </div>

                {/* ROLE */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    Role <span className="text-[#C9A227]">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                  >
                    {roles.map((item) => (
                      <option key={item} value={item}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#E7C766] to-[#B5871F] px-8 py-3 text-[14px] font-semibold text-[#241A05] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_10px_24px_-8px_rgba(201,162,39,0.65)] transition-all hover:shadow-[0_14px_30px_-6px_rgba(201,162,39,0.8)] hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId !== null
                      ? "Update User"
                      : "Add User"}
                  {!saving && <span className="transition-transform group-hover:translate-x-1">→</span>}
                </button>

                {editingId !== null && (
                  <button
                    type="button"
                    onClick={clearForm}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-8 py-3 text-[14px] font-medium text-[#5B6270] transition-all hover:border-[#C9A227] hover:text-[#8A6A17] hover:shadow-md"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* ── USERS LIST ─────────────────────────────────── */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2
                className="text-[18px] font-semibold"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                All Users
              </h2>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-black/[0.07] bg-white p-12 text-center shadow-[0_2px_10px_rgba(19,23,42,0.05)]">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#C9A227] border-t-transparent" />
                <p className="mt-4 text-[14px] text-[#8B8D7A]">Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="rounded-2xl border border-black/[0.07] bg-white p-16 text-center shadow-[0_2px_10px_rgba(19,23,42,0.05)]">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8EFFE] text-3xl">
                  👥
                </div>
                <p className="text-[14px] text-[#8B8D7A]">No users found.</p>
                <p className="mt-2 text-[13px] text-[#5B6270]">Add your first user using the form above.</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_2px_10px_rgba(19,23,42,0.05)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-black/[0.06] bg-[#F7F4EC]/50">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-[#8B8D7A]">
                          User
                        </th>
                        <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-[#8B8D7A]">
                          Email
                        </th>
                        <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-[#8B8D7A]">
                          Role
                        </th>
                        <th className="px-6 py-4 text-right text-[10px] font-semibold uppercase tracking-wider text-[#8B8D7A]">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-black/[0.05]">
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className="transition-colors hover:bg-[#F7F4EC]/30"
                        >
                          {/* USER */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white shadow-sm ${
                                  user.role === "admin"
                                    ? "from-[#C5A0C5] to-[#7A2D7A]"
                                    : user.role === "manager"
                                    ? "from-[#7FA8FF] to-[#3E63C2]"
                                    : "from-[#E7C766] to-[#B5871F]"
                                }`}
                              >
                                {user.name.charAt(0).toUpperCase()}
                              </div>

                              <div>
                                <p className="font-medium text-[#13172A]">
                                  {user.name}
                                </p>
                                <p className="text-[11px] text-[#8B8D7A]">
                                  ID: {user.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* EMAIL */}
                          <td className="px-6 py-4 text-[14px] text-[#5B6270]">
                            {user.email}
                          </td>

                          {/* ROLE */}
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wide ${getRoleStyle(
                                user.role
                              )}`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                              {user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)}
                            </span>
                          </td>

                          {/* ACTIONS */}
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEdit(user)}
                                className="rounded-full border border-black/10 px-5 py-2 text-[12px] font-medium text-[#5B6270] transition-all hover:border-[#C9A227] hover:text-[#8A6A17] hover:bg-[#F7EFD8]/30"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="rounded-full border border-red-200 px-5 py-2 text-[12px] font-medium text-red-500 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-black/[0.06] bg-[#F7F4EC]">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <IsoMark />
              <span
                className="text-[14px] font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                TeamFlow
              </span>
            </div>
            <p className="text-[13px] text-[#8B8D7A]">
              © 2026 TeamFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
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
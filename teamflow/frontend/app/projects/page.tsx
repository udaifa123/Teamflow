"use client";

import { useEffect, useState } from "react";
// import Link from "next/link";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { apiFetch } from "@/lib/api";
import { Project } from "@/types";

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

const emptyForm = {
  name: "",
  description: "",
  status: "planning",
  start_date: "",
  end_date: "",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(emptyForm);
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

  async function loadProjects() {
    try {
      const data = await apiFetch("/projects");
      setProjects(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function init() {
      await loadProjects();
    }
    init();
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  }

  function startEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      name: project.name,
      description: project.description || "",
      status: project.status,
      start_date: project.start_date
        ? project.start_date.slice(0, 10)
        : "",
      end_date: project.end_date
        ? project.end_date.slice(0, 10)
        : "",
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      if (editingId) {
        await apiFetch(`/projects/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await apiFetch("/projects", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      resetForm();
      await loadProjects();
    } catch (error) {
      console.error(error);
      setError("Failed to save project");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmed) return;
    try {
      await apiFetch(`/projects/${id}`, {
        method: "DELETE",
      });
      await loadProjects();
    } catch (error) {
      console.error(error);
      setError("Failed to delete project");
    }
  }

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
                    item === "Projects"
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
          {/* Header */}
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="h-[6px] w-[6px] rounded-full bg-gradient-to-br from-[#E7C766] to-[#8A6A17]" />
                <span
                  className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-[#8B8D7A]"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  Workspace
                </span>
              </div>
              <h1
                className="mt-3 text-[2.2rem] font-medium leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Projects
              </h1>
              <p className="mt-1 text-[15px] text-[#5B6270]">
                Create and manage your projects
              </p>
            </div>

            <span className="text-[14px] text-[#8B8D7A]">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600 backdrop-blur-sm">
              ⚠️ {error}
            </div>
          )}

          {/* ── Form ───────────────────────────────────────── */}
          <section className="mb-8 rounded-2xl border border-black/[0.07] bg-white p-8 shadow-[0_2px_10px_rgba(19,23,42,0.05)] transition-all hover:shadow-[0_20px_40px_-12px_rgba(201,162,39,0.15)]">
            <div className="mb-6">
              <h2
                className="text-[18px] font-semibold"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                {editingId ? "Edit Project" : "Create Project"}
              </h2>
              <p className="mt-1 text-[13px] text-[#5B6270]">
                {editingId
                  ? "Update project information"
                  : "Add a new project to your workspace"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    Project Name <span className="text-[#C9A227]">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Website Development"
                    className="w-full rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                  >
                    <option value="planning">Planning</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe your project..."
                    className="w-full resize-none rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    value={form.end_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#E7C766] to-[#B5871F] px-8 py-3 text-[14px] font-semibold text-[#241A05] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_10px_24px_-8px_rgba(201,162,39,0.65)] transition-all hover:shadow-[0_14px_30px_-6px_rgba(201,162,39,0.8)] hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Project"
                    : "Create Project"}
                  {!saving && <span className="transition-transform group-hover:translate-x-1">→</span>}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-8 py-3 text-[14px] font-medium text-[#5B6270] transition-all hover:border-[#C9A227] hover:text-[#8A6A17] hover:shadow-md"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* ── Projects Grid ────────────────────────────── */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2
                className="text-[18px] font-semibold"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                All Projects
              </h2>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-black/[0.07] bg-white p-12 text-center shadow-[0_2px_10px_rgba(19,23,42,0.05)]">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#C9A227] border-t-transparent" />
                <p className="mt-4 text-[14px] text-[#8B8D7A]">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="rounded-2xl border border-black/[0.07] bg-white p-16 text-center shadow-[0_2px_10px_rgba(19,23,42,0.05)]">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F7EFD8] text-3xl">
                  📁
                </div>
                <p className="text-[14px] text-[#8B8D7A]">No projects found.</p>
                <p className="mt-2 text-[13px] text-[#5B6270]">Create your first project using the form above.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="group rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_2px_10px_rgba(19,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(201,162,39,0.25)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3
                          className="text-[17px] font-semibold truncate"
                          style={{ fontFamily: "var(--font-display), serif" }}
                        >
                          {project.name}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#5B6270]">
                          {project.description || "No description"}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wide ${
                          project.status === "in_progress" || project.status === "active"
                            ? "bg-[#E7F5E7] text-[#2D7A2D]"
                            : project.status === "completed"
                            ? "bg-[#E8EFFE] text-[#3E63C2]"
                            : project.status === "cancelled"
                            ? "bg-[#F5EDF5] text-[#7A2D7A]"
                            : "bg-[#F7EFD8] text-[#8A6A17]"
                        }`}
                      >
                        {project.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="mt-5 border-t border-black/[0.05] pt-4">
                      <div className="flex justify-between text-[13px]">
                        <span className="text-[#8B8D7A]">Start</span>
                        <span className="font-medium text-[#13172A]">
                          {project.start_date
                            ? new Date(project.start_date).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>
                      <div className="mt-1.5 flex justify-between text-[13px]">
                        <span className="text-[#8B8D7A]">End</span>
                        <span className="font-medium text-[#13172A]">
                          {project.end_date
                            ? new Date(project.end_date).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex gap-3 border-t border-black/[0.05] pt-4">
                      <button
                        onClick={() => startEdit(project)}
                        className="flex-1 rounded-full border border-black/10 px-4 py-2 text-[13px] font-medium text-[#5B6270] transition-all hover:border-[#C9A227] hover:text-[#8A6A17] hover:bg-[#F7EFD8]/30"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="flex-1 rounded-full border border-red-200 px-4 py-2 text-[13px] font-medium text-red-500 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
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
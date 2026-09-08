"use client";

import { useEffect, useState, useCallback } from "react";
// import Link from "next/link";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { apiFetch } from "@/lib/api";
import { Project, Task } from "@/types";

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
  project_id: "",
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  due_date: "",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  // const [isScrolled, setIsScrolled] = useState(false);

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    project_id: "",
  });

  // useEffect(() => {
  //   const handleScroll = () => setIsScrolled(window.scrollY > 20);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // ✅ load data (stable)
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        status: filters.status,
        priority: filters.priority,
        project_id: filters.project_id,
      }).toString();

      const [taskData, projectData] = await Promise.all([
        apiFetch(`/tasks?${query}`),
        apiFetch("/projects"),
      ]);

      setTasks(taskData || []);
      setProjects(projectData || []);
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to load tasks";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.priority, filters.project_id]);

  // ✅ FIXED useEffect (no warning, no loop)
  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, [loadData]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(task: Task) {
    setEditingId(task.id);

    setForm({
      project_id: String(task.project_id),
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      due_date: task.due_date?.slice(0, 10) || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        project_id: Number(form.project_id),
        title: form.title,
        description: form.description,
        status: form.status,
        priority: form.priority,
        due_date: form.due_date || null,
      };

      if (editingId) {
        await apiFetch(`/tasks/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch("/tasks", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      resetForm();
      await loadData();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save task";
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteTask(id: number) {
    if (!confirm("Delete this task?")) return;

    try {
      await apiFetch(`/tasks/${id}`, {
        method: "DELETE",
      });

      await loadData();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete task";
      setError(message);
    }
  }

  // Priority badge styles
  const priorityStyles = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-[#F7EFD8] text-[#8A6A17] border-[#EDE0B8]",
    low: "bg-blue-50 text-blue-600 border-blue-200",
  };

  // Status badge styles
  const statusStyles = {
    todo: "bg-[#F7EFD8] text-[#8A6A17] border-[#EDE0B8]",
    in_progress: "bg-[#E8EFFE] text-[#3E63C2] border-[#C5D6F8]",
    completed: "bg-[#E7F5E7] text-[#2D7A2D] border-[#C5E0C5]",
    cancelled: "bg-[#F5EDF5] text-[#7A2D7A] border-[#E5D5E5]",
  };

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
                    item === "Tasks"
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
                Tasks
              </h1>
              <p className="mt-1 text-[15px] text-[#5B6270]">
                Create and manage your tasks across projects
              </p>
            </div>

            <span className="text-[14px] text-[#8B8D7A]">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""}
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
                {editingId ? "Edit Task" : "Create Task"}
              </h2>
              <p className="mt-1 text-[13px] text-[#5B6270]">
                {editingId
                  ? "Update task information"
                  : "Add a new task to your workspace"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Project */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    Project <span className="text-[#C9A227]">*</span>
                  </label>
                  <select
                    name="project_id"
                    value={form.project_id}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                  >
                    <option value="">Select Project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    Task Title <span className="text-[#C9A227]">*</span>
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Design homepage"
                    className="w-full rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                  />
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
                    placeholder="Describe the task..."
                    className="w-full resize-none rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
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
                    <option value="todo">Todo</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Due Date */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="due_date"
                    value={form.due_date}
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
                    ? "Update Task"
                    : "Create Task"}
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

          {/* ── Filters ────────────────────────────────────── */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2">
              <span
                className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#8B8D7A]"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                Filter
              </span>
              <span className="h-5 w-px bg-black/[0.06]" />
            </div>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-2.5 text-[13px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
            >
              <option value="">All Status</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
              className="rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-2.5 text-[13px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            {(filters.status || filters.priority) && (
              <button
                onClick={() => setFilters({ status: "", priority: "", project_id: "" })}
                className="text-[13px] text-[#C9A227] hover:text-[#8A6A17] transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* ── Task List ──────────────────────────────────── */}
          {loading ? (
            <div className="rounded-2xl border border-black/[0.07] bg-white p-12 text-center shadow-[0_2px_10px_rgba(19,23,42,0.05)]">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#C9A227] border-t-transparent" />
              <p className="mt-4 text-[14px] text-[#8B8D7A]">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-2xl border border-black/[0.07] bg-white p-16 text-center shadow-[0_2px_10px_rgba(19,23,42,0.05)]">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8EFFE] text-3xl">
                📋
              </div>
              <p className="text-[14px] text-[#8B8D7A]">No tasks found.</p>
              <p className="mt-2 text-[13px] text-[#5B6270]">
                {filters.status || filters.priority
                  ? "Try adjusting your filters."
                  : "Create your first task using the form above."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {tasks.map((task) => {
                const project = projects.find((p) => p.id === task.project_id);
                const priorityKey = task.priority as keyof typeof priorityStyles;
                const statusKey = task.status as keyof typeof statusStyles;

                return (
                  <div
                    key={task.id}
                    className="group rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_2px_10px_rgba(19,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(201,162,39,0.25)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3
                          className="text-[16px] font-semibold truncate"
                          style={{ fontFamily: "var(--font-display), serif" }}
                        >
                          {task.title}
                        </h3>
                        {project && (
                          <p className="mt-1 text-[12px] text-[#8B8D7A]">
                            {project.name}
                          </p>
                        )}
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                          priorityStyles[priorityKey] || priorityStyles.medium
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    {task.description && (
                      <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-[#5B6270]">
                        {task.description}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.05] pt-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wide ${
                          statusStyles[statusKey] || statusStyles.todo
                        }`}
                      >
                        {task.status.replace("_", " ")}
                      </span>

                      {task.due_date && (
                        <span className="text-[12px] text-[#8B8D7A]">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-3 border-t border-black/[0.05] pt-4">
                      <button
                        onClick={() => startEdit(task)}
                        className="flex-1 rounded-full border border-black/10 px-4 py-2 text-[13px] font-medium text-[#5B6270] transition-all hover:border-[#C9A227] hover:text-[#8A6A17] hover:bg-[#F7EFD8]/30"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="flex-1 rounded-full border border-red-200 px-4 py-2 text-[13px] font-medium text-red-500 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
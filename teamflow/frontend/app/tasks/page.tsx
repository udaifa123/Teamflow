"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Project, Task } from "@/types";

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

  // ✅ FILTER STATE
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    project_id: "",
  });

async function loadData() {
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

    setTasks(taskData);
    setProjects(projectData);
  } catch (error) {
    console.error(error);
    setError("Failed to load tasks");
  } finally {
    setLoading(false);
  }
}

 useEffect(() => {
  loadData();
}, [filters.status, filters.priority, filters.project_id]);

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

  function startEdit(task: Task) {
    setEditingId(task.id);

    setForm({
      project_id: String(task.project_id),
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      due_date: task.due_date ? task.due_date.slice(0, 10) : "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.project_id) {
      setError("Please select a project");
      return;
    }

    try {
      setSaving(true);
      setError("");

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
    } catch (error) {
      console.error(error);
      setError("Failed to save task");
    } finally {
      setSaving(false);
    }
  }

  async function deleteTask(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await apiFetch(`/tasks/${id}`, {
        method: "DELETE",
      });

      await loadData();
    } catch (error) {
      console.error(error);
      setError("Failed to delete task");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Tasks
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Create, update and manage project tasks
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      <section className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <select
              name="project_id"
              value={form.project_id}
              onChange={handleChange}
              className="border p-2"
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="border p-2"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border p-2 md:col-span-2"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border p-2"
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="border p-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
              className="border p-2"
            />
          </div>

         <button
  disabled={saving}
  className="mt-4 bg-black text-white px-4 py-2 disabled:opacity-50"
>
  {saving ? "Saving..." : editingId ? "Update" : "Create"}
</button>
        </form>
      </section>

      {/* FILTERS */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <select
          className="border p-2"
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          className="border p-2"
          value={filters.priority}
          onChange={(e) =>
            setFilters({ ...filters, priority: e.target.value })
          }
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          className="border p-2"
          value={filters.project_id}
          onChange={(e) =>
            setFilters({ ...filters, project_id: e.target.value })
          }
        >
          <option value="">All Projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* TASKS */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="border p-3 bg-white">
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <button onClick={() => startEdit(task)}>
                Edit
              </button>

              <button onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
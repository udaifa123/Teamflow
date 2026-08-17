"use client";

import { useEffect, useState, useCallback } from "react";
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

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    project_id: "",
  });

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

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Tasks</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
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
          className="border p-2"
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

        <button
          disabled={saving}
          className="bg-black text-white px-4 py-2"
        >
          {saving ? "Saving..." : editingId ? "Update" : "Create"}
        </button>
      </form>

      {/* FILTER */}
      <div className="flex gap-2 mb-4">
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
          className="border p-2"
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        tasks.map((t) => (
          <div key={t.id} className="border p-3 mb-2">
            <h3 className="font-bold">{t.title}</h3>
            <p>{t.description}</p>

            <button onClick={() => startEdit(t)} className="mr-2">
              Edit
            </button>

            <button onClick={() => deleteTask(t.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </main>
  );
}
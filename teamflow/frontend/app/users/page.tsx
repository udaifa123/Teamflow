"use client";

import { useEffect, useState, FormEvent } from "react";
import { apiFetch } from "@/lib/api";

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
        // UPDATE
        await apiFetch(`/users/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(userData),
        });
      } else {
        // CREATE
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

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await apiFetch(`/users/${id}`, {
        method: "DELETE",
      });

      // If deleted user was being edited
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
        return "bg-purple-100 text-purple-700";

      case "manager":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Users
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage TeamFlow users and their roles
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <span>{error}</span>

          <button
            onClick={() => setError("")}
            className="font-semibold text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* ADD / EDIT USER */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            {editingId !== null
              ? "Edit User"
              : "Add New User"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {editingId !== null
              ? "Update user information"
              : "Create a new TeamFlow user"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-3">
            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter name"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter email"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900"
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Role
              </label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-900"
              >
                {roles.map((item) => (
                  <option key={item} value={item}>
                    {item.charAt(0).toUpperCase() +
                      item.slice(1)}
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
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId !== null
                  ? "Update User"
                  : "Add User"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={clearForm}
                className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* USERS LIST */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              All Users
            </h2>

            <p className="text-sm text-slate-500">
              {users.length} user
              {users.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm text-slate-500">
              Loading users...
            </p>
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm text-slate-500">
              No users found.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      User
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Role
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50"
                    >
                      {/* USER */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                            {user.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-medium text-slate-900">
                              {user.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* EMAIL */}
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.email}
                      </td>

                      {/* ROLE */}
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getRoleStyle(
                            user.role
                          )}`}
                        >
                          {user.role
                            .charAt(0)
                            .toUpperCase() +
                            user.role.slice(1)}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              handleEdit(user)
                            }
                            className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(user.id)
                            }
                            className="rounded-lg bg-red-50 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
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
    </main>
  );
}
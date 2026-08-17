"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type ProjectMember = {
  user_id: number;
  user_name: string;
  user_email: string;
  project_id: number;
  project_name: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type Project = {
  id: number;
  name: string;
};

export default function ProjectMembersPage() {
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [userId, setUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [memberData, userData, projectData] =
        await Promise.all([
          apiFetch("/project-members"),
          apiFetch("/users"),
          apiFetch("/projects"),
        ]);

      setMembers(memberData);
      setUsers(userData);
      setProjects(projectData);
    } catch (error) {
      console.error("Project members error:", error);
      setError("Failed to load project members");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleAddMember(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!userId || !projectId) {
      setError("Please select both user and project");
      return;
    }

    try {
      setAdding(true);
      setError("");

      await apiFetch("/project-members", {
        method: "POST",
        body: JSON.stringify({
          user_id: Number(userId),
          project_id: Number(projectId),
        }),
      });

      setUserId("");
      setProjectId("");

      await loadData();
    } catch (error) {
      console.error("Add member error:", error);
      setError("Failed to add project member");
    } finally {
      setAdding(false);
    }
  }

  async function removeMember(
    memberUserId: number,
    memberProjectId: number
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this member?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await apiFetch(
        `/project-members/${memberUserId}/${memberProjectId}`,
        {
          method: "DELETE",
        }
      );

      await loadData();
    } catch (error) {
      console.error("Remove member error:", error);
      setError("Failed to remove project member");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Project Members
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage users assigned to projects
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Add Member */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="font-semibold text-slate-900">
            Add Project Member
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Assign a user to a project
          </p>
        </div>

        <form onSubmit={handleAddMember}>
          <div className="grid gap-5 md:grid-cols-2">
            {/* User */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                User
              </label>

              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-900"
              >
                <option value="">Select User</option>

                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} — {user.email}
                  </option>
                ))}
              </select>
            </div>

            {/* Project */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Project
              </label>

              <select
                value={projectId}
                onChange={(e) =>
                  setProjectId(e.target.value)
                }
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-900"
              >
                <option value="">Select Project</option>

                {projects.map((project) => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={adding}
            className="mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {adding ? "Adding..." : "Add Member"}
          </button>
        </form>
      </section>

      {/* Members */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">
            Current Members
          </h2>

          <span className="text-sm text-slate-500">
            {members.length} assignment
            {members.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">
              Loading members...
            </p>
          </div>
        ) : members.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm text-slate-500">
              No project members found.
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
                      Project
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {members.map((member) => (
                    <tr
                      key={`${member.user_id}-${member.project_id}`}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                            {member.user_name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <span className="font-medium text-slate-900">
                            {member.user_name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {member.user_email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                          {member.project_name}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() =>
                            removeMember(
                              member.user_id,
                              member.project_id
                            )
                          }
                          className="rounded-lg bg-red-50 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
                        >
                          Remove
                        </button>
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
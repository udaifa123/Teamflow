"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Project, Task, User } from "@/types";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [projectData, taskData, userData] =
          await Promise.all([
            apiFetch("/projects"),
            apiFetch("/tasks"),
            apiFetch("/users"),
          ]);

        setProjects(projectData);
        setTasks(taskData);
        setUsers(userData);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    }

    loadDashboard();
  }, []);

const completedTasks = tasks.filter(
  (task) => task.status?.toLowerCase() === "completed"
).length;

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back! Here&apos;s what&apos;s happening with your
          workspace.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={projects.length}
          icon="▣"
        />

        <StatCard
          title="Total Tasks"
          value={tasks.length}
          icon="✓"
        />

        <StatCard
          title="Completed Tasks"
          value={completedTasks}
          icon="✓"
        />

        <StatCard
          title="Team Members"
          value={users.length}
          icon="◉"
        />
      </div>

      {/* Projects */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="font-semibold text-slate-900">
              Recent Projects
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your current projects
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {projects.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-slate-500">
              No projects found.
            </p>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <h3 className="font-medium text-slate-900">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {project.description || "No description"}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                  {project.status.replace("_", " ")}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          {icon}
        </div>
      </div>

      <p className="mt-5 text-sm text-slate-500">{title}</p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}
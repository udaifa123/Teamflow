"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { apiFetch } from "@/lib/api";
import { Project, Task, User } from "@/types";

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

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    router.replace("/login");
  };

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [projectData, taskData, userData] = await Promise.all([
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

  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-[#F7F4EC] text-[#13172A]`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* ── Main Content ─────────────────────── */}
      <div className="pt-12 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
          
          {/* Logout Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>

          {/* Header */}
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="h-[6px] w-[6px] rounded-full bg-gradient-to-br from-[#E7C766] to-[#8A6A17]" />
                <span
                  className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-[#8B8D7A]"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  Overview
                </span>
              </div>
              <h1
                className="mt-3 text-[2.2rem] font-medium leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Dashboard
              </h1>
              <p className="mt-1 text-[15px] text-[#5B6270]">
                Welcome back! Here&apos;s what&apos;s happening with your workspace.
              </p>
            </div>
          </div>

          {/* ── Stats ───────────── */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Projects"
              value={projects.length}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11.5 12 4l9 7.5" />
                  <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
                </svg>
              }
              gradient="from-[#F7EFD8] to-[#EDE0B8]"
              iconColor="#8A6A17"
            />
            <StatCard
              title="Total Tasks"
              value={tasks.length}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              }
              gradient="from-[#E8EFFE] to-[#C5D6F8]"
              iconColor="#3E63C2"
            />
            <StatCard
              title="Completed Tasks"
              value={completedTasks}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              }
              gradient="from-[#E7F5E7] to-[#C5E0C5]"
              iconColor="#2D7A2D"
            />
            <StatCard
              title="Team Members"
              value={users.length}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              gradient="from-[#F5EDF5] to-[#E5D5E5]"
              iconColor="#7A2D7A"
            />
          </div>

          {/* ── Completion Ring ──────── */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_2fr]">
            <div className="rounded-2xl border border-black/[0.07] bg-white p-8 shadow-[0_2px_10px_rgba(19,23,42,0.05)]">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="url(#completionGrad)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 50 * (completionRate / 100)} ${2 * Math.PI * 50}`}
                      transform="rotate(-90 60 60)"
                    />
                    <defs>
                      <linearGradient id="completionGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#E7C766" />
                        <stop offset="100%" stopColor="#8A6A17" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <p
                        className="text-[28px] font-medium leading-none"
                        style={{ fontFamily: "var(--font-display), serif" }}
                      >
                        {completionRate}%
                      </p>
                      <p className="mt-1 text-[11px] text-[#8B8D7A]">Completion</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[14px] text-[#5B6270]">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
                <div className="mt-4 flex w-full gap-2">
                  <div className="flex-1 rounded-lg bg-[#F7EFD8] px-3 py-2 text-center">
                    <p className="text-[12px] font-medium text-[#8A6A17]">In Progress</p>
                    <p className="text-[16px] font-bold text-[#13172A]">
                      {tasks.filter((t) => t.status?.toLowerCase() === "in_progress" || t.status?.toLowerCase() === "in progress").length}
                    </p>
                  </div>
                  <div className="flex-1 rounded-lg bg-[#E8EFFE] px-3 py-2 text-center">
                    <p className="text-[12px] font-medium text-[#3E63C2]">Pending</p>
                    <p className="text-[16px] font-bold text-[#13172A]">
                      {tasks.filter((t) => t.status?.toLowerCase() === "pending" || t.status?.toLowerCase() === "todo").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Recent Activity ── */}
            <div className="rounded-2xl border border-black/[0.07] bg-white p-8 shadow-[0_2px_10px_rgba(19,23,42,0.05)]">
              <div className="flex items-center justify-between">
                <h3
                  className="text-[16px] font-semibold"
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  Recent Activity
                </h3>
                <span
                  className="text-[11px] font-medium text-[#8B8D7A]"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  Last 7 days
                </span>
              </div>
            </div>
          </div>

          {/* ── Projects ────── */}
          <section className="mt-8 rounded-2xl border border-black/[0.07] bg-white shadow-[0_2px_10px_rgba(19,23,42,0.05)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5">
              <div>
                <h2
                  className="text-[18px] font-semibold"
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  Recent Projects
                </h2>
                <p className="mt-1 text-[13px] text-[#5B6270]">
                  Your current projects
                </p>
              </div>
              <Link
                href="/projects"
                className="text-[13px] font-medium text-[#C9A227] transition-colors hover:text-[#8A6A17]"
              >
                View all →
              </Link>
            </div>

            <div className="divide-y divide-black/[0.05]">
              {projects.length === 0 ? (
                <p className="px-6 py-12 text-center text-[14px] text-[#8B8D7A]">
                  No projects found.{" "}
                  <Link href="/projects" className="text-[#C9A227] hover:underline">
                    Create your first project
                  </Link>
                </p>
              ) : (
                projects.map((project) => {
                  const projectTasks = tasks.filter(
                    (t) => t.project_id === project.id
                  );
                  const done = projectTasks.filter((t) => t.status?.toLowerCase() === "completed").length;
                  const pct = projectTasks.length > 0 ? Math.round((done / projectTasks.length) * 100) : 0;

                  return (
                    <div
                      key={project.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5"
                    >
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-[#13172A]">{project.name}</h3>
                        <p className="mt-1 truncate text-[13px] text-[#5B6270]">
                          {project.description || "No description"}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                              project.status === "active"
                                ? "bg-[#E7F5E7] text-[#2D7A2D]"
                                : project.status === "completed"
                                ? "bg-[#E8EFFE] text-[#3E63C2]"
                                : "bg-[#F5EDF5] text-[#7A2D7A]"
                            }`}
                          >
                            {project.status?.replace("_", " ") || "Active"}
                          </span>
                          <span className="text-[11px] text-[#8B8D7A]">
                            {projectTasks.length} tasks · {pct}% done
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="hidden w-24 sm:block">
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#E7C766] to-[#8A6A17] transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#E7C766] to-[#B5871F] text-[9px] font-bold text-[#241A05]"
                            >
                              {String.fromCharCode(64 + i)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ── Footer ─────────── */}
      <footer className="border-t border-black/[0.06] bg-[#F7F4EC]">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

/* ─── Components ─────────── */

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

function StatCard({
  title,
  value,
  icon,
  gradient,
  iconColor,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  iconColor: string;
}) {
  return (
    <div className="group rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_2px_10px_rgba(19,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(201,162,39,0.2)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} transition-transform group-hover:scale-110`}
          style={{ color: iconColor }}
        >
          {icon}
        </div>
      </div>
      <p className="mt-4 text-[13px] font-medium text-[#5B6270]">{title}</p>
      <p
        className="mt-1 text-[2rem] font-medium tracking-tight"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        {value}
      </p>
      <div className="mt-3 h-[2px] w-12 rounded-full bg-gradient-to-r from-[#C9A227] to-[#8A6A17] opacity-40 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
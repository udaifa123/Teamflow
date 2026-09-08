"use client";

import { useEffect, useState } from "react";
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
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => setIsScrolled(window.scrollY > 20);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [memberData, userData, projectData] = await Promise.all([
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
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const [memberData, userData, projectData] = await Promise.all([
          apiFetch("/project-members"),
          apiFetch("/users"),
          apiFetch("/projects"),
        ]);

        if (!isMounted) return;

        setMembers(memberData);
        setUsers(userData);
        setProjects(projectData);
      } catch (error) {
        console.error("Project members error:", error);
        if (isMounted) setError("Failed to load project members");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleAddMember(e: React.FormEvent<HTMLFormElement>) {
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

  async function removeMember(memberUserId: number, memberProjectId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this member?"
    );
    if (!confirmed) return;

    try {
      setError("");

      await apiFetch(`/project-members/${memberUserId}/${memberProjectId}`, {
        method: "DELETE",
      });

      await loadData();
    } catch (error) {
      console.error("Remove member error:", error);
      setError("Failed to remove project member");
    }
  }

  // Get user initials
  function getInitials(name: string) {
    return name.charAt(0).toUpperCase();
  }

  // Get avatar color based on name
  function getAvatarColor(name: string) {
    const colors = [
      "from-[#E7C766] to-[#B5871F]",
      "from-[#7FA8FF] to-[#3E63C2]",
      "from-[#EDE3CC] to-[#B7AC8C]",
      "from-[#B5871F] to-[#5B4110]",
      "from-[#3E63C2] to-[#1E2E5C]",
      "from-[#C5A0C5] to-[#7A2D7A]",
    ];
    const index = name.length % colors.length;
    return colors[index];
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
          {/* Header */}
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
                Project Members
              </h1>
              <p className="mt-1 text-[15px] text-[#5B6270]">
                Manage users assigned to projects
              </p>
            </div>

            <span className="text-[14px] text-[#8B8D7A]">
              {members.length} assignment{members.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Error */}
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

          {/* ── Add Member ────────────────────────────────── */}
          <section className="mb-8 rounded-2xl border border-black/[0.07] bg-white p-8 shadow-[0_2px_10px_rgba(19,23,42,0.05)] transition-all hover:shadow-[0_20px_40px_-12px_rgba(201,162,39,0.15)]">
            <div className="mb-6">
              <h2
                className="text-[18px] font-semibold"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Add Project Member
              </h2>
              <p className="mt-1 text-[13px] text-[#5B6270]">
                Assign a user to a project
              </p>
            </div>

            <form onSubmit={handleAddMember}>
              <div className="grid gap-6 md:grid-cols-2">
                {/* User */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    User <span className="text-[#C9A227]">*</span>
                  </label>
                  <select
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    className="w-full rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
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
                  <label className="mb-2 block text-[13px] font-medium text-[#13172A]">
                    Project <span className="text-[#C9A227]">*</span>
                  </label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    required
                    className="w-full rounded-xl border border-black/[0.08] bg-[#F7F4EC]/50 px-4 py-3 text-[14px] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={adding}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#E7C766] to-[#B5871F] px-8 py-3 text-[14px] font-semibold text-[#241A05] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_10px_24px_-8px_rgba(201,162,39,0.65)] transition-all hover:shadow-[0_14px_30px_-6px_rgba(201,162,39,0.8)] hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {adding ? "Adding..." : "Add Member"}
                {!adding && <span className="transition-transform group-hover:translate-x-1">→</span>}
              </button>
            </form>
          </section>

          {/* ── Members ──────────────────────────────────── */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2
                className="text-[18px] font-semibold"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Current Members
              </h2>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-black/[0.07] bg-white p-12 text-center shadow-[0_2px_10px_rgba(19,23,42,0.05)]">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#C9A227] border-t-transparent" />
                <p className="mt-4 text-[14px] text-[#8B8D7A]">Loading members...</p>
              </div>
            ) : members.length === 0 ? (
              <div className="rounded-2xl border border-black/[0.07] bg-white p-16 text-center shadow-[0_2px_10px_rgba(19,23,42,0.05)]">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8EFFE] text-3xl">
                  👥
                </div>
                <p className="text-[14px] text-[#8B8D7A]">No project members found.</p>
                <p className="mt-2 text-[13px] text-[#5B6270]">Assign users to projects using the form above.</p>
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
                          Project
                        </th>
                        <th className="px-6 py-4 text-right text-[10px] font-semibold uppercase tracking-wider text-[#8B8D7A]">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-black/[0.05]">
                      {members.map((member) => (
                        <tr
                          key={`${member.user_id}-${member.project_id}`}
                          className="transition-colors hover:bg-[#F7F4EC]/30"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarColor(
                                  member.user_name
                                )} text-sm font-semibold text-white shadow-sm`}
                              >
                                {getInitials(member.user_name)}
                              </div>
                              <span className="font-medium text-[#13172A]">
                                {member.user_name}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-[14px] text-[#5B6270]">
                            {member.user_email}
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EDE0B8] bg-[#F7EFD8] px-3 py-1 text-[11px] font-medium text-[#8A6A17]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#8A6A17] opacity-50" />
                              {member.project_name}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() =>
                                removeMember(member.user_id, member.project_id)
                              }
                              className="rounded-full border border-red-200 px-5 py-2 text-[12px] font-medium text-red-500 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600"
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
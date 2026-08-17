"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Comment = {
  id: number;
  task_id: number;
  user_id: number;
  comment: string;
  created_at: string;
};

type Task = {
  id: number;
  title: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [taskId, setTaskId] = useState("");
  const [userId, setUserId] = useState("");
  const [commentText, setCommentText] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD COMMENTS, TASKS AND USERS
  // ==========================================

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [commentsData, tasksData, usersData] =
        await Promise.all([
          apiFetch("/comments"),
          apiFetch("/tasks"),
          apiFetch("/users"),
        ]);

      setComments(commentsData);
      setTasks(tasksData);
      setUsers(usersData);
    } catch (error) {
      console.error("Comments load error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load comments"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // ==========================================
  // CREATE COMMENT
  // ==========================================

  async function handleCreateComment(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!taskId || !userId || !commentText.trim()) {
      setError("Please select task, user and enter a comment");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch("/comments", {
        method: "POST",
        body: JSON.stringify({
          task_id: Number(taskId),
          user_id: Number(userId),
          comment: commentText.trim(),
        }),
      });

      setTaskId("");
      setUserId("");
      setCommentText("");

      await loadData();
    } catch (error) {
      console.error("Create comment error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create comment"
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // START EDIT
  // ==========================================

  function startEdit(comment: Comment) {
    setEditingId(comment.id);
    setEditingText(comment.comment);
    setError("");
  }

  // ==========================================
  // CANCEL EDIT
  // ==========================================

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  // ==========================================
  // UPDATE COMMENT
  // ==========================================

  async function handleUpdateComment(
    id: number
  ) {
    if (!editingText.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(`/comments/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          comment: editingText.trim(),
        }),
      });

      setEditingId(null);
      setEditingText("");

      await loadData();
    } catch (error) {
      console.error("Update comment error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update comment"
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // DELETE COMMENT
  // ==========================================

  async function handleDeleteComment(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await apiFetch(`/comments/${id}`, {
        method: "DELETE",
      });

      await loadData();
    } catch (error) {
      console.error("Delete comment error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete comment"
      );
    }
  }

  // ==========================================
  // HELPERS
  // ==========================================

  function getTaskTitle(taskId: number) {
    const task = tasks.find((item) => item.id === taskId);

    return task ? task.title : `Task #${taskId}`;
  }

  function getUserName(userId: number) {
    const user = users.find((item) => item.id === userId);

    return user ? user.name : `User #${userId}`;
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString();
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Comments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage comments for your project tasks
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* CREATE COMMENT */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Add Comment
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add a comment to a task
          </p>
        </div>

        <form onSubmit={handleCreateComment}>
          <div className="grid gap-5 md:grid-cols-2">
            {/* TASK */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Task
              </label>

              <select
                value={taskId}
                onChange={(e) => setTaskId(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-900"
              >
                <option value="">Select Task</option>

                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </select>
            </div>

            {/* USER */}
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
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* COMMENT */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Comment
            </label>

            <textarea
              value={commentText}
              onChange={(e) =>
                setCommentText(e.target.value)
              }
              placeholder="Write your comment..."
              rows={4}
              required
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Adding..." : "Add Comment"}
          </button>
        </form>
      </section>

      {/* COMMENTS LIST */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            All Comments
          </h2>

          <span className="text-sm text-slate-500">
            {comments.length} comment
            {comments.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">
              Loading comments...
            </p>
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm text-slate-500">
              No comments found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                {/* COMMENT HEADER */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* AVATAR */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {getUserName(item.user_id)
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {getUserName(item.user_id)}
                      </p>

                      <p className="text-xs text-slate-500">
                        {formatDate(item.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* TASK */}
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {getTaskTitle(item.task_id)}
                  </span>
                </div>

                {/* EDIT MODE */}
                {editingId === item.id ? (
                  <div>
                    <textarea
                      value={editingText}
                      onChange={(e) =>
                        setEditingText(e.target.value)
                      }
                      rows={3}
                      className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                    />

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() =>
                          handleUpdateComment(item.id)
                        }
                        disabled={saving}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* COMMENT TEXT */}
                    <p className="mb-5 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                      {item.comment}
                    </p>

                    {/* ACTIONS */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteComment(item.id)
                        }
                        className="rounded-lg bg-red-50 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
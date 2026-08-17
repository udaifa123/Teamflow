import { Request, Response } from "express";
import pool from "../config/db";

/* =========================
   GET TASKS (WITH FILTERS)
========================= */
export const getTasks = async (req: Request, res: Response) => {
  try {
    const { status, priority, project_id } = req.query;

    let query = `
      SELECT
        t.id,
        t.project_id,
        p.name AS project_name,
        t.title,
        t.description,
        t.status,
        t.priority,
        t.due_date,
        t.created_at
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (status) {
      params.push(status);
      query += ` AND t.status = $${params.length}`;
    }

    if (priority) {
      params.push(priority);
      query += ` AND t.priority = $${params.length}`;
    }

    if (project_id) {
      params.push(project_id);
      query += ` AND t.project_id = $${params.length}`;
    }

    query += ` ORDER BY t.id ASC`;

    const result = await pool.query(query, params);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

/* =========================
   GET TASK BY ID
========================= */
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        t.id,
        t.project_id,
        p.name AS project_name,
        t.title,
        t.description,
        t.status,
        t.priority,
        t.due_date,
        t.created_at
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE t.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

/* =========================
   CREATE TASK
========================= */
export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      project_id,
      title,
      description,
      status,
      priority,
      due_date,
    } = req.body;

    if (!project_id || !title) {
      return res.status(400).json({
        message: "project_id and title are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO tasks
        (project_id, title, description, status, priority, due_date)
      VALUES
        ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        project_id,
        title,
        description || null,
        status || "todo",
        priority || "medium",
        due_date || null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

/* =========================
   UPDATE TASK
========================= */
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      project_id,
      title,
      description,
      status,
      priority,
      due_date,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE tasks
      SET
        project_id = $1,
        title = $2,
        description = $3,
        status = $4,
        priority = $5,
        due_date = $6
      WHERE id = $7
      RETURNING *
      `,
      [
        project_id,
        title,
        description || null,
        status,
        priority,
        due_date || null,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

/* =========================
   DELETE TASK
========================= */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
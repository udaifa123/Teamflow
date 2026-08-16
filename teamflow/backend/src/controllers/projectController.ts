import { Request, Response } from "express";
import pool from "../config/db";

// GET all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects ORDER BY id ASC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};

// GET single project
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM projects WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch project",
    });
  }
};

// CREATE project
export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      status,
      start_date,
      end_date,
    } = req.body;

    if (!name || !status) {
      return res.status(400).json({
        message: "Name and status are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO projects
        (name, description, status, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        name,
        description || null,
        status,
        start_date || null,
        end_date || null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create project",
    });
  }
};

// UPDATE project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      status,
      start_date,
      end_date,
    } = req.body;

    const result = await pool.query(
      `UPDATE projects
       SET name = $1,
           description = $2,
           status = $3,
           start_date = $4,
           end_date = $5
       WHERE id = $6
       RETURNING *`,
      [
        name,
        description || null,
        status,
        start_date || null,
        end_date || null,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update project",
    });
  }
};

// DELETE project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      project: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};
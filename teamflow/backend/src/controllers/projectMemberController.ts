import { Request, Response } from "express";
import pool from "../config/db";

// ==========================================
// GET ALL PROJECT MEMBERS
// ==========================================
export const getProjectMembers = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await pool.query(`
      SELECT
        pm.user_id,
        u.name AS user_name,
        u.email AS user_email,
        pm.project_id,
        p.name AS project_name
      FROM project_members pm
      JOIN users u
        ON pm.user_id = u.id
      JOIN projects p
        ON pm.project_id = p.id
      ORDER BY pm.user_id, pm.project_id
    `);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Get project members error:", error);

    return res.status(500).json({
      message: "Failed to fetch project members",
    });
  }
};

// ==========================================
// ADD USER TO PROJECT
// ==========================================
export const addProjectMember = async (
  req: Request,
  res: Response
) => {
  try {
    const { user_id, project_id } = req.body;

    // Validate input
    if (!user_id || !project_id) {
      return res.status(400).json({
        message: "user_id and project_id are required",
      });
    }

    // Check user exists
    const userResult = await pool.query(
      `
      SELECT id, name, email
      FROM users
      WHERE id = $1
      `,
      [user_id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check project exists
    const projectResult = await pool.query(
      `
      SELECT id, name
      FROM projects
      WHERE id = $1
      `,
      [project_id]
    );

    if (projectResult.rows.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Check duplicate membership
    const existingMember = await pool.query(
      `
      SELECT user_id, project_id
      FROM project_members
      WHERE user_id = $1
      AND project_id = $2
      `,
      [user_id, project_id]
    );

    if (existingMember.rows.length > 0) {
      return res.status(409).json({
        message: "User is already a member of this project",
      });
    }

    // Insert project member
    const result = await pool.query(
      `
      INSERT INTO project_members (
        user_id,
        project_id
      )
      VALUES ($1, $2)
      RETURNING user_id, project_id
      `,
      [user_id, project_id]
    );

    return res.status(201).json({
      message: "Project member added successfully",
      member: result.rows[0],
    });
  } catch (error) {
    console.error("Add project member error:", error);

    return res.status(500).json({
      message: "Failed to add project member",
    });
  }
};

// ==========================================
// REMOVE USER FROM PROJECT
// ==========================================
export const removeProjectMember = async (
  req: Request,
  res: Response
) => {
  try {
    const { user_id, project_id } = req.params;

    // Validate params
    if (!user_id || !project_id) {
      return res.status(400).json({
        message: "user_id and project_id are required",
      });
    }

    // Delete membership
    const result = await pool.query(
      `
      DELETE FROM project_members
      WHERE user_id = $1
      AND project_id = $2
      RETURNING user_id, project_id
      `,
      [user_id, project_id]
    );

    // Member not found
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Project member not found",
      });
    }

    return res.status(200).json({
      message: "Project member removed successfully",
      member: result.rows[0],
    });
  } catch (error) {
    console.error("Remove project member error:", error);

    return res.status(500).json({
      message: "Failed to remove project member",
    });
  }
};
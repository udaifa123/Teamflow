import { Request, Response } from "express";
import pool from "../config/db";

// GET all comments
export const getComments = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM comments
      ORDER BY id
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching comments:", error);

    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};

// GET single comment
export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM comments WHERE id = $1` ,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching comment:", error);

    res.status(500).json({
      message: "Failed to fetch comment",
    });
  }
};

// CREATE comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const { task_id, user_id, comment } = req.body;

    const result = await pool.query(
      `
      INSERT INTO comments (task_id, user_id, comment)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [task_id, user_id, comment]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating comment:", error);

    res.status(500).json({
      message: "Failed to create comment",
    });
  }
};

// UPDATE comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const result = await pool.query(
      `
      UPDATE comments
      SET comment = $1
      WHERE id = $2
      RETURNING *
      `,
      [comment, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating comment:", error);

    res.status(500).json({
      message: "Failed to update comment",
    });
  }
};

// DELETE comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM comments
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    res.status(200).json({
      message: "Comment deleted successfully",
      comment: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting comment:", error);

    res.status(500).json({
      message: "Failed to delete comment",
    });
  }
};
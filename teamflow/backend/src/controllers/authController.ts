import { Request, Response } from "express";
import pool from "../config/db"; 
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // ✅ check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ✅ check existing user
    const existing = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ insert user
    const result = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3) RETURNING *",
      [name, email, hashed]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("REGISTER ERROR:", err); // 🔥 check terminal
    res.status(500).json({ message: "Server error" });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    // ✅ user check
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const dbUser = user.rows[0];

    // ✅ prevent crash if column missing
    if (!dbUser.password_hash) {
      console.error("❌ password_hash missing:", dbUser);
      return res.status(500).json({ message: "Invalid DB data" });
    }

    const valid = await bcrypt.compare(password, dbUser.password_hash);

    if (!valid) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = generateToken(dbUser);

    res.json({ token });

  } catch (err) {
    console.error("LOGIN ERROR FULL:", err); // 🔥 IMPORTANT
    res.status(500).json({ message: "Server error" });
  }
};
// import { Request, Response } from "express";
// import pool from "../config/db";

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const result = await pool.query(
//       `
//       SELECT *
//       FROM users
//       WHERE email = $1 AND password = $2
//       `,
//       [email, password]
//     );

//     if (result.rows.length === 0) {
//       return res.status(401).json({
//         message: "Invalid email or password",
//       });
//     }

//     res.status(200).json({
//       message: "Login successful",
//       user: result.rows[0],
//     });
//   } catch (error) {
//     console.error("Error logging in:", error);

//     res.status(500).json({
//       message: "Login failed",
//     });
//   }
// };
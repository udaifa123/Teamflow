import { Router } from "express";
import {
  getUsers,
  createUser,
  deleteUser,
} from "../controllers/userController";

import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", verifyToken, getUsers);
router.post("/", verifyToken, createUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
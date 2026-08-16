import express from "express";

import {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController";

const router = express.Router();

router.get("/", getComments);
router.get("/:id", getCommentById);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
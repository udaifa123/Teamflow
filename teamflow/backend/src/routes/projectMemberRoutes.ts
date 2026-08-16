import { Router } from "express";

import {
  getProjectMembers,
  addProjectMember,
  removeProjectMember,
} from "../controllers/projectMemberController";

const router = Router();

router.get("/", getProjectMembers);
router.post("/", addProjectMember);
router.delete("/:user_id/:project_id", removeProjectMember);

export default router;
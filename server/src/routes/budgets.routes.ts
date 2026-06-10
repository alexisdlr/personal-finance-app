import { Router } from "express";
import {
  createBudget,
  deleteBudget,
  updateBudget,
} from "../controllers/budget.controller";

const router = Router();

router.post("/", createBudget);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);
export default router;

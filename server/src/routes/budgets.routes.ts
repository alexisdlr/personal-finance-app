import { Router } from "express";
import { createBudget, deleteBudget } from "../controllers/budget.controller";

const router = Router();

router.post("/", createBudget);
router.delete("/:id", deleteBudget);
export default router;

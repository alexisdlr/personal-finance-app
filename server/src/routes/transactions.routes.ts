import { Router } from "express";
import {
  createTransaction,
  updateTransaction,
} from "../controllers/transaction.controller";

const router = Router();

router.post("/", createTransaction);
router.put("/:id", updateTransaction);

export default router;

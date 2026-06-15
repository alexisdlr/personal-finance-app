import { Router } from "express";
import {
  addPotMoney,
  createPot,
  getPots,
  updatePot,
  withdrawPotMoney,
} from "../controllers/pots.controller";

const router = Router();

router.get("/", getPots);
router.post("/", createPot);
router.put("/:id", updatePot);
router.post("/:id/add-money", addPotMoney);
router.post("/:id/withdraw", withdrawPotMoney);

export default router;
import { Router } from "express";
import {
  changePassword,
  updateProfile,
} from "../controllers/profile.controller";

const router = Router();

router.put("/", updateProfile);
router.put("/password", changePassword);

export default router;

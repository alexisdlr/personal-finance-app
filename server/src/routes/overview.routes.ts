import { Router } from "express";
import { getOverview } from "../controllers/overview.controller";

const router = Router();

router.get("/", getOverview);



export default router;
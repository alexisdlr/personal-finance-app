import { Router } from "express";
import { getPots } from "../controllers/pots.controller";

const router = Router();

router.get("/", getPots);



export default router;
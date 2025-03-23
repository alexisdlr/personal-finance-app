import { Router } from "express";
import { checkSession } from "../middleware/check-session";

const router = Router();

router.get("/verify", checkSession);



export default router;
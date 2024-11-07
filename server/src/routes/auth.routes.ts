import { Router } from "express";
import { login, signUp, logout } from "../controllers/auth.controller";

const router = Router();

router.post("/login", login);

router.post("/sign-up", signUp);

router.post("/logout", logout); // Agregar ruta para logout


export default router;
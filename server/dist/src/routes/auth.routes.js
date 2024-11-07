"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.login);
router.post("/sign-up", auth_controller_1.signUp);
router.post("/logout", auth_controller_1.logout); // Agregar ruta para logout
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signUp = exports.login = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const jwt = require("jsonwebtoken");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("finance-app-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
            maxAge: 60 * 60 * 1000, // Expira en 1 hora
        });
        const userRes = {
            id: user.id,
            email: user.email,
            name: user.firstName,
            lastName: user.lastName
        };
        res.status(200).json({ message: "Login Success!", user: userRes });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.login = login;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, lastName } = req.body;
        if (!name || !email || !password) {
            res
                .status(200)
                .json({ message: "Something went wrong, missing fields..." });
            return;
        }
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const existUser = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existUser !== null) {
            res.status(500).json({ error: "User Already Exists..." });
            return;
        }
        const newUser = yield prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                firstName: name,
                lastName: lastName,
            },
        });
        if (!newUser) {
            res.status(500).json({ error: "Something went wrong!" });
            return;
        }
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        // Enviar token como cookie HTTP-only
        res.cookie("finance-app-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000, // Expira en 1 hora
        });
        // Responder con detalles del usuario creado
        res.status(200).json({
            message: "User registered successfully",
            user: {
                name: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                id: newUser.id,
            },
        });
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.signUp = signUp;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("finance-app-token");
        res.status(200).json({ message: "Logout Success!" });
    }
    catch (error) {
        console.error("Error logout", error);
        res.status(500).json({ error: "Logout Error, something went wrong!" });
    }
});
exports.logout = logout;

import { Request, RequestHandler, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid Credentials" });
      return
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
    }

    res.status(200).json({ message: "Login Success!", user: userRes });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const signUp: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, lastName } = req.body;

    if (!name || !email || !password) {
      res
        .status(200)
        .json({ message: "Something went wrong, missing fields..." });

      return
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existUser !== null) {
      res.status(500).json({ error: "User Already Exists..." });
      return
    }

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        firstName: name,
        lastName: lastName,
      },
    });

    if (!newUser) {
      res.status(500).json({ error: "Something went wrong!" });
      return
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
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("finance-app-token");
    res.status(200).json({ message: "Logout Success!" });
  } catch (error) {
    console.error("Error logout", error)
    res.status(500).json({error: "Logout Error, something went wrong!"})
  }
  
}
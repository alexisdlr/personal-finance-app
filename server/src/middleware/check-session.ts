import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { AuthenticationError } from "./error-handler";

const { JWT_SECRET: jwtSecret = "" } = process.env;

const checkSession = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["finance-app-token"];

    if (!token) {
      throw new AuthenticationError("Token not found");
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      if (!decoded || !decoded.userId) {
        throw new AuthenticationError("UserId not found");
      }

      res.status(200).json({ user: decoded, message: "Auth Success" });  // 👈 Enviar el usuario decodificado
    } catch (error) {
      throw new AuthenticationError("Invalid token");
    }
  }
);

export { checkSession };

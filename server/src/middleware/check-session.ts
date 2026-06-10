import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { AuthenticationError } from "./error-handler";
import { PrismaClient } from "@prisma/client";

const { JWT_SECRET: jwtSecret = "" } = process.env;
const prisma = new PrismaClient();

const checkSession = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["finance-app-token"];

    if (!token) {
      throw new AuthenticationError("Token nott found");
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      if (!decoded || !decoded.userId) {
        throw new AuthenticationError("UserId not found");
      }

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });
      if (!user) {
        res.status(400).json({
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        user: {
          id: user.id,
          name: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (error) {
      throw new AuthenticationError("Invalid token");
    }
  },
);

export { checkSession };

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { AuthenticationError } from "./error-handler";

const authenticateToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["finance-app-token"];
  
    if (!token) {
      throw new AuthenticationError("Token not found");
    }
  
    try {
      const jwtSecret = process.env.JWT_SECRET || "";

      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
  
      if (!decoded || !decoded.userId) {
        throw new AuthenticationError("UserId not found");
      }

      req.userId = (decoded as JwtPayload).userId as string;
      next();
    } catch (error) {
      throw new AuthenticationError("Invalid token");
    }
  }
)

export {authenticateToken};

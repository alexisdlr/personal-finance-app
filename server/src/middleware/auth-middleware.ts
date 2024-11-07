import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extiende el tipo Request para incluir userId
interface CustomRequest extends Request {
  userId?: number;
}

const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies["finance-app-token"];

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === "object" && decoded && "userId" in decoded) {
      req.userId = (decoded as JwtPayload).userId as number;
      next();
    } else {
      return res.status(403).json({ error: "Invalid or expired token." });
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

export default authenticateToken;

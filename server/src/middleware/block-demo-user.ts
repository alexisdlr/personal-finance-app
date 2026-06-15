import { NextFunction, Request, Response } from "express";
import { isDemoUserId } from "../lib/demo-user";

export const blockDemoUserWrites = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.method === "GET") {
    next();
    return;
  }

  if (isDemoUserId(req.userId)) {
    res.status(403).json({ error: "Demo account is read-only" });
    return;
  }

  next();
};

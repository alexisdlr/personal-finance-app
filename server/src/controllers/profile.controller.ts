import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma-client";

export const updateProfile: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "No user logged" });
      return;
    }

    const { name, lastName, email } = req.body;

    if (!name || !lastName || !email) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.id !== Number(userId)) {
      res.status(400).json({ error: "Email already in use" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        firstName: name,
        lastName,
        email,
      },
    });

    res.status(200).json({
      message: "Success",
      user: {
        id: updatedUser.id,
        name: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const changePassword: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "No user logged" });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      res.status(400).json({ error: "Current password is incorrect" });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: Number(userId) },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

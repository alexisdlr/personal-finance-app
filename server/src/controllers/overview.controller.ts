import { Request, RequestHandler, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOverview: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(500).json("No user logged");
      return;
    }

    const pots = await prisma.pot.findMany({
      where: {
        userId: Number(userId),
      },
      orderBy: {
        total: "desc",
      },
    });
    const balance = await prisma.balance.findFirst({
      where: {
        userId: Number(userId),
      },
    });

    const budgets = await prisma.budget.findMany({
      where: { userId: Number(userId) },
      orderBy: {
        category: "desc",
      },
    });
    const transactions = await prisma.transaction.findMany({
      where: { userId: Number(userId) },
      orderBy: {
        id: "desc",
      },
      include: {
        balance: true,
      },
    });

    if (!pots || !budgets || !transactions || !balance) {
      res.status(500).json({ message: "No results found!" });
      return;
    }

    const data = {
      pots,
      budgets,
      transactions,
      balance,
    };

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    console.error("Pots error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

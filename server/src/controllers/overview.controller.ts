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


    const today = new Date();
    const upcomingDate = new Date();
    upcomingDate.setDate(today.getDate() + 7); // Próximos 7 días

    const recurringBills = await prisma.transaction.findMany({
      where: {
        userId: Number(userId),
        recurring: true,
      },
    });

    const paidBills = recurringBills
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalUpcoming = recurringBills
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const dueSoon = recurringBills
      .filter((t) => new Date(t.date) <= upcomingDate && t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    if (!pots || !budgets || !transactions || !balance) {
      res.status(500).json({ error: "No results found!" });
      return;
    }

    const data = {
      pots,
      budgets,
      transactions,
      balance,
      paidBills,
      totalUpcoming,
      dueSoon
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

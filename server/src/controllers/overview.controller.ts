import { Request, RequestHandler, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOverview: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "No user logged" });
      return;
    }

    const [pots, balance, budgets, transactions] = await Promise.all([
      prisma.pot.findMany({
        where: {
          userId: Number(userId),
        },
        orderBy: {
          total: "desc",
        },
      }),

      prisma.balance.findFirst({
        where: {
          userId: Number(userId),
        },
      }),

      prisma.budget.findMany({
        where: {
          userId: Number(userId),
        },
        orderBy: {
          category: "desc",
        },
      }),

      prisma.transaction.findMany({
        where: {
          userId: Number(userId),
        },
        orderBy: {
          id: "desc",
        },
      }),
    ]);

    // ========= BUDGET STATS =========

    const budgetsWithStats = budgets.map((budget) => {
      const categoryTransactions = transactions.filter(
        (transaction) =>
          transaction.category === budget.category && transaction.amount < 0,
      );

      const spent = categoryTransactions.reduce(
        (sum, transaction) => sum + Math.abs(transaction.amount),
        0,
      );

      const remaining = Math.max(budget.maximum - spent, 0);

      return {
        ...budget,
        spent,
        remaining,
      };
    });

    // ========= RECURRING =========

    const today = new Date();

    const upcomingDate = new Date();
    upcomingDate.setDate(today.getDate() + 7);

    const recurringBills = transactions.filter(
      (transaction) => transaction.recurring,
    );

    const paidBills = recurringBills
      .filter((transaction) => transaction.amount < 0)
      .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

    const totalBills = recurringBills.reduce(
      (sum, transaction) => sum + Math.abs(transaction.amount),
      0,
    );

    const dueSoon = recurringBills
      .filter(
        (transaction) =>
          new Date(transaction.date) <= upcomingDate && transaction.amount > 0,
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    res.status(200).json({
      message: "Success",
      data: {
        pots,
        budgets: budgetsWithStats,
        transactions,
        balance: balance ?? {
          current: 0,
          income: 0,
          expenses: 0,
        },
        paidBills,
        totalBills,
        dueSoon,
      },
    });
  } catch (error) {
    console.error("Overview error:", error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

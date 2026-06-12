import { Request, RequestHandler, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DUE_SOON_DAYS = 5;

export const getOverview: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        error: "No user logged",
      });

      return;
    }

    const [balance, pots, budgets, transactions] = await Promise.all([
      prisma.balance.findFirst({
        where: {
          userId: Number(userId),
        },
      }),

      prisma.pot.findMany({
        where: {
          userId: Number(userId),
        },
        orderBy: {
          total: "desc",
        },
      }),

      prisma.budget.findMany({
        where: {
          userId: Number(userId),
        },
      }),

      prisma.transaction.findMany({
        where: {
          userId: Number(userId),
        },
        orderBy: {
          date: "desc",
        },
      }),
    ]);

    // ==========================
    // REFERENCE MONTH
    // ==========================

    const latestTx = transactions.length > 0 ? transactions[0] : null;

    const referenceDate = latestTx?.date ?? new Date();

    const referenceMonth = referenceDate.toISOString().slice(0, 7);

    // ==========================
    // BALANCE
    // ==========================

    const current = balance?.current ?? 0;

    const income = balance?.income ?? 0;

    const expenses = balance?.expenses ?? 0;

    // ==========================
    // POTS
    // ==========================

    const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0);

    const topPots = pots.slice(0, 4).map((pot) => ({
      id: pot.id,
      name: pot.name,
      total: pot.total,
      theme: pot.theme,
    }));

    // ==========================
    // BUDGETS
    // ==========================

    const budgetData = budgets.map((budget) => {
      const spent = transactions
        .filter(
          (transaction) =>
            transaction.category === budget.category &&
            transaction.amount < 0 &&
            transaction.date.toISOString().startsWith(referenceMonth),
        )
        .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

      return {
        ...budget,
        spent,
        remaining: budget.maximum - spent,
      };
    });

    const totalSpent = budgetData.reduce(
      (sum, budget) => sum + budget.spent,
      0,
    );

    const totalLimit = budgetData.reduce(
      (sum, budget) => sum + budget.maximum,
      0,
    );

    // ==========================
    // LATEST TRANSACTIONS
    // ==========================

    const latestTransactions = transactions.slice(0, 5).map((t) => ({
      id: t.id,
      avatar: t.avatar,
      name: t.name,
      amount: t.amount,
      date: t.date,
      category: t.category,
    }));

    // ==========================
    // RECURRING BILLS
    // ==========================

    const recurring = transactions.filter(
      (transaction) => transaction.recurring,
    );

    const today = referenceDate.getDate();

    const bills = recurring.map((bill) => {
      const day = new Date(bill.date).getDate();

      const paid = bill.date.toISOString().startsWith(referenceMonth);

      return {
        amount: Math.abs(bill.amount),
        paid,
        dueSoon: !paid && day > today && day <= today + DUE_SOON_DAYS,
      };
    });

    const paid = bills.filter((b) => b.paid);

    const upcoming = bills.filter((b) => !b.paid);

    const dueSoon = bills.filter((b) => b.dueSoon);

    res.status(200).json({
      message: "Success",

      data: {
        balance: current,
        income,
        expenses,

        totalSaved,

        pots: topPots,

        budgets: budgetData,

        totalSpent,

        totalLimit,

        transactions: latestTransactions,

        bills: {
          totalBills: bills.reduce((sum, bill) => sum + bill.amount, 0),

          paidCount: paid.length,

          paidTotal: paid.reduce((sum, bill) => sum + bill.amount, 0),

          upcomingCount: upcoming.length,

          upcomingTotal: upcoming.reduce((sum, bill) => sum + bill.amount, 0),

          dueSoonCount: dueSoon.length,

          dueSoonTotal: dueSoon.reduce((sum, bill) => sum + bill.amount, 0),
        },
      },
    });
  } catch (error) {
    console.error("Overview error:", error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

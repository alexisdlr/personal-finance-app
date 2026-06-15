import { Request, RequestHandler, Response } from "express";
import { prisma } from "../lib/prisma-client";
import { getOrCreateUserBalance } from "../lib/balance";

const DEFAULT_AVATAR = "/images/avatars/default.jpg";

type TransactionPayload = {
  type: "expense" | "income";
  name: string;
  amount: number;
  category: string;
  date: string;
  recurring: boolean;
};

const getSignedAmount = (type: "expense" | "income", amount: number) =>
  type === "expense" ? -Math.abs(amount) : Math.abs(amount);

const getBalanceAdjustments = (signedAmount: number) => ({
  currentDelta: signedAmount,
  incomeDelta: signedAmount > 0 ? signedAmount : 0,
  expensesDelta: signedAmount < 0 ? Math.abs(signedAmount) : 0,
});

export const createTransaction: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "No user logged" });
      return;
    }

    const { type, name, amount, category, date, recurring } =
      req.body as TransactionPayload;

    if (!type || !name || !amount || !category || !date) {
      res.status(400).json({
        error: "Type, name, amount, category, and date are required",
      });
      return;
    }

    const balance = await getOrCreateUserBalance(Number(userId));

    const signedAmount = getSignedAmount(type, Number(amount));
    const adjustments = getBalanceAdjustments(signedAmount);

    const [newTransaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          avatar: DEFAULT_AVATAR,
          name,
          category,
          date: new Date(date),
          amount: signedAmount,
          recurring: Boolean(recurring),
          userId: Number(userId),
          balanceId: balance.id,
        },
      }),
      prisma.balance.update({
        where: { id: balance.id },
        data: {
          current: { increment: adjustments.currentDelta },
          income: { increment: adjustments.incomeDelta },
          expenses: { increment: adjustments.expensesDelta },
        },
      }),
    ]);

    res.status(200).json({
      message: "Success",
      data: { newTransaction },
    });
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateTransaction: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { type, name, amount, category, date, recurring } =
      req.body as TransactionPayload;

    if (!userId) {
      res.status(401).json({ error: "No user logged" });
      return;
    }

    if (!type || !name || !amount || !category || !date) {
      res.status(400).json({
        error: "Type, name, amount, category, and date are required",
      });
      return;
    }

    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });

    if (!existingTransaction) {
      res.status(404).json({ error: "Transaction not found" });
      return;
    }

    if (existingTransaction.userId !== Number(userId)) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const signedAmount = getSignedAmount(type, Number(amount));
    const oldAdjustments = getBalanceAdjustments(existingTransaction.amount);
    const newAdjustments = getBalanceAdjustments(signedAmount);

    const [updatedTransaction] = await prisma.$transaction([
      prisma.transaction.update({
        where: { id: Number(id) },
        data: {
          name,
          category,
          date: new Date(date),
          amount: signedAmount,
          recurring: Boolean(recurring),
        },
      }),
      prisma.balance.update({
        where: { id: existingTransaction.balanceId },
        data: {
          current: {
            increment:
              newAdjustments.currentDelta - oldAdjustments.currentDelta,
          },
          income: {
            increment: newAdjustments.incomeDelta - oldAdjustments.incomeDelta,
          },
          expenses: {
            increment:
              newAdjustments.expensesDelta - oldAdjustments.expensesDelta,
          },
        },
      }),
    ]);

    res.status(200).json({
      message: "Success",
      data: { updatedTransaction },
    });
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

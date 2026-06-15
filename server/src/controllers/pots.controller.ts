import { Request, RequestHandler, Response } from "express";
import { prisma } from "../lib/prisma-client";
import { getOrCreateUserBalance } from "../lib/balance";

type PotPayload = {
  name: string;
  target: number;
  theme: string;
};

export const getPots: RequestHandler = async (req: Request, res: Response) => {
  try {
    const pots = await prisma.pot.findMany({
      include: {
        balance: true,
        user: true,
      },
      orderBy: {
        total: "asc",
      },
    });

    if (!pots) {
      res.status(500).json({ message: "No results found!" });
      return;
    }

    const potsMap = pots.map((pot) => {
      return {
        ...pot,
        user: {
          id: pot.userId,
          name: pot.user.firstName,
          email: pot.user.email,
          lastName: pot.user.lastName,
        },
      };
    });

    res.status(200).json({
      message: "Success",
      potsMap,
    });
  } catch (error) {
    console.error("Pots error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createPot: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "No user logged" });
      return;
    }

    const { name, target, theme } = req.body as PotPayload;

    if (!name || target === undefined || !theme) {
      res.status(400).json({
        error: "Name, target, and theme are required",
      });
      return;
    }

    const balance = await getOrCreateUserBalance(Number(userId));

    const newPot = await prisma.pot.create({
      data: {
        name,
        target: Number(target),
        total: 0,
        theme,
        userId: Number(userId),
        balanceId: balance.id,
      },
    });

    res.status(200).json({
      message: "Success",
      data: { newPot },
    });
  } catch (error) {
    console.error("Pots error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updatePot: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { name, target, theme } = req.body as PotPayload;

    if (!userId) {
      res.status(401).json({ error: "No user logged" });
      return;
    }

    if (!name || target === undefined || !theme) {
      res.status(400).json({
        error: "Name, target, and theme are required",
      });
      return;
    }

    const existingPot = await prisma.pot.findUnique({
      where: { id: Number(id) },
    });

    if (!existingPot) {
      res.status(404).json({ error: "Pot not found" });
      return;
    }

    if (existingPot.userId !== Number(userId)) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const updatedPot = await prisma.pot.update({
      where: { id: Number(id) },
      data: {
        name,
        target: Number(target),
        theme,
      },
    });

    res.status(200).json({
      message: "Success",
      data: { updatedPot },
    });
  } catch (error) {
    console.error("Pots error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

type PotMoneyPayload = {
  amount: number;
};

export const addPotMoney: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { amount } = req.body as PotMoneyPayload;

    if (!userId) {
      res.status(401).json({ error: "No user logged" });
      return;
    }

    if (!amount || Number(amount) <= 0) {
      res.status(400).json({ error: "A valid amount is required" });
      return;
    }

    const pot = await prisma.pot.findUnique({
      where: { id: Number(id) },
      include: { balance: true },
    });

    if (!pot) {
      res.status(404).json({ error: "Pot not found" });
      return;
    }

    if (pot.userId !== Number(userId)) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const moneyAmount = Number(amount);
    const remainingToTarget = pot.target - pot.total;

    if (moneyAmount > pot.balance.current) {
      res.status(400).json({ error: "Insufficient balance" });
      return;
    }

    if (moneyAmount > remainingToTarget) {
      res.status(400).json({ error: "Amount exceeds pot target" });
      return;
    }

    const [updatedPot] = await prisma.$transaction([
      prisma.pot.update({
        where: { id: pot.id },
        data: { total: { increment: moneyAmount } },
      }),
      prisma.balance.update({
        where: { id: pot.balanceId },
        data: { current: { decrement: moneyAmount } },
      }),
    ]);

    res.status(200).json({
      message: "Success",
      data: { updatedPot },
    });
  } catch (error) {
    console.error("Pots error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const withdrawPotMoney: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { amount } = req.body as PotMoneyPayload;

    if (!userId) {
      res.status(401).json({ error: "No user logged" });
      return;
    }

    if (!amount || Number(amount) <= 0) {
      res.status(400).json({ error: "A valid amount is required" });
      return;
    }

    const pot = await prisma.pot.findUnique({
      where: { id: Number(id) },
      include: { balance: true },
    });

    if (!pot) {
      res.status(404).json({ error: "Pot not found" });
      return;
    }

    if (pot.userId !== Number(userId)) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const moneyAmount = Number(amount);

    if (moneyAmount > pot.total) {
      res.status(400).json({ error: "Insufficient funds in pot" });
      return;
    }

    const [updatedPot] = await prisma.$transaction([
      prisma.pot.update({
        where: { id: pot.id },
        data: { total: { decrement: moneyAmount } },
      }),
      prisma.balance.update({
        where: { id: pot.balanceId },
        data: { current: { increment: moneyAmount } },
      }),
    ]);

    res.status(200).json({
      message: "Success",
      data: { updatedPot },
    });
  } catch (error) {
    console.error("Pots error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

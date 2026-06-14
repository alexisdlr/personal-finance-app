import { Request, RequestHandler, Response } from "express";
import { prisma } from "../lib/prisma-client";

export const createBudget: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(500).json("No user logged");
      return;
    }

    const { category, maximum, theme } = req.body;

    if (!category || !maximum || !theme) {
      res
        .status(400)
        .json({ error: "Category, maximum, and theme are required" });
      return;
    }

    const newBudget = await prisma.budget.create({
      data: {
        category,
        maximum,
        theme,
        userId: Number(userId),
      },
    });

    const data = {
      newBudget,
    };

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    console.error("Budget error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateBudget: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { category, maximum, theme } = req.body;

    if (!userId) {
      res.status(500).json("No user logged");
      return;
    }

    if (!category || !maximum || !theme) {
      res
        .status(400)
        .json({ error: "Category, maximum, and theme are required" });
      return;
    }

    const updateBudget = await prisma.budget.update({
      where: {
        id: Number(id),
      },
      data: {
        category,
        maximum,
        theme,
      },
    });

    const data = {
      updatedBudget: updateBudget,
    };

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    console.error("Budget error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteBudget: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId;
    const budgetId = req.params.id;
    if (!userId) {
      res.status(401).json({
        error: "No user logged",
      });
      return;
    }

    const budget = await prisma.budget.findUnique({
      where: {
        id: Number(budgetId),
      },
    });

    if (!budget) {
      res.status(404).json({
        error: "Budget not found",
      });
      return;
    }

    if (budget.userId !== Number(userId)) {
      res.status(403).json({
        error: "Unauthorized",
      });
      return;
    }

    await prisma.budget.delete({
      where: {
        id: budget.id,
      },
    });

    res.status(200).json({
      message: "Budget deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

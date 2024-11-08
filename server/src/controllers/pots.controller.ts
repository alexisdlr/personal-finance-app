import { Request, RequestHandler, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getPots: RequestHandler = async (req: Request, res: Response) => {
  try {
    const pots = await prisma.pot.findMany({
      include: {
        balance: true,
        user: true
      },
      orderBy: {
        total: "asc"
      }
    })

    if(!pots) {
      res.status(500).json({ message: "No results found!" });
      return
    }

    const potsMap = pots.map(pot => {
      return {
        ...pot,
        user: {
          id: pot.userId,
          name: pot.user.firstName,
          email: pot.user.email,
          lastName: pot.user.lastName,
        }
      }
    })

    res.status(200).json({
      message: "Success",
      potsMap
    });
  } catch (error) {
    console.error("Pots error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
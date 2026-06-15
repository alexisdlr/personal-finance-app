import { prisma } from "./prisma-client";

export async function getOrCreateUserBalance(userId: number) {
  const existingBalance = await prisma.balance.findFirst({
    where: { userId },
  });

  if (existingBalance) {
    return existingBalance;
  }

  return prisma.balance.create({
    data: {
      userId,
      current: 0,
      income: 0,
      expenses: 0,
    },
  });
}

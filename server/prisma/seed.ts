import { PrismaClient } from '@prisma/client';
import data from './data.json';

const prisma = new PrismaClient();

async function main() {
  // Insertar balance
  const balance = await prisma.balance.create({
    data: {
      current: data.balance.current,
      income: data.balance.income,
      expenses: data.balance.expenses,
      user: { connect: { id: 6 } }, // Conectar con el usuario
    },
  });

  
  // Insertar transacciones
  for (const transaction of data.transactions) {
    await prisma.transaction.create({
      data: {
        avatar: transaction.avatar,
        name: transaction.name,
        category: transaction.category,
        date: new Date(transaction.date),
        amount: transaction.amount,
        recurring: transaction.recurring,
        user: { connect: { id: 6 } }, // Conectar con el usuario
        balance: { connect: { id: balance.id } } , // Conectar con el balance
      },
    });
  }

  // Insertar presupuestos
  for (const budget of data.budgets) {
    await prisma.budget.create({
      data: {
        category: budget.category,
        maximum: budget.maximum,
        theme: budget.theme,
        user: { connect: { id: 6 } }, // Conectar con el usuario
      },
    });
  }

  // Insertar pots
  for (const pot of data.pots) {
    await prisma.pot.create({
      data: {
        name: pot.name,
        target: pot.target,
        total: pot.total,
        theme: pot.theme,
        user: { connect: { id: 6 } }, // Conectar con el usuario
        balance: { connect: {id: balance.id} }, // Conectar con el balance
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

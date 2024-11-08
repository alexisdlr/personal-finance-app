export type User = {
  id: number;
  email: string;
  name: string;
  lastName: string;
  balances?: Balance[];
  transactions?: Transaction[];
  pots?: Pot[];
  budgets?: Budget[];
};

export type Balance = {
  id: number;
  current: number;
  income: number;
  expenses: number;
  userId: number;
};

export type Transaction = {
  id: number;
  avatar: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  recurring: boolean;
  balanceId: number;
  balance: Balance;
  userId: number;
};

export type Budget = {
  id: number;
  category: string;
  maximum: number;
  theme: string;
  userId: number;
};

export type Pot = {
  id: number;
  name: string;
  target: number;
  total: number;
  theme: string;
  balanceId: number;
  userId: number;
};
